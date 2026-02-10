const { Resend } = require('resend');

const apiKey = 're_GB6hczX4_PhuG9T6jPyS9S7jJm7q5n6z';
const resend = new Resend(apiKey);

async function testResend() {
    try {
        const { data, error } = await resend.apiKeys.list();
        if (error) {
            console.error('Resend Error:', error);
        } else {
            console.log('Successfully authenticated! API Keys:', data);
        }
    } catch (err) {
        console.error('Request Error:', err);
    }
}

testResend();
