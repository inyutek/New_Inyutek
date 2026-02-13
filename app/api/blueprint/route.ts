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
            .returns<{ email: string; name: string }>() // Type the response
            .single();

        if (findError || !lead) {
            console.error("Lead lookup error:", findError);
            return Response.json(
                { success: false, error: "Lead not found for this token" },
                { status: 404 }
            );
        }

        const { email, name } = lead;

        // 2. Send blueprint email via Gmail
        let sentVia = 'gmail';
        try {
            const { sendEmail } = await import('@/lib/gmail');
            await sendEmail({
                to: email,
                subject: 'Your Growth Blueprint - Inyutek',
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
            console.log(`✅ Blueprint email sent to ${email} via Gmail`);
        } catch (emailError: any) {
            console.error("❌ Failed to send blueprint email:", emailError);
            return Response.json(
                { success: false, error: "Failed to send email: " + (emailError.message || "Unknown error") },
                { status: 500 }
            );
        }

        // 3. Mark as sent in Supabase via RPC
        const { error: updateError } = await getSupabase()
            .rpc('mark_blueprint_sent', { lookup_token: token });

        if (updateError) {
            console.error("Failed to update blueprint status:", updateError);
            // Email was sent, so still return success
        }

        // 4. Also try to mark in Google Sheets (background sync)
        try {
            if (process.env.GOOGLE_SHEET_ID) {
                const { findLeadByToken, markBlueprintSent } = await import('@/lib/sheets');
                const sheetLead = await findLeadByToken(token);
                if (sheetLead) {
                    await markBlueprintSent(sheetLead.rowIndex);
                    console.log("✅ Marked blueprint sent in Google Sheets");
                }
            }
        } catch (sheetError) {
            console.error("Sheets sync error (non-blocking):", sheetError);
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
