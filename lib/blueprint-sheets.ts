// Re-export sheet functions for backward compatibility
export { appendLead, findLeadByToken, markBlueprintSent } from "./sheets";

interface Lead {
    email: string;
    name: string;
    token: string;
    rowIndex: number;
    [key: string]: any;
}

// Stub for getUnsentLeads (not yet implemented in sheets.ts)
export async function getUnsentLeads(): Promise<Lead[]> {
    console.warn("getUnsentLeads is not yet implemented");
    return [];
}
