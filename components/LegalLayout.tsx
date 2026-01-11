"use client"

import { ReactNode } from "react"
import Footer from "@/components/sections/Footer"
import { motion } from "framer-motion"

interface LegalLayoutProps {
    title: string
    description?: string
    lastUpdated: string
    children: ReactNode
}

export function LegalLayout({
    title,
    description,
    lastUpdated,
    children
}: LegalLayoutProps) {
    return (
        <main className="min-h-screen bg-white">
            {/* 2. Minimal Hero */}
            <section className="relative w-full bg-[#fbfbfb] pt-32 pb-20 px-6 sm:px-8">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-xs font-bold text-[#000024] opacity-50 uppercase tracking-[0.2em] mb-6">
                            Legal
                        </p>
                        <h1 className="text-4xl md:text-5xl font-black text-[#000024] tracking-tight mb-6">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-lg md:text-xl text-gray-500 font-normal leading-relaxed mb-6 max-w-2xl">
                                {description}
                            </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
                            Last updated: {lastUpdated}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Content Container */}
            <section className="px-6 sm:px-8 py-16 md:py-24">
                <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-bold prose-headings:text-[#000024] prose-p:text-gray-600 prose-p:leading-8 prose-li:text-gray-600 prose-strong:text-[#000024]">
                    {children}
                </div>
            </section>

            {/* 4. Global Footer */}
            <Footer />
        </main>
    )
}
