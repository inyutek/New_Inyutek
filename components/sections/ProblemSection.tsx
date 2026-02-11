"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Skeleton } from "@/components/ui/skeleton"

const problems = [
    {
        id: 0,
        title: "You’re getting views, not customers",
        description: "People land on your site, scroll, and leave because the offer isn’t instantly clear or compelling.",
        imageColor: "bg-gray-200", // Placeholder for different images
        imageSrc: "/services/No%20customers.jpg",
        icon: (
            <svg className="w-24 h-24 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>
                <path d="m10 14-1-1-3 4h12l-5-7z"></path>
            </svg>
        )
    },
    {
        id: 1,
        title: "Your funnel has friction",
        description: "Too many steps, slow pages, confusing forms, no WhatsApp/call-first path  leads drop before they convert.",
        imageColor: "bg-blue-100", // Just to differentiate visually for now
        imageSrc: "/services/Funnel.jpg",
        icon: (
            <svg className="w-24 h-24 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z"></path>
            </svg>
        )
    },
    {
        id: 2,
        title: "You can’t track what’s working",
        description: "If you don’t know which channel, keyword, or ad created the lead, you can’t scale profitably.",
        imageColor: "bg-red-100", // Just to differentiate visually for now
        imageSrc: "/services/Tracking.jpg",
        icon: (
            <svg className="w-24 h-24 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 14H4V6h16v12z"></path>
                <path d="M7 8h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"></path>
            </svg>
        )
    }
]

function ProblemImageContent({ item }: { item: typeof problems[0] }) {
    const [isLoading, setIsLoading] = useState(true)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (imgRef.current?.complete) {
            setIsLoading(false);
        }
    }, [])

    if (!item.imageSrc) return item.icon

    return (
        <div className="relative w-full h-full">
            {isLoading && <Skeleton className="absolute inset-0 z-10 w-full h-full rounded-none" />}
            <img
                ref={imgRef}
                src={item.imageSrc}
                alt={item.title}
                className={`w-full h-auto object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
            />
        </div>
    )
}

function MobileProblem() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null) // Start closed or 0 if desired

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className="flex flex-col gap-6 md:hidden">
            {problems.map((item, index) => (
                <ScrollReveal
                    key={item.id}
                    className={`
                        bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer
                        ${activeIndex === index ? "shadow-md ring-1 ring-gray-200" : "border border-transparent"}
                    `}
                >
                    <div onClick={() => handleToggle(index)}>
                        {/* Header / Trigger */}
                        <div className="p-6 text-center">
                            <h3 className={`type-card-title transition-colors duration-300 ${activeIndex === index ? "text-[#000024]" : "text-gray-400"}`}>
                                {item.title}
                            </h3>
                        </div>

                        {/* Expandable Content */}
                        <AnimatePresence initial={false}>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-8 pt-0 flex flex-col items-center gap-6">
                                        <p className="type-body text-center">
                                            {item.description}
                                        </p>

                                        {/* Inline Image Display */}
                                        <div className={`w-full max-w-xs mx-auto rounded-lg flex items-center justify-center text-gray-400 relative overflow-hidden ${item.imageColor}`}>
                                            <ProblemImageContent item={item} />
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

function DesktopProblem() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className={"hidden md:block mx-auto max-w-7xl"}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                {/* Left Column: Interactive List */}
                <div className="flex flex-col gap-10">
                    {problems.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => setActiveIndex(index)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`cursor-pointer transition-all duration-300 ${index !== problems.length - 1 ? "border-b border-gray-100 pb-10" : ""
                                }`}
                        >
                            <h3 className={`type-card-title transition-colors duration-300 mb-3 ${activeIndex === index ? "!text-[#000024]" : "!text-gray-300"
                                }`}>
                                {item.title}
                            </h3>
                            <p className={`type-body transition-colors duration-300 ${activeIndex === index ? "!text-gray-600" : "!text-gray-300"
                                }`}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Right Column: Image Display */}
                <div className="relative w-full max-w-md mx-auto rounded-2xl bg-gray-50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`relative flex items-center justify-center text-gray-400 overflow-hidden rounded-2xl ${problems[activeIndex].imageColor}`}
                        >
                            <ProblemImageContent item={problems[activeIndex]} />
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    )
}

export function ProblemSection() {
    return (
        <section id="problem" className="bg-white py-24 sm:py-32">
            <div className="mx-auto w-full px-6 lg:px-8">

                {/* Shared Header */}
                <div className={"mx-auto max-w-3xl text-center mb-16 md:mb-24"}>

                    <h2 className="type-h2 mb-6">
                        Most businesses don’t have a traffic problem  they have a conversion problem
                    </h2>
                    <p className="type-body max-w-2xl mx-auto mb-2">
                        You can get attention from Google, ads, or social  but if your message is unclear and your funnel is weak, visitors don’t become calls, bookings, or purchases. We fix the leaks that kill conversion.
                    </p>

                </div>

                <MobileProblem />
                <DesktopProblem />

                <div className="mt-16 flex justify-center">
                    <div className=" border-gray-00 rounded-lg px-8 py-3 3shadow-sm">
                        <p className="type-body">
                            <span className="font-bold">Result:</span> Wasted ad spend, inconsistent lead flow, and low-quality inquiries.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
