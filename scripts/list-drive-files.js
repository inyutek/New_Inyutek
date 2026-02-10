const { google } = require('googleapis');
require('dotenv').config();

async function listAllFiles() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    try {
        const res = await drive.files.list({
            pageSize: 100,
            fields: 'nextPageToken, files(id, name, mimeType)',
        });
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id}) - ${file.mimeType}`);
            });
        } else {
            console.log('No files found.');
        }
    } catch (err) {
        console.error('The API returned an error: ' + err);
    }
}

listAllFiles();
