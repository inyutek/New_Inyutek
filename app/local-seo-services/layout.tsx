import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Local SEO Services India | Map Pack Rankings | Inyutek',
    description:
        "Get your business in Google's Map Pack. Local SEO services include GBP optimization, citations, reviews & call tracking for service-based businesses in India.",
}

export default function LocalSEOLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
