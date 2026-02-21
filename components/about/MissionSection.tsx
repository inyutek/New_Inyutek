"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"

export function MissionSection() {
    return (
        <section className="bg-white py-24 md:py-32 border-t border-gray-100">
            <ScrollReveal className="max-w-4xl mx-auto px-6 text-center">
                <Reveal>
                    <h2 className="type-h2">
                        Our Mission
                    </h2>
                    <p className="type-body mt-6">
                        To help growing businesses stop wasting time on random tactics and build a <span className="font-bold underline decoration-blue-200 decoration-4 underline-offset-4">simple lead system</span> that's trackable, repeatable, and scalable.
                    </p>
                </Reveal>
            </ScrollReveal>
        </section>
    )
}
