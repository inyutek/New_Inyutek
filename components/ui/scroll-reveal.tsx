"use client"

import { motion } from "framer-motion"

interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    enableDesktop?: boolean
}

export function ScrollReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    enableDesktop = false
}: ScrollRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={`${className} ${!enableDesktop ? "md:!opacity-100 md:!translate-y-0" : ""}`}
        >
            {children}
        </motion.div>
    )
}
