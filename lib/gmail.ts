import { google } from "googleapis";

// Initialize OAuth2 Client outside the function for reuse implies we might cache it, 
// but env vars are needed. Best to init lazily or just inside for safety if envs change (unlikely).
// Following the pattern from send-test-mail.js but making it robust.

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

export interface SendEmailParams {
    to: string;
    subject: string;
    text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailParams) {
    try {
        const gmail = getGmailClient();

        // Construct raw message
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
