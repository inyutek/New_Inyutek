import { resend } from "@/lib/resend"

interface SendLeadEmailProps {
    name: string
    email: string
    phone: string
    businessName: string
    website: string
    businessType: string
    goal: string
    problem: string
    budget: string
}

export async function sendLeadEmail(data: SendLeadEmailProps) {
    const htmlContent = `
        <h1>New Lead Received</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Business Name:</strong> ${data.businessName}</p>
        <p><strong>Website:</strong> ${data.website}</p>
        <p><strong>Business Type:</strong> ${data.businessType}</p>
        <p><strong>Goal:</strong> ${data.goal}</p>
        <p><strong>Biggest Problem:</strong> ${data.problem}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
    `

    // Try Resend first
    if (process.env.RESEND_API_KEY) {
        try {
            await resend.emails.send({
                from: "Inyutek <onboarding@resend.dev>",
                to: ["mj897535@gmail.com"],
                subject: "New Lead from Inyutek Website",
                html: htmlContent
            })
            console.log("Lead email sent successfully via Resend.")
            return
        } catch (error) {
            console.error("Failed to send lead email via Resend, falling back to Gmail:", error)
        }
    }

    // Fallback to Gmail
    try {
        const { sendEmail } = await import("@/lib/gmail");
        await sendEmail({
            to: "mj897535@gmail.com",
            subject: "New Lead from Inyutek Website",
            html: htmlContent
        });
        console.log("Lead email sent successfully via Gmail.")
    } catch (error) {
        console.error("Failed to send lead email via Gmail:", error)
    }
}
