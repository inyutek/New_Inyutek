import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Google Ads Management India | PPC Agency & ROI Tracking',
    description:
        'ROI-focused Google Ads management for local businesses & ecommerce. We track CPL, optimize campaigns & reduce wasted spend. Certified Google Partner approach.',
}

export default function GoogleAdsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
