"use client"

import Link from "next/link"
import Footer from "@/components/sections/Footer"
import { FAQ } from "@/components/sections/FAQ"
import { HeroSection } from "@/components/how-we-work/HeroSection"
import { WhatMakesItWork } from "@/components/how-we-work/WhatMakesItWork"
import { ProcessSection } from "@/components/how-we-work/ProcessSection"
import { DeliverablesSection } from "@/components/how-we-work/DeliverablesSection"
import { RequirementsSection } from "@/components/how-we-work/RequirementsSection"

const faqs = [
    {
        question: "How long until we see results?",
        answer: "Some improvements show quickly: landing pages + tracking. SEO compounds over time. Ads can generate leads faster once the funnel is ready."
    },
    {
        question: "Do you handle everything or work with our team?",
        answer: "Either. We can execute end-to-end or plug into your existing team."
    },
    {
        question: "What if we don't have a strong offer yet?",
        answer: "Then we start with offer clarity and a simple funnel—because weak offers don't convert, no matter the channel."
    },
    {
        question: "Do you do long-term contracts?",
        answer: "We prefer performance-based ongoing work, but we can start with a one-time funnel build."
    }
]

export default function HowWeWorkClient() {
    return (
        <div className="bg-[#fbfbfb] text-[#000024]">
            <HeroSection />
            <WhatMakesItWork />
            <ProcessSection />
            <DeliverablesSection />
            <RequirementsSection />
            <FAQ items={faqs} />

            {/* Final CTA */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="type-h2 mb-8">
                        Want a clear plan to get more leads or sales?
                    </h2>
                    <p className="type-body mb-10 max-w-2xl mx-auto">
                        Book a free growth audit. You'll leave with the top 3 fixes to improve conversions and lead quality.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-10 py-4 bg-[#000024] text-white rounded-lg font-medium text-lg shadow-xl hover:bg-[#000024]/90 transition-all hover:-translate-y-1 text-center"
                        >
                            Book a Free Growth Audit
                        </Link>
                        <Link
                            href="/about"
                            className="w-full sm:w-auto px-10 py-4 bg-white text-[#000024] border border-[#000024]/10 rounded-lg font-medium text-lg hover:bg-gray-50 transition-all hover:-translate-y-1 text-center"
                        >
                            Learn About Inyutek
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
