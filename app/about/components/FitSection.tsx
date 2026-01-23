"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"
import { Check, X } from "lucide-react"

const bestFit = [
    "You want more calls, bookings, leads, or sales (not vanity metrics)",
    "You can respond to leads quickly (especially local services)",
    "You’re ready to track outcomes and iterate weekly"
]

const notFit = [
    "You want overnight miracles or “just run ads” without fixing the funnel",
    "You don’t have the capacity to handle new leads",
    "You refuse to measure conversions"
]

export function FitSection() {
    return (
        <section className="bg-[#fbfbfb] py-24 md:py-32">
            <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Reveal>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#000024] tracking-tight">
                            Who we work best with
                        </h2>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Best Fit */}
                    <Reveal className="h-full">
                        <div className="h-full bg-white p-8 md:p-12 rounded-3xl border border-green-100 shadow-xl shadow-green-900/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                            <h3 className="text-2xl font-bold text-[#000024] mb-8 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Check className="w-5 h-5" />
                                </span>
                                Best fit if:
                            </h3>
                            <ul className="space-y-6">
                                {bestFit.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-600 font-medium leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    {/* Not a Fit */}
                    <Reveal className="h-full" delay={0.2}>
                        <div className="h-full bg-white p-8 md:p-12 rounded-3xl border border-red-100 shadow-xl shadow-red-900/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-red-400"></div>
                            <h3 className="text-2xl font-bold text-[#000024] mb-8 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                    <X className="w-5 h-5" />
                                </span>
                                Not a fit if:
                            </h3>
                            <ul className="space-y-6">
                                {notFit.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                        <span className="text-gray-600 font-medium leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </ScrollReveal>
        </section>
    )
}
