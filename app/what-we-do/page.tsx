import { Metadata } from 'next'
import { Hero } from "@/components/what-we-do/Hero"
import { WhoWeHelpSection } from "@/components/what-we-do/WhoWeHelpSection"
import { ServicesSection } from "@/components/what-we-do/ServicesSection"
import { FAQ } from "@/components/sections/FAQ"
import { CTASection } from "@/components/what-we-do/CTASection"
import Footer from "@/components/sections/Footer"

const faqs = [
    {
        question: "Do you work with specific industries?",
        answer: "Yes—local service businesses and ecommerce brands are our core focus. If your offer is clear and trackable, we can help."
    },
    {
        question: "How fast can we start?",
        answer: "Fast. We start with an audit, then ship the highest-impact funnel changes first."
    },
    {
        question: "Do you offer one-time projects or monthly retainers?",
        answer: "Both. Some clients start with a funnel/landing build, then move into ongoing optimization and ads/SEO."
    },
    {
        question: "What budget do I need for ads?",
        answer: "It depends on your market and margins. We’ll tell you honestly in the audit if your numbers don’t support paid ads yet."
    },
    {
        question: "How do you measure success?",
        answer: "Calls, bookings, purchases—and the metrics behind them: conversion rate, CPL/CPA, lead quality, and speed-to-lead."
    }
]

export const metadata: Metadata = {
    title: 'Digital Marketing Services for Local & E-commerce | Inyutek',
    description: 'Digital marketing services for local businesses & e-commerce: landing pages, ads, SEO and automation to generate calls, bookings, and sales.',
    alternates: {
        canonical: 'https://www.inyutek.com/what-we-do'
    }
}

export default function WhatWeDoPage() {
    return (
        <main>
            <Hero />
            <WhoWeHelpSection />
            <ServicesSection />
            <FAQ items={faqs} />
            <CTASection />
            <Footer />
        </main>
    )
}
