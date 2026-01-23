import { Metadata } from 'next'
import { Hero } from './components/Hero'
import { MissionSection } from './components/MissionSection'
import { BeliefsSection } from './components/BeliefsSection'
import { DifferentiationSection } from './components/DifferentiationSection'
import { ResultsSection } from './components/ResultsSection'
import { FitSection } from './components/FitSection'
import { FAQ } from "@/components/sections/FAQ"
import { CTASection } from './components/CTASection'
import Footer from "@/components/sections/Footer"

const faqs = [
    {
        question: "Are you a full-service agency?",
        answer: "We can be, but we’re intentionally focused on what drives revenue: funnels, ads/SEO, conversion, and follow-up."
    },
    {
        question: "Do you work with small budgets?",
        answer: "We’ll be direct in the audit. If your offer or economics don’t support paid ads yet, we’ll recommend SEO + conversion improvements first."
    },
    {
        question: "Who will I work with?",
        answer: "You work directly with the team executing the strategy—no sales-only handoff."
    }
]

export const metadata: Metadata = {
    title: 'About Inyutek | Digital Marketing & Lead Generation Agency',
    description: 'Learn about Inyutek, a lead generation agency helping local businesses and e-commerce brands grow through funnels, ads, SEO, and automation.',
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <MissionSection />
            <BeliefsSection />
            <DifferentiationSection />
            <ResultsSection />
            <FitSection />
            <FAQ items={faqs} />
            <CTASection />
            <Footer />
        </main>
    )
}
