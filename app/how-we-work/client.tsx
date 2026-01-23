"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Modal } from "@/components/ui/modal"
import { BlueprintForm } from "@/components/ui/blueprint-form"
import Footer from "@/components/sections/Footer"
import { FAQ } from "@/components/sections/FAQ"

// FAQ Data
const faqs = [
    {
        question: "How long until we see results?",
        answer: "Some improvements show quickly: landing pages + tracking. SEO compounds over time. Ads can generate leads faster once the funnel is ready."
    },
    {
        question: "Do you handle everything or work with our team?",
        answer: "Either. We can execute end-to-end or plug into your existing team."
    },
    {
        question: "What if we don’t have a strong offer yet?",
        answer: "Then we start with offer clarity and a simple funnel—because weak offers don’t convert, no matter the channel."
    },
    {
        question: "Do you do long-term contracts?",
        answer: "We prefer performance-based ongoing work, but we can start with a one-time funnel build."
    }
]


export default function HowWeWorkClient() {
    const [isBlueprintOpen, setIsBlueprintOpen] = useState(false)


    return (
        <div className="bg-[#fbfbfb] text-[#000024]">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.1] mb-8">
                        How we turn clicks into calls, bookings, and sales
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
                        A simple, repeatable system: we diagnose what’s leaking, build the funnel, launch fast, then optimize weekly based on real conversion data.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <button
                            onClick={() => setIsBlueprintOpen(true)}
                            className="w-full sm:w-auto px-8 py-4 bg-[#000024] text-white rounded-lg font-bold text-lg shadow-xl hover:bg-[#000024]/90 transition-all hover:-translate-y-1"
                        >
                            Book a Free Growth Audit
                        </button>
                        <Link
                            href="/what-we-do"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-[#000024] border border-[#000024]/10 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all hover:-translate-y-1"
                        >
                            View Services
                        </Link>
                    </div>

                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Free audit • clear priorities • zero pressure
                    </p>
                </div>
            </section>

            {/* WHAT MAKES THIS WORK */}
            <section className="py-24 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                                Marketing works when the funnel is measurable
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Most businesses try random tactics. We focus on the full path: traffic → landing page → conversion → follow-up → revenue, with tracking at every step.
                            </p>
                        </div>

                        <div className="bg-[#fbfbfb] rounded-2xl p-8 border border-gray-100">
                            <div className="flex flex-wrap gap-3 justify-center">
                                {["Clear offer", "Conversion-first pages", "Qualified leads", "Fast follow-up", "Weekly optimization"].map((item, i) => (
                                    <span key={i} className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#000024] shadow-sm border border-gray-100">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR 4-STEP PROCESS */}
            <section className="py-24 md:py-32 bg-[#fbfbfb]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 md:mb-24 tracking-tight">
                        Our lead generation process
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Step 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <span className="text-9xl font-black">1</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Step 1 — Audit & Diagnose</h3>
                            <div className="space-y-4 relative z-10">
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">What we do</span>
                                    <p className="text-gray-700 mt-1">Review your offer, website/landing page, ads/SEO, tracking, and competitors.</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">What you get</span>
                                    <p className="text-[#000024] font-medium mt-1">A short action plan with the top 3 bottlenecks blocking growth.</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <span className="text-9xl font-black">2</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Step 2 — Funnel Plan</h3>
                            <div className="space-y-4 relative z-10">
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">What we do</span>
                                    <p className="text-gray-700 mt-1">Clarify your positioning, craft the core message, and map the conversion path.</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">What you get</span>
                                    <p className="text-[#000024] font-medium mt-1">Funnel map + page outline + KPI targets (calls/bookings/sales).</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <span className="text-9xl font-black">3</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Step 3 — Build & Launch</h3>
                            <div className="space-y-4 relative z-10">
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">What we do</span>
                                    <p className="text-gray-700 mt-1">Build/upgrade landing pages, set up tracking, implement CRM follow-up, and launch campaigns.</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">What you get</span>
                                    <p className="text-[#000024] font-medium mt-1">A working system that can generate leads—not a “strategy doc.”</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <span className="text-9xl font-black">4</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Step 4 — Optimize & Scale</h3>
                            <div className="space-y-4 relative z-10">
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">What we do</span>
                                    <p className="text-gray-700 mt-1">Weekly iteration: improve conversion rate, reduce CPL/CPA, and increase lead quality.</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">What you get</span>
                                    <p className="text-[#000024] font-medium mt-1">Ongoing testing + reporting + scaling plan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT YOU GET IN 14 DAYS */}
            <section className="py-24 bg-[#000024] text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">
                                What you’ll receive in the first 14 days
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed">
                                We move fast to get your foundation solid so we can start generating data and results.
                            </p>
                        </div>
                        <div className="space-y-6">
                            {[
                                { title: "Conversion audit scorecard", desc: "what’s broken + what to fix first" },
                                { title: "Funnel map", desc: "click → lead → booked call / purchase" },
                                { title: "Landing page improvements", desc: "copy + structure + CTAs" },
                                { title: "Tracking setup", desc: "forms, calls, WhatsApp, purchases—based on your model" },
                                { title: "Follow-up system", desc: "auto-replies + reminders + basic nurturing" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-0 last:pb-0">
                                    <svg className="w-6 h-6 text-green-400 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div>
                                        <h3 className="text-xl font-bold">{item.title}</h3>
                                        <p className="text-white/60 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* WHAT WE NEED & REPORTING */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                        {/* What we need */}
                        <div>
                            <h2 className="text-3xl font-bold mb-8 text-[#000024]">
                                What we need from you to move fast
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "Access to your website/landing builder or we build a landing page for you",
                                    "Access to ad accounts if running ads",
                                    "Your best offers/services/products + typical customer questions",
                                    "Fast response to leads especially for local service businesses"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#000024] mt-2.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-100">
                                <p className="text-sm text-yellow-800 font-medium">
                                    <span className="font-bold block mb-1">Note important:</span>
                                    If you miss calls or reply late, lead quality will look worse even if marketing is working.
                                </p>
                            </div>
                        </div>

                        {/* Communication & Reporting */}
                        <div>
                            <h2 className="text-3xl font-bold mb-8 text-[#000024]">
                                How you’ll know it’s working
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="font-bold text-lg mb-4">We track what matters:</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {["Calls / bookings / purchases", "Conversion rate", "Cost per lead / acquisition", "Lead quality", "Speed-to-lead"].map((metric, i) => (
                                            <div key={i} className="bg-gray-50 px-3 py-2 rounded text-sm font-medium text-gray-600 border border-gray-100">
                                                {metric}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Reporting promise</h3>
                                    <p className="text-gray-600">
                                        Simple, trust-building. Weekly update: what we changed, what improved, and what we’re testing next.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ items={faqs} />

            {/* FINAL CTA */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#000024] mb-8 tracking-tight">
                        Want a clear plan to get more leads or sales?
                    </h2>
                    <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                        Book a free growth audit. You’ll leave with the top 3 fixes to improve conversions and lead quality.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setIsBlueprintOpen(true)}
                            className="w-full sm:w-auto px-10 py-4 bg-[#000024] text-white rounded-lg font-bold text-lg shadow-xl hover:bg-[#000024]/90 transition-all hover:-translate-y-1"
                        >
                            Book a Free Growth Audit
                        </button>
                        <Link
                            href="/about" // "About Inyutek" - assuming /about exists, checking file list... /about exists.
                            className="w-full sm:w-auto px-10 py-4 bg-white text-[#000024] border border-[#000024]/10 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all hover:-translate-y-1"
                        >
                            Learn About Inyutek
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />

            {/* MODAL */}
            <Modal isOpen={isBlueprintOpen} onClose={() => setIsBlueprintOpen(false)}>
                <BlueprintForm onClose={() => setIsBlueprintOpen(false)} />
            </Modal>
        </div>
    )
}
