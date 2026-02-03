"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"
import Link from "next/link"

export function CTASection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <ScrollReveal className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <Reveal>
                    <h2 className="type-h2 mb-8">
                        Want to know what’s blocking your leads or sales?
                    </h2>
                    <p className="type-body mb-12 max-w-2xl mx-auto">
                        Book a free growth audit and we’ll give you the top 3 fixes to improve conversions and lead quality.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <button className="px-8 py-4 bg-[#000024] text-white rounded-lg font-bold text-lg hover:bg-[#000024]/90 transition-all hover:-translate-y-1 shadow-lg shadow-gray-200">
                                Book a Free Growth Audit
                            </button>
                        </Link>
                        <Link href="/how-we-work">
                            <button className="px-8 py-4 bg-transparent border border-gray-200 text-[#000024] rounded-lg font-medium text-lg hover:bg-gray-50 transition-all hover:-translate-y-1">
                                See How We Work
                            </button>
                        </Link>
                    </div>
                </Reveal>
            </ScrollReveal>
        </section>
    )
}
