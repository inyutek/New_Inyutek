"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

// Card component representing the "Image Cards"
function Card({
    className,
    y,
    opacity,
    rotate = 0,
    imageSrc,
    altText = "Inyutek digital marketing service",
    priority = false,
}: {
    className: string;
    y: MotionValue<number>;
    opacity: MotionValue<number>;
    rotate?: number;
    imageSrc?: string;
    altText?: string;
    priority?: boolean;  // ← added so first visible card can set priority
}) {
    return (
        <motion.div
            style={{ y, opacity, rotate, willChange: 'transform, opacity' }}
            className={`absolute bg-gray-200 rounded-2xl shadow-xl border border-white/60 ${className} overflow-hidden`}
        >
            {imageSrc ? (
                <div className="relative w-full h-full">
                    {/*
                     * ✅ FIXED: Using next/image <Image /> for automatic WebP conversion,
                     * responsive sizing, and LCP optimization.
                     *
                     * The old <picture> + <img> block was removed by Antigravity during
                     * the Image optimization pass. This replaces it correctly.
                     *
                     * NOTE: The parent Card div needs a defined height (from className)
                     * for fill to work — e.g. h-[200px]. If cards look broken, check
                     * that className includes an explicit height.
                     */}
                    <Image
                        src={imageSrc}
                        alt={altText}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 20vw"
                        priority={priority}
                    />
                </div>
            ) : (
                /* Image Placeholder */
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
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
    "/services/Website.webp",
    "/services/Automation.webp",
    "/services/social-media.webp",
    "/services/seo-search-engine-optimization-internet-digital-concept.webp",
    "/services/online-marketing-commercial-connection-technology.webp",
    "/services/Reporting.webp",
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

    // ─────────────────────────────────────────────
    // SCROLL ANIMATION SETUP
    // Creates a tall scroll container (300vh) that "pins" the hero
    // while the user scrolls — cards animate in during this window.
    // ─────────────────────────────────────────────
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    // ─────────────────────────────────────────────
    // 3D PARALLAX CARD ANIMATION
    // Three layers with staggered Y start positions create
    // a depth/perspective effect as the user scrolls down.
    //
    // Layer 1 (Back)  — starts at  500px, lightest
    // Layer 2 (Mid)   — starts at  800px, medium
    // Layer 3 (Front) — starts at 1200px, heaviest shadow
    // ─────────────────────────────────────────────

    // Layer 1 — Back cards
    const yBack = useTransform(scrollYProgress, [0, 1], [500, -800], { clamp: true })

    // Layer 2 — Mid cards
    const yMid = useTransform(scrollYProgress, [0, 1], [800, -800], { clamp: true })

    // Layer 3 — Front cards (arrive last for stagger effect)
    const yFront = useTransform(scrollYProgress, [0, 1], [1200, -800], { clamp: true })

    // Text floats up slightly and fades out near end of scroll window
    const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0])
    const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
    const textY = useTransform(scrollYProgress, [0, 1], [0, -100])

    // Cards fade in from the start of scroll
    const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])

    return (
        // 300vh tall container — creates the scroll distance for card animations
        <div id="hero" ref={containerRef} className="relative h-auto lg:h-[300vh]">

            {/* 
              * Sticky viewport — stays fixed while parent scroll progress runs.
              * pt-14 pb-14 replaces the broken pt-55 pb-55 (non-existent Tailwind classes).
              */}
            <div className="relative h-auto pt-14 pb-14 lg:py-0 lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden bg-[#fbfbfb] flex flex-col items-center justify-center perspective-1000">

                {/* ── HERO TEXT CONTENT ── */}
                <ScrollReveal
                    enableDesktop={false}
                    className="relative z-40 max-w-4xl mx-auto px-4 text-center mt-0 lg:-mt-20"
                >
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



                {/* ── DESKTOP: 3D Parallax Card Animation ──
                  *
                  * Three layers of cards animate in from below as user scrolls.
                  * Hidden on mobile (hidden lg:block) — mobile uses carousel above.
                  *
                  * Z-index layering: Back(z-10) → Mid(z-20) → Front(z-30)
                  * for correct overlap/depth rendering.
                  */}
                <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none w-full mx-auto max-w-[1400px]">

                    {/* ── LAYER 1: BACK (y starts at 500, reaches top first) ── */}
                    <Card
                        y={yBack}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/Website.webp"
                        altText="Professional website design and landing pages for lead generation"
                        className="left-[2%] top-[15%] w-[16.25rem] h-[200px] z-10 opacity-80 scale-90"
                        priority={true}  // ← first desktop card = likely LCP element
                    />
                    <Card
                        y={yBack}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/Automation.webp"
                        altText="CRM and marketing automation setup for local businesses"
                        className="right-[2%] top-[18%] w-[17.5rem] h-[200px] z-10 opacity-80 scale-90"
                    />

                    {/* ── LAYER 2: MID (y starts at 800) ── */}
                    <Card
                        y={yMid}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/social-media.webp"
                        altText="Social media marketing campaigns that drive inquiries and sales"
                        className="left-[20%] top-[38%] w-[17.5rem] h-[200px] z-20 shadow-2xl"
                    />
                    <Card
                        y={yMid}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/seo-search-engine-optimization-internet-digital-concept.webp"
                        altText="Local SEO and Google search optimization for higher rankings"
                        className="right-[20%] top-[35%] w-[15.5rem] h-[200px] z-20 shadow-2xl"
                    />

                    {/* ── LAYER 3: FRONT (y starts at 1200, arrives last) ── */}
                    <Card
                        y={yFront}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/online-marketing-commercial-connection-technology.webp"
                        altText="Google Ads and paid online marketing management for e-commerce"
                        className="left-[1%] bottom-[10%] w-[19.5rem] h-[220px] z-30 scale-105 shadow-2xl"
                    />
                    <Card
                        y={yFront}
                        opacity={opacity}
                        rotate={0}
                        imageSrc="/services/Reporting.webp"
                        altText="Marketing performance reporting and analytics dashboard"
                        className="right-[1%] bottom-[12%] w-[19.5rem] h-[220px] z-30 scale-105 shadow-2xl"
                    />

                </div>
            </div>
        </div>
    )
}