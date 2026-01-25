"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"
import { ChevronDown, Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "What makes Inyutek different from other agencies?",
        answer: "Most agencies focus on deliverables like \"a website\" or \"social posts.\" We focus on outcomes: leads, sales, and ROI. We don't just build it; we make sure it converts."
    },
    {
        question: "How long does it take to see results?",
        answer: "It depends on your starting point. Our \"Audit & Diagnose\" phase happens quickly. For paid campaigns, results can be immediate. For SEO and organic growth, it's a steady build over 3-6 months."
    },
    {
        question: "Do you work with specific industries?",
        answer: "We specialize in businesses that need high-quality leads. Whether you're B2B, SaaS, or high-ticket service providers, our funnel strategies are adaptable to your market."
    },
    {
        question: "What is your pricing model?",
        answer: "We don't do cookie-cutter packages. Our pricing is tailored to your specific goals and the scale of the implementation. Book a call to get a custom quote."
    },
    {
        question: "Do you offer ongoing support after launch?",
        answer: "Yes. Our \"Optimize & Scale\" phase is all about continuous improvement. We monitor performance, test new angles, and ensure your system keeps growing with you."
    }
]

export function FAQSection() {
    return (
        <section id="faq" className="bg-[#fbfbfb] py-24 sm:py-32">
            <ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Header */}
                    <div className="lg:col-span-5">
                        <Reveal>
                            <span className="text-xs font-bold text-[#000024] opacity-50 uppercase tracking-[0.2em] font-mono">FAQ</span>
                            <h2 className="type-h2 mt-4">
                                Common Questions
                            </h2>
                            <p className="type-lead mt-6">
                                Everything you need to know about how we work and what to expect.
                            </p>
                        </Reveal>
                    </div>

                    {/* FAQ List */}
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
