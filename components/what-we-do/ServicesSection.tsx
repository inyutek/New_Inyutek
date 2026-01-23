"use client"

import { useRef, useState } from "react"
import Link from "next/link"

// Data for the Cards
const services = [
    {
        id: 1,
        title: "Conversion-Focused Landing Pages & CRO",
        description: "Built for buyers, not just browsing. Real copy, strong offers, and friction-free paths to booking or buying. We measure exactly what converts.",
        icon: (
            <svg className="w-10 h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <path d="M9 21V9" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Google Ads + Meta Ads Management",
        description: "Stop wasting budget on low-quality clicks. We align ads with landing pages, test creative, and optimize weekly for lower CPA/CPL.",
        icon: (
            <svg className="w-10 h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8l4 8H8z" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Local SEO Maps + “near me” search",
        description: "Dominate the map pack. We optimize your Google Business Profile and build local authority so high-intent neighbors find you first.",
        icon: (
            <svg className="w-10 h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        )
    },
    {
        id: 4,
        title: "E-commerce SEO + Content",
        description: "Capture buyers, not just readers. We target product/category keywords and fix technical issues to drive organic sales.",
        icon: (
            <svg className="w-10 h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
        )
    },
    {
        id: 5,
        title: "Social Media Marketing (Organic + Paid)",
        description: "Content that gets inquiries, not just likes. We build campaigns with clear CTAs: DM, WhatsApp, or visit the shop.",
        icon: (
            <svg className="w-10 h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        )
    },
    {
        id: 6,
        title: "CRM, Automation & Follow-Up",
        description: "Speed-to-lead matters. We set up auto-replies, lead routing, and nurture sequences so you never miss an opportunity.",
        icon: (
            <svg className="w-10 h-10 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        )
    }
]

function ServiceCard({
    data,
    className
}: {
    data: any;
    className?: string;
}) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={`group relative overflow-hidden bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-6 h-full cursor-pointer ${className}`}
        >
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-[#000024] group-hover:scale-110 transition-transform duration-300">
                {data.icon}
            </div>

            <div className="flex-1">
                <h4 className="text-xl font-bold text-[#000024] leading-tight mb-2">
                    {data.title}
                </h4>
            </div>

            <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100`}>
                <div className="overflow-hidden">
                    <p className="text-gray-600 text-sm font-normal leading-relaxed pt-2">
                        {data.description}
                    </p>
                </div>
            </div>
        </div>
    )
}


export function ServicesSection() {
    return (
        <section id="services" className="bg-[#fbfbfb] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Centered Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <span className="text-xs font-bold text-[#000024] opacity-50 uppercase tracking-[0.2em] font-mono"></span>
                    <h2 className="mt-4 text-3xl md:text-5xl font-bold text-[#000024] tracking-tight leading-[1.1] max-w-4xl mx-auto">
                        Choose the growth lever—or let us build the full lead system
                    </h2>
                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto font-normal">
                        Start with one service or combine them into a complete funnel: <br className="hidden md:block" /> traffic → conversion → follow-up → revenue.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                    {services.map((service, index) => (
                        <div key={service.id} className="h-auto">
                            <ServiceCard data={service} className="h-full min-h-[280px]" />
                        </div>
                    ))}
                </div>

                {/* Audit CTA below the grid */}
                <div className="mt-16 text-center">
                    <a href="https://calendar.app.google/8HF9LdQVVndKzWC7A" target="_blank" rel="noreferrer">
                        <button className="px-8 py-4 bg-[#000024] text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition-all hover:-translate-y-1">
                            Book a free growth audit
                        </button>
                    </a>
                    <p className="mt-4 text-sm text-gray-500">
                        We’ll identify the top 3 leaks blocking calls, bookings, or sales.
                    </p>
                </div>

            </div>
        </section>
    )
}
