"use client"

import { motion } from "framer-motion"
import { ease } from "@/components/motion-presets"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
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
                        className="type-h2"
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
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto"
                        >
                            <button className="w-full sm:w-auto px-8 py-3 bg-[#000024] text-white rounded-md font-medium shadow-lg hover:bg-[#000024]/90 transition-all hover:-translate-y-1">
                                Book a free growth audit
                            </button>
                        </Link>
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <button className="w-full sm:w-auto px-8 py-3 bg-white text-[#000024] border border-[#000024]/20 rounded-md font-medium hover:bg-gray-50 transition-all hover:-translate-y-1">
                                Message us on WhatsApp
                            </button>
                        </a>
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
