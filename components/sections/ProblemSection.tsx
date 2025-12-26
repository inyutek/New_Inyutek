"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const problems = [
    {
        id: 0,
        title: "Traffic without conversion",
        description: "You're paying for clicks that don't move the needle. Visitors land, scroll, and leave without taking action.",
        imageColor: "bg-gray-200", // Placeholder for different images
        icon: (
            <svg className="w-24 h-24 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>
                <path d="m10 14-1-1-3 4h12l-5-7z"></path>
            </svg>
        )
    },
    {
        id: 1,
        title: "Messaging that misses",
        description: "Your value proposition doesn't land with the right buyers. The words on your site don't match how your customers think.",
        imageColor: "bg-blue-100", // Just to differentiate visually for now
        icon: (
            <svg className="w-24 h-24 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z"></path>
            </svg>
        )
    },
    {
        id: 2,
        title: "Funnels that leak",
        description: "Even good leads drop off because your process is unclear. There's no clear path from awareness to decision.",
        imageColor: "bg-red-100", // Just to differentiate visually for now
        icon: (
            <svg className="w-24 h-24 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 14H4V6h16v12z"></path>
                <path d="M7 8h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"></path>
            </svg>
        )
    }
]

export function ProblemSection() {
    const [activeIndex, setActiveIndex] = useState(0)



    return (
        <section id="problem" className="bg-white py-24 sm:py-32">
            <div className="mx-auto w-full px-6 lg:px-8">

                {/* Centered Header */}
                <div className="mx-auto max-w-3xl text-center mb-24">
                    <div className="text-sm font-semibold leading-7 text-gray-900 mb-4">Problem</div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#000024] sm:text-3xl mb-6">
                        Your website isn&apos;t built to sell
                    </h2>
                    <p className="text-base md:text-sm font-normal leading-relaxed text-gray-600 max-w-2xl mx-auto mb-8">
                        You&apos;re getting traffic but no leads. Your messaging doesn&apos;t speak to what buyers actually
                        need, and your funnel leaks money at every stage.
                    </p>


                </div>

                {/* Two Column Feature Block */}
                <div className="mx-auto max-w-7xl">
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
                                    <h3 className={`text-lg font-bold tracking-tight transition-colors duration-300 mb-3 ${activeIndex === index ? "text-[#000024]" : "text-gray-300"
                                        }`}>
                                        {item.title}
                                    </h3>
                                    <p className={`text-base md:text-sm font-normal leading-relaxed transition-colors duration-300 ${activeIndex === index ? "text-gray-600" : "text-gray-300"
                                        }`}>
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Image Display */}
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`absolute inset-0 flex items-center justify-center text-gray-400 ${problems[activeIndex].imageColor}`}
                                >
                                    {problems[activeIndex].icon}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}
