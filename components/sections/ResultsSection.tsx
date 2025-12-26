"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
    {
        id: 1,
        quote: "We went from 12 leads a month to 200 in six months. Inyutek didn't just build a site, they rebuilt how we sell.",
        author: "Rajesh Kumar",
        role: "Founder, SaaS startup",
        initials: "RK",
    },
    {
        id: 2,
        quote: "Our conversion rate tripled. They understood our market better than we did and proved it with numbers.",
        author: "Priya Sharma",
        role: "Marketing director, B2B",
        initials: "PS",
    },
    {
        id: 3,
        quote: "No fluff. No promises. Just a clear plan and execution that moved the dial on our revenue.",
        author: "Marcus Chen",
        role: "CEO, Digital agency",
        initials: "MC",
    },
    {
        id: 4,
        quote: "They mapped our entire buyer journey and found where we were losing deals. Six months later, our pipeline doubled.",
        author: "Vikram Patel",
        role: "Founder, B2B SaaS",
        initials: "VP",
    }
]

export function ResultsSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAutoScrolling, setIsAutoScrolling] = useState(true)

    // Auto-scroll effect
    useEffect(() => {
        if (!isAutoScrolling) return

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length)
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
                    return (next % testimonials.length + testimonials.length) % testimonials.length
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
                    <h2 className="text-2xl md:text-3xl font-bold text-[#000024] tracking-tight">Real results</h2>
                    <p className="text-base md:text-sm font-normal text-gray-500">Companies that trusted us grew their lead flow</p>

                    <div className="flex items-center gap-4 mt-4 w-full md:w-auto">
                        <Link href="/case-studies" className="w-full md:w-auto justify-center bg-gray-100 py-4 rounded-xl md:bg-transparent md:p-0 md:text-sm font-semibold flex items-center gap-2 group text-gray-600 hover:text-[#000024] transition-colors">
                            Read case study <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>

                {/* RIGHT: The "Window" */}
                <div className="relative w-full flex justify-center md:justify-end">

                    {/* Container */}
                    <div
                        ref={containerRef}
                        data-lenis-prevent
                        className="relative w-full max-w-md h-[320px] bg-gray-50 rounded-2xl border border-gray-200 shadow-xl overflow-hidden cursor-default hover:shadow-2xl transition-shadow duration-300"
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
                            {testimonials.map((item, index) => {
                                // Calculate position relative to active index
                                // dist 0: Active
                                // dist 1: Next (Waiting at bottom)
                                // dist 2: Back hidden
                                // dist 3: Prev (Behind active)
                                const dist = (index - activeIndex + testimonials.length) % testimonials.length

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
                                        className="absolute w-full h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between origin-top"
                                    >
                                        <Stars />
                                        <p className="text-lg text-gray-700 leading-relaxed">"{item.quote}"</p>
                                        <div className="flex items-center gap-3 mt-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                {item.initials}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#000024]">{item.author}</p>
                                                <p className="text-xs text-gray-500">{item.role}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

function Stars() {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className="w-5 h-5 text-[#000024] fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
        </div>
    )
}
