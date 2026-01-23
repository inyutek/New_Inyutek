"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

const PHONE_NUMBER = "9112235551"
const WHATSAPP_NUMBER = "919112235551"
const WHATSAPP_TEXT = encodeURIComponent("Hi Inyutek team, I want to schedule a meeting.")
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`
const CALL_LINK = `tel:${PHONE_NUMBER}`

export function Hero() {
    const [bookOpen, setBookOpen] = useState(false)
    const bookRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (bookRef.current && !bookRef.current.contains(e.target as Node)) {
                setBookOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div id="hero" className="relative bg-[#fbfbfb] pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center overflow-hidden">
            <div className="relative z-40 max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#000024] leading-[1.1] mb-8 mx-auto">
                    Digital marketing services that drive calls, bookings, and sales
                </h1>

                <div className="max-w-4xl mx-auto mb-10 flex flex-col gap-6 items-center justify-center">
                    <p className="text-base md:text-lg font-normal text-gray-600 leading-relaxed max-w-2xl">
                        We build conversion-focused landing pages, run Google/Meta campaigns + SEO, and set up tracking and follow up so growth is measurable not guessed.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
                    <div className="relative w-full sm:w-auto" ref={bookRef}>
                        <button
                            onClick={() => setBookOpen(!bookOpen)}
                            className="w-full sm:w-auto px-8 py-4 bg-[#000024] text-white text-base rounded-lg font-medium shadow-lg hover:opacity-90 transition-all hover:-translate-y-1 flex items-center justify-center min-w-[160px]"
                        >
                            Book a Free Growth Audit
                        </button>

                        {bookOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-16 w-64 rounded-xl border border-black/10 bg-white shadow-xl overflow-hidden text-left z-50">
                                <a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setBookOpen(false)}
                                    className="block px-5 py-4 text-sm text-black/80 hover:bg-black/5"
                                >
                                    WhatsApp
                                    <div className="text-xs text-black/50 mt-1">
                                        Message us directly
                                    </div>
                                </a>

                                <a
                                    href={CALL_LINK}
                                    onClick={() => setBookOpen(false)}
                                    className="block px-5 py-4 text-sm text-black/80 hover:bg-black/5"
                                >
                                    Call
                                    <div className="text-xs text-black/50 mt-1">
                                        {PHONE_NUMBER}
                                    </div>
                                </a>

                                <a
                                    href="https://calendar.app.google/8HF9LdQVVndKzWC7A"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setBookOpen(false)}
                                    className="block px-5 py-4 text-sm text-black/80 hover:bg-black/5 border-t border-black/5"
                                >
                                    Schedule a meeting
                                    <div className="text-xs text-black/50 mt-1">
                                        Book a time on our calendar
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                    <Link
                        href="/how-we-work"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-[#000024] text-base border border-[#000024]/20 rounded-lg font-medium hover:bg-gray-50 transition-all hover:-translate-y-1 flex items-center justify-center"
                    >
                        See How We Work
                    </Link>
                </div>
                <div className="mt-6 text-sm text-gray-500 font-medium tracking-wide uppercase">
                    Free audit • clear priorities • zero pressure
                </div>
            </div>
        </div>
    )
}
