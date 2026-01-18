import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/notion'
import { LegalLayout } from '@/components/LegalLayout'
import { NotionRenderer } from 'react-notion-x'

// Core styles for react-notion-x
import 'react-notion-x/src/styles.css'

export const revalidate = 60

interface PageProps {
    params: {
        slug: string
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const post = await getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <LegalLayout
            title={post.title}
            description={post.summary}
            lastUpdated={post.date}
        >
            <div className="notion-content-wrapper">
                <NotionRenderer
                    recordMap={post.recordMap}
                    fullPage={false}
                    darkMode={false}
                    disableHeader
                    className="!px-0 !w-full" // Override default notion-x padding/width to fit container
                />
            </div>
        </LegalLayout>
    )
}
