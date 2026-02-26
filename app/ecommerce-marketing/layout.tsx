import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Ecommerce Marketing Services | Shopify SEO & Growth India',
    description:
        'Ecommerce marketing for DTC brands: Technical SEO, shopping campaigns, product feed optimization & retention automation. Reduce ad dependency, increase ROAS.',
}

export default function EcommerceMarketingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
