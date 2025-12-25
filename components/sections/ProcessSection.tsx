"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion"

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

interface AnimationProps {
    process: typeof processes[0]
    index: number
    scrollYProgress: MotionValue<number>
}

// Shared animation config
const springConfig = { stiffness: 90, damping: 22, mass: 0.8 }

function StepNumber({ process, index, scrollYProgress }: AnimationProps) {
    const stepDuration = 1 / processes.length
    const start = index * stepDuration
    const end = (index + 1) * stepDuration
    const handoffStart = start + stepDuration * 0.75

    // STABLE POSITION (No horizontal movement)
    const x = 0

    // NUMBER OPACITY (Simple fade transition)
    const opacity = useTransform(scrollYProgress, [start, handoffStart, end], [1, 1, 0])

    // VERTICAL STACKING (Y) - Shared with Card
    const initialY = index === 0 ? 0 : 800
    const rawY = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [initialY, 0, -30, -60])
    const y = useSpring(rawY, springConfig)

    return (
        <motion.div
            style={{ x, y, opacity, zIndex: index }}
            className="absolute inset-0 flex items-center justify-center p-4"
        >
            <span className="text-8xl md:text-[140px] font-black text-[#000024] tracking-tighter leading-none select-none">
                {process.id}
            </span>
        </motion.div>
    )
}

function StepCard({ process, index, scrollYProgress }: AnimationProps) {
    const stepDuration = 1 / processes.length
    const start = index * stepDuration
    const end = (index + 1) * stepDuration

    // VERTICAL STACKING (Y) - Shared with Number
    const initialY = index === 0 ? 0 : 800
    const rawY = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [initialY, 0, -30, -60])
    const y = useSpring(rawY, springConfig)

    // CARD OPACITY (Curtain effect visibility)
    const opacity = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.1], [index === 0 ? 1 : 0, 1, 1, 0.7])

    return (
        <motion.div
            style={{ y, opacity, zIndex: index }}
            className="absolute inset-0 w-full"
        >
            <div className="bg-white border border-gray-100 rounded-[40px] p-10 md:p-14 flex flex-col items-start gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] h-full">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                    {process.icon}
                </div>

                <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-black text-[#000024] tracking-tight">{process.title}</h3>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
                        {process.description}
                    </p>
                    <div className="pt-4">
                        <span className="text-sm font-bold text-gray-300 uppercase tracking-widest cursor-pointer hover:text-[#000024] transition-colors">Explore</span>
                    </div>
                </div>
            </div>
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
        <div id="process" ref={containerRef} className="relative h-[600vh] bg-[#fbfbfb]">
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                {/* Adjusted grid for higher top-alignment of the left content */}
                <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-center md:items-start md:pt-[15vh]">

                    {/* LEFT Column - Styled for higher positioning and proper spacing */}
                    <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-12">
                        <div>
                            <span className="text-xs font-bold text-[#000024] opacity-50 uppercase tracking-[0.2em] font-mono">Process</span>
                            <h2 className="mt-4 text-5xl md:text-7xl font-black text-[#000024] tracking-tight leading-[1.0]">
                                How we <br />
                                build leads
                            </h2>
                            <p className="mt-8 text-xl font-normal text-gray-400 max-w-sm leading-relaxed">
                                Four phases. One clear path to results.
                            </p>
                        </div>

                        {/* Perfectly Aligned Link Structure */}
                        <div className="flex items-start gap-16">
                            {/* Learn + Numbers Column (Centered) */}
                            <div className="flex flex-col items-center gap-8">
                                <a href="#" className="text-lg font-bold text-[#000024] hover:opacity-70 transition-opacity whitespace-nowrap">
                                    Learn
                                </a>
                                {/* FIXED size container - Number stays stationary horizontally */}
                                <div className="relative w-40 h-44 flex items-center justify-center -ml-2">
                                    {processes.map((process, index) => (
                                        <StepNumber
                                            key={process.id}
                                            process={process}
                                            index={index}
                                            scrollYProgress={scrollYProgress}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Build Link - Aligned with Learn */}
                            <div className="pt-0">
                                <a href="#" className="text-lg font-bold text-gray-400 group hover:text-[#000024] transition-colors flex items-center gap-2">
                                    Build and launch the solution <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT Column: Animated Cards */}
                    <div className="md:col-span-12 lg:col-span-7 relative flex items-center md:items-start">
                        <div className="relative w-full h-[540px]">
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

