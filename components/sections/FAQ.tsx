"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal } from "@/components/motion-presets"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
    question: string
    answer: string
}

interface FAQProps {
    title?: string
    items: FAQItem[]
    className?: string
}

export function FAQ({ title = "Common questions", items, className }: FAQProps) {
    return (
        <section className={cn("bg-[#fbfbfb] py-24 sm:py-32", className)} id="faq">
            <ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    <div className="lg:col-span-4">
                        <Reveal>
                            <h2 className="text-2xl md:text-3xl font-sans font-bold text-[#000024] tracking-tight leading-[1.1]">
                                {title}
                            </h2>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-8 flex flex-col">
                        {items.map((item, index) => (
                            <FAQItemComponent key={index} item={item} index={index} />
                        ))}
                    </div>

                </div>
            </ScrollReveal>
        </section>
    )
}

function FAQItemComponent({ item, index }: { item: FAQItem, index: number }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Reveal delay={index * 0.1} className="w-full">
            <div
                className="group border-b border-gray-200 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="py-6 flex justify-between items-start gap-8">
                    <h3 className="text-lg md:text-xl font-medium text-[#000024] leading-snug">
                        {item.question}
                    </h3>
                    <div className={`mt-1 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        {/* Using the same icon but rotating it for open state looks cleaner often, but let's stick to plus/minus if desired or just plus rotating */}
                        {isOpen ? (
                            <Minus className="w-5 h-5 text-[#000024]" />
                        ) : (
                            <Plus className="w-5 h-5 text-gray-400 group-hover:text-[#000024] transition-colors" />
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
                            <p className="pb-8 text-base text-gray-500 leading-relaxed font-normal max-w-3xl">
                                {item.answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Reveal>
    )
}
