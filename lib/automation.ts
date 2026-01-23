import { sendEmail } from "./gmail";

// The specific email content requested
const BLUEPRINT_EMAIL_SUBJECT = "Your Process Blueprint — How We Work";

// Use a function to generate the email text to allow dynamic name insertion
const getBlueprintEmailText = (name: string) => `Hi ${name},

As promised, here’s a clear look at how we approach problems and execute work.

This isn’t a proposal.
It’s our internal way of thinking, shared with you.

1. We start with clarity, not tactics

Before touching tools, ads, or design, we break the situation into:

What is already working

What is leaking attention, trust, or conversions

What outcome actually matters (not vanity metrics)

Most failures happen because people skip this step.

2. We diagnose before we recommend

Every strategy comes from answering three questions:

Where does demand already exist?

Where does friction appear in the user journey?

What is the fastest path to a measurable win?

If we can’t explain why something should work, we don’t do it.

3. We design systems, not one-off actions

Our focus is on:

Repeatable processes

Clear ownership

Fewer moving parts

This is what creates consistency instead of short-term spikes.

4. Execution comes last

Only after the above is clear do we move into:

Content, funnels, ads, automation, or tech

Tracking and feedback loops

Iteration based on real signals

Execution is simple when the thinking is correct.

What happens next

If this way of working resonates:

We can discuss your context

Identify where this framework applies

Decide whether collaboration makes sense

No pressure. No rush.

This email alone should already give you clarity.

—
Inyutek`;

export async function processLeads() {
    console.log("🚀 AUTOMATION EXECUTED");

    if (!process.env.notion_id || !process.env.Leads_database_id) {
        throw new Error("Missing Notion configuration env vars");
    }

    const output = {
        processed: 0,
        errors: [] as any[],
    };

    try {
        // 1. Query Notion for rows where "Blueprint sent" is "Not started"
        const response = await fetch(
            `https://api.notion.com/v1/databases/${process.env.Leads_database_id}/query`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.notion_id}`,
                    "Notion-Version": "2022-06-28",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    filter: {
                        property: "Blueprint sent",
                        status: {
                            equals: "Not started",
                        },
                    },
                }),
            }
        );

        if (!response.ok) {
            const err = await response.json();
            console.error("Notion Query Error:", err);
            throw new Error(`Notion Query Failed: ${response.statusText}`);
        }

        const data = await response.json();
        const rows = data.results || [];

        console.log(`Found ${rows.length} rows to process.`);

        // 2. Loop through results
        for (const page of rows) {
            try {
                const props = page.properties;
                const name = props.Name?.title?.[0]?.text?.content || "there";
                const email = props.Email?.email;
                const pageId = page.id;

                if (!email) {
                    console.warn(`Skipping page ${pageId}: No email found.`);
                    continue;
                }

                console.log(`Processing: ${name} <${email}>`);

                // 3. Send Email
                await sendEmail({
                    to: email,
                    subject: BLUEPRINT_EMAIL_SUBJECT,
                    text: getBlueprintEmailText(name),
                });

                // 4. Update Notion Status
                const updateRes = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${process.env.notion_id}`,
                        "Notion-Version": "2022-06-28",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        properties: {
                            "Blueprint sent": {
                                status: {
                                    name: "Sent",
                                },
                            },
                        },
                    }),
                });

                if (!updateRes.ok) {
                    const updateErr = await updateRes.json();
                    console.error(`Failed to update Notion status for ${pageId}`, updateErr);
                    output.errors.push({ pageId, error: "Failed to update status", details: updateErr });
                } else {
                    console.log(`✅ Updated status for ${name}`);
                    output.processed++;
                }

            } catch (err: any) {
                console.error(`Error processing page ${page.id}:`, err);
                output.errors.push({ pageId: page.id, error: err.message });
            }
        }
    } catch (err: any) {
        console.error("Critical error in processLeads:", err);
        throw err;
    }

    return output;
}
