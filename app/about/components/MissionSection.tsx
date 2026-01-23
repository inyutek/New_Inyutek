"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"

export function MissionSection() {
    return (
        <section className="bg-white py-24 md:py-32 border-t border-gray-100">
            <ScrollReveal className="max-w-4xl mx-auto px-6 text-center">
                <Reveal>
                    <span className="text-xs font-bold text-[#000024] opacity-50 uppercase tracking-[0.2em] font-mono">
                        Our Mission
                    </span>
                    <h2 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-normal text-[#000024] leading-tight">
                        To help growing businesses stop wasting time on random tactics and build a <span className="font-bold underline decoration-blue-200 decoration-4 underline-offset-4">simple lead system</span> that’s trackable, repeatable, and scalable.
                    </h2>
                </Reveal>
            </ScrollReveal>
        </section>
    )
}
