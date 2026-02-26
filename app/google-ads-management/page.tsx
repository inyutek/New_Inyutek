"use client"

import Footer from "@/components/sections/Footer"
import { motion } from "framer-motion"

export default function GoogleAdsManagement() {
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
                            Google Ads Management
                        </h1>
                        <p className="type-lead max-w-2xl">
                            Paid advertising is a controllable acquisition channel when structured correctly. Without campaign architecture, negative keyword control, and conversion tracking, ad spend becomes inefficient and difficult to scale.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Container */}
            <section className="px-6 sm:px-8 py-16 md:py-24">
                <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-bold prose-headings:text-[#000024] prose-p:text-gray-600 prose-p:leading-8 prose-li:text-gray-600 prose-strong:text-[#000024]">
                    <p className="lead">
                        Paid advertising is a controllable acquisition channel when structured correctly. Without campaign architecture, negative keyword control, and conversion tracking, ad spend becomes inefficient and difficult to scale.
                    </p>

                    <p>
                        Many accounts fail due to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Broad keyword targeting</li>
                        <li>Default platform automation without oversight</li>
                        <li>Weak landing page alignment</li>
                        <li>No revenue attribution</li>
                        <li>Poor search term filtering</li>
                    </ul>

                    <p className="mt-4">
                        Inyutek manages Google Ads and Meta Ads accounts with structured targeting, strict filtering, and conversion-based optimization.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>Our scope typically includes:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Full account audit and restructuring</li>
                        <li>Search campaign build (exact, phrase, controlled broad where appropriate)</li>
                        <li>Negative keyword list development</li>
                        <li>Geo-segmented targeting for local businesses</li>
                        <li>Call-only and lead-form campaigns</li>
                        <li>Meta retargeting and segmented audience campaigns</li>
                        <li>Landing page alignment review</li>
                        <li>GA4 event configuration</li>
                        <li>Google Tag Manager setup</li>
                        <li>Call conversion tracking</li>
                        <li>CRM integration for revenue attribution (when available)</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <h3>Campaigns are optimized against measurable performance indicators, including:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Cost per qualified lead</li>
                        <li>Cost per acquisition (CPA)</li>
                        <li>Return on ad spend (ROAS)</li>
                        <li>Lead-to-close ratio (when CRM data is available)</li>
                        <li>Search term quality analysis</li>
                    </ul>

                    <p className="mt-4">
                        We do not optimize for impressions or click-through rate in isolation.<br />
                        Budget allocation decisions are based on conversion efficiency and downstream revenue signals.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>For local service businesses, we structure campaigns around high-intent search queries and geographic precision.</h3>

                    <h3>For ecommerce businesses, we manage:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Shopping campaigns</li>
                        <li>Performance Max (with feed control)</li>
                        <li>Structured product segmentation</li>
                        <li>Margin-based bid strategy</li>
                    </ul>

                    <h3>For service-based lead generation, we integrate:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Call tracking</li>
                        <li>Form tracking</li>
                        <li>Automated lead routing (if CRM is active)</li>
                    </ul>

                    <p className="mt-4">
                        Performance reporting includes spend, conversion data, search term insights, and optimization actions taken.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>This service is best suited for:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Service businesses requiring consistent lead flow</li>
                        <li>Event management companies scaling bookings</li>
                        <li>Ecommerce brands with validated product-market fit</li>
                        <li>Agencies acquiring clients through paid channels</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <p>
                        Paid traffic is scalable when tracking, filtering, and landing page alignment are structured correctly.
                    </p>

                    <p>
                        <em>An account audit can be requested to evaluate campaign efficiency and wasted spend.</em>
                    </p>
                </div>
            </section>

            {/* Global Footer */}
            <Footer />
        </main>
    )
}
