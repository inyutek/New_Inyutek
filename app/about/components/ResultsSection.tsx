"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"

const deliverables = [
    {
        title: "A conversion audit scorecard",
        icon: (
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "A funnel map (click → lead → booked call / purchase)",
        icon: (
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        )
    },
    {
        title: "A tracking checklist (forms, calls, WhatsApp, purchases)",
        icon: (
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        )
    },
    {
        title: "A 90-day growth plan (what to build first, what to scale next)",
        icon: (
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        )
    }
]

export function ResultsSection() {
    return (
        <section className="bg-[#fbfbfb] py-24 md:py-32 text-[#000024]">
            <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <Reveal>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight text-[#000024]">
                                How we create results without guessing
                            </h2>
                            <p className="text-lg text-gray-500 leading-relaxed mb-6">
                                Because we’re early-stage, we focus on process + deliverables you can evaluate immediately.
                            </p>
                            <p className="font-semibold text-[#000024] text-xl">
                                You’ll receive:
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {deliverables.map((item, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="flex items-center gap-4 bg-white border border-gray-100 p-5 rounded-xl hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                        <div className="w-6 h-6">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <span className="text-lg font-medium text-[#000024]">
                                        {item.title}
                                    </span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}
