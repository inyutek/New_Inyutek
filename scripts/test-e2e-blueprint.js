const { appendLead } = require('../lib/sheets');
require('dotenv').config();

async function testFlow() {
    console.log('--- Starting End-to-End Test (Gmail Fallback) ---');

    const testData = {
        name: 'Test User Agent',
        email: 'aisurge00@gmail.com', // Sending to a known email
        website: 'https://test-inyutek.com',
        businessName: 'Inyutek Test',
        businessType: 'AI Testing',
        primaryGoal: 'Verify Fallback',
        biggestProblem: 'Resend Key Missing',
        source: 'verification-script',
    };

    try {
        // 1. Create Lead
        console.log('1. Appending lead to Google Sheets...');
        const { token } = await appendLead(testData);
        console.log('✅ Lead created. Token:', token);

        // 2. Trigger Blueprint Delivery
        console.log('2. Triggering blueprint delivery via API...');
        const response = await fetch('http://localhost:3000/api/blueprint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        const result = await response.json();
        console.log('Response:', JSON.stringify(result, null, 2));

        if (result.success) {
            console.log('✅ Success! Sent via:', result.sentVia);
        } else {
            console.error('❌ Failed:', result.error);
        }
    } catch (err) {
        console.error('❌ error during test:', err);
    }
}

testFlow();
