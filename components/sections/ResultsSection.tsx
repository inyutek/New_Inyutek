"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useTransform, useMotionValue } from "framer-motion"

const testimonials = [
    {
        id: 1,
        quote: "We went from 12 leads a month to 200 in six months. Inyutek didn't just build a site, they rebuilt how we sell.",
        author: "Rajesh Kumar",
        role: "Founder, SaaS startup",
        initials: "RK",
        color: "bg-gray-100"
    },
    {
        id: 2,
        quote: "Our conversion rate tripled. They understood our market better than we did and proved it with numbers.",
        author: "Priya Sharma",
        role: "Marketing director, B2B",
        initials: "PS",
        color: "bg-gray-100"
    },
    {
        id: 3,
        quote: "No fluff. No promises. Just a clear plan and execution that moved the dial on our revenue.",
        author: "Marcus Chen",
        role: "CEO, Digital agency",
        initials: "MC",
        color: "bg-gray-100"
    },
    {
        id: 4,
        quote: "They mapped our entire buyer journey and found where we were losing deals. Six months later, our pipeline doubled.",
        author: "Vikram Patel",
        role: "Founder, B2B SaaS",
        initials: "VP",
        color: "bg-gray-100"
    }
]

export function ResultsSection() {
    // scrollYProgress: 0 to 1
    const scrollYProgress = useMotionValue(0)

    const containerRef = useRef<HTMLDivElement>(null)

    // Use native event listener for non-passive behavior (required to prevent default scroll)
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            e.stopPropagation() // Ensure event doesn't bubble to Lenis or other handlers

            const delta = e.deltaY * 0.001
            let newProgress = scrollYProgress.get() + delta
            newProgress = Math.max(0, Math.min(newProgress, 1))
            scrollYProgress.set(newProgress)
        }

        container.addEventListener("wheel", onWheel, { passive: false })
        return () => container.removeEventListener("wheel", onWheel)
    }, [scrollYProgress])

    // Animation Strategy: Internal Window Scroll
    // scrollYProgress 0-1 drives the stack.

    // Transforms for entering cards (Y axis):
    // Start slightly visible (peeking)
    // 95% -> 0%
    const y2 = useTransform(scrollYProgress, [0, 0.33], ["95%", "0%"])
    const y3 = useTransform(scrollYProgress, [0.33, 0.66], ["92%", "0%"])
    const y4 = useTransform(scrollYProgress, [0.66, 1.0], ["92%", "0%"])

    // Scale to look like a stack
    const s1 = useTransform(scrollYProgress, [0, 0.33], [1, 0.9])
    const s2 = useTransform(scrollYProgress, [0.33, 0.66], [1, 0.9])
    const s3 = useTransform(scrollYProgress, [0.66, 1.0], [1, 0.9])

    // Opacity
    const o1 = useTransform(scrollYProgress, [0, 0.33], [1, 0])
    const o2 = useTransform(scrollYProgress, [0.33, 0.66], [1, 0])
    const o3 = useTransform(scrollYProgress, [0.66, 1.0], [1, 0])

    return (
        <section className="bg-white py-12 sm:py-20">
            <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* LEFT: Static Header */}
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#000024] tracking-tight">Real results</h2>
                    <p className="text-sm font-normal text-gray-500">Companies that trusted us grew their lead flow</p>

                    <div className="flex items-center gap-4 mt-4">
                        <Link href="/case-studies" className="text-sm font-semibold flex items-center gap-2 group text-gray-600 hover:text-[#000024] transition-colors">
                            Read case study <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>

                {/* RIGHT: The "Window" */}
                <div className="relative w-full flex justify-center md:justify-end">

                    {/* Event Listener Container */}
                    <div
                        ref={containerRef}
                        data-lenis-prevent
                        className="relative w-full max-w-md h-[320px] bg-gray-50 rounded-2xl border border-gray-200 shadow-xl overflow-hidden cursor-default"
                    >

                        {/* Decoration: Window Controls */}
                        <div className="absolute top-0 left-0 w-full h-8 bg-gray-100 border-b border-gray-200 flex items-center gap-2 px-4 z-20 pointer-events-none">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-300"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-300"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-300"></div>
                        </div>

                        {/* Cards Container - Visual Layer */}
                        <div className="absolute inset-0 top-8 p-6 flex items-center justify-center">

                            {/* Card 1 */}
                            <motion.div
                                style={{ scale: s1, opacity: o1, zIndex: 1 }}
                                className="absolute w-full h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between origin-top"
                            >
                                <Stars />
                                <p className="text-lg text-gray-700 leading-relaxed">"{testimonials[0].quote}"</p>
                                <AuthorInfo item={testimonials[0]} />
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                style={{ y: y2, scale: s2, opacity: o2, zIndex: 2 }}
                                className="absolute w-full h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between origin-top"
                            >
                                <Stars />
                                <p className="text-lg text-gray-700 leading-relaxed">"{testimonials[1].quote}"</p>
                                <AuthorInfo item={testimonials[1]} />
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div
                                style={{ y: y3, scale: s3, opacity: o3, zIndex: 3 }}
                                className="absolute w-full h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between origin-top"
                            >
                                <Stars />
                                <p className="text-lg text-gray-700 leading-relaxed">"{testimonials[2].quote}"</p>
                                <AuthorInfo item={testimonials[2]} />
                            </motion.div>

                            {/* Card 4 */}
                            <motion.div
                                style={{ y: y4, zIndex: 4 }}
                                className="absolute w-full h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between origin-top"
                            >
                                <Stars />
                                <p className="text-lg text-gray-700 leading-relaxed">"{testimonials[3].quote}"</p>
                                <AuthorInfo item={testimonials[3]} />
                            </motion.div>

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

function AuthorInfo({ item }: { item: any }) {
    return (
        <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                {item.initials}
            </div>
            <div>
                <p className="text-sm font-bold text-[#000024]">{item.author}</p>
                <p className="text-xs text-gray-500">{item.role}</p>
            </div>
        </div>
    )
}
