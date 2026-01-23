"use server"

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

    if (!process.env.notion_id || !process.env.form_database_id) {
        const missingVars = []
        if (!process.env.notion_id) missingVars.push("notion_id")
        if (!process.env.form_database_id) missingVars.push("form_database_id")
        return { success: false, message: `Server configuration error: Missing ${missingVars.join(", ")}` }
    }

    try {
        const response = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.notion_id}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28",
            },
            body: JSON.stringify({
                parent: { database_id: process.env.form_database_id },
                properties: {
                    "Name": {
                        title: [{ text: { content: name } }]
                    },
                    "Business Name": {
                        rich_text: [{ text: { content: businessName } }]
                    },
                    "Work Email": {
                        email: email
                    },
                    "Phone Number": {
                        phone_number: phone
                    },
                    "Website / Instagram": {
                        url: website || null
                    },
                    "Business Type": {
                        select: { name: businessType }
                    },
                    "Primary Goal": {
                        select: { name: goal }
                    },
                    "Biggest Problem": {
                        rich_text: [{ text: { content: problem } }]
                    },
                    "Monthly Marketing Budget": {
                        select: { name: budget }
                    }
                }
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error("Notion API Error:", errorData)
            return { success: false, message: errorData.message || "Failed to save to Notion" }
        }

        return { success: true, message: "Details saved successfully" }

    } catch (error) {
        console.error("Submission Error:", error)
        return { success: false, message: "Internal server error" }
    }
}
