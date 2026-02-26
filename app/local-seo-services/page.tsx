"use client"

import Footer from "@/components/sections/Footer"
import { motion } from "framer-motion"

export default function LocalSEOServices() {
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
                            Local SEO Services
                        </h1>
                        <p className="type-lead max-w-2xl">
                            Local SEO is a measurable acquisition channel for service-based businesses operating within defined geographic areas.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Container */}
            <section className="px-6 sm:px-8 py-16 md:py-24">
                <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-bold prose-headings:text-[#000024] prose-p:text-gray-600 prose-p:leading-8 prose-li:text-gray-600 prose-strong:text-[#000024]">
                    <p className="lead">
                        Local SEO is a measurable acquisition channel for service-based businesses operating within defined geographic areas. When users search for services “near me” or within a specific city, Google prioritizes local relevance, proximity, and authority signals.
                    </p>

                    <p>
                        If your business does not appear in the top three Map Pack positions, you lose access to high-intent traffic. If you appear but cannot track calls or inquiries, you cannot evaluate ROI.
                    </p>

                    <p>
                        Inyutek builds structured Local SEO systems focused on visibility, consistency, and attribution.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>Our work typically includes:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Google Business Profile optimization (categories, services, structured descriptions, Q&A alignment, media updates)</li>
                        <li>Citation audit and NAP consistency correction</li>
                        <li>Removal of duplicate directory listings</li>
                        <li>Geo-targeted service + city landing pages</li>
                        <li>Internal linking structured around location clusters</li>
                        <li>LocalBusiness schema implementation</li>
                        <li>Review acquisition workflows</li>
                        <li>Call and form tracking integration</li>
                        <li>Map Pack rank tracking</li>
                    </ul>

                    <p className="mt-4">
                        We benchmark competitors in your city and structure optimization around measurable ranking signals rather than generic checklist activity.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>Local SEO performance is evaluated using:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Map Pack ranking movement</li>
                        <li>Google Business Profile calls</li>
                        <li>Direction clicks</li>
                        <li>Website form submissions</li>
                        <li>Review growth rate</li>
                    </ul>

                    <p className="mt-4">
                        Where CRM integration is available, we connect local leads to revenue tracking.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>This service is best suited for:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Event management companies</li>
                        <li>Home service providers</li>
                        <li>Clinics and regional practices</li>
                        <li>Legal firms</li>
                        <li>Location-dependent service businesses</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <p>
                        Local search is intent-driven. Optimization must be structured, consistent, and measurable to produce predictable results.
                    </p>

                    <p>
                        <em>If you would like an audit of your current local visibility and citation health, you can request a review.</em>
                    </p>
                </div>
            </section>

            {/* Global Footer */}
            <Footer />
        </main>
    )
}
