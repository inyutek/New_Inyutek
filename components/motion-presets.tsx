"use client"

import { motion } from "framer-motion"

export const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease, delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const staggerContainer = {
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

export const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export const heroIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
}
