import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Conversion Rate Optimization (CRO) | Landing Page Testing',
    description:
        'CRO services that reduce cost per lead: A/B testing, landing page optimization, heatmaps & funnel analysis. Turn more visitors into calls, bookings & sales.',
}

export default function CROLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
