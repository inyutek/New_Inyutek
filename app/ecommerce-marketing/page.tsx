"use client"

import Footer from "@/components/sections/Footer"
import { motion } from "framer-motion"

export default function EcommerceMarketing() {
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
                            Ecommerce Marketing
                        </h1>
                        <p className="type-lead max-w-2xl">
                            Ecommerce growth depends on acquisition efficiency, technical structure, and retention systems.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Container */}
            <section className="px-6 sm:px-8 py-16 md:py-24">
                <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-bold prose-headings:text-[#000024] prose-p:text-gray-600 prose-p:leading-8 prose-li:text-gray-600 prose-strong:text-[#000024]">
                    <p className="lead">
                        Ecommerce growth depends on acquisition efficiency, technical structure, and retention systems. Many stores rely heavily on paid ads while neglecting organic visibility, technical SEO, and lifecycle marketing.
                    </p>

                    <h3 className="mt-8">Common structural issues include:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Duplicate product content</li>
                        <li>Poor internal linking between categories and products</li>
                        <li>Incorrect canonicalization</li>
                        <li>Slow page speed</li>
                        <li>No commercial keyword targeting</li>
                        <li>Weak retention flows</li>
                        <li>No margin-based campaign segmentation</li>
                    </ul>

                    <p className="mt-8">
                        Inyutek approaches ecommerce marketing as a multi-channel system combining technical SEO, paid acquisition alignment, and retention automation.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>Our scope typically includes:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Full technical SEO audit (crawl analysis, canonical checks, indexation review)</li>
                        <li>Category and product page optimization</li>
                        <li>Commercial intent keyword targeting</li>
                        <li>Internal linking restructuring</li>
                        <li>Schema implementation (Product, Breadcrumb, Organization)</li>
                        <li>Page speed optimization guidance</li>
                        <li>Shopping campaign structure review</li>
                        <li>Performance Max segmentation (where applicable)</li>
                        <li>Product feed optimization</li>
                        <li>Abandoned cart email flows</li>
                        <li>Post-purchase automation setup</li>
                        <li>Customer segmentation for retention marketing</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <h3>Organic growth efforts focus on:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>High-intent product keywords</li>
                        <li>Comparison and buyer-intent queries</li>
                        <li>Category-level authority building</li>
                        <li>Structured content supporting product clusters</li>
                    </ul>

                    <h3 className="mt-8">Paid efforts are aligned with:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Margin-based bidding</li>
                        <li>Product-level performance segmentation</li>
                        <li>Conversion tracking accuracy</li>
                        <li>ROAS monitoring</li>
                    </ul>

                    <h3 className="mt-8">Retention systems are implemented to improve:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Repeat purchase rate</li>
                        <li>Average order value (AOV)</li>
                        <li>Customer lifetime value (LTV)</li>
                    </ul>

                    <p className="mt-8">
                        Performance is evaluated using: Organic traffic growth by category, Revenue per channel, Cost per acquisition, ROAS, and Repeat purchase rate.
                    </p>

                    <p>
                        Where possible, CRM or ecommerce platform data is connected to reporting dashboards for revenue-level attribution.
                    </p>

                    <hr className="border-gray-100 my-10" />

                    <h3>This service is best suited for:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>DTC brands with validated products</li>
                        <li>Multi-category ecommerce stores</li>
                        <li>Shopify and WooCommerce businesses</li>
                        <li>Brands seeking to reduce dependency on paid ads</li>
                    </ul>

                    <hr className="border-gray-100 my-10" />

                    <p>
                        Ecommerce growth requires technical precision, structured acquisition, and retention alignment.
                    </p>

                    <p>
                        <em>A store audit can be requested to evaluate technical gaps, keyword opportunities, and acquisition efficiency.</em>
                    </p>
                </div>
            </section>

            {/* Global Footer */}
            <Footer />
        </main>
    )
}
