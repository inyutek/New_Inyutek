"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"

// Data for the Right Side Cards
const services = [
    {
        id: 1,
        title: "Website design built for conversion",
        description: "Map your buyer journey and fix the leaks.",
        icon: (
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Paid traffic and performance marketing",
        description: "Build a site that turns visitors into leads.",
        icon: (
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
        )
    },
    {
        id: 3,
        title: "CRM Integration & Automation",
        description: "Systems that nurture leads while you sleep.",
        icon: (
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
        )
    },
    {
        id: 4,
        title: "Content Strategy & SEO",
        description: "Drive organic traffic that is ready to buy.",
        icon: (
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
        )
    }
]

// Animated Card Component for right side
function ServiceCard({
    data,
    className
}: {
    data: any;
    className?: string;
}) {
    return (
        <div
            className={`relative w-full flex-1 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-center gap-4 ${className}`}
        >
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2 text-[#000024]">
                {data.icon}
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-[#000024] leading-tight">
                {data.title}
            </h4>
            <p className="text-gray-600 text-sm md:text-base">
                {data.description}
            </p>
            <button className="mt-2 text-sm font-semibold flex items-center gap-2 group text-[#000024]">
                Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </div>
    )
}

export function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Use a very tall container to make the scroll sequence feel slow and "smooth/effective"
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // --- Animation Sequence ---
    // 0.0 -> 0.25 : Featured Card Shrinks & Moves Left.
    // 0.25 -> 0.35 : Right Column Fades In.
    // 0.35 -> 0.65 : Group 1 moves UP and fades OUT, Group 2 moves UP into view.

    // 1. Featured Card Animation
    const leftX = useTransform(scrollYProgress, [0.05, 0.25], ["50%", "0%"])
    const cardX = useTransform(scrollYProgress, [0.05, 0.25], ["-50%", "0%"])

    // 2. Right Column Container Appearance
    const rightOpacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1])

    // 3. Group Animations
    // Group 1: Slide UP and Fade OUT
    // Start later (0.35) and finish at 0.80 per user request
    const groupOneY = useTransform(scrollYProgress, [0.35, 0.80], ["0%", "-100%"])
    // Method 2: Extend opacity to match movement (fade out only at the end)
    const groupOneOpacity = useTransform(scrollYProgress, [0.60, 0.80], [1, 0])

    // Group 2: Slide UP from bottom
    const groupTwoY = useTransform(scrollYProgress, [0.35, 0.80], ["100%", "0%"])

    return (
        <div id="services" ref={containerRef} className="relative h-[300vh] bg-[#fbfbfb]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                <div className="w-full mx-auto px-6 lg:px-8 relative h-full flex items-center justify-between">

                    {/* Grid Layout Helper */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-[60vh]">
                            <div className="" />
                            <div className="" />
                        </div>
                    </div>

                    {/* FEATURED CARD */}
                    <motion.div
                        style={{
                            left: leftX,
                            x: cardX,
                            width: useTransform(scrollYProgress, [0.05, 0.25], ["100%", "48%"])
                        }}
                        className="absolute top-1/2 -translate-y-1/2 z-20 h-[50vh] md:h-[60vh] bg-black rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-black">
                            {/* Gradient removed for pure black look */}
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white">
                            <div className="text-sm font-medium uppercase tracking-wider mb-4 opacity-80">Services</div>
                            <h3 className="text-3xl md:text-5xl font-bold mb-4">Lead generation <br /> strategy and funnel <br /> design</h3>
                            <p className="text-lg opacity-80 max-w-md mb-8">Solve the core problems killing your lead flow</p>
                            <div className="flex gap-4">
                                <button className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-colors">
                                    Explore
                                </button>
                            </div>
                        </div>
                    </motion.div>


                    {/* RIGHT SIDE CARDS STACK */}
                    <motion.div
                        style={{ opacity: rightOpacity }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[48%] h-[50vh] md:h-[60vh] rounded-2xl"
                    >
                        {/* 
                           Container is fixed size.
                           Use overflow-hidden if we want to crop the exiting cards, 
                           but for "Slide Up" effect, maybe we want to see them leave?
                           Usually "overflow-hidden" on the container is cleaner.
                        */}
                        <div className="relative w-full h-full overflow-hidden">

                            {/* GROUP 1 (Base Layer) - Services 1 & 2 */}
                            <motion.div
                                style={{ y: groupOneY, opacity: groupOneOpacity }}
                                className="absolute inset-0 w-full h-full flex flex-col gap-6"
                            >
                                <ServiceCard
                                    data={services[0]}
                                />
                                <ServiceCard
                                    data={services[1]}
                                />
                            </motion.div>

                            {/* GROUP 2 (Slide Layer) - Services 3 & 4 */}
                            <motion.div
                                style={{ y: groupTwoY }}
                                className="absolute inset-0 w-full h-full flex flex-col gap-6"
                            >
                                <ServiceCard
                                    data={services[2]}
                                />
                                <ServiceCard
                                    data={services[3]}
                                />
                            </motion.div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
