"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

// Constants shared
const PHONE_NUMBER = "9112235551"
const WHATSAPP_NUMBER = "919112235551"
const WHATSAPP_TEXT = encodeURIComponent("Hi Inyutek team, I want to schedule a meeting.")
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`

export function ContactHero() {
    const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const element = document.getElementById("booking-form")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section className="bg-[#fbfbfb] pt-32 pb-20 px-6 lg:px-8">
            <ScrollReveal className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="type-h1 mb-6">
                        Book your free growth audit
                    </h1>

                    <p className="type-body max-w-2xl mx-auto mb-10">
                        Walk away with a clear plan to improve calls, bookings, or sales plus the top conversion leaks holding your funnel back.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#booking-form"
                            onClick={scrollToForm}
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#000024] text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition-all hover:-translate-y-1"
                        >
                            Schedule a Call
                        </a>
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#000024] border border-[#000024]/20 rounded-lg font-medium hover:bg-gray-50 transition-all hover:-translate-y-1"
                        >
                            Message on WhatsApp
                        </a>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Free audit
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>Clear priorities</span>
                        <span className="text-gray-300">•</span>
                        <span>Zero pressure</span>
                    </div>
                </motion.div>
            </ScrollReveal>
        </section>
    )
}
