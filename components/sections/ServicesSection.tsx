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
    i,
    data,
    progress,
    range
}: {
    i: number;
    data: any;
    progress: MotionValue<number>;
    range: [number, number];
}) {
    // Card logic:
    // It should start below the view (y: 100%) and opacity 0?
    // As progress enters range, it slides up to y: 0 (covering previous card).
    // The previous card might fade out or scale down slightly to create depth.

    // BUT user said "second one will go up to the place of the first" -> stacking.

    // We Map 'progress' (0 to 1 for the whole section) to local range.
    // If i=0 (first card), it appears immediately or fades in.

    const [start, end] = range;

    // Y Position: Starts "down" (e.g. 100px relative offset) and moves to 0.
    // For i > 0, we want it to come from much lower? 
    // Actually, "Curtian" usually means it covers exactly.

    // Transform range:
    // Before 'start': y = 100% (or offscreen)
    // At 'end': y = 0% (visible in slot)

    const y = useTransform(progress, [start, end], ["120%", "0%"])
    const opacity = useTransform(progress, [start, start + 0.05], [0, 1]) // Fast fade in

    // For the FIRST card, it needs to be visible initially (once left card moves).
    // So distinct logic for first card vs others.

    if (i === 0) {
        return (
            <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-center gap-4"
            >
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2 text-[#000024]">
                    {data.icon}
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-[#000024] leading-tight">
                    {data.title}
                </h4>
                <p className="text-gray-600 text-lg">
                    {data.description}
                </p>
                <button className="mt-4 text-sm font-semibold flex items-center gap-2 group text-[#000024]">
                    Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </motion.div>
        )
    }

    return (
        <motion.div
            style={{ y }}
            className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-xl flex flex-col justify-center gap-4 z-10"
        >
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2 text-[#000024]">
                {data.icon}
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-[#000024] leading-tight">
                {data.title}
            </h4>
            <p className="text-gray-600 text-lg">
                {data.description}
            </p>
            <button className="mt-4 text-sm font-semibold flex items-center gap-2 group text-[#000024]">
                Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </motion.div>
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
    // 0.25 -> 0.35 : Right Column Fades In / Card 1 Appears.
    // 0.35 -> 0.55 : Card 2 slides up ("Curtain") over Card 1.
    // 0.55 -> 0.75 : Card 3 slides up over Card 2.
    // 0.75 -> 0.95 : Card 4 slides up over Card 3.
    // 0.95 -> 1.0  : Pause / End.

    // 1. Featured Card Animation
    const leftX = useTransform(scrollYProgress, [0.05, 0.25], ["50%", "0%"])
    const cardX = useTransform(scrollYProgress, [0.05, 0.25], ["-50%", "0%"])
    // 2. Right Column Container Appearance
    const rightOpacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1])

    return (
        <div ref={containerRef} className="relative h-[450vh] bg-[#fbfbfb]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative h-full flex items-center justify-between">

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
                        className="absolute top-1/2 -translate-y-1/2 z-20 h-[50vh] md:h-[60vh] bg-gray-600 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-neutral-800">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-200 via-gray-900 to-black"></div>
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
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[48%] h-[50vh] md:h-[60vh] flex items-center justify-center"
                    >
                        {/* 
                   We use a Container height [60vh] which matches the Left card.
                   The Service Cards will fill this height.
                */}
                        <div className="relative w-full h-full">
                            {/* Card 1 (Base) */}
                            <ServiceCard
                                i={0}
                                data={services[0]}
                                progress={scrollYProgress}
                                range={[0, 0]}
                            />

                            {/* Card 2 (Overlays 1) */}
                            <ServiceCard
                                i={1}
                                data={services[1]}
                                progress={scrollYProgress}
                                range={[0.35, 0.50]}
                            />

                            {/* Card 3 (Overlays 2) */}
                            <ServiceCard
                                i={2}
                                data={services[2]}
                                progress={scrollYProgress}
                                range={[0.55, 0.70]}
                            />

                            {/* Card 4 (Overlays 3) */}
                            <ServiceCard
                                i={3}
                                data={services[3]}
                                progress={scrollYProgress}
                                range={[0.75, 0.90]}
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
