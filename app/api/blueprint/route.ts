import { NextResponse } from 'next/server'
import { findLeadByToken } from '@/lib/sheets';
import { sendBlueprintToLead } from '@/lib/automation';

// Simple in-memory rate limiting
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // 5 requests per hour per IP

function getRateLimitKey(request: Request): string {
    // Get IP from headers (works with most proxies/hosting)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    return ip;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const entry = rateLimits.get(key);

    if (!entry || entry.resetAt < now) {
        // First request or window expired
        rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
    }

    if (entry.count >= RATE_LIMIT_MAX) {
        return { allowed: false, remaining: 0 };
    }

    entry.count++;
    return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token } = body;

        // Validate token format (UUID v4)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!token || !uuidRegex.test(token)) {
            return NextResponse.json(
                { error: 'Invalid token format' },
                { status: 400 }
            );
        }

        // Check rate limit
        const rateLimitKey = getRateLimitKey(request);
        const { allowed, remaining } = checkRateLimit(rateLimitKey);

        if (!allowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Find lead by token in Google Sheet
        const lead = await findLeadByToken(token);

        if (!lead) {
            return NextResponse.json(
                { error: 'Token not found' },
                { status: 404 }
            );
        }

        // Check if blueprint was already sent
        if (lead.blueprintSent) {
            return NextResponse.json({
                success: true,
                already_sent: true,
                sent_at: lead.sentAt,
                email: lead.email
            });
        }

        // Send the blueprint email
        await sendBlueprintToLead(lead);

        return NextResponse.json({
            success: true,
            email: lead.email,
            sent_at: new Date().toISOString()
        }, {
            headers: {
                'X-RateLimit-Remaining': remaining.toString()
            }
        });

    } catch (error) {
        console.error('Blueprint API Error:', error);
        return NextResponse.json(
            { error: 'Failed to send blueprint. Please try again.' },
            { status: 500 }
        );
    }
}
