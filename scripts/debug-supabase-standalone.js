require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('--- Environment Check ---');
console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('Supabase Key:', supabaseAnonKey ? 'Set' : 'Missing');
console.log('Resend Key:', process.env.RESEND_API_KEY ? 'Set' : 'Missing');
console.log('Google Sheet ID:', process.env.GOOGLE_SHEET_ID ? 'Set' : 'Missing');
console.log('-------------------------');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials. Exiting.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
    console.log('Checking Supabase tables...');

    // Check 'leads' table
    const { data: leads, error: leadsError } = await supabase.from('leads').select('*').limit(1);
    if (leadsError) {
        console.log('Table "leads":', leadsError.message);
    } else {
        console.log('Table "leads": Exists (Count:', leads.length, ')');
    }

    // Check 'contacts' table
    const { data: contacts, error: contactsError } = await supabase.from('contacts').select('*').limit(1);
    if (contactsError) {
        console.log('Table "contacts":', contactsError.message);
    } else {
        console.log('Table "contacts": Exists');
    }

    // Check 'config' table (potential key storage?)
    const { data: config, error: configError } = await supabase.from('config').select('*').limit(5);
    if (configError) {
        console.log('Table "config":', configError.message);
    } else {
        console.log('Table "config": Exists. Data:', JSON.stringify(config, null, 2));
    }
}

checkTables();
