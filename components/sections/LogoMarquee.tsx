"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

// Repeat the logo multiple times to ensure seamless infinite scroll
const logos = Array(10).fill({
    name: "INYUTEK",
    // Placeholder icon or just text if no logo asset
    icon: (
        <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
        </svg>
    )
})

export function LogoMarquee() {
    return (
        <ScrollReveal enableDesktop={false} className="relative bg-white py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-10">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                    Trusted by growth leaders across industries
                </p>
            </div>

            <div className="relative flex overflow-x-hidden">
                {/* Marquee Container */}
                <motion.div
                    className="flex flex-nowrap gap-16 items-center"
                    animate={{ x: [0, -1000] }} // Adjust logic for seamless loop based on width
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20, // Adjust speed
                            ease: "linear",
                        },
                    }}
                >
                    {/* Double the logos for seamless loop logic if needed, or use a very long list */}
                    {[...logos, ...logos, ...logos].map((logo, index) => (
                        <div key={index} className="flex items-center text-[#000024] font-black text-2xl tracking-wider select-none shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                            {/* If user wants "mine logo", we assume Inyutek */}
                            {/* {logo.icon} */}
                            {/* Using just text for cleaner look if logo asset missing, or SVGs if available. 
                                User said "use mine logo", I'll try to find if there's an SVG in code or just use text INYUTEK 
                                matching the navbar style. Navbar uses text "INYUTEK". I'll use that. */}
                            <span className="uppercase">INYUTEK</span>
                        </div>
                    ))}
                </motion.div>

                {/* Duplicate for seamless effect if using CSS text marquee, but Framer needs specific width calc. 
                    Better approach for pure infinite scroll with Framer without measuring width: 
                    Use 2 sets of children and move them. 
                */}
            </div>

            {/* Gradient Fade Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent" />
        </ScrollReveal>
    )
}
