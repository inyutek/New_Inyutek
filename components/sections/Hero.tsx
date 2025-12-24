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



    // 2. Card Animation Config
    // Cards enter from off-screen bottom (positive Y) to their final position (0).
    // We stagger them slightly for smoothness.

    // 3D PARALLAX CONFIGURATION
    // Staggered entry for "Phase" effect.

    // Transforms - Staggered Start Positions
    // Layer 1 (Back): Starts closer, clears top earlier.
    const yBack = useTransform(scrollYProgress, [0, 1], [500, -800], { clamp: true })

    // Layer 2 (Mid): Starts mid-way.
    const yMid = useTransform(scrollYProgress, [0, 1], [800, -800], { clamp: true })

    // Layer 3 (Front): Starts further down, arrives last.
    const yFront = useTransform(scrollYProgress, [0, 1], [1200, -800], { clamp: true })

    // Text Animation
    // Remains visible ("floating a little") for most of the scroll.
    const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]) // Fades out late
    const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
    const textY = useTransform(scrollYProgress, [0, 1], [0, -100]) // Floats up slightly

    // Fade in cards
    const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])

    return (
        // Height 300vh -> Faster scroll (less distance to cover)
        <div id="hero" ref={containerRef} className="relative h-[300vh]">

            {/* Sticky Viewport: This stays fixed while measuring the parent's height for scroll progress */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#fbfbfb] flex flex-col items-center justify-center perspective-1000">

                {/* Main Text Content */}
                <motion.div
                    style={{ opacity: textOpacity, scale: textScale, y: textY }}
                    className="relative z-40 max-w-4xl mx-auto px-4 text-center -mt-20"
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
                        <Link href="#" className="px-6 py-3 bg-[#000024] text-white text-sm rounded-lg font-medium shadow-lg hover:opacity-90 transition-all hover:-translate-y-1">
                            Book Call
                        </Link>
                        <Link href="#" className="px-6 py-3 bg-white text-[#000024] text-sm border border-[#000024]/20 rounded-lg font-medium hover:bg-gray-50 transition-all hover:-translate-y-1">
                            Learn More
                        </Link>
                    </div>
                </motion.div>


                {/* The 6 Cards - Positioned for 3D Overlap */}
                <div className="absolute inset-0 z-20 pointer-events-none w-full mx-auto max-w-[1400px]">

                    {/* LAYER 1: BACK (Starts at 500, Reaches top first) */}
                    {/* Top Left */}
                    <Card
                        y={yBack}
                        opacity={opacity}
                        rotate={0}
                        className="left-[2%] top-[15%] w-56 h-64 z-10 opacity-80 scale-90"
                    />
                    {/* Top Right */}
                    <Card
                        y={yBack}
                        opacity={opacity}
                        rotate={0}
                        className="right-[2%] top-[18%] w-60 h-72 z-10 opacity-80 scale-90"
                    />

                    {/* LAYER 2: MID (Starts at 800) */}
                    {/* Overlaps Back layer slightly */}
                    {/* Mid Left */}
                    <Card
                        y={yMid}
                        opacity={opacity}
                        rotate={0}
                        className="left-[20%] top-[38%] w-60 h-72 z-20 shadow-2xl"
                    />
                    {/* Mid Right */}
                    <Card
                        y={yMid}
                        opacity={opacity}
                        rotate={0}
                        className="right-[20%] top-[35%] w-56 h-64 z-20 shadow-2xl"
                    />

                    {/* LAYER 3: FRONT (Starts at 1200, Becomes clear later) */}
                    {/* Overlaps Mid layer at corners */}
                    {/* Bottom Left */}
                    <Card
                        y={yFront}
                        opacity={opacity}
                        rotate={0}
                        className="left-[1%] bottom-[10%] w-64 h-80 z-30 scale-105 shadow-2xl"
                    />
                    {/* Bottom Right */}
                    <Card
                        y={yFront}
                        opacity={opacity}
                        rotate={0}
                        className="right-[1%] bottom-[12%] w-64 h-80 z-30 scale-105 shadow-2xl"
                    />

                </div>
            </div>
        </div>
    )
}
