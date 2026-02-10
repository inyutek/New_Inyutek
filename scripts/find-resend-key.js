const { google } = require('googleapis');
require('dotenv').config();

async function findResendKey() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

    try {
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A1:Z500',
        });
        const rows = res.data.values;
        if (rows && rows.length) {
            console.log('Searching for "Resend"...');
            rows.forEach((row, index) => {
                const rowStr = JSON.stringify(row);
                if (rowStr.toLowerCase().includes('resend')) {
                    console.log(`Found in Row ${index + 1}:`, rowStr);
                }
            });
        } else {
            console.log('No data found.');
        }
    } catch (err) {
        console.error('The API returned an error: ' + err);
    }
}

findResendKey();
