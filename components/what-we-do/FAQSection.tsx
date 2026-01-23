"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"
import { Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "Do you work with specific industries?",
        answer: "Yes—local service businesses and ecommerce brands are our core focus. If your offer is clear and trackable, we can help."
    },
    {
        question: "How fast can we start?",
        answer: "Fast. We start with an audit, then ship the highest-impact funnel changes first."
    },
    {
        question: "Do you offer one-time projects or monthly retainers?",
        answer: "Both. Some clients start with a funnel/landing build, then move into ongoing optimization and ads/SEO."
    },
    {
        question: "What budget do I need for ads?",
        answer: "It depends on your market and margins. We’ll tell you honestly in the audit if your numbers don’t support paid ads yet."
    },
    {
        question: "How do you measure success?",
        answer: "Calls, bookings, purchases—and the metrics behind them: conversion rate, CPL/CPA, lead quality, and speed-to-lead."
    }
]

export function FAQSection() {
    return (
        <section id="faq" className="bg-[#fbfbfb] py-24 sm:py-32">
            <ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    <div className="lg:col-span-5">
                        <Reveal>
                            <span className="text-xs font-bold text-[#000024] opacity-50 uppercase tracking-[0.2em] font-mono">FAQ</span>
                            <h2 className="mt-4 text-3xl md:text-5xl font-sans font-bold text-[#000024] tracking-tight leading-[1.1]">
                                Common questions
                            </h2>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-7 flex flex-col gap-4">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} faq={faq} index={index} />
                        ))}
                    </div>

                </div>
            </ScrollReveal>
        </section>
    )
}

function FAQItem({ faq, index }: { faq: { question: string, answer: string }, index: number }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Reveal delay={index * 0.1} className="w-full">
            <div
                className="group border-b border-gray-200 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="py-6 flex justify-between items-start gap-4">
                    <h3 className={`text-lg md:text-xl font-medium transition-colors ${isOpen ? 'text-[#000024]' : 'text-[#000024]/70 group-hover:text-[#000024]'}`}>
                        {faq.question}
                    </h3>
                    <div className={`mt-1 flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        {isOpen ? (
                            <Minus className="w-5 h-5 text-[#000024]" />
                        ) : (
                            <Plus className="w-5 h-5 text-gray-400 group-hover:text-[#000024]" />
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <p className="pb-8 text-base text-gray-500 leading-relaxed font-normal">
                                {faq.answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Reveal>
    )
}
