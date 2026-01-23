import { NextResponse } from 'next/server'
import { env } from '@/lib/env'
import { processLeads } from '@/lib/automation';

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, website } = body

        // Log the attempt (exclude sensitive data)
        console.log('Attempting to submit to Notion Leads DB:', { name, email })

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and Email are required' },
                { status: 400 }
            )
        }

        const response = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.NOTION_TOKEN}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                parent: {
                    database_id: env.NOTION_LEADS_DATABASE_ID,
                },
                properties: {
                    Name: {
                        title: [
                            {
                                text: {
                                    content: name,
                                },
                            },
                        ],
                    },
                    Email: {
                        email: email,
                    },
                    Business: {
                        rich_text: [
                            {
                                text: {
                                    content: website || "N/A",
                                },
                            },
                        ],
                    },
                    "Blueprint sent": {
                        status: {
                            name: "Not started"
                        }
                    }
                },
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('Notion API Error:', data)
            return NextResponse.json(
                { error: 'Failed to submit to Notion', details: data },
                { status: response.status }
            )
        }

        console.log('Notion submission successful:', data.id)

        // Trigger automation immediately
        let automationResult = null;
        try {
            automationResult = await processLeads();
            console.log("Automation Triggered:", automationResult);
        } catch (autoError) {
            console.error("Automation Trigger Failed:", autoError);
            // We do not fail the request if automation fails, as the primary submission succeeded
        }

        return NextResponse.json({
            success: true,
            id: data.id,
            automation: automationResult
        })

    } catch (error) {
        console.error('Internal Error:', error)
        // If it's our custom env error, strictly surface it in dev, generic in prod? 
        // For now, general error to avoid leaking details in responses.
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
