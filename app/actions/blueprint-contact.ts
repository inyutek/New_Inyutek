"use server"

import { appendLead } from "@/lib/sheets"
import { resend } from '@/lib/resend'
import { env } from '@/lib/env'

export async function submitBlueprintForm(prevState: any, formData: FormData) {
    try {
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const website = formData.get("website") as string

        if (!email || !name) {
            return { success: false, error: "Name and Email are required." }
        }

        const data = {
            name,
            email,
            website: website || "",
            businessName: "N/A", // Default for simplified form
            businessType: "N/A",
            primaryGoal: "Blueprint Request",
            biggestProblem: "N/A",
            source: "blueprint-form",
        }

        // 1. Save to Google Sheets
        const { token } = await appendLead(data)

        // 2. Send Blueprint Email (Try Resend, fallback to Gmail)
        try {
            if (env.RESEND_API_KEY) {
                const { data: resendData, error } = await resend.emails.send({
                    from: 'Inyutek <onboarding@resend.dev>', // Replace with verified domain
                    to: [email],
                    subject: 'Your AI Growth Blueprint - Inyutek',
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; color: #000024;">
                            <h2 style="color: #000024;">Hello ${name}!</h2>
                            <p>Thank you for requesting our AI Growth Blueprint.</p>
                            <p>We've received your request and are excited to help you scale.</p>
                            <div style="padding: 15px; background: #f4f4f4; border-radius: 8px; margin: 20px 0;">
                                <p><strong>Next Steps:</strong></p>
                                <ul>
                                    <li>Review the attached concepts</li>
                                    <li>Schedule a strategy call if you're ready to implement</li>
                                </ul>
                            </div>
                            <p>Best regards,<br /><strong>The Inyutek Team</strong></p>
                        </div>
                    `,
                })
                if (error) throw error;
                console.log(`✅ Email sent via Resend, ID: ${resendData?.id}`);
            } else {
                throw new Error("Resend API Key missing, falling back to Gmail");
            }
        } catch (emailError: any) {
            console.warn("⚠️ Resend delivery failed or unconfigured, falling back to Gmail:", emailError.message || emailError);
            try {
                const { sendEmail } = await import('@/lib/gmail');
                await sendEmail({
                    to: email,
                    subject: 'Your AI Growth Blueprint - Inyutek',
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; color: #000024;">
                            <h2 style="color: #000024;">Hello ${name}!</h2>
                            <p>Thank you for requesting our AI Growth Blueprint.</p>
                            <p>We've received your request and are excited to help you scale.</p>
                            <div style="padding: 15px; background: #f4f4f4; border-radius: 8px; margin: 20px 0;">
                                <p><strong>Next Steps:</strong></p>
                                <ul>
                                    <li>Review the attached concepts</li>
                                    <li>Schedule a strategy call if you're ready to implement</li>
                                </ul>
                            </div>
                            <p>Best regards,<br /><strong>The Inyutek Team</strong></p>
                        </div>
                    `,
                });
                console.log("✅ Email sent via Gmail fallback");
            } catch (fallbackError) {
                console.error("❌ Both Resend and Gmail fallback failed:", fallbackError);
                // We don't fail the whole action if just email fails, 
                // but we log it for debugging.
            }
        }

        return { success: true, token }
    } catch (error: any) {
        console.error("Blueprint submission error:", error)
        return { success: false, error: error.message || "Failed to process blueprint request." }
    }
}
