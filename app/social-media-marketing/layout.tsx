import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Social Media Marketing India | Meta Ads & Lead Generation',
    description:
        'Social media marketing that drives inquiries & sales. Meta ads, Instagram marketing & DM automation with CRM integration. Move beyond vanity metrics to results.',
}

export default function SocialMediaLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
