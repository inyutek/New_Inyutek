"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "Is it really free?",
        answer: "Yes. If we can’t find meaningful improvements, we’ll tell you. We use the audit to demonstrate our expertise—if you like what you hear, maybe we’ll work together."
    },
    {
        question: "Will you try to hard-sell me?",
        answer: "No. You’ll get practical recommendations either way. Our goal is to build a relationship, not force a sale."
    },
    {
        question: "Who is this best for?",
        answer: "Local services and ecommerce brands that want measurable leads/sales and can respond to inquiries fast."
    },
    {
        question: "What if I don’t have ad budget yet?",
        answer: "Then we focus on offer clarity, landing page conversion, and SEO foundations first. We can build a roadmap that matches your current stage."
    }
]

export function ContactFAQ() {
    return (
        <section className="bg-white py-24 px-6 lg:px-8">
            <ScrollReveal className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#000024] mb-4">FAQs</h2>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} />
                    ))}
                </div>
            </ScrollReveal>
        </section>
    )
}

function FAQItem({ faq }: { faq: { question: string, answer: string } }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:border-gray-300 bg-white"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-6 py-4 flex justify-between items-center bg-white"
            >
                <h3 className="text-lg font-medium text-[#000024]">{faq.question}</h3>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <Minus className="w-5 h-5 text-[#000024]" /> : <Plus className="w-5 h-5 text-gray-400" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
