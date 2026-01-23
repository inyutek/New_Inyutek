"use client"

import { Phone, Calendar, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function StickyMobileButtons() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-4 md:hidden flex items-center justify-between gap-3 safe-area-pb"
                >
                    <a
                        href="tel:9112235551"
                        className="flex-1 flex flex-col items-center justify-center gap-1 text-[#000024] active:opacity-70"
                    >
                        <Phone className="w-5 h-5" />
                        <span className="text-[10px] font-medium uppercase tracking-wide">Call</span>
                    </a>

                    <a
                        href="#booking-form"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex-[2] bg-[#000024] text-white py-3 rounded-lg flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform"
                    >
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-bold">Book Audit</span>
                    </a>

                    <a
                        href="https://wa.me/919112235551"
                        className="flex-1 flex flex-col items-center justify-center gap-1 text-[#000024] active:opacity-70"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-[10px] font-medium uppercase tracking-wide">WhatsApp</span>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
