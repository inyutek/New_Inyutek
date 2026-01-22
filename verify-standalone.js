require("dotenv/config");
const { google } = require("googleapis");

// --- 1. Email Logic (Mirrors lib/gmail.ts) ---

const getGmailClient = () => {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    return google.gmail({ version: "v1", auth: oAuth2Client });
};

async function sendEmail({ to, subject, text }) {
    try {
        const gmail = getGmailClient();
        const rawMessage =
            `From: "Inyutek" <${process.env.GMAIL_SENDER_EMAIL}>\r\n` +
            `To: ${to}\r\n` +
            `Subject: ${subject}\r\n` +
            `Content-Type: text/plain; charset="UTF-8"\r\n` +
            `\r\n` +
            `${text}`;

        const encodedMessage = Buffer.from(rawMessage)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        const res = await gmail.users.messages.send({
            userId: "me",
            requestBody: { raw: encodedMessage },
        });

        console.log(`✅ Email sent to ${to}, ID: ${res.data.id}`);
        return { success: true, id: res.data.id };
    } catch (error) {
        console.error("❌ Failed to send email:", error);
        throw error;
    }
}

// --- 2. Automation Logic (Mirrors lib/automation.ts) ---

const BLUEPRINT_EMAIL_SUBJECT = "Your Process Blueprint — How We Work";

const getBlueprintEmailText = (name) => `Hi ${name},

As promised, here’s a clear look at how we approach problems and execute work.
(Truncated for verification script...)
—
Inyutek`;

async function processLeads() {
    console.log("🚀 Starting verification script...");
    if (!process.env.notion_id || !process.env.Leads_database_id) {
        throw new Error("Missing Notion configuration env vars");
    }

    // 1. Query Notion
    console.log("🔍 Querying Notion for 'Not started' leads...");
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
                    status: { equals: "Not started" },
                },
            }),
        }
    );

    if (!response.ok) {
        const err = await response.json();
        throw new Error(`Notion Query Failed: ${JSON.stringify(err)}`);
    }

    const data = await response.json();
    const rows = data.results || [];
    console.log(`Found ${rows.length} rows to process.`);

    // 2. Loop
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

            // 4. Update Status
            console.log(`Updating status for ${pageId}...`);
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
                            status: { name: "Sent" },
                        },
                    },
                }),
            });

            if (!updateRes.ok) {
                console.error(`Failed to update Notion status for ${pageId}`, await updateRes.json());
            } else {
                console.log(`✅ Updated status to 'Sent' for ${name}`);
            }

        } catch (err) {
            console.error(`Error processing page ${page.id}:`, err);
        }
    }
}

processLeads().catch(console.error);
