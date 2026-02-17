"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

// Card component representing the "Image Cards"
function Card({
    className,
    y,
    opacity,
    rotate = 0,
    imageSrc
}: {
    className: string;
    y: MotionValue<number>;
    opacity: MotionValue<number>;
    rotate?: number;
    imageSrc?: string;
}) {
    const isServiceImage = imageSrc?.startsWith("/services/");

    return (
        <motion.div
            style={{ y, opacity, rotate, willChange: 'transform, opacity' }}
            className={`absolute bg-gray-200 rounded-2xl shadow-xl border border-white/60 ${className} overflow-hidden`}
        >
            {imageSrc ? (
                <div className="relative w-full h-full">
                    {isServiceImage ? (
                        <picture>
                            <source srcSet={imageSrc.replace(/(\.\w+)$/, "-mobile.avif")} type="image/avif" />
                            <source srcSet={imageSrc.replace(/(\.\w+)$/, "-mobile.webp")} type="image/webp" />
                            <img
                                src={imageSrc}
                                alt="Hero Visual"
                                className="w-full h-full object-contain"
                                decoding="async"
                                loading="eager"
                            />
                        </picture>
                    ) : (
                        <img
                            src={imageSrc}
                            alt="Hero Visual"
                            className="w-full h-full object-contain"
                            decoding="async"
                            loading="eager"
                        />
                    )}
                </div>
            ) : (
                /* Simulating an Image Placeholder */
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
            )}
        </motion.div>
    )
}

// Constants shared with Navbar
const PHONE_NUMBER = "9112235551"
const WHATSAPP_NUMBER = "919112235551"
const WHATSAPP_TEXT = encodeURIComponent("Hi Inyutek team, I want to schedule a meeting.")
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`
const CALL_LINK = `tel:${PHONE_NUMBER}`

// All hero image sources — preloaded before loader dismisses
const HERO_IMAGES = [
    "/services/Website.jpg",
    "/services/Automation.jpg",
    "/services/Social Media.jpg",
    "/services/seo-search-engine-optimization-internet-digital-concept.jpg",
    "/services/online-marketing-commercial-connection-technology.jpg",
    "/services/Reporting.jpg",
]

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Preload all hero images and signal readiness to the global loader
    useEffect(() => {
        let dispatched = false
        const dispatchReady = () => {
            if (dispatched) return
            dispatched = true
            window.dispatchEvent(new CustomEvent("hero-ready"))
        }

        // Wait for 2 animation frames — guarantees browser has painted
        const waitForPaint = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(dispatchReady)
            })
        }

        // Load all images in parallel
        const promises = HERO_IMAGES.map(
            (src) =>
                new Promise<void>((resolve) => {
                    const img = new window.Image()
                    img.onload = () => resolve()
                    img.onerror = () => resolve() // don't block on failed images
                    img.src = src
                })
        )

        // After images finish, wait for 2 paint frames so framer-motion
        // and Lenis have fully initialized before the loader fades
        Promise.all(promises).then(waitForPaint)

        // Safety: if images take too long, dismiss loader anyway after 8s
        const safety = setTimeout(dispatchReady, 8000)

        return () => clearTimeout(safety)
    }, [])

    // Create a tall scroll container to "pin" the hero while scrolling
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })


    // ANIMATION ORCHESTRATION
    // - [x] Implement auto-cycling (5s) for Home page Process section [ ]
    // - [x] Fix Process section auto-cycle logic (reset on interaction) and clickability [ ]
    // - [x] Replace Home Page Hero placeholder with provided image [ ]"pinned" section.



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
        <div id="hero" ref={containerRef} className="relative h-auto lg:h-[300vh]">

            {/* Sticky Viewport: This stays fixed while measuring the parent's height for scroll progress */}
            <div className="relative h-auto pt-55 pb-55 lg:py-0 lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden bg-[#fbfbfb] flex flex-col items-center justify-center perspective-1000">

                {/* Main Text Content */}
                <ScrollReveal enableDesktop={false} className="relative z-40 max-w-4xl mx-auto px-4 text-center mt-0 lg:-mt-20">
                    <motion.div
                        style={{ opacity: textOpacity, scale: textScale, y: textY }}
                    >
                        <h1 className="type-h1 mb-8 mx-auto">
                            Lead generation that drives calls for local businesses and sales for e-commerce
                        </h1>

                        <div className="max-w-4xl mx-auto mb-10 flex flex-col gap-6 items-center justify-center">
                            <p className="type-body">
                                We build conversion-focused funnels and run Google/Meta + SEO to generate calls, bookings, and sales with tracking that shows exactly what's working.
                            </p>

                            <p className="type-body mt-6">
                                Landing Pages • Ads • SEO • CRO • CRM Automation • Reporting
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto px-6 py-3 bg-[#000024] text-white text-sm rounded-lg font-medium shadow-lg hover:opacity-90 transition-all hover:-translate-y-1 flex items-center justify-center min-w-[140px]"
                            >
                                Book a Free Growth Audit
                            </Link>
                            <Link
                                href="/how-we-work"
                                className="w-full sm:w-auto px-6 py-3 bg-white text-[#000024] text-sm border border-[#000024]/20 rounded-lg font-medium hover:bg-gray-50 transition-all hover:-translate-y-1 flex items-center justify-center"
                            >
                                See Our Process
                            </Link>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 font-medium tracking-wide uppercase">
                            30 minutes • Practical action plan • Clear priorities
                        </div>
                    </motion.div>
                </ScrollReveal>


                {/* The 6 Cards - Positioned for 3D Overlap */}
                <div className={"hidden lg:block absolute inset-0 z-20 pointer-events-none w-full mx-auto max-w-[1400px]"}>

                    {/* LAYER 1: BACK (Starts at 500, Reaches top first) */}
                    {/* Top Left */}
                    <Card
                        y={yBack}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/Website.jpg"
                        className="left-[2%] top-[15%] w-[16.25rem] h-auto z-10 opacity-80 scale-90"
                    />
                    {/* Top Right */}
                    <Card
                        y={yBack}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/Automation.jpg"
                        className="right-[2%] top-[18%] w-[17.5rem] h-auto z-10 opacity-80 scale-90"
                    />

                    {/* LAYER 2: MID (Starts at 800) */}
                    {/* Overlaps Back layer slightly */}
                    {/* Mid Left */}
                    <Card
                        y={yMid}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/Social Media.jpg"
                        className="left-[20%] top-[38%] w-[17.5rem] h-auto z-20 shadow-2xl"
                    />
                    {/* Mid Right */}
                    <Card
                        y={yMid}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/seo-search-engine-optimization-internet-digital-concept.jpg"
                        className="right-[20%] top-[35%] w-[15.5rem] h-auto z-20 shadow-2xl"
                    />

                    {/* LAYER 3: FRONT (Starts at 1200, Becomes clear later) */}
                    {/* Overlaps Mid layer at corners */}
                    {/* Bottom Left */}
                    <Card
                        y={yFront}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/online-marketing-commercial-connection-technology.jpg"
                        className="left-[1%] bottom-[10%] w-[19.5rem] h-auto z-30 scale-105 shadow-2xl"
                    />
                    {/* Bottom Right */}
                    <Card
                        y={yFront}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/Reporting.jpg"
                        className="right-[1%] bottom-[12%] w-[19.5rem] h-auto z-30 scale-105 shadow-2xl"
                    />

                </div>
            </div>
        </div>
    )
}
