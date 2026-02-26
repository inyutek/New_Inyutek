"use client"

import Footer from "@/components/sections/Footer"
import { motion } from "framer-motion"

export default function CRMMarketingAutomation() {
    return (
        <main className="min-h-screen bg-white">
            {/* Minimal Hero */}
            <section className="relative w-full bg-[#fbfbfb] pt-32 pb-20 px-6 sm:px-8">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-xs font-bold text-[#000024] opacity-50 uppercase tracking-[0.2em] mb-6">
                            Services
                        </p>
                        <h1 className="type-h1 mb-6">
                            CRM & Marketing Automation
                        </h1>
                        <p className="type-lead max-w-2xl">
                            Lead generation without structured follow-up reduces conversion efficiency.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Container */}
            <section className="px-6 sm:px-8 py-16 md:py-24">
                <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-bold prose-headings:text-[#000024] prose-p:text-gray-600 prose-p:leading-8 prose-li:text-gray-600 prose-strong:text-[#000024]">
                    <p className="lead">
                        Lead generation without structured follow-up reduces conversion efficiency. Many businesses lose revenue due to delayed responses, inconsistent tracking, or manual pipeline management.
                    </p>

                    <h3 className="mt-8">Common operational gaps include:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>No centralized lead database</li>
                        <li>Delayed response to form submissions</li>
                        <li>Manual lead assignment</li>
                        <li>No automated reminders</li>
                        <li>No long-term nurture sequences</li>
                        <li>No visibility into pipeline performance</li>
                    </ul>

                    <p className="mt-8">
                        Inyutek implements CRM and automation systems designed to improve response time, tracking accuracy, and lead-to-close efficiency.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>Our scope typically includes:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>CRM selection and setup (based on business model)</li>
                        <li>Pipeline stage design aligned to sales process</li>
                        <li>Lead source tracking configuration</li>
                        <li>Form and ad platform integration</li>
                        <li>Automated email acknowledgment sequences</li>
                        <li>Instant SMS response workflows (where applicable)</li>
                        <li>Calendar booking automation</li>
                        <li>Missed-call text-back systems</li>
                        <li>Task and follow-up automation</li>
                        <li>Internal notification routing</li>
                        <li>CRM reporting dashboard configuration</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <h3>We focus on measurable operational improvements such as:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Speed-to-lead reduction</li>
                        <li>Lead response rate</li>
                        <li>Follow-up consistency</li>
                        <li>Pipeline visibility</li>
                        <li>Lead-to-close ratio</li>
                        <li>Revenue attribution by source</li>
                    </ul>

                    <h3 className="mt-8">Automation workflows may include:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Multi-step email sequences</li>
                        <li>SMS reminders</li>
                        <li>Re-engagement campaigns</li>
                        <li>Lead scoring triggers</li>
                        <li>Behavior-based follow-up (e.g., pricing page visits)</li>
                    </ul>

                    <p className="mt-8">
                        Where ad channels are active, CRM systems are configured to connect lead data to revenue outcomes, enabling cost-per-acquired-customer analysis.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>This service is best suited for:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Event management companies</li>
                        <li>Local service providers</li>
                        <li>Agencies handling inbound leads</li>
                        <li>High-ticket sales teams</li>
                        <li>Consulting and service-based businesses</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <p>
                        CRM and automation systems reduce operational leakage and improve lead conversion efficiency without increasing acquisition spend.
                    </p>

                    <p>
                        <em>A workflow audit can be requested to evaluate response gaps and pipeline structure.</em>
                    </p>
                </div>
            </section>

            {/* Global Footer */}
            <Footer />
        </main>
    )
}
