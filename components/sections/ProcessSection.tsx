"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"

const processes = [
    {
        id: 1,
        title: "Audit and diagnose",
        description: "We start by looking at what's broken. Traffic patterns, conversion rates, messaging gaps—we find where money is leaking out of your funnel.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Design the funnel",
        description: "Build a clear path for your users. We map out the journey from first touch to final sale.",
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
        title: "Build and launch",
        description: "We implement the copy, design, and tech stack needed to capture and convert leads effectively.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
        )
    },
    {
        id: 4,
        title: "Optimize and scale",
        description: "We map your traffic, measure where leads drop, and identify what's killing your conversion rate. Nothing gets fixed until we know what's broken.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
        )
    }
]

interface StepCardProps {
    process: typeof processes[0]
    index: number
    scrollYProgress: MotionValue<number>
}

function StepCard({ process, index, scrollYProgress }: StepCardProps) {
    // Each step takes about 22% of the scroll space
    const start = index * 0.22
    const end = start + 0.18

    // Horizontal Expansion & Positional Movement
    // Initial: small box (80x80), shifted left (near buttons)
    // Final: large card (550x240), centered
    const width = useTransform(scrollYProgress, [start, end], [80, 550])
    const height = useTransform(scrollYProgress, [start, end], [80, 240])
    const x = useTransform(scrollYProgress, [start, end], [-240, 0]) // Moves from "below buttons" area to center
    const borderRadius = useTransform(scrollYProgress, [start, end], [12, 24])
    const opacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1])

    // Number Animation (On the Left side of the card)
    const numberScale = useTransform(scrollYProgress, [start, end], [1, 2.5])
    const numberOpacity = useTransform(scrollYProgress, [start, start + 0.1], [0.2, 0.1])

    // Content Reveal (Fades in right-side content)
    const contentOpacity = useTransform(scrollYProgress, [start + 0.1, end], [0, 1])

    // Curtain Effect (Slide up when NEXT step begins)
    const nextStepStart = (index + 1) * 0.22
    const nextStepEnd = nextStepStart + 0.18
    const yTranslation = useTransform(scrollYProgress, [nextStepStart, nextStepEnd], [0, -60])

    // Dim cards as they get buried
    const stackingOpacity = useTransform(scrollYProgress, [nextStepStart + 0.1, nextStepEnd + 0.2], [1, 0.5])

    return (
        <motion.div
            style={{
                x,
                y: yTranslation,
                opacity: index === 0 ? stackingOpacity : useTransform(scrollYProgress, [start, start + 0.05], [0, 1]), // Simple fix for first card opacity
                zIndex: index,
                width,
                height,
                borderRadius,
            }}
            className="absolute left-1/2 -translate-x-1/2 bg-white border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.06)] overflow-hidden flex items-center p-0"
        >
            {/* LEFT SIDE: Large Number */}
            <div className="relative h-full w-[160px] flex items-center justify-center bg-gray-50/50 border-r border-gray-100/50 shrink-0 overflow-hidden">
                <motion.span
                    style={{
                        scale: numberScale,
                        opacity: numberOpacity
                    }}
                    className="text-6xl font-black text-[#000024] select-none"
                >
                    {process.id}
                </motion.span>

                {/* Fallback small number for initial "small box" state */}
                <motion.span
                    style={{ opacity: useTransform(scrollYProgress, [start, start + 0.08], [0.8, 0]) }}
                    className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[#000024]"
                >
                    {process.id}
                </motion.span>
            </div>

            {/* RIGHT SIDE: Content */}
            <motion.div
                style={{ opacity: contentOpacity }}
                className="flex-1 p-8 flex flex-col gap-4 min-w-0"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
                        {process.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#000024] truncate">{process.title}</h3>
                </div>
                <p className="text-sm font-normal text-gray-500 leading-relaxed max-w-[320px]">
                    {process.description}
                </p>
            </motion.div>
        </motion.div>
    )
}

export function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    return (
        <div id="process" ref={containerRef} className="relative h-[450vh] bg-[#fbfbfb]">
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-24 items-start pt-32 md:pt-40">

                    {/* LEFT: Static Content */}
                    <div className="flex flex-col gap-12">
                        <div>
                            <span className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Process</span>
                            <h2 className="mt-2 text-4xl md:text-6xl font-black text-[#000024] tracking-tight leading-[1.1]">
                                How we <br />
                                <span className="text-gray-400">build leads</span>
                            </h2>
                            <p className="mt-8 text-lg font-normal text-gray-500 max-w-sm">
                                Four phases. One clear path to results. Our methodology is built for speed and engineered for scale.
                            </p>
                        </div>

                        <div className="flex items-center gap-10">
                            <button className="px-10 py-5 bg-[#000024] text-white rounded-full font-bold shadow-2xl shadow-blue-900/30 hover:scale-105 transition-transform shrink-0">
                                Book a Call
                            </button>
                            <a href="#" className="hidden sm:flex text-sm font-bold items-center gap-2 group text-gray-400 hover:text-[#000024] transition-colors whitespace-nowrap">
                                THE JOURNEY <span className="group-hover:translate-x-2 transition-transform">→</span>
                            </a>
                        </div>
                    </div>

                    {/* RIGHT: Animated Stack */}
                    <div className="relative w-full flex items-start justify-center pt-2">
                        <div className="relative w-full h-[320px] flex items-center justify-center">
                            {processes.map((process, index) => (
                                <StepCard
                                    key={process.id}
                                    process={process}
                                    index={index}
                                    scrollYProgress={scrollYProgress}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
