"use server"

import { appendLead } from "@/lib/sheets"

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

    if (!process.env.GOOGLE_SHEET_ID) {
        console.error("Missing GOOGLE_SHEET_ID environment variable")
        return {
            success: false,
            message: "Server configuration error"
        }
    }

    try {
        // Append lead to Google Sheet
        const { token } = await appendLead({
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
