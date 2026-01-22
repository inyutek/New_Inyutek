import { NextResponse } from 'next/server';
import { processLeads } from '@/lib/automation';

export async function POST(request: Request) {
    try {
        // Ideally this endpoint should be protected (e.g., via a secret header or admin check)
        // For now, per requirements "No overengineering", we'll leave it open but expect it to be called internally.
        // If Cron is added later, headers control works well.

        const result = await processLeads();

        return NextResponse.json({
            success: true,
            processed: result.processed,
            errors: result.errors,
        });
    } catch (error: any) {
        console.error("API Automation Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
