"use client"

import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Step {
    title: string
    do: string
    get: string
}

export function ProcessStepCard({ step }: { step: Step }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")

    // Force expanded on mobile, use hover state on desktop
    const showExpanded = isMobile ? true : isExpanded

    return (
        <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden cursor-pointer text-center"
        >
            <h3 className={`type-card-title relative z-10 transition-all duration-300 ${showExpanded ? "mb-4" : ""} md:group-hover:mb-4`}>
                {step.title}
            </h3>

            <div className={`grid transition-all duration-500 ease-in-out ${showExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100`}>
                <div className="overflow-hidden space-y-4 pt-2">
                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">What we do</span>
                        <p className="text-gray-700 mt-1">{step.do}</p>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">What you get</span>
                        <p className="text-[#000024] font-medium mt-1">{step.get}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
