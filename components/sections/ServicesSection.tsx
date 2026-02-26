"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

// Data for the Right Side Cards
const services = [
    {
        id: 1,
        title: "Conversion-Focused Websites & Landing Pages (CRO)",
        description: "Turn visitors into calls, WhatsApp chats, bookings, and purchases with clear messaging, fast pages, and strong CTAs.",
        icon: (
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Paid Ads Management (Google + Meta)",
        description: "Launch and optimize campaigns built for qualified leads, not vanity metrics tracking CPL and lead quality from day one.",
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
        title: "SEO That Brings Ready-to-Buy Customers",
        description: "Target high-intent keywords like “near me”, “best + service”, and product/category searches to drive consistent inbound leads.",
        icon: (
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
        )
    },
    {
        id: 4,
        title: "Social Media Marketing (Organic + Paid Social)",
        description: "Content + campaigns that earn attention and move people to action DMs, inquiries, and site conversions.",
        icon: (
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
        )
    },
    {
        id: 5,
        title: "CRM Setup & Automation",
        description: "Stop losing leads after the form fill. Automations for speed-to-lead, reminders, nurturing, and reactivation.",
        icon: (
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
        )
    },
    {
        id: 6,
        title: "Tracking & Analytics",
        description: "GA4, pixels, conversion events, dashboards so every channel is measurable and scalable.",
        icon: (
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3v18h18"></path>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
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
            className={`relative w-full bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center gap-4 ${className}`}
        >
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2 text-[#000024]">
                {data.icon}
            </div>
            <h4 className="type-card-title">
                {data.title}
            </h4>
            <p className="type-body pb-2">
                {data.description}
            </p>
        </div>
    )
}

function MobileServices() {
    const [isBgLoading, setIsBgLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (imgRef.current?.complete) {
            setIsBgLoading(false);
        }
    }, [])

    return (
        <div id="services-mobile" className="block lg:hidden py-20 px-6 bg-[#fbfbfb]">
            <div className="flex flex-col gap-6">
                {/* Featured Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full rounded-3xl overflow-hidden shadow-xl text-white min-h-[400px] relative"
                >
                    {/* Background Image - Optimized */}
                    <div className="absolute inset-0 z-0 bg-[#000024]">
                        {isBgLoading && <Skeleton className="absolute inset-0 z-10 w-full h-full rounded-none" />}
                        <picture>
                            <source srcSet="/services/Service%20Page%20Background-mobile.avif" type="image/avif" />
                            <source srcSet="/services/Service%20Page%20Background-mobile.webp" type="image/webp" />
                            <img
                                ref={imgRef}
                                src="/services/Service%20Page%20Background.jpg"
                                alt="Digital marketing services for local businesses and e-commerce"
                                className={`w-full h-full object-cover object-left transition-opacity duration-500 ${isBgLoading ? 'opacity-0' : 'opacity-100'}`}
                                onLoad={() => setIsBgLoading(false)}
                                onError={() => setIsBgLoading(false)}
                            />
                        </picture>
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 p-8 flex flex-col justify-center h-full bg-black/10">
                        <div className="text-sm font-medium uppercase tracking-wider mb-4 opacity-80">Services</div>
                        <h3 className="type-h2 mb-4 !text-gray-50">Services built to create <br /> consistent lead flow</h3>
                        <p className="type-body opacity-90 mb-8 !text-gray-50 max-w-lg">Pick one growth lever or let us build the full lead system end-to-end Strategy → Execution → Optimization.</p>

                        <div className="flex flex-col items-start gap-4 w-full">
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <Link href="/what-we-do#services" className="w-full flex-1">
                                    <button className="w-full px-6 py-3 bg-white text-black rounded-lg font-medium transition-all hover:bg-gray-100 text-center">
                                        Explore all services →
                                    </button>
                                </Link>
                                <Link href="/contact" className="w-full flex-1">
                                    <button className="w-full px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg font-medium border border-white/20 transition-all hover:bg-white/20 text-white text-center">
                                        Book a free growth audit
                                    </button>
                                </Link>
                            </div>
                            <p className="text-xs text-left text-white/60">
                                We’ll identify the top 3 leaks blocking calls, bookings, or sales.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Service Cards Stack */}
                <div className="flex flex-col gap-4">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <ServiceCard data={service} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function DesktopServices() {
    const containerRef = useRef<HTMLDivElement>(null)
    const viewportRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const [isBgLoading, setIsBgLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);
    const [scrollDistance, setScrollDistance] = useState(0);

    useEffect(() => {
        if (imgRef.current?.complete) {
            setIsBgLoading(false);
        }
    }, [])

    // Dynamically calculate how far the list needs to scroll
    // based on actual rendered heights — auto-adapts to any zoom level.
    useEffect(() => {
        const calculateScroll = () => {
            if (viewportRef.current && listRef.current) {
                const viewportHeight = viewportRef.current.clientHeight;
                const listHeight = listRef.current.scrollHeight;
                // How far the list needs to move up so the last card is fully visible
                const overflow = listHeight - viewportHeight;
                setScrollDistance(overflow > 0 ? overflow : 0);
            }
        };

        calculateScroll();

        // Recalculate on resize/zoom changes
        const observer = new ResizeObserver(calculateScroll);
        if (viewportRef.current) observer.observe(viewportRef.current);
        if (listRef.current) observer.observe(listRef.current);

        return () => observer.disconnect();
    }, [])

    // Use a very tall container to make the scroll sequence feel slow and "smooth/effective"
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // --- Animation Sequence ---
    // 0.0 -> 0.25 : Featured Card Shrinks & Moves Left.
    // 0.25 -> 0.35 : Right Column Fades In.
    // 0.35 -> 0.9  : Card list scrolls up to reveal all cards.

    // 1. Featured Card Animation
    const leftX = useTransform(scrollYProgress, [0.05, 0.25], ["50%", "0%"])
    const cardX = useTransform(scrollYProgress, [0.05, 0.25], ["-50%", "0%"])

    // 2. Right Column Container Appearance
    const rightOpacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1])

    // 3. Auto-calculated list scroll — adapts to any zoom level
    const listY = useTransform(scrollYProgress, [0.35, 0.9], [0, -scrollDistance])


    return (
        <div id="services" ref={containerRef} className="hidden lg:block relative h-[300vh] bg-[#fbfbfb]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-8 xl:px-12 relative h-full flex items-center">

                    {/* FEATURED CARD */}
                    <motion.div
                        style={{
                            left: leftX,
                            x: cardX,
                            width: useTransform(scrollYProgress, [0.05, 0.25], ["100%", "48%"])
                        }}
                        className="absolute top-1/2 -translate-y-1/2 z-20 h-[50vh] lg:h-[60vh] rounded-3xl overflow-hidden shadow-2xl bg-[#000024]"
                    >
                        {/* Background Image - Optimized */}
                        <div className="absolute inset-0 z-0">
                            {isBgLoading && <Skeleton className="absolute inset-0 z-10 w-full h-full rounded-none" />}
                            <picture>
                                <source srcSet="/services/Service%20Page%20Background-desktop.avif" type="image/avif" />
                                <source srcSet="/services/Service%20Page%20Background-desktop.webp" type="image/webp" />
                                <img
                                    ref={imgRef}
                                    src="/services/Service%20Page%20Background.jpg"
                                    alt="Digital marketing services for local businesses and e-commerce"
                                    className={`w-full h-full object-cover object-left transition-opacity duration-500 ${isBgLoading ? 'opacity-0' : 'opacity-100'}`}
                                    onLoad={() => setIsBgLoading(false)}
                                    onError={() => setIsBgLoading(false)}
                                />
                            </picture>
                            <div className="absolute inset-0 bg-black/20" /> {/* Overlay for text readability */}
                        </div>

                        {/* CONTENT CONTAINER - Simplified Animation (No Layout Thrashing) */}
                        <div
                            className="absolute inset-0 z-10 flex flex-col justify-center p-8 lg:p-12 text-white items-start text-left lg:pl-16"
                        >
                            <div className="max-w-xl w-full">
                                <div className="text-sm font-medium uppercase tracking-wider mb-4 opacity-80 pl-1">Services</div>
                                <h3 className="type-h2 mb-6 !text-gray-50 leading-tight">Services built to create <br /> consistent lead flow</h3>
                                <p className="type-body opacity-90 mb-8 !text-gray-100 max-w-lg">Pick one growth lever or let us build the full lead system end-to-end Strategy → Execution → Optimization.</p>

                                <div className="flex flex-col gap-4 w-full md:w-auto">
                                    <div className="flex flex-wrap gap-4 w-full md:w-auto">
                                        <Link href="/what-we-do#services" className="w-full md:w-auto">
                                            <button className="w-full md:w-auto px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all hover:-translate-y-1">
                                                Explore all services →
                                            </button>
                                        </Link>
                                        <Link href="/contact" className="w-full md:w-auto">
                                            <button className="w-full md:w-auto px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1 text-white">
                                                Book a free growth audit
                                            </button>
                                        </Link>
                                    </div>
                                    <p className="text-sm text-white/70 text-left pl-1">
                                        We'll identify the top 3 leaks blocking calls, bookings, or sales.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>


                    {/* RIGHT SIDE CARDS STACK */}
                    {/* Visual window for the list */}
                    <motion.div
                        ref={viewportRef}
                        style={{ opacity: rightOpacity }}
                        className="absolute right-6 lg:right-8 xl:right-6 top-1/2 -translate-y-1/2 w-[48%] max-w-[calc(1920px*0.48)] h-[60vh] overflow-hidden rounded-2xl [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                    >
                        {/* Scrolling Container */}
                        <motion.div
                            ref={listRef}
                            style={{ y: listY }}
                            className="flex flex-col gap-4 pr-4 lg:pr-6 pb-6"
                        >
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    data={service}
                                />
                            ))}
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export function ServicesSection() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Inyutek Digital Marketing Services",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Conversion-Focused Landing Pages & CRO", "url": "https://inyutek.com/what-we-do#cro" },
                            { "@type": "ListItem", "position": 2, "name": "Local SEO & Maps Optimisation", "url": "https://inyutek.com/what-we-do#local-seo" },
                            { "@type": "ListItem", "position": 3, "name": "Google Ads & Meta Ads Management", "url": "https://inyutek.com/what-we-do#google-ads" },
                            { "@type": "ListItem", "position": 4, "name": "Social Media Marketing", "url": "https://inyutek.com/what-we-do#social-media" },
                            { "@type": "ListItem", "position": 5, "name": "E-commerce SEO & Content", "url": "https://inyutek.com/what-we-do#ecommerce-seo" },
                            { "@type": "ListItem", "position": 6, "name": "CRM, Automation & Follow-Up", "url": "https://inyutek.com/what-we-do#crm-automation" }
                        ]
                    })
                }}
            />
            <MobileServices />
            <DesktopServices />
        </>
    )
}
