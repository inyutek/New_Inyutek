"use client"

import { motion } from "framer-motion"
import { ease } from "@/components/motion-presets"
import { useState, useRef, useEffect } from "react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Modal } from "@/components/ui/modal"
import { HubSpotContactForm } from "@/components/ui/hubspot-contact-form"

const PHONE_NUMBER = "9112235551"
const WHATSAPP_NUMBER = "919112235551"

const WHATSAPP_TEXT = encodeURIComponent(
    "Hi Inyutek team, I want to schedule a meeting."
)

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`
const CALL_LINK = `tel:${PHONE_NUMBER}`

export function CTASection() {
    const [open, setOpen] = useState(false)
    const [showHubSpotForm, setShowHubSpotForm] = useState(false)
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
                <ScrollReveal enableDesktop={false} className="flex flex-col items-center justify-center gap-1 md:gap-2">
                    <motion.h2
                        initial={{ opacity: 0, y: 40, x: 0, rotate: 0 }}
                        whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                        className="text-3xl md:text-5xl font-bold text-[#000024] tracking-tight leading-tight"
                    >
                        Ready for more calls, bookings, and sales?
                    </motion.h2>
                </ScrollReveal>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: 0.4 }}
                    className="mt-6 text-base md:text-sm font-normal text-gray-500 max-w-lg mx-auto"
                >
                    Book a free 30-minute growth audit. We’ll diagnose your funnel and give you the next 3 highest impact moves.
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
                            Book a free growth audit
                        </button>

                        {open && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-xl border border-black/10 bg-white shadow-lg overflow-hidden z-50 text-left">
                                <div
                                    onClick={() => {
                                        setOpen(false)
                                        setShowHubSpotForm(true)
                                    }}
                                    className="block px-4 py-3 text-sm text-black/80 hover:bg-black/5 cursor-pointer"
                                >
                                    Contact us
                                    <div className="text-xs text-black/50 mt-0.5">
                                        Send us an email
                                    </div>
                                </div>

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

                {/* Disclaimer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: 0.7 }}
                    className="mt-8 text-xs text-gray-400 max-w-md mx-auto italic"
                >
                    Limited slots weekly • 30 minutes • real recommendations <br />
                    <span className="opacity-70 mt-4 block">Not a fit if you want vanity metrics, overnight miracles, or you’re not ready to track leads properly</span>
                </motion.p>

                <Modal isOpen={showHubSpotForm} onClose={() => setShowHubSpotForm(false)}>
                    <HubSpotContactForm />
                </Modal>

            </div>
        </section >
    )
}
