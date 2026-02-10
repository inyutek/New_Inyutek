const { google } = require('googleapis');
require('dotenv').config();

async function readAllRows() {
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
            range: 'Sheet1!A1:Z100',
        });
        const rows = res.data.values;
        if (rows && rows.length) {
            console.log('Sheet Data:');
            rows.forEach((row, index) => {
                console.log(`Row ${index + 1}:`, JSON.stringify(row));
            });
        } else {
            console.log('No data found.');
        }
    } catch (err) {
        console.error('The API returned an error: ' + err);
    }
}

readAllRows();
