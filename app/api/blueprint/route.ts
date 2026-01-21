import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, website } = body

        // Log the attempt
        console.log('Attempty to submit to Notion:', { name, email, website })

        if (!process.env.notion_id || !process.env.Leads_database_id) {
            console.error('Missing Notion environment variables')
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            )
        }

        const response = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.notion_id}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                parent: {
                    database_id: process.env.Leads_database_id,
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
        return NextResponse.json({ success: true, id: data.id })

    } catch (error) {
        console.error('Internal Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
