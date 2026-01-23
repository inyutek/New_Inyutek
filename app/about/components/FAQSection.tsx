"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"
import { Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "Are you a full-service agency?",
        answer: "We can be, but we’re intentionally focused on what drives revenue: funnels, ads/SEO, conversion, and follow-up."
    },
    {
        question: "Do you work with small budgets?",
        answer: "We’ll be direct in the audit. If your offer or economics don’t support paid ads yet, we’ll recommend SEO + conversion improvements first."
    },
    {
        question: "Who will I work with?",
        answer: "You work directly with the team executing the strategy—no sales-only handoff."
    }
]

export function FAQSection() {
    return (
        <section className="bg-white py-24 md:py-32">
            <ScrollReveal className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Reveal>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#000024] tracking-tight mb-6">
                            Common questions
                        </h2>
                    </Reveal>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
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
                className="group border border-gray-200 rounded-xl p-6 cursor-pointer bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex justify-between items-center gap-4">
                    <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#000024]' : 'text-[#000024]/80'}`}>
                        {faq.question}
                    </h3>
                    <div className={`p-2 rounded-full bg-white border border-gray-200 transition-all duration-300 ${isOpen ? 'rotate-180 bg-gray-100' : ''}`}>
                        {isOpen ? (
                            <Minus className="w-4 h-4 text-[#000024]" />
                        ) : (
                            <Plus className="w-4 h-4 text-gray-500 group-hover:text-[#000024]" />
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
                            <p className="pt-4 text-base text-gray-600 leading-relaxed max-w-2xl">
                                {faq.answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Reveal>
    )
}
