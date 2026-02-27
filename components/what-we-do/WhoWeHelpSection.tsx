"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import Image from "next/image"

const audiences = [
    {
        id: 0,
        title: "Local service businesses",
        description: "Get more calls, WhatsApp inquiries, and bookings.",
        imageColor: "bg-gray-100",
        imageSrc: "/services/local-businesses-desktop.webp",
        icon: (
            <svg className="w-24 h-24 opacity-30 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            </svg>
        )
    },
    {
        id: 1,
        title: "Ecommerce brands",
        description: "Get more purchases, higher conversion rate, and lower CPA.",
        imageColor: "bg-gray-200",
        imageSrc: "/services/E-commerce-desktop.webp",
        icon: (
            <svg className="w-24 h-24 opacity-30 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
        )
    },
    {
        id: 2,
        title: "Early-stage founders",
        description: "Validate offers and build a funnel you can scale.",
        imageColor: "bg-gray-100",
        imageSrc: "/services/Startup-desktop.webp",
        icon: (
            <svg className="w-24 h-24 opacity-30 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
        )
    }
]

function MobileWhoWeHelp() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className="flex flex-col gap-6 md:hidden">
            {audiences.map((item, index) => (
                <ScrollReveal
                    key={item.id}
                    className={`
                        bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer
                        ${activeIndex === index ? "shadow-md ring-1 ring-gray-200" : "border border-transparent"}
                    `}
                >
                    <div onClick={() => handleToggle(index)}>
                        <div className="p-6 text-center">
                            <h3 className={`type-card-title transition-colors duration-300 ${activeIndex === index ? "text-[#000024]" : "text-gray-400"}`}>
                                {item.title}
                            </h3>
                        </div>

                        <AnimatePresence initial={false}>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-8 pt-0 flex flex-col items-center gap-6">
                                        <p className="text-sm font-normal text-gray-600 leading-relaxed text-center">
                                            {item.description}
                                        </p>
                                        <div className={`w-3/5 aspect-square rounded-lg flex items-center justify-center text-gray-400 mx-auto overflow-hidden relative ${item.imageColor}`}>
                                            {item.imageSrc ? (
                                                <Image
                                                    src={item.imageSrc}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            ) : (
                                                item.icon
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    )
}

function DesktopWhoWeHelp() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <div className="hidden md:block mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="flex flex-col gap-10">
                    {audiences.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => setActiveIndex(index)}
                            onMouseEnter={() => {
                                setActiveIndex(index)
                                setHoveredIndex(index)
                            }}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`cursor-pointer transition-all duration-500 ${index !== audiences.length - 1 ? "border-b border-gray-100 pb-10" : ""}`}
                            style={{
                                opacity: hoveredIndex === index ? 1 : 0.4
                            }}
                        >
                            <h3 className={`type-card-title transition-colors duration-500 mb-3 ${hoveredIndex === index ? "text-[#000024]" : "text-gray-400"}`}>
                                {item.title}
                            </h3>
                            <p className={`type-body transition-colors duration-500 ${hoveredIndex === index ? "text-gray-600" : "text-gray-400"}`}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-gray-50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden ${audiences[activeIndex].imageColor}`}
                        >
                            {audiences[activeIndex].imageSrc ? (
                                <Image
                                    src={audiences[activeIndex].imageSrc}
                                    alt={audiences[activeIndex].title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                audiences[activeIndex].icon
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export function WhoWeHelpSection() {
    return (
        <section id="who-we-help" className="bg-white py-24 sm:py-32">
            <div className="mx-auto w-full px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-16 md:mb-24">
                    <h2 className="type-h2 mb-6">
                        Built for businesses that need growth, not vanity metrics
                    </h2>
                    <p className="type-body max-w-2xl mx-auto mb-2">
                        If you're serious about generating leads or sales consistently, we'll build the system and optimize it week by week.
                    </p>
                </div>

                <MobileWhoWeHelp />
                <DesktopWhoWeHelp />
            </div>
        </section>
    )
}
