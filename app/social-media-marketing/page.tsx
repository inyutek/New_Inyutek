"use client"

import Footer from "@/components/sections/Footer"
import { motion } from "framer-motion"

export default function SocialMediaMarketing() {
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
                            Social Media Marketing
                        </h1>
                        <p className="type-lead max-w-2xl">
                            Social media can function as a distribution and lead capture channel when structured around intent and conversion tracking.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Container */}
            <section className="px-6 sm:px-8 py-16 md:py-24">
                <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-bold prose-headings:text-[#000024] prose-p:text-gray-600 prose-p:leading-8 prose-li:text-gray-600 prose-strong:text-[#000024]">
                    <p className="lead">
                        Social media can function as a distribution and lead capture channel when structured around intent and conversion tracking. Without defined objectives, content mapping, and response systems, it becomes a branding expense with limited measurable return.
                    </p>

                    <h3 className="mt-8">Common issues include:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Posting without a defined funnel objective</li>
                        <li>No tracking of inquiries or link clicks</li>
                        <li>Inconsistent messaging</li>
                        <li>No retargeting structure</li>
                        <li>Manual DM handling without CRM integration</li>
                    </ul>

                    <p className="mt-8">
                        Inyutek structures social media as part of a broader acquisition and retention system.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>Our work typically includes:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Audience and competitor analysis</li>
                        <li>Platform selection based on business model (B2C, B2B, local service, ecommerce)</li>
                        <li>Content pillar definition aligned to funnel stages</li>
                        <li>Structured content calendar development</li>
                        <li>Short-form and static content planning</li>
                        <li>Direct response post design (comment-to-DM or lead capture driven)</li>
                        <li>Meta ad amplification for high-performing posts</li>
                        <li>Retargeting audience segmentation</li>
                        <li>UTM tracking implementation</li>
                        <li>DM automation workflows (where applicable)</li>
                        <li>CRM tagging and lead routing integration</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <h3>We focus on measurable outcomes such as:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Direct message inquiries</li>
                        <li>WhatsApp leads (if integrated)</li>
                        <li>Landing page clicks</li>
                        <li>Lead form submissions</li>
                        <li>Cost per inquiry (when paid amplification is used)</li>
                    </ul>

                    <p className="mt-8">
                        Organic performance is evaluated using engagement quality, inquiry volume, and assisted conversion data rather than follower count alone.
                    </p>

                    <h3 className="mt-8">Paid social campaigns are structured around:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Cold audience testing</li>
                        <li>Retargeting sequences</li>
                        <li>Creative rotation to reduce fatigue</li>
                        <li>Offer-based segmentation</li>
                    </ul>

                    <p className="mt-8">
                        Where CRM systems are active, we connect social leads to pipeline tracking to measure lead-to-close performance.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>This service is best suited for:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Event management companies</li>
                        <li>High-ticket service providers</li>
                        <li>Premium local businesses</li>
                        <li>Ecommerce brands requiring visual product exposure</li>
                        <li>Agencies building authority positioning</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <p>
                        Social media performance depends on structured execution, tracking discipline, and clear funnel alignment.
                    </p>

                    <p>
                        <em>A channel audit can be requested to assess current content performance and tracking gaps.</em>
                    </p>
                </div>
            </section>

            {/* Global Footer */}
            <Footer />
        </main>
    )
}
