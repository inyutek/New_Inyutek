"use client"

import { Reveal } from "@/components/motion-presets"
import { LucideIcon, LayoutTemplate, GitMerge, Hash } from "lucide-react"

const features = [
    {
        icon: LayoutTemplate, // Placeholder for "Leads come first"
        text: "Leads come first. Everything else serves that."
    },
    {
        icon: GitMerge, // Placeholder for "Strategy and execution"
        text: "Strategy and execution happen together, not in silos."
    },
    {
        icon: Hash, // Placeholder for "We show you the numbers"
        text: "We show you the numbers. No smoke, no spin."
    }
]

export function WhySection() {
    return (
        <section className="py-32 bg-[#fbfbfb]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT: Content */}
                    <div className="flex flex-col gap-8">
                        <Reveal>
                            <span className="text-sm font-semibold text-gray-900">Why</span>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#000024] tracking-tight leading-[1.1]">
                                We think differently about growth
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="text-sm font-normal text-gray-500 max-w-md leading-relaxed">
                                Most agencies sell services. We sell results. We don't move on until your leads move the needle.
                            </p>
                        </Reveal>

                        <div className="flex flex-col gap-6 mt-4">
                            {features.map((item, i) => (
                                <Reveal key={i} delay={0.3 + (i * 0.1)}>
                                    <div className="flex items-start gap-4 h-full  group">
                                        <div className="flex-shrink-0 w-6 h-6 mt-1 text-gray-400 group-hover:text-[#000024] transition-colors">
                                            <item.icon className="w-full h-full" strokeWidth={1.5} />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {item.text}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>


                    </div>

                    {/* RIGHT: Image Placeholder */}
                    <Reveal delay={0.2} className="w-full h-full">
                        <div className="relative aspect-square md:aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
                            {/* Placeholder Icon */}
                            <div className="w-24 h-24 text-gray-300">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                </svg>
                            </div>
                        </div>
                    </Reveal>

                </div>
            </div>
        </section>
    )
}
