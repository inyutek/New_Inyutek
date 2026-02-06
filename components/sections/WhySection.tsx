"use client"

import { Reveal } from "@/components/motion-presets"
import { LucideIcon, LayoutTemplate, GitMerge, Hash } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const features = [
    {
        icon: LayoutTemplate,
        title: "Conversion-first, not channel-first",
        text: "We start with your offer + landing flow. Channels come second because clicks don’t pay bills."
    },
    {
        icon: GitMerge,
        title: "Full-funnel ownership",
        text: "Ads/SEO + landing pages + tracking + follow-up. No silos, no finger-pointing."
    },
    {
        icon: Hash,
        title: "Speed and execution",
        text: "We build fast, launch early, and improve weekly so you get momentum instead of long timelines."
    },
    {
        icon: Hash,
        title: "Transparent reporting",
        text: "You’ll see what we changed, what improved, and what we’re testing next."
    },
    {
        icon: Hash,
        title: "Built for local + e-commerce",
        text: "Calls, bookings, and lead quality for local services. Conversion and revenue metrics for e-commerce."
    }
]

export function WhySection() {
    return (
        <section className="py-32 bg-[#fbfbfb]">
            <ScrollReveal enableDesktop={false} className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT: Content */}
                    <div className="flex flex-col gap-8">
                        <Reveal>
                            <span className="text-sm font-semibold text-gray-900"></span>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h2 className="type-h2">
                                Why Inyutek
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="type-body max-w-md">
                                You’re not hiring us for “posts” or “ads.” You’re hiring a system that produces measurable leads and sales.
                            </p>
                        </Reveal>

                        <div className="flex flex-col gap-6 mt-4">
                            {features.map((item, i) => (
                                <Reveal key={i} delay={0.3 + (i * 0.1)}>
                                    <div className="flex items-start gap-4 h-full  group">
                                        <div className="flex-shrink-0 w-6 h-6 mt-1 text-gray-400 group-hover:text-[#000024] transition-colors">
                                            <item.icon className="w-full h-full" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 className="type-card-title mb-1">{item.title}</h3>
                                            <p className="type-body">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.6}>
                            <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="type-body">
                                    <span className="font-bold text-[#000024]">Our rule:</span> if we can’t identify clear conversion leaks and a practical action plan in the first audit, you don’t move forward.
                                </p>
                            </div>
                        </Reveal>


                    </div>

                    {/* RIGHT: Image Placeholder */}
                    <Reveal delay={0.2} className="w-full">
                        <div className="relative aspect-square md:aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
                            {/* Image */}
                            <img
                                src="/services/Why Inyutek.jpg"
                                alt="Why Inyutek"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Reveal>

                </div>
            </ScrollReveal>
        </section>
    )
}
