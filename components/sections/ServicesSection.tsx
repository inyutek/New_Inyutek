"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

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
        description: "Launch and optimize campaigns built for qualified leads, not vanity metrics—tracking CPL and lead quality from day one.",
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
        description: "Content + campaigns that earn attention and move people to action—DMs, inquiries, and site conversions.",
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
        description: "GA4, pixels, conversion events, dashboards—so every channel is measurable and scalable.",
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
            <p className="type-body">
                {data.description}
            </p>
        </div>
    )
}

function MobileServices() {
    return (
        <div id="services-mobile" className="block lg:hidden py-20 px-6 bg-[#fbfbfb]">
            <div className="flex flex-col gap-6">
                {/* Featured Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full bg-black rounded-3xl overflow-hidden shadow-xl p-8 text-white min-h-[400px] flex flex-col justify-center text-center"
                >
                    <div className="text-sm font-medium uppercase tracking-wider mb-4 opacity-80">Services</div>
                    <h3 className="type-h2 mb-4 !text-gray-50">Services built to create <br /> consistent lead flow</h3>
                    <p className="type-body opacity-80 mb-8">Pick one growth lever—or let us build the full lead system end-to-end (strategy → execution → optimization).</p>

                    <div className="flex flex-col items-center gap-3 w-full">
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <Link href="/services" className="w-full flex-1">
                                <button className="w-full px-6 py-3 bg-white text-black rounded-lg font-medium transition-all hover:bg-gray-100">
                                    Explore all services →
                                </button>
                            </Link>
                            <Link href="/contact" className="w-full flex-1">
                                <button className="w-full px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg font-medium border border-white/20 transition-all hover:bg-white/20 text-white">
                                    Book a free growth audit
                                </button>
                            </Link>
                        </div>
                        <p className="text-xs text-center text-white/60">
                            We’ll identify the top 3 leaks blocking calls, bookings, or sales.
                        </p>
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

    // Unified List Animation
    // Scroll the entire list up as the user scrolls down the page.
    // Adjust the output range (e.g., "-50%") based on how many cards need to be revealed.
    const listY = useTransform(scrollYProgress, [0.35, 0.9], ["0%", "-55%"])

    return (
        <div id="services" ref={containerRef} className="hidden lg:block relative h-[300vh] bg-[#fbfbfb]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                <div className="w-full mx-auto px-6 lg:px-8 relative h-full flex items-center justify-between">

                    {/* Grid Layout Helper */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full h-[60vh]">
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
                        className="absolute top-1/2 -translate-y-1/2 z-20 h-[50vh] lg:h-[60vh] bg-black rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-black">
                            {/* Gradient removed for pure black look */}
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white">
                            <div className="text-sm font-medium uppercase tracking-wider mb-4 opacity-80"></div>
                            <h3 className="type-h2 mb-4 !text-gray-50">Services built to create <br /> consistent lead flow</h3>
                            <p className="type-body opacity-80 max-w-2xl mb-8 !text-gray-50">Pick one growth lever or let us build the full lead system end-to-end <br />strategy → execution → optimization .</p>

                            <div className="flex flex-col gap-3 w-full md:w-auto">
                                <div className="flex gap-4 w-full md:w-auto">
                                    <Link href="/services" className="w-full md:w-auto">
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
                                <p className="text-xs text-center text-white/60">
                                    We’ll identify the top 3 leaks blocking calls, bookings, or sales.
                                </p>
                            </div>
                        </div>
                    </motion.div>


                    {/* RIGHT SIDE CARDS STACK */}
                    {/* Visual window for the list */}
                    <motion.div
                        style={{ opacity: rightOpacity }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-[48%] h-[60vh] overflow-hidden rounded-2xl [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] pr-[2%]"
                    >
                        {/* Scrolling Container */}
                        <motion.div
                            style={{ y: listY }}
                            className="flex flex-col gap-4 pr-[5%] pb-50"
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
            <MobileServices />
            <DesktopServices />
        </>
    )
}
