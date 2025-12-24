"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const processes = [
    {
        id: 1,
        title: "Audit and diagnose",
        description: "We start by looking at what's broken. Traffic patterns, conversion rates, messaging gaps—we find where money is leaking out of your funnel.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Design the funnel",
        description: "Build a clear path for your users. We map out the journey from first touch to final sale.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12h20"></path>
                <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"></path>
                <path d="M9 12v-3"></path>
                <path d="M15 12v-3"></path>
                <path d="M12 3v3"></path>
            </svg>
        )
    },
    {
        id: 3,
        title: "Build and launch",
        description: "We implement the copy, design, and tech stack needed to capture and convert leads effectively.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
        )
    },
    {
        id: 4,
        title: "Optimize and scale",
        description: "We map your traffic, measure where leads drop, and identify what's killing your conversion rate. Nothing gets fixed until we know what's broken.",
        icon: (
            <svg className="w-8 h-8 text-[#000024]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
        )
    }
]

export function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // Animation Strategy: Envelope Stack
    // Cards are essentially moving UP to reduce the vertical gap between them.
    // We want to reduce the space to something like 20px (just the top edge visible).

    // Total Scroll Distance: 0 -> 1
    // We can map range [0, 1] to the 'gap' reduction.

    // Card 1: Static (or moves slightly up to stay in view?) -> Actually pinned container handles view. Card 1 stays at top.
    // Card 2: Initial Y = gap (e.g. 220px). Final Y = small offset (e.g. 20px).
    // Card 3: Initial Y = 2 * gap. Final Y = 2 * small offset (40px).
    // Card 4: Initial Y = 3 * gap. Final Y = 3 * small offset (60px).

    const gap = 240 // Approx height of card + margin
    const collapsedGap = 20

    // We use `gap * index` as initial position (CSS).
    // We animate `y` from 0 to -(gap - collapsedGap) * index?
    // Let's us useTransform directly on `y` offset.

    // Easing: use linear map for direct scroll control? Or easeOut for 'smooth'?
    // Direct scroll map usually feels best for "scroll-controlled".

    const c1y = useTransform(scrollYProgress, [0, 1], [0, 0])
    const c2y = useTransform(scrollYProgress, [0, 1], [0, -(gap - collapsedGap)])
    const c3y = useTransform(scrollYProgress, [0, 1], [0, -(gap - collapsedGap) * 2])
    const c4y = useTransform(scrollYProgress, [0, 1], [0, -(gap - collapsedGap) * 3])

    // Scale effect? "Top card moves upward slightly and compresses"
    // Maybe scale down the cards that are *behind*?
    // User said "The top card moves upward slightly and compresses."
    // Let's try scaling down top cards as new ones come up?
    // Or just simply stacking. Let's start with clean Stacking.

    return (
        <div ref={containerRef} className="relative h-[250vh] bg-[#fbfbfb]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-start h-full pt-32">

                    {/* LEFT: Static Content */}
                    <div className="flex flex-col gap-8 md:sticky md:top-32 self-start">
                        <div>
                            <span className="text-sm font-semibold text-gray-900">Process</span>
                            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#000024] tracking-tight">How we build leads</h2>
                            <p className="mt-4 text-sm font-normal text-gray-500 max-w-md">Four phases. One clear path to results.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="px-6 py-3 bg-white border border-gray-200 rounded-md font-medium text-[#000024] shadow-sm hover:bg-gray-50 transition-colors">
                                Learn
                            </button>
                            <a href="#" className="text-sm font-semibold flex items-center gap-2 group text-gray-600 hover:text-[#000024] transition-colors">
                                Build and launch the solution <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>

                    {/* RIGHT: Animated Stack */}
                    <div className="relative w-full h-full flex flex-col items-center">
                        <div className="relative w-full max-w-md flex flex-col" style={{ gap: gap + 'px' }}>
                            {/* style gap is fake here, we positioned them absolutely or use static?
                      If we use static with gap, transform Y will overlap them. 
                      Let's use absolute positioning relative to a container to be precise.
                  */}

                        </div>

                        {/* Re-doing Right Col as Absolute Stack */}
                        <div className="relative w-full max-w-md h-[400px]"> {/* Height doesn't matter much as they float */}

                            {/* Card 1 */}
                            <motion.div
                                style={{ y: c1y, zIndex: 1 }}
                                className="absolute top-0 w-full bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4 h-[220px]"
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                                    {processes[0].icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#000024]">{processes[0].title}</h3>
                                    <p className="mt-2 text-sm font-normal text-gray-500 leading-relaxed">{processes[0].description}</p>
                                </div>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                style={{ y: c2y, top: gap + 'px', zIndex: 2 }} // Start at gap position
                                className="absolute w-full bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4 h-[220px]"
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                                    {processes[1].icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#000024]">{processes[1].title}</h3>
                                    <p className="mt-2 text-sm font-normal text-gray-500 leading-relaxed">{processes[1].description}</p>
                                </div>
                                <div className="mt-auto text-sm font-medium text-gray-400">Explore</div>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div
                                style={{ y: c3y, top: (gap * 2) + 'px', zIndex: 3 }}
                                className="absolute w-full bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4 h-[220px]"
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                                    {processes[2].icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#000024]">{processes[2].title}</h3>
                                    <p className="mt-2 text-sm font-normal text-gray-500 leading-relaxed">{processes[2].description}</p>
                                </div>
                                <div className="mt-auto text-sm font-medium text-gray-400">Explore</div>
                            </motion.div>

                            {/* Card 4 */}
                            <motion.div
                                style={{ y: c4y, top: (gap * 3) + 'px', zIndex: 4 }}
                                className="absolute w-full bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4 h-[220px]"
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                                    {processes[3].icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#000024]">{processes[3].title}</h3>
                                    <p className="mt-2 text-sm font-normal text-gray-500 leading-relaxed">{processes[3].description}</p>
                                </div>
                                <div className="mt-auto text-sm font-medium text-gray-400">Explore &gt;</div>
                            </motion.div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
