"use client"

import { motion } from "framer-motion"
import { ease } from "@/components/motion-presets"

export function CTASection() {
    return (
        <section className="py-32 md:py-48 bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">

                {/* Headline Container */}
                <div className="flex flex-col items-center justify-center gap-1 md:gap-2">

                    {/* Line 1: From Down-Left, Rotate Clockwise */
                        /* Starts at -6deg, moves to 0 */
                    }
                    <motion.h2
                        initial={{ opacity: 0, x: -150, y: 80, rotate: -8 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
                        className="text-3xl md:text-5xl font-bold text-[#000024] tracking-tight leading-tight"
                    >
                        Ready to talk
                    </motion.h2>

                    {/* Line 2: From Down-Right, Rotate Anti-Clockwise */
                        /* Starts at 6deg, moves to 0 */
                    }
                    <motion.h2
                        initial={{ opacity: 0, x: 150, y: 80, rotate: 8 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
                        className="text-3xl md:text-5xl font-bold text-[#000024] tracking-tight leading-tight"
                    >
                        Not the right fit
                    </motion.h2>
                </div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: 0.4 }}
                    className="mt-6 text-sm font-normal text-gray-500 max-w-lg mx-auto"
                >
                    A strategy call is 30 minutes. We listen, diagnose, and show you what's possible.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: 0.55 }}
                    className="mt-10 flex items-center justify-center gap-4"
                >
                    <button className="px-8 py-3 bg-[#000024] text-white rounded-md font-medium shadow-lg hover:bg-[#000024]/90 transition-all hover:-translate-y-1">
                        Book
                    </button>
                    <button className="px-8 py-3 bg-white border border-gray-200 text-[#000024] rounded-md font-medium shadow-sm hover:bg-gray-50 transition-all hover:-translate-y-1">
                        Learn
                    </button>
                </motion.div>

            </div>
        </section>
    )
}
