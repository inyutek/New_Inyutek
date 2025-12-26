"use client"

import { motion } from "framer-motion"
import { ease } from "@/components/motion-presets"
import { useState, useRef, useEffect } from "react"

const PHONE_NUMBER = "9112235551"
const WHATSAPP_NUMBER = "919112235551"

const WHATSAPP_TEXT = encodeURIComponent(
    "Hi Inyutek team, I want to schedule a meeting."
)

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`
const CALL_LINK = `tel:${PHONE_NUMBER}`

export function CTASection() {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

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
                    className="mt-6 text-base md:text-sm font-normal text-gray-500 max-w-lg mx-auto"
                >
                    A strategy call is 30 minutes. We listen, diagnose, and show you what's possible.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: 0.55 }}
                    className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 relative"
                    style={{ zIndex: 40 }}
                >
                    <div className="relative w-full md:w-auto" ref={ref}>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="w-full md:w-auto px-8 py-3 bg-[#000024] text-white rounded-md font-medium shadow-lg hover:bg-[#000024]/90 transition-all hover:-translate-y-1"
                        >
                            Schedule a free call
                        </button>

                        {open && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-xl border border-black/10 bg-white shadow-lg overflow-hidden z-50 text-left">
                                <a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-3 text-sm text-black/80 hover:bg-black/5"
                                >
                                    WhatsApp
                                    <div className="text-xs text-black/50 mt-0.5">
                                        Message us directly
                                    </div>
                                </a>

                                <a
                                    href={CALL_LINK}
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-3 text-sm text-black/80 hover:bg-black/5"
                                >
                                    Call
                                    <div className="text-xs text-black/50 mt-0.5">
                                        {PHONE_NUMBER}
                                    </div>
                                </a>

                                <a
                                    href="https://calendar.app.google/8HF9LdQVVndKzWC7A"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-3 text-sm text-black/80 hover:bg-black/5 border-t border-black/5"
                                >
                                    Schedule a meeting
                                    <div className="text-xs text-black/50 mt-0.5">
                                        Book a time on our calendar
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                </motion.div>

            </div>
        </section >
    )
}
