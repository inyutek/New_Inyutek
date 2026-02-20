import { getSupabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { token } = body;

        if (!token) {
            return Response.json(
                { success: false, error: "Token is required" },
                { status: 400 }
            );
        }

        // 1. Find lead in Supabase by token using secure RPC (to bypass RLS)
        const { data: lead, error: findError } = await getSupabase()
            .rpc('get_contact_by_token', { lookup_token: token })
            .returns<{ email: string; name: string }>()
            .single();

        if (findError || !lead) {
            console.error("Lead lookup error:", findError);
            return Response.json(
                { success: false, error: "Lead not found for this token" },
                { status: 404 }
            );
        }

        const { email, name } = lead;

        // 2. Send the blueprint email via Resend BEFORE marking as sent
        let sentVia = 'unknown';
        try {
            if (process.env.RESEND_API_KEY) {
                const { Resend } = await import('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);

                await resend.emails.send({
                    from: "Inyutek <onboarding@resend.dev>",
                    to: email,
                    subject: "Your Growth Blueprint - Inyutek",
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; color: #000024;">
                            <h2 style="color: #000024;">Hello ${name}!</h2>
                            <p>Thank you for requesting the Inyutek Growth Blueprint.</p>
                            <p>We've received your request and are excited to help you scale your business.</p>
                            <div style="padding: 15px; background: #f4f4f4; border-radius: 8px; margin: 20px 0;">
                                <p><strong>What's Next?</strong></p>
                                <p>One of our growth specialists will be in touch shortly to walk you through the specifics of this blueprint.</p>
                            </div>
                            <p>Best regards,<br /><strong>The Inyutek Team</strong></p>
                        </div>
                    `,
                });
                sentVia = 'Resend';
                console.log(`Blueprint email sent to ${email} via Resend.`);
            } else {
                console.warn("RESEND_API_KEY not set — blueprint email not sent.");
                sentVia = 'skipped (no RESEND_API_KEY)';
            }
        } catch (emailError: any) {
            console.error("Failed to send blueprint email:", emailError.message);
            // Don't return error — still mark as sent so user doesn't retry
            sentVia = `failed (${emailError.message})`;
        }

        // 3. Mark as sent in Supabase via RPC
        // This also triggers the Edge Function, but email is already sent above.
        const { error: updateError } = await getSupabase()
            .rpc('mark_blueprint_sent', { lookup_token: token });

        if (updateError) {
            console.error("Failed to update blueprint status:", updateError);
            return Response.json(
                { success: false, error: "Failed to mark blueprint as sent in database" },
                { status: 500 }
            );
        }

        return Response.json({
            success: true,
            message: `Blueprint sent successfully via ${sentVia}`,
            sentVia
        });

    } catch (error: any) {
        console.error("API Route Error:", error);
        return Response.json(
            { success: false, error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
