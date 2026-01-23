import { Metadata } from 'next'
import { Hero } from './components/Hero'
import { MissionSection } from './components/MissionSection'
import { BeliefsSection } from './components/BeliefsSection'
import { DifferentiationSection } from './components/DifferentiationSection'
import { ResultsSection } from './components/ResultsSection'
import { FitSection } from './components/FitSection'
import { FAQSection } from './components/FAQSection'
import { CTASection } from './components/CTASection'
import Footer from "@/components/sections/Footer"

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
            <FAQSection />
            <CTASection />
            <Footer />
        </main>
    )
}
