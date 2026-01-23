/**
 * Centralized Environment Variable Access and Validation
 * 
 * Purpose: 
 * 1. Enforce strict type safety for environment variables.
 * 2. Fail at build/runtime immediately if critical keys are missing.
 * 3. Standardize naming conventions across the application.
 */

// Helper function to enforce env presence
function requireEnv(key: string, exampleValue: string = 'secret_...'): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(
            `❌ Missing required environment variable: ${key}\n` +
            `Please add it to your .env file or Vercel project settings.\n` +
            `Example: ${key}=${exampleValue}`
        );
    }
    return value;
}

export const env = {
    // Core Notion Integration
    NOTION_TOKEN: process.env.notion_id || requireEnv('NOTION_TOKEN', 'secret_...'),

    // Database IDs
    // The main database mostly used for blog/cms
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID || '',

    // Specific database for Leads/Blueprints
    NOTION_LEADS_DATABASE_ID: process.env.Leads_database_id || requireEnv('NOTION_LEADS_DATABASE_ID', 'database_id_...'),

    // Node Environment
    NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

// Allow conditional checks for non-critical vars
export function isProd() {
    return env.NODE_ENV === 'production';
}
