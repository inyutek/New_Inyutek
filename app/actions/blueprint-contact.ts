"use server"

import { getSupabase } from "@/lib/supabase"

export async function submitBlueprintForm(prevState: any, formData: FormData) {
    try {
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const website = formData.get("website") as string

        if (!email || !name) {
            return { success: false, error: "Name and Email are required." }
        }

        // Save to Supabase only.
        // Supabase will handle syncing to Google Sheets externally.
        const { error } = await getSupabase().from("contact").insert({
            name,
            email,
            phone: null,
            business_name: "N/A",
            website: website || null,
            business_type: "other",
            primary_goal: "more_leads",
            biggest_problem: "Blueprint Request",
            source: "blueprint-form",
        })

        if (error) {
            console.error("Supabase insert error:", error)
            return { success: false, error: "Failed to save your request. Please try again." }
        }

        console.log("✅ Blueprint request saved to Supabase")
        return { success: true }

    } catch (error: any) {
        console.error("Blueprint submission error:", error)
        return { success: false, error: error.message || "Failed to process blueprint request." }
    }
}
