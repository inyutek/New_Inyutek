"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"
import Link from "next/link"

export function CTASection() {
    return (
        <section className="py-32 bg-[#000024] relative overflow-hidden">
            <ScrollReveal className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <Reveal>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8">
                        Want to know what’s blocking your leads or sales?
                    </h2>
                    <p className="text-lg text-white/60 font-normal mb-12 max-w-2xl mx-auto">
                        Book a free growth audit and we’ll give you the top 3 fixes to improve conversions and lead quality.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://calendar.app.google/8HF9LdQVVndKzWC7A"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <button className="px-8 py-4 bg-white text-[#000024] rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:-translate-y-1 shadow-lg shadow-white/5">
                                Book a Free Growth Audit
                            </button>
                        </a>
                        <Link href="/how-we-work">
                            <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-lg font-medium text-lg hover:bg-white/10 transition-all hover:-translate-y-1">
                                See How We Work
                            </button>
                        </Link>
                    </div>
                </Reveal>
            </ScrollReveal>

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>
        </section>
    )
}
