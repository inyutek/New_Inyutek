import { google } from "googleapis";

// Initialize Gmail API client using OAuth2
function getGmailClient() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    return google.gmail({ version: 'v1', auth: oAuth2Client });
}

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
    const gmail = getGmailClient();

    // Create email message
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
        `To: ${to}`,
        `Subject: ${utf8Subject}`,
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=utf-8",
        "",
        html,
    ];
    const message = messageParts.join("\n");

    // Encode message to base64url
    const encodedMessage = Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    try {
        const res = await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: encodedMessage,
            },
        });
        console.log(`✅ Email sent to ${to}, ID: ${res.data.id}`);
        return { success: true, id: res.data.id };
    } catch (error) {
        console.error("❌ Failed to send email:", error);
        throw error;
    }
}
