"use client"

import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"

export function CTASection() {
    return (
        <section className="bg-white py-24 md:py-32 relative overflow-hidden">
            <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-6 text-center text-[#000024]">
                <Reveal>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-8">
                        Want a clear plan to grow?
                    </h2>
                    <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Book a free growth audit. You’ll leave with the top 3 fixes that will improve conversions and lead quality.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-8 py-4 bg-[#000024] text-white text-lg rounded-lg font-bold shadow-xl hover:bg-[#000024]/90 transition-all hover:-translate-y-1 flex items-center justify-center min-w-[200px]"
                        >
                            Book a Free Growth Audit
                        </Link>
                        <Link
                            href="/how-we-work"
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-200 text-[#000024] text-lg rounded-lg font-semibold hover:bg-gray-50 transition-all hover:-translate-y-1 flex items-center justify-center"
                        >
                            See Our Process
                        </Link>
                    </div>
                </Reveal>
            </ScrollReveal>
        </section>
    )
}
