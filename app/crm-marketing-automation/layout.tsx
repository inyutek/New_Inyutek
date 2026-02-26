import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'CRM & Marketing Automation India | Pipeline & Lead Tracking',
    description:
        'CRM setup & marketing automation for service businesses. Speed-to-lead automation, pipeline tracking, SMS/email sequences & missed-call text-back workflows.',
}

export default function CRMAutomationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
