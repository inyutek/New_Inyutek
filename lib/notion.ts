import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap, SearchParams } from 'notion-types'

const notion = new NotionAPI()

export interface BlogPost {
    id: string
    slug: string
    title: string
    date: string
    status: 'Published' | 'Draft'
    summary: string
}

export async function getPosts(): Promise<BlogPost[]> {
    const databaseId = process.env.NOTION_DATABASE_ID

    if (!databaseId) {
        console.warn('NOTION_DATABASE_ID is not defined in environment variables')
        return []
    }

    // We use the search endpoint to find the database and its children
    // Note: unoffical notion-client implementation differs slightly from official API
    // identifying the collection view is the most reliable way with notion-client

    // For the unofficial API, we typically fetch the page that contains the database
    // or use getPage on the database ID itself if it's a full page database

    try {
        const recordMap = await notion.getPage(databaseId)

        // Extracting rows from the recordMap
        // This part depends on how notion-client returns the collection
        // Typically we look at the collection_view

        // Simplification: We need to manually traverse the block map to find rows
        // This is complex with the unofficial API. 
        // A better approach for the *list* is often the official API, but for *content* the unofficial one is better.
        // However, sticking to the plan of using notion-client for everything:

        const collection = Object.values(recordMap.collection)[0]?.value
        const schema = collection?.schema

        // Get all blocks that are children of this collection
        const blockIds = recordMap.collection_query?.[Object.keys(recordMap.collection_query)[0]]?.[
            Object.keys(recordMap.collection_query[Object.keys(recordMap.collection_query)[0]])[0]
        ]?.collection_group_results?.blockIds || []

        const posts: BlogPost[] = []

        for (const blockId of blockIds) {
            const block = recordMap.block[blockId]?.value
            if (!block) continue

            const props = block.properties

            // Helper to get text content safely
            const getText = (propName: string) => {
                // Find property ID by name
                const propId = Object.keys(schema).find(key => schema[key].name === propName)
                if (!propId || !props?.[propId]) return ''
                return props[propId][0][0]
            }

            // Helper to get select/date safely
            const getSelect = (propName: string) => {
                const propId = Object.keys(schema).find(key => schema[key].name === propName)
                if (!propId || !props?.[propId]) return ''
                return props[propId][0][0] // simplistic, might need tuning for select types
            }

            const title = props?.title?.[0]?.[0] || 'Untitled'
            const slug = getText('Slug')
            const status = getSelect('Status')
            const summary = getText('Summary')
            // Date handling involves parsing Notion's specific date format [[ "Start Date" ]]
            const datePropId = Object.keys(schema).find(key => schema[key].name === 'Published Date')
            let date = ''
            if (datePropId && props?.[datePropId]) {
                // Notion dates in unofficial API are often stored complexly
                // usually props[propId][0][1][0][1]['start_date']
                try {
                    const dateData = props[datePropId][0][1][0][1]
                    date = dateData.start_date
                } catch (e) {
                    // Error parsing date, date remains empty
                }
            }

            // Only include published posts with a slug
            if (status?.toLowerCase() === 'published' && slug) {
                posts.push({
                    id: blockId,
                    slug,
                    title,
                    date,
                    status,
                    summary
                })
            }
        }

        // Sort by date desc
        return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
}

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
    return await notion.getPage(pageId)
}

export async function getPostBySlug(slug: string): Promise<BlogPost & { recordMap: ExtendedRecordMap } | null> {
    const posts = await getPosts()
    const post = posts.find(p => p.slug === slug)

    if (!post) return null

    const recordMap = await getPage(post.id)
    return { ...post, recordMap }
}
