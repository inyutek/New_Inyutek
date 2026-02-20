// @ts-nocheck
// Deno Edge Function — runs on Supabase, not Node.js. TS errors here are false positives.
const GOOGLE_SHEETS_BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const GOOGLE_AUTH_URL = "https://oauth2.googleapis.com/token";

// Safe base64url encoding that won't blow the stack on large arrays
function base64url(data: Uint8Array): string {
    let binary = "";
    for (let i = 0; i < data.length; i++) {
        binary += String.fromCharCode(data[i]);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function getAccessToken(saJson: string, scopes: string[]): Promise<string> {
    const sa = JSON.parse(saJson);
    const now = Math.floor(Date.now() / 1000);
    const enc = new TextEncoder();

    const hdr = base64url(enc.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
    const payload = base64url(enc.encode(JSON.stringify({
        iss: sa.client_email,
        scope: scopes.join(" "),
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

async function sendGmail(saJson: string, senderEmail: string, to: string, subject: string, body: string) {
    // Service Accounts need domain-wide delegation to send Gmail.
    // We use impersonation via the 'sub' claim in the JWT to send as the user.
    const sa = JSON.parse(saJson);
    const now = Math.floor(Date.now() / 1000);
    const enc = new TextEncoder();

    const hdr = base64url(enc.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
    const payload = base64url(enc.encode(JSON.stringify({
        iss: sa.client_email,
        sub: senderEmail, // impersonate this user
        scope: "https://www.googleapis.com/auth/gmail.send",
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
    const gmailToken = await fetch(GOOGLE_AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: `${si}.${base64url(new Uint8Array(sig))}`,
        }),
    }).then(r => r.json());

    if (!gmailToken.access_token) {
        throw new Error(`Gmail token error: ${JSON.stringify(gmailToken)}`);
    }

    const message = [
        `To: ${to}`,
        `Subject: ${subject}`,
        "Content-Type: text/html; charset=utf-8",
        "",
        body,
    ].join("\r\n");

    let encodedMessage = "";
    for (let i = 0; i < message.length; i++) {
        encodedMessage += String.fromCharCode(message.charCodeAt(i));
    }
    encodedMessage = btoa(encodedMessage)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/${senderEmail}/messages/send`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${gmailToken.access_token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw: encodedMessage }),
    });

    if (!res.ok) {
        throw new Error(`Gmail API error: ${await res.text()}`);
    }
}

Deno.serve(async (req: Request) => {
    try {
        const { record, old_record, table, type } = await req.json();
        console.log(`[append_lead_to_sheets] op='${type}' table='${table}' id=${record?.id}`);

        const saJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
        const sheetId = Deno.env.get("GOOGLE_SHEET_ID");
        if (!saJson || !sheetId) {
            throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SHEET_ID in secrets");
        }

        // Get access token for Sheets only (gmail uses its own token with impersonation)
        const accessToken = await getAccessToken(saJson, [
            "https://www.googleapis.com/auth/spreadsheets"
        ]);

        if (type === "INSERT") {
            // 1. Prepare row for Sheets
            const row = [
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

            // 2. Append to Sheets
            const sheetsUrl = `${GOOGLE_SHEETS_BASE_URL}/${sheetId}/values/Sheet1!A:N:append?valueInputOption=USER_ENTERED`;
            const sheetsRes = await fetch(sheetsUrl, {
                method: "POST",
                headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
                body: JSON.stringify({ values: [row] }),
            });
            const sheetsResult = await sheetsRes.json();
            console.log(`[append_lead_to_sheets] Sheets response:`, JSON.stringify(sheetsResult));

            // 3. Send Notification Email to Admin (non-blocking — don't crash if this fails)
            try {
                await sendGmail(saJson, "inyutek@gmail.com", "inyutek@gmail.com", `New Lead: ${record.name}`, `
                    <h2>New Contact Form Submission</h2>
                    <p><b>Name:</b> ${record.name}</p>
                    <p><b>Email:</b> ${record.email}</p>
                    <p><b>Business:</b> ${record.business_name}</p>
                    <p><b>Goal:</b> ${record.primary_goal}</p>
                    <p><b>Problem:</b> ${record.biggest_problem}</p>
                `);
                console.log(`[append_lead_to_sheets] Admin notification email sent.`);
            } catch (emailErr) {
                // Don't let email failure crash the whole function
                console.warn(`[append_lead_to_sheets] Gmail notification failed (non-critical): ${emailErr.message}`);
            }

            console.log(`[append_lead_to_sheets] INSERT handled successfully.`);

        } else if (type === "UPDATE") {
            // Check if blueprint was just marked as sent
            const wasSent = record.blueprint_sent === true && (!old_record || old_record.blueprint_sent === false);

            if (wasSent) {
                try {
                    await sendGmail(saJson, "inyutek@gmail.com", record.email, "Your Growth Blueprint - Inyutek", `
                        <div style="font-family: sans-serif; padding: 20px; color: #000024;">
                            <h2 style="color: #000024;">Hello ${record.name}!</h2>
                            <p>Thank you for requesting the Inyutek Growth Blueprint.</p>
                            <p>We've received your request and are excited to help you scale your business.</p>
                            <div style="padding: 15px; background: #f4f4f4; border-radius: 8px; margin: 20px 0;">
                                <p><strong>What's Next?</strong></p>
                                <p>One of our growth specialists will be in touch shortly to walk you through the specifics of this blueprint.</p>
                            </div>
                            <p>Best regards,<br /><strong>The Inyutek Team</strong></p>
                        </div>
                    `);
                    console.log(`[append_lead_to_sheets] Blueprint email sent to ${record.email}.`);
                } catch (emailErr) {
                    console.warn(`[append_lead_to_sheets] Blueprint email failed: ${emailErr.message}`);
                }
            }
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error("[append_lead_to_sheets] ERROR:", err.message);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
});
