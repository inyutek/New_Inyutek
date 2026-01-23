import { Metadata } from 'next'
import { Hero } from "@/components/what-we-do/Hero"
import { WhoWeHelpSection } from "@/components/what-we-do/WhoWeHelpSection"
import { ServicesSection } from "@/components/what-we-do/ServicesSection"
import { FAQSection } from "@/components/what-we-do/FAQSection"
import { CTASection } from "@/components/what-we-do/CTASection"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
    title: 'Digital Marketing Services for Local & E-commerce | Inyutek',
    description: 'Digital marketing services for local businesses & e-commerce: landing pages, ads, SEO and automation to generate calls, bookings, and sales.',
    alternates: {
        canonical: '/what-we-do' // Good practice, adjusting if base URL is needed but typically defaults are ok or handled in layout
    }
}

export default function WhatWeDoPage() {
    return (
        <main>
            <Hero />
            <WhoWeHelpSection />
            <ServicesSection />
            <FAQSection />
            <CTASection />
            <Footer />
        </main>
    )
}
