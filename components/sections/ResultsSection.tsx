"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const results = [
    {
        id: 1,
        title: "Conversion Rate (CVR)",
        metric: "Visitor → Lead",
        description: "The % of traffic that actually turns into a qualified lead.",
        icon: (
            <svg className="w-6 h-6 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20V10"></path>
                <path d="M18 20V4"></path>
                <path d="M6 20v-4"></path>
            </svg>
        )
    },
    {
        id: 2,
        title: "Cost Per Lead (CPL) / CPA",
        metric: "Paid Efficiency",
        description: "What you pay to generate a lead or sale—and how we reduce it over time.",
        icon: (
            <svg className="w-6 h-6 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        )
    },
    {
        id: 3,
        title: "Lead Quality",
        metric: "Qualified vs Junk",
        description: "Not just volume—are they qualified, ready-to-buy, and in your service area/budget?",
        icon: (
            <svg className="w-6 h-6 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        )
    },
    {
        id: 4,
        title: "Speed-to-Lead & Follow-Up Rate",
        metric: "Response Time",
        description: "Most local leads choose whoever responds first. We build systems that respond fast.",
        icon: (
            <svg className="w-6 h-6 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
        )
    },
    {
        id: 5,
        title: "Funnel Drop-Offs",
        metric: "Leaks",
        description: "Where people abandon: landing page, form, checkout, or booking step—then we fix the leak.",
        icon: (
            <svg className="w-6 h-6 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
        )
    },
    {
        id: 6,
        title: "Pipeline Visibility",
        metric: "CRM Tracking",
        description: "You can see where leads came from and what happened next—no blind spending.",
        icon: (
            <svg className="w-6 h-6 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
        )
    }
]

export function ResultsSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAutoScrolling, setIsAutoScrolling] = useState(true)

    // Auto-scroll effect
    useEffect(() => {
        if (!isAutoScrolling) return

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % results.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [isAutoScrolling])

    // Manual scroll handler
    const containerRef = useRef<HTMLDivElement>(null)
    const lastScrollTime = useRef(0)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            const now = Date.now()
            if (now - lastScrollTime.current < 500) return // Debounce

            if (Math.abs(e.deltaY) > 20) {
                lastScrollTime.current = now
                setIsAutoScrolling(false) // Pause auto-scroll on interaction

                // Resume auto-scroll after 5 seconds of inactivity
                setTimeout(() => setIsAutoScrolling(true), 5000)

                const direction = e.deltaY > 0 ? 1 : -1
                setActiveIndex((prev) => {
                    const next = prev + direction
                    // Handle modulo for negative numbers correctly
                    return (next % results.length + results.length) % results.length
                })
            }
        }

        container.addEventListener("wheel", onWheel, { passive: false })
        return () => container.removeEventListener("wheel", onWheel)
    }, [])

    return (
        <section className="bg-white py-12 sm:py-20">
            <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* LEFT: Static Header */}
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#000024] tracking-tight">What we measure and improve</h2>
                    <p className="text-base md:text-sm font-normal text-gray-500">
                        No inflated promises — just the metrics that decide whether marketing is profitable.
                    </p>

                    <div className="flex flex-col gap-3 mt-2">
                        <p className="font-semibold text-sm">Every engagement includes:</p>
                        {[
                            "A funnel map (your exact path to booked calls)",
                            "A conversion audit scorecard (top leaks + fixes)",
                            "A simple dashboard (traffic, leads, CPL, bookings)"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#000024]"></span>
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 w-full md:w-auto">
                        <p className="font-bold text-[#000024] text-sm">Want an audit of your funnel?</p>
                        <Link href="/contact" className="w-full md:w-auto justify-center bg-[#000024] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 group transition-all hover:-translate-y-1">
                            Get your free growth audit <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>

                {/* RIGHT: The "Window" */}
                <div className="relative w-full flex justify-center md:justify-end">

                    {/* Container */}
                    <ScrollReveal enableDesktop={false} className="w-full max-w-md">
                        <div
                            ref={containerRef}
                            data-lenis-prevent
                            className="relative w-full h-[320px] bg-gray-50 rounded-2xl border border-gray-200 shadow-xl overflow-hidden cursor-default hover:shadow-2xl transition-shadow duration-300"
                            onMouseEnter={() => setIsAutoScrolling(false)}
                            onMouseLeave={() => setIsAutoScrolling(true)}
                        >

                            {/* Decoration: Window Controls */}
                            <div className="absolute top-0 left-0 w-full h-8 bg-gray-100 border-b border-gray-200 flex items-center gap-2 px-4 z-30 pointer-events-none">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-300"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-300"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-300"></div>
                            </div>

                            {/* Cards Container */}
                            <div className="absolute inset-0 top-8 p-6 flex items-center justify-center">
                                {results.map((item, index) => {
                                    // Calculate position relative to active index
                                    // dist 0: Active
                                    // dist 1: Next (Waiting at bottom)
                                    // dist 2: Back hidden
                                    // dist 3: Prev (Behind active)
                                    const dist = (index - activeIndex + results.length) % results.length

                                    let zIndex = 0
                                    let y = "0%"
                                    let scale = 1
                                    let opacity = 1
                                    let transitionDuration = 0.5

                                    if (dist === 0) {
                                        // Active Card
                                        zIndex = 10
                                        y = "0%"
                                        scale = 1
                                        opacity = 1
                                    } else if (dist === 1) {
                                        // Next Card (Waiting)
                                        zIndex = 20 // Must be higher than active to slide over
                                        y = "100%"
                                        scale = 1
                                        opacity = 1
                                        transitionDuration = 0 // Instant reset to bottom when becoming 'Next'
                                    } else if (dist === 3) {
                                        // Previous Card (Just covered)
                                        zIndex = 5
                                        y = "0%"
                                        scale = 0.95
                                        opacity = 1
                                    } else {
                                        // Dist 2 (Way back)
                                        zIndex = 1
                                        y = "0%"
                                        scale = 0.9
                                        opacity = 0.5
                                        // When transitioning from Prev (3) -> Hidden (2), animate smooth
                                    }

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={false}
                                            animate={{
                                                y,
                                                scale,
                                                opacity: dist === 2 ? 0 : 1, // Hide the backmost card to avoid z-fighting visual glitches
                                                zIndex
                                            }}
                                            transition={{
                                                duration: dist === 1 ? 0 : 0.5, // Instant reset for 'Next' position
                                                ease: "easeInOut"
                                            }}
                                            className="absolute w-full h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-start gap-4 origin-top"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#000024] text-lg">{item.title}</h4>
                                                    <div className="text-xs font-mono uppercase tracking-wide text-gray-400">{item.metric}</div>
                                                </div>
                                            </div>

                                            <p className="text-base text-gray-600 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    )
                                })}
                            </div>

                        </div>
                    </ScrollReveal>
                </div>

            </div>
        </section>
    )
}


