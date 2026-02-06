/**
 * OAuth2 Refresh Token Generator
 * 
 * This script generates a refresh token with both Gmail and Google Sheets scopes.
 * 
 * Usage:
 * 1. Run: node scripts/get-refresh-token.js
 * 2. Open the URL printed in your browser
 * 3. Login and authorize
 * 4. Copy the authorization code from the redirect URL
 * 5. Paste it when prompted
 * 6. Copy the refresh token to your .env file
 */

const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config();

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;

// Scopes needed for both Gmail and Google Sheets
const SCOPES = [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/spreadsheets'
];

// For web app, we need to use the configured redirect URI
// Using OOB flow for easier local development
const REDIRECT_URI = 'https://www.inyutek.com';

async function main() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.error('❌ Missing GMAIL_CLIENT_ID or GMAIL_CLIENT_SECRET in .env');
        process.exit(1);
    }

    console.log('\n🔐 OAuth2 Refresh Token Generator\n');
    console.log('📋 Client ID:', CLIENT_ID);
    console.log('📋 Scopes:', SCOPES.join(', '));
    console.log('📋 Redirect URI:', REDIRECT_URI);
    console.log('\n' + '='.repeat(60) + '\n');

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    // Generate the auth URL
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent' // Force to get refresh token
    });

    console.log('📌 Step 1: Open this URL in your browser:\n');
    console.log(authUrl);
    console.log('\n📌 Step 2: Login with your Google account and authorize');
    console.log('\n📌 Step 3: After authorization, you will be redirected to:');
    console.log('   ' + REDIRECT_URI + '?code=AUTHORIZATION_CODE');
    console.log('\n📌 Step 4: Copy the "code" parameter from the URL');
    console.log('\n' + '='.repeat(60) + '\n');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Paste the authorization code here: ', async (code) => {
        try {
            // Decode the code if URL encoded
            const decodedCode = decodeURIComponent(code.trim());

            console.log('\n⏳ Exchanging code for tokens...\n');

            const { tokens } = await oauth2Client.getToken(decodedCode);

            console.log('✅ Success! Here are your tokens:\n');
            console.log('='.repeat(60));
            console.log('\n🔑 REFRESH TOKEN (add this to your .env file):\n');
            console.log('GMAIL_REFRESH_TOKEN=' + tokens.refresh_token);
            console.log('\n' + '='.repeat(60));
            console.log('\n📋 Access Token (FYI - auto-refreshes, no need to save):');
            console.log(tokens.access_token?.substring(0, 50) + '...');
            console.log('\n✅ Copy the GMAIL_REFRESH_TOKEN line above to your .env file');

        } catch (error) {
            console.error('\n❌ Error exchanging code:', error.message);
            if (error.response?.data) {
                console.error('Details:', JSON.stringify(error.response.data, null, 2));
            }
        } finally {
            rl.close();
        }
    });
}

main();
