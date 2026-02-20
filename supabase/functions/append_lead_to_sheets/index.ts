// @ts-nocheck
// Deno Edge Function — runs on Supabase, not Node.js. TS errors here are false positives.
const GOOGLE_SHEETS_BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const GOOGLE_AUTH_URL = "https://oauth2.googleapis.com/token";

function base64url(data: Uint8Array): string {
    const base64 = btoa(String.fromCharCode(...data));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function getAccessToken(saJson: string): Promise<string> {
    const sa = JSON.parse(saJson);
    const now = Math.floor(Date.now() / 1000);
    const enc = new TextEncoder();

    const hdr = base64url(enc.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
    const payload = base64url(enc.encode(JSON.stringify({
        iss: sa.client_email,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        aud: GOOGLE_AUTH_URL,
        exp: now + 3600,
        iat: now,
    })));

    const si = `${hdr}.${payload}`;
    const pem = sa.private_key
        .replace("-----BEGIN PRIVATE KEY-----", "")
        .replace("-----END PRIVATE KEY-----", "")
        .replace(/\n/g, "");

    const keyBytes = Uint8Array.from(atob(pem), (c: string) => c.charCodeAt(0));
    const key = await crypto.subtle.importKey(
        "pkcs8", keyBytes,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false, ["sign"]
    );
    const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, enc.encode(si));
    const jwt = `${si}.${base64url(new Uint8Array(sig))}`;

    const res = await fetch(GOOGLE_AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: jwt,
        }),
    });
    const data = await res.json();
    if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`);
    return data.access_token;
}

Deno.serve(async (req: Request) => {
    try {
        const { record, table } = await req.json();
        console.log(`[append_lead_to_sheets] table='${table}' id=${record?.id}`);

        const saJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
        const sheetId = Deno.env.get("GOOGLE_SHEET_ID");
        if (!saJson || !sheetId) {
            throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SHEET_ID in secrets");
        }

        const accessToken = await getAccessToken(saJson);

        // Column layout: A=token, B=name, C=email, D=phone, E=business_name,
        // F=website, G=business_type, H=primary_goal, I=biggest_problem,
        // J=monthly_budget, K=source, L=blueprint_sent, M=sent_at, N=created_at
        let row: (string | boolean)[];
        if (table === "contact") {
            row = [
                record.token ?? "",
                record.name ?? "",
                record.email ?? "",
                record.phone ?? "",
                record.business_name ?? "",
                record.website ?? "",
                record.business_type ?? "",
                record.primary_goal ?? "",
                record.biggest_problem ?? "",
                record.monthly_budget ?? "",
                record.source ?? "",
                record.blueprint_sent ?? false,
                record.sent_at ?? "",
                record.created_at ?? new Date().toISOString(),
            ];
        } else if (table === "leads") {
            row = [
                "",
                record.name ?? "",
                record.email ?? "",
                record.phone ?? "",
                record.business ?? "",
                "", "", "", "", "",
                "leads_table",
                false, "",
                record.created_at ?? new Date().toISOString(),
            ];
        } else {
            console.log(`Unsupported table: ${table}, skipping.`);
            return new Response(JSON.stringify({ skipped: true }), { status: 200 });
        }

        const url = `${GOOGLE_SHEETS_BASE_URL}/${sheetId}/values/Sheet1!A:N:append?valueInputOption=USER_ENTERED`;
        const sheetsRes = await fetch(url, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ values: [row] }),
        });

        if (!sheetsRes.ok) {
            throw new Error(`Sheets API (${sheetsRes.status}): ${await sheetsRes.text()}`);
        }

        console.log(`[append_lead_to_sheets] Done - appended '${table}' row.`);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("[append_lead_to_sheets] ERROR:", msg);
        return new Response(JSON.stringify({ error: msg }), { status: 500 });
    }
});
