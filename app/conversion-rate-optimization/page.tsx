"use client"

import Footer from "@/components/sections/Footer"
import { motion } from "framer-motion"

export default function ConversionRateOptimization() {
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
                            Conversion Rate Optimization (CRO)
                        </h1>
                        <p className="type-lead max-w-2xl">
                            Traffic without conversion efficiency reduces overall return on acquisition spend.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Container */}
            <section className="px-6 sm:px-8 py-16 md:py-24">
                <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-bold prose-headings:text-[#000024] prose-p:text-gray-600 prose-p:leading-8 prose-li:text-gray-600 prose-strong:text-[#000024]">
                    <p className="lead">
                        Traffic without conversion efficiency reduces overall return on acquisition spend. Many businesses focus on generating more traffic instead of improving how existing visitors convert.
                    </p>

                    <h3 className="mt-8">Common issues include:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Sending paid traffic to generic homepages</li>
                        <li>Unclear value proposition above the fold</li>
                        <li>Long or friction-heavy forms</li>
                        <li>Slow page load speeds</li>
                        <li>No behavioral tracking</li>
                        <li>No structured A/B testing process</li>
                    </ul>

                    <p className="mt-8">
                        Inyutek approaches CRO as a structured testing and measurement discipline.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>Our scope typically includes:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Baseline conversion rate analysis</li>
                        <li>Funnel drop-off identification</li>
                        <li>Heatmap and session recording setup</li>
                        <li>Landing page restructuring</li>
                        <li>Offer clarity optimization</li>
                        <li>Form friction reduction</li>
                        <li>Call-to-action placement testing</li>
                        <li>Page speed improvement guidance</li>
                        <li>A/B test design and execution</li>
                        <li>Conversion tracking validation (GA4 + GTM)</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <h3>We focus on improving measurable performance indicators such as:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Lead conversion rate</li>
                        <li>Checkout completion rate</li>
                        <li>Cost per lead reduction</li>
                        <li>Cost per acquisition reduction</li>
                        <li>Revenue per visitor</li>
                    </ul>

                    <h3 className="mt-8">Landing pages are built or optimized with:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Clear headline alignment to traffic source</li>
                        <li>Single primary conversion objective</li>
                        <li>Structured information hierarchy</li>
                        <li>Trust signal placement</li>
                        <li>Reduced navigation distractions (for paid campaigns)</li>
                    </ul>

                    <p className="mt-8">
                        Testing decisions are based on statistical significance, not assumptions.
                    </p>

                    <h3 className="mt-8">For businesses running paid ads, CRO directly impacts:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>CPA</li>
                        <li>ROAS</li>
                        <li>Budget scalability</li>
                    </ul>

                    <p className="mt-8">
                        Performance reporting includes conversion data comparisons, test results, and implementation recommendations.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>This service is best suited for:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Service businesses running paid campaigns</li>
                        <li>Ecommerce brands with steady traffic</li>
                        <li>Agencies optimizing client funnels</li>
                        <li>High-ticket lead generation models</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <p>
                        Conversion efficiency is a multiplier. Improving conversion rate often produces faster ROI than increasing traffic volume.
                    </p>

                    <p>
                        <em>A landing page audit can be requested to evaluate structural and behavioral gaps.</em>
                    </p>
                </div>
            </section>

            {/* Global Footer */}
            <Footer />
        </main>
    )
}
