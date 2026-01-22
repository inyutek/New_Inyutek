import "dotenv/config";

import { google } from "googleapis";

console.log("REFRESH:", process.env.GMAIL_REFRESH_TOKEN);
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

async function sendMail() {
 const rawMessage =
  `From: "Inyutek" <${process.env.GMAIL_SENDER_EMAIL}>\r\n` +
  `To: ${process.env.GMAIL_SENDER_EMAIL}\r\n` +
  `Subject: Gmail API Test\r\n` +
  `Content-Type: text/plain; charset="UTF-8"\r\n` +
  `\r\n` +
  `This is a test email from your backend.`;


  const encodedMessage = Buffer.from(rawMessage)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });

  console.log("✅ Test email sent");
}

sendMail().catch(console.error);
