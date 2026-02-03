"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"

const differentiators = [
    {
        title: "Conversion-first approach",
        description: "We start with your offer and funnel before we scale traffic."
    },
    {
        title: "Full-funnel ownership",
        description: "Landing pages, ads/SEO, tracking, and follow-up are connected so results don’t get lost between tools."
    },
    {
        title: "Transparent execution",
        description: "You see what we’re doing, what changed, and what improved weekly."
    },
    {
        title: "Built for local + ecommerce",
        description: "We understand both: calls & bookings for local services, and conversion rate + CPA for ecommerce."
    }
]

export function DifferentiationSection() {
    return (
        <section className="bg-white py-24 md:py-32">
            <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <Reveal>
                        <h2 className="type-h2">
                            What makes Inyutek different
                        </h2>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {differentiators.map((item, i) => (
                        <Reveal key={i} delay={i * 0.1} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h3 className="type-card-title mb-4">
                                {item.title}
                            </h3>
                            <p className="type-body">
                                {item.description}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    )
}
