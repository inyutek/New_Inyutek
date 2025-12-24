"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Link from "next/link"

// Card component representing the "Image Cards"
function Card({
    className,
    y,
    opacity,
    rotate = 0
}: {
    className: string;
    y: MotionValue<number>;
    opacity: MotionValue<number>;
    rotate?: number
}) {
    return (
        <motion.div
            style={{ y, opacity, rotate }}
            className={`absolute bg-gray-200 rounded-2xl shadow-xl border border-white/60 ${className} overflow-hidden`}
        >
            {/* Simulating an Image Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
        </motion.div>
    )
}

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Create a tall scroll container to "pin" the hero while scrolling
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    // ANIMATION ORCHESTRATION
    // We want the cards to come up from the bottom and settle into place.
    // The user scrolls through the "pinned" section.

    // 1. Text Fades/Moves Out slightly to make room? Or stays? User said "reveal all six... then move to next block". 
    // Let's keep text stable but maybe fade it slightly so focus goes to cards.
    const textOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0])
    const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

    // 2. Card Animation Config
    // Cards enter from off-screen bottom (positive Y) to their final position (0).
    // We stagger them slightly for smoothness.

    // Distance to travel from bottom
    const startY = 1000

    // Hook the scroll progress to Y position. 
    // [0, 0.7] means the animation finishes when user is 70% through the pinned section.
    // This leaves 30% duration for the user to admire the full grid before the next section arrives.

    const c1y = useTransform(scrollYProgress, [0, 0.4], [startY, 0], { clamp: true })
    const c2y = useTransform(scrollYProgress, [0.05, 0.45], [startY, 0], { clamp: true })
    const c3y = useTransform(scrollYProgress, [0.1, 0.5], [startY, 0], { clamp: true })
    const c4y = useTransform(scrollYProgress, [0.15, 0.55], [startY, 0], { clamp: true })
    const c5y = useTransform(scrollYProgress, [0.2, 0.6], [startY, 0], { clamp: true })
    const c6y = useTransform(scrollYProgress, [0.25, 0.65], [startY, 0], { clamp: true })

    // Fade in as they rise
    const cardsOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

    return (
        // Height 250vh = 1.5x screen height of scrolling space (1 scroll anim, 0.5 scroll exit)
        <div id="hero" ref={containerRef} className="relative h-[250vh]">

            {/* Sticky Viewport: This stays fixed while measuring the parent's height for scroll progress */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#fbfbfb] flex flex-col items-center justify-center">

                {/* Main Text Content */}
                <motion.div
                    style={{ opacity: textOpacity, scale: textScale }}
                    className="relative z-30 max-w-4xl mx-auto px-4 text-center -mt-20"
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#000024] leading-[1.1] mb-8">
                        Turn website traffic into
                        <br className="hidden sm:block" /> qualified leads
                    </h1>
                    <p className="text-sm font-normal text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
                        Most SMBs waste money on traffic that never converts. We build funnels
                        that turn visitors into customers.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Link href="#" className="px-6 py-3 bg-[#000024] text-white text-sm rounded-lg font-medium shadow-lg hover:opacity-90 transition-opacity">
                            Book Call
                        </Link>
                        <Link href="#" className="px-6 py-3 bg-white text-[#000024] text-sm border border-[#000024]/20 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Learn More
                        </Link>
                    </div>
                </motion.div>


                {/* The 6 Cards - Positioned absolutely around the center, initially pushed down by transform */}
                <div className="absolute inset-0 z-20 pointer-events-none w-full mx-auto">

                    {/* 1. Top Left */}
                    <Card
                        y={c1y}
                        opacity={cardsOpacity}
                        rotate={-8}
                        className="left-[5%] top-[10%] w-60 h-72 z-10"
                    />

                    {/* 2. Top Right */}
                    <Card
                        y={c2y}
                        opacity={cardsOpacity}
                        rotate={8}
                        className="right-[5%] top-[12%] w-64 h-80 z-10"
                    />

                    {/* 3. Middle Left */}
                    <Card
                        y={c3y}
                        opacity={cardsOpacity}
                        rotate={-4}
                        className="left-[15%] top-[45%] w-56 h-64 z-20"
                    />

                    {/* 4. Middle Right */}
                    <Card
                        y={c4y}
                        opacity={cardsOpacity}
                        rotate={5}
                        className="right-[15%] top-[40%] w-52 h-68 z-20"
                    />

                    {/* 5. Bottom Left */}
                    <Card
                        y={c5y}
                        opacity={cardsOpacity}
                        rotate={-12}
                        className="left-[8%] bottom-[5%] w-64 h-72 z-30"
                    />

                    {/* 6. Bottom Right */}
                    <Card
                        y={c6y}
                        opacity={cardsOpacity}
                        rotate={6}
                        className="right-[8%] bottom-[8%] w-60 h-80 z-30"
                    />

                </div>
            </div>
        </div>
    )
}
