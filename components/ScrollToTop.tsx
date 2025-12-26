"use client"

import { ChevronUp } from "lucide-react"
import { motion } from "framer-motion"

export default function ScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <div className="flex justify-center pb-12 bg-[#fbfbfb]">
            <motion.button
                onClick={scrollToTop}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, opacity: 0.9 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#000024] text-white p-3 rounded-full shadow-lg transition-all duration-300"
                aria-label="Scroll to top"
            >
                <ChevronUp className="w-6 h-6" />
            </motion.button>
        </div>
    )
}
