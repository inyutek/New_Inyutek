"use server"

import { getSupabase } from "@/lib/supabase"

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

        // ── Step 2: Confirmation ──
        // (Note: Email notifications are now handled automatically by Supabase Edge Functions)

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
