const { google } = require('googleapis');
require('dotenv').config();

async function getSheetData() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    try {
        // First, list all sheets
        const res = await sheets.spreadsheets.get({
            spreadsheetId,
        });

        console.log('Sheets found:', res.data.sheets.map(s => s.properties.title));

        for (const sheet of res.data.sheets) {
            const title = sheet.properties.title;
            const data = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `${title}!A1:Z10`,
            });

            console.log(`\n--- Sheet: ${title} ---`);
            if (data.data.values) {
                data.data.values.forEach(row => console.log(row.join(' | ')));
            } else {
                console.log('No data found.');
            }
        }
    } catch (err) {
        console.error('The API returned an error: ' + err);
    }
}

getSheetData();
