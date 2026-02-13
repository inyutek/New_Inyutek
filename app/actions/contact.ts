"use server"

import { getSupabase } from "@/lib/supabase"
import { appendLead } from "@/lib/sheets"

// Valid enum values (must match Postgres ENUMs and form dropdown options)
const VALID_BUSINESS_TYPES = ["local_service", "ecommerce", "startup", "other"] as const
const VALID_PRIMARY_GOALS = ["more_calls", "more_bookings", "more_sales", "lower_cpa"] as const
const VALID_MONTHLY_BUDGETS = ["0-25k", "25-75k", "75k+"] as const

export async function submitContactForm(prevState: any, formData: FormData) {
    const name = formData.get("name") as string
    const businessName = formData.get("businessName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const website = formData.get("website") as string
    const businessType = formData.get("businessType") as string
    const goal = formData.get("goal") as string
    const problem = formData.get("problem") as string
    const budget = formData.get("budget") as string

    // Validate required fields
    if (!name || !email || !businessName || !businessType || !goal || !problem) {
        return {
            success: false,
            message: "Please fill in all required fields"
        }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return {
            success: false,
            message: "Please enter a valid email address"
        }
    }

    // Validate enum values
    if (!VALID_BUSINESS_TYPES.includes(businessType as any)) {
        return { success: false, message: "Invalid business type" }
    }
    if (!VALID_PRIMARY_GOALS.includes(goal as any)) {
        return { success: false, message: "Invalid primary goal" }
    }
    if (budget && !VALID_MONTHLY_BUDGETS.includes(budget as any)) {
        return { success: false, message: "Invalid budget range" }
    }

    // Generate a unique token for blueprint retrieval
    const token = crypto.randomUUID()

    try {
        // ── Step 1: Insert into Supabase (PRIMARY store) ──
        const { error: supabaseError } = await getSupabase().from("contact").insert({
            token,
            name,
            email,
            phone: phone || null,
            business_name: businessName,
            website: website || null,
            business_type: businessType,
            primary_goal: goal,
            biggest_problem: problem,
            monthly_budget: budget || null,
            source: "website_contact",
        })

        if (supabaseError) {
            console.error("Supabase insert error:", supabaseError)
            return {
                success: false,
                message: "Failed to save your details. Please try again."
            }
        }

        // ── Step 2: Sync to Google Sheets (BACKGROUND — non-blocking) ──
        try {
            if (process.env.GOOGLE_SHEET_ID) {
                await appendLead({
                    name,
                    email,
                    phone,
                    businessName,
                    website,
                    businessType,
                    primaryGoal: goal,
                    biggestProblem: problem,
                    monthlyBudget: budget,
                    source: "website_contact"
                })
                console.log("✅ Synced to Google Sheets")
            }
        } catch (sheetError) {
            console.error("Google Sheets sync error (non-blocking):", sheetError)
            // Don't fail — Supabase already has the data
        }

        // ── Step 3: Send email notification via Gmail (non-blocking) ──
        try {
            const { sendEmail } = await import("@/lib/gmail")
            await sendEmail({
                to: "inyutek@gmail.com",
                subject: `New Lead: ${name} — ${businessName}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #000024;">
                        <h2>New Contact Form Submission</h2>
                        <table style="border-collapse: collapse; width: 100%;">
                            <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${name}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${email}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${phone || 'N/A'}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Business</td><td style="padding: 8px;">${businessName}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Website</td><td style="padding: 8px;">${website || 'N/A'}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Type</td><td style="padding: 8px;">${businessType}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Goal</td><td style="padding: 8px;">${goal}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Problem</td><td style="padding: 8px;">${problem}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Budget</td><td style="padding: 8px;">${budget || 'N/A'}</td></tr>
                        </table>
                        <p style="margin-top: 16px; color: #666;">Token: ${token}</p>
                    </div>
                `,
            })

            // Update Supabase with email status
            await getSupabase().from("contact").update({
                email_sent: true,
                email_sent_at: new Date().toISOString(),
            }).eq("token", token)

            console.log("✅ Notification email sent via Gmail")
        } catch (emailError: any) {
            console.error("Email send error (non-blocking):", emailError)
            // Update Supabase with error
            await getSupabase().from("contact").update({
                email_sent: false,
                email_error: emailError?.message || "Unknown email error",
            }).eq("token", token)
        }

        return {
            success: true,
            message: "Details saved successfully",
            token,
            name
        }

    } catch (error) {
        console.error("Submission Error:", error)
        return {
            success: false,
            message: "Failed to save your details. Please try again."
        }
    }
}
