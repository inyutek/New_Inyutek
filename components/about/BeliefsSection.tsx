"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"

const beliefs = [
    {
        title: "Clicks don't matter. Conversions do.",
        description: "Traffic is vanity. Revenue is reality. We optimize for the metric that pays your bills."
    },
    {
        title: "If it can't be tracked, it can't be improved.",
        description: "We don't guess. We implement rigorous tracking so we know exactly where every dollar goes."
    },
    {
        title: "Marketing fails when the funnel is unclear, not when the platform changes.",
        description: "Algorithms update. Fundamentals don't. A strong offer and clear funnel work on any channel."
    },
    {
        title: "Speed of execution beats perfect planning.",
        description: "We launch fast, get data, and iterate. Momentum creates more growth than endless strategy meetings."
    }
]

export function BeliefsSection() {
    return (
        <section className="bg-[#fbfbfb] py-24 md:py-32">
            <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <h2 className="type-h2 mb-6">
                                How we think about growth
                            </h2>
                            <p className="type-lead">
                                Our philosophy is simple: cut the fluff and focus on what actually drives revenue.
                            </p>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {beliefs.map((item, i) => (
                            <Reveal key={i} delay={i * 0.1} className="flex flex-col gap-4">
                                <div className="w-12 h-1 bg-[#000024]"></div>
                                <h3 className="type-card-title">
                                    {item.title}
                                </h3>
                                <p className="type-body">
                                    {item.description}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}
