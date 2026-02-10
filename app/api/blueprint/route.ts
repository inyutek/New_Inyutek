import { resend } from '@/lib/resend';
import { findLeadByToken, markBlueprintSent } from '@/lib/sheets';
import { env } from '@/lib/env';

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

        // 1. Find lead data by token
        const lead = await findLeadByToken(token);

        if (!lead) {
            return Response.json(
                { success: false, error: "Lead not found for this token" },
                { status: 404 }
            );
        }

        const { email, name, rowIndex } = lead;
        let sentVia = 'resend';
        let emailError = null;

        // 2. Send email (Try Resend first, fallback to Gmail)
        try {
            if (env.RESEND_API_KEY) {
                const { data, error } = await resend.emails.send({
                    from: 'Inyutek <onboarding@resend.dev>',
                    to: [email],
                    subject: 'Your AI Growth Blueprint - Inyutek',
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; color: #000024;">
                            <h2 style="color: #000024;">Hello ${name}!</h2>
                            <p>Thank you for requesting the Inyutek AI Growth Blueprint.</p>
                            <p>We've received your request and are excited to help you scale your business.</p>
                            <div style="padding: 15px; background: #f4f4f4; border-radius: 8px; margin: 20px 0;">
                                <p><strong>What's Next?</strong></p>
                                <p>One of our growth specialists will be in touch shortly to walk you through the specifics of this blueprint.</p>
                            </div>
                            <p>Best regards,<br /><strong>The Inyutek Team</strong></p>
                        </div>
                    `,
                });

                if (error) throw error;
                console.log(`✅ Email sent via Resend, ID: ${data?.id}`);
            } else {
                throw new Error("Resend API Key missing, falling back to Gmail");
            }
        } catch (error: any) {
            console.warn("⚠️ Resend delivery failed or unconfigured, falling back to Gmail:", error.message || error);
            sentVia = 'gmail';
            try {
                const { sendEmail } = await import('@/lib/gmail');
                await sendEmail({
                    to: email,
                    subject: 'Your AI Growth Blueprint - Inyutek',
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; color: #000024;">
                            <h2 style="color: #000024;">Hello ${name}!</h2>
                            <p>Thank you for requesting the Inyutek AI Growth Blueprint.</p>
                            <p>We've received your request and are excited to help you scale your business.</p>
                            <div style="padding: 15px; background: #f4f4f4; border-radius: 8px; margin: 20px 0;">
                                <p><strong>What's Next?</strong></p>
                                <p>One of our growth specialists will be in touch shortly to walk you through the specifics of this blueprint.</p>
                            </div>
                            <p>Best regards,<br /><strong>The Inyutek Team</strong></p>
                        </div>
                    `,
                });
                console.log("✅ Email sent via Gmail fallback");
            } catch (fallbackError) {
                console.error("❌ Both Resend and Gmail fallback failed:", fallbackError);
                emailError = fallbackError;
            }
        }

        if (emailError) {
            return Response.json(
                { success: false, error: "Failed to send email via any provider" },
                { status: 500 }
            );
        }

        // 3. Mark as sent in Google Sheets
        await markBlueprintSent(rowIndex);

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
