import { sendEmail } from "./gmail";
import { getUnsentLeads, markBlueprintSent, LeadRow } from "./sheets";

// The specific email content
const BLUEPRINT_EMAIL_SUBJECT = "Your Process Blueprint — How We Work";

// Generate personalized email based on lead data
const getBlueprintEmailText = (lead: LeadRow) => {
    // Map business type to friendly name
    const businessTypeMap: Record<string, string> = {
        'local_service': 'Local Service',
        'ecommerce': 'E-commerce',
        'startup': 'Startup',
        'other': 'Business'
    };

    // Map goal to friendly name
    const goalMap: Record<string, string> = {
        'more_calls': 'getting more calls',
        'more_bookings': 'increasing bookings',
        'more_sales': 'driving more sales',
        'lower_cpa': 'reducing your cost per acquisition'
    };

    const businessType = businessTypeMap[lead.businessType] || lead.businessType || 'business';
    const goalText = goalMap[lead.primaryGoal] || lead.primaryGoal || 'growing your business';

    return `Hi ${lead.name},

As promised, here's a clear look at how we approach problems and execute work.

This isn't a proposal.
It's our internal way of thinking, shared with you.

Based on what you shared about ${lead.businessName || 'your business'}, I understand your focus is on ${goalText}. Here's how we'd approach this:

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

If we can't explain why something should work, we don't do it.

3. We design systems, not one-off actions

For a ${businessType} like yours, our focus would be on:

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
};

/**
 * Send blueprint email to a specific lead
 */
export async function sendBlueprintToLead(lead: LeadRow): Promise<void> {
    if (!lead.email) {
        throw new Error("No email found for lead");
    }

    // Send Email
    await sendEmail({
        to: lead.email,
        subject: BLUEPRINT_EMAIL_SUBJECT,
        text: getBlueprintEmailText(lead),
    });

    // Mark as sent in Google Sheet
    await markBlueprintSent(lead.rowIndex);

    console.log(`✅ Blueprint sent to ${lead.name} <${lead.email}>`);
}

/**
 * Process all unsent leads and send blueprints
 * Used for batch processing (e.g., cron job)
 */
export async function processLeads() {
    console.log("🚀 AUTOMATION EXECUTED");

    const output = {
        processed: 0,
        errors: [] as any[],
    };

    try {
        // Get all leads where blueprint hasn't been sent
        const unsentLeads = await getUnsentLeads();

        console.log(`Found ${unsentLeads.length} leads to process.`);

        // Process each lead
        for (const lead of unsentLeads) {
            try {
                await sendBlueprintToLead(lead);
                output.processed++;
            } catch (err: any) {
                console.error(`Error processing lead ${lead.token}:`, err);
                output.errors.push({
                    token: lead.token,
                    email: lead.email,
                    error: err.message
                });
            }
        }
    } catch (err: any) {
        console.error("Critical error in processLeads:", err);
        throw err;
    }

    return output;
}
