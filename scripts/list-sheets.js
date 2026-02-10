const { google } = require('googleapis');
require('dotenv').config();

async function listSheets() {
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
        const res = await sheets.spreadsheets.get({
            spreadsheetId,
        });
        const sheetNames = res.data.sheets.map(s => s.properties.title);
        console.log('Sheet Names:', sheetNames);
    } catch (err) {
        console.error('The API returned an error: ' + err);
    }
}

listSheets();
