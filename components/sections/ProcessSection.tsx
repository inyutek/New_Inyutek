"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Modal } from "@/components/ui/modal"
import { BlueprintForm } from "@/components/ui/blueprint-form"

const processes = [
    {
        id: 1,
        title: "Audit & Goals",
        subtitle: "We identify what’s blocking conversions",
        description: "We review your offer, funnel, tracking, and competitors—then define the KPI that matters: calls, bookings, or sales.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Funnel & Offer Strategy",
        subtitle: "We design the path from click → customer",
        description: "Messaging, landing page structure, CTAs, follow-up flow, and a channel plan (Google, social, ads) based on intent.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12h20"></path>
                <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"></path>
                <path d="M9 12v-3"></path>
                <path d="M15 12v-3"></path>
                <path d="M12 3v3"></path>
            </svg>
        )
    },
    {
        id: 3,
        title: "Build & Launch",
        subtitle: "We ship the assets and campaigns fast",
        description: "Landing pages, tracking, CRM automation, and ad/SEO execution—so leads can start coming in.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
        )
    },
    {
        id: 4,
        title: "Optimize & Scale",
        subtitle: "We improve performance every week",
        description: "We test creatives, keywords, pages, and follow-up to increase conversion rate and lower CPL—then scale what works.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
        )
    }
]

export function ProcessSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isBlueprintOpen, setIsBlueprintOpen] = useState(false)

    // Inlined BlueprintForm function


    return (
        <section id="process" className="bg-[#fbfbfb] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Header */}
                <div className="max-w-2xl mb-12 md:mb-24">
                    <span className="text-xs font-bold text-[#000024] opacity-50 uppercase tracking-[0.2em] font-mono"></span>
                    <h2 className="mt-4 text-3xl md:text-5xl font-sans font-bold text-[#000024] tracking-tight leading-[1.1]">
                        How we generate calls, bookings, and sales
                    </h2>
                    <p className="mt-6 text-xl text-gray-400 font-normal max-w-lg leading-relaxed">
                        A simple 4-step system: diagnose → build → launch → optimize. No guesswork, just measurable growth.
                    </p>

                    <Link href="/how-we-work" className="group flex items-center gap-2 mt-8 text-[#000024] font-medium hover:opacity-70 transition-all inline-flex w-fit">
                        How we Work
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Horizontal Steps Container */}
                <div className="flex flex-col md:flex-row items-stretch">
                    {processes.map((process, index) => (
                        <ScrollReveal key={process.id} enableDesktop={false} className="flex-1 flex flex-col items-center text-center">
                            <div
                                onClick={() => setActiveIndex(index)}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`
                                    relative w-full py-8 md:pt-16 md:pb-12 px-4 
                                    transition-all duration-300 cursor-pointer group flex flex-col items-center text-center
                                `}
                            >
                                {/* Horizontal Line */}
                                <motion.div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px]"
                                    initial={{ width: "3.5rem" }}
                                    animate={{
                                        width: "3.5rem",
                                        backgroundColor: activeIndex === index ? "#000024" : "#e5e7eb"
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                />

                                <div className="relative z-10 flex flex-col gap-6 items-center w-full">
                                    {/* Number */}
                                    <span
                                        className={`
                                        text-6xl md:text-8xl font-black tracking-tighter leading-none transition-all duration-300
                                        ${activeIndex === index
                                                ? "text-[#000024]"
                                                : "text-transparent"
                                            }
                                    `}
                                        style={activeIndex !== index ? {
                                            WebkitTextStroke: "1px #d1d5db"
                                        } : {}}
                                    >
                                        {String(process.id).padStart(2, '0')}
                                    </span>

                                    {/* Title */}
                                    <h3 className={`
                                    text-lg font-bold transition-colors duration-300
                                    ${activeIndex === index ? "text-[#000024]" : "text-gray-400"}
                                `}>
                                        {process.title}
                                    </h3>

                                    {/* Description - Animated Reveal */}
                                    <div className="relative overflow-hidden w-full flex justify-center">
                                        <AnimatePresence initial={false} mode="wait">
                                            {activeIndex === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <p className="text-sm font-semibold text-[#000024] leading-relaxed max-w-xs mx-auto mb-2">
                                                        {// @ts-ignore
                                                            process.subtitle}
                                                    </p>
                                                    <p className="text-sm font-normal text-gray-500 leading-relaxed max-w-xs mx-auto">
                                                        {process.description}
                                                    </p>
                                                    {/* Added subtitle for step if needed, or just keeping the single desc */}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Blueprint CTA */}
                <div className="mt-20 flex justify-center">
                    <Link href="/how-we-work">
                        <button
                            className="w-full md:w-auto px-10 py-4 bg-[#000024] text-white rounded-lg font-bold text-lg shadow-xl hover:bg-[#000024]/90 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            How we Work
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </Link>
                </div>

                <Modal isOpen={isBlueprintOpen} onClose={() => setIsBlueprintOpen(false)}>
                    <BlueprintForm onClose={() => setIsBlueprintOpen(false)} />
                </Modal>

            </div>
        </section>
    )
}
