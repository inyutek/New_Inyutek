import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/notion'
import { LegalLayout } from '@/components/LegalLayout'
import { NotionPage } from '@/components/NotionPage'

// Core styles for react-notion-x
import 'react-notion-x/src/styles.css'

export const revalidate = 60

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

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
                <NotionPage recordMap={post.recordMap} />
            </div>
        </LegalLayout>
    )
}
