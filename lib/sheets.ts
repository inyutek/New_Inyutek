/**
 * Google Sheets Utility for Lead Management
 * 
 * Uses the Google Sheets API via googleapis library with OAuth2 authentication.
 * This uses the same OAuth2 pattern as the Gmail integration.
 */

import { google } from 'googleapis';

// Sheet configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = 'Sheet1'; // Using Sheet1 as the leads sheet

// Column indices (0-based)
const COLUMNS = {
    TOKEN: 0,          // A
    NAME: 1,           // B
    EMAIL: 2,          // C
    PHONE: 3,          // D
    BUSINESS_NAME: 4,  // E
    WEBSITE: 5,        // F
    BUSINESS_TYPE: 6,  // G
    PRIMARY_GOAL: 7,   // H
    BIGGEST_PROBLEM: 8,// I
    MONTHLY_BUDGET: 9, // J
    SOURCE: 10,        // K
    BLUEPRINT_SENT: 11,// L
    SENT_AT: 12,       // M
    CREATED_AT: 13,    // N
} as const;

// Initialize Google Sheets API client using OAuth2 (same as Gmail)
function getSheetsClient() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    return google.sheets({ version: 'v4', auth: oAuth2Client });
}

export interface LeadData {
    name: string;
    email: string;
    phone?: string;
    businessName: string;
    website?: string;
    businessType: string;
    primaryGoal: string;
    biggestProblem: string;
    monthlyBudget?: string;
    source: string;
}

export interface LeadRow {
    rowIndex: number;
    token: string;
    name: string;
    email: string;
    phone: string;
    businessName: string;
    website: string;
    businessType: string;
    primaryGoal: string;
    biggestProblem: string;
    monthlyBudget: string;
    source: string;
    blueprintSent: boolean;
    sentAt: string;
    createdAt: string;
}

/**
 * Append a new lead to the Google Sheet
 * Returns the generated token
 */
export async function appendLead(data: LeadData): Promise<{ token: string }> {
    const sheets = getSheetsClient();

    // Generate secure token
    const token = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const row = [
        token,
        data.name,
        data.email,
        data.phone || '',
        data.businessName,
        data.website || '',
        data.businessType,
        data.primaryGoal,
        data.biggestProblem,
        data.monthlyBudget || '',
        data.source,
        'FALSE',  // blueprint_sent
        '',       // sent_at
        createdAt,
    ];

    await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A:N`,
        valueInputOption: 'RAW',
        requestBody: {
            values: [row],
        },
    });

    console.log(`✅ Lead appended: ${data.email} with token: ${token}`);
    return { token };
}

/**
 * Find a lead by token
 * Returns the lead data and row index, or null if not found
 */
export async function findLeadByToken(token: string): Promise<LeadRow | null> {
    const sheets = getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A:N`,
    });

    const rows = response.data.values || [];

    // Skip header row (index 0)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[COLUMNS.TOKEN] === token) {
            return {
                rowIndex: i + 1, // 1-based for Sheets API
                token: row[COLUMNS.TOKEN] || '',
                name: row[COLUMNS.NAME] || '',
                email: row[COLUMNS.EMAIL] || '',
                phone: row[COLUMNS.PHONE] || '',
                businessName: row[COLUMNS.BUSINESS_NAME] || '',
                website: row[COLUMNS.WEBSITE] || '',
                businessType: row[COLUMNS.BUSINESS_TYPE] || '',
                primaryGoal: row[COLUMNS.PRIMARY_GOAL] || '',
                biggestProblem: row[COLUMNS.BIGGEST_PROBLEM] || '',
                monthlyBudget: row[COLUMNS.MONTHLY_BUDGET] || '',
                source: row[COLUMNS.SOURCE] || '',
                blueprintSent: row[COLUMNS.BLUEPRINT_SENT] === 'TRUE',
                sentAt: row[COLUMNS.SENT_AT] || '',
                createdAt: row[COLUMNS.CREATED_AT] || '',
            };
        }
    }

    return null;
}

/**
 * Mark a lead's blueprint as sent
 * Updates blueprint_sent to TRUE and sets sent_at timestamp
 */
export async function markBlueprintSent(rowIndex: number): Promise<void> {
    const sheets = getSheetsClient();
    const sentAt = new Date().toISOString();

    // Update columns L (blueprint_sent) and M (sent_at)
    await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!L${rowIndex}:M${rowIndex}`,
        valueInputOption: 'RAW',
        requestBody: {
            values: [['TRUE', sentAt]],
        },
    });

    console.log(`✅ Blueprint marked as sent for row ${rowIndex}`);
}

/**
 * Get all leads where blueprint has not been sent
 * Used for batch processing
 */
export async function getUnsentLeads(): Promise<LeadRow[]> {
    const sheets = getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A:N`,
    });

    const rows = response.data.values || [];
    const unsentLeads: LeadRow[] = [];

    // Skip header row (index 0)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[COLUMNS.BLUEPRINT_SENT] !== 'TRUE' && row[COLUMNS.EMAIL]) {
            unsentLeads.push({
                rowIndex: i + 1, // 1-based for Sheets API
                token: row[COLUMNS.TOKEN] || '',
                name: row[COLUMNS.NAME] || '',
                email: row[COLUMNS.EMAIL] || '',
                phone: row[COLUMNS.PHONE] || '',
                businessName: row[COLUMNS.BUSINESS_NAME] || '',
                website: row[COLUMNS.WEBSITE] || '',
                businessType: row[COLUMNS.BUSINESS_TYPE] || '',
                primaryGoal: row[COLUMNS.PRIMARY_GOAL] || '',
                biggestProblem: row[COLUMNS.BIGGEST_PROBLEM] || '',
                monthlyBudget: row[COLUMNS.MONTHLY_BUDGET] || '',
                source: row[COLUMNS.SOURCE] || '',
                blueprintSent: false,
                sentAt: '',
                createdAt: row[COLUMNS.CREATED_AT] || '',
            });
        }
    }

    return unsentLeads;
}
