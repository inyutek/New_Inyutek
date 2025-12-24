"use client"

import { motion } from "framer-motion"

const BRAND_COLOR = "#000024"

const SOCIAL_LINKS = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/inyutek?igsh=YWc1dW14ajkyYmty",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/inyutek/",
    },
    {
        label: "X",
        href: "https://x.com/inyutek",
    },
]

export default function Footer() {
    return (
        <footer className="bg-[#fbfbfb] pt-28 pb-12">
            {/* Main Footer Box */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-7xl mx-auto rounded-2xl border border-black/5 bg-white px-10 py-16 md:px-14 md:py-20"
            >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

                    {/* Left */}
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-[#000024]">
                            Inyutek
                        </h3>

                        <a
                            href="mailto:Inyutek@gmail.com"
                            className="mt-2 block text-sm text-black/70 hover:opacity-70"
                        >
                            Inyutek@gmail.com
                        </a>

                        <p className="mt-3 text-sm text-black/70 max-w-sm">
                            Get insights on growth and strategy
                        </p>

                        <div className="mt-8 flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full rounded-md border border-black/10 px-4 py-2.5 text-sm outline-none"
                            />

                            <button
                                className="rounded-md px-4 py-2.5 text-sm border transition-colors"
                                style={{
                                    borderColor: BRAND_COLOR,
                                    color: BRAND_COLOR,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = BRAND_COLOR
                                    e.currentTarget.style.color = "#fff"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent"
                                    e.currentTarget.style.color = BRAND_COLOR
                                }}
                            >
                                Subscribe
                            </button>
                        </div>

                        <p className="mt-2 text-xs text-black/50">
                            We respect your privacy. Unsubscribe anytime.
                        </p>
                    </div>

                    <FooterColumn
                        title="Stay in the loop"
                        items={["About us", "Our process", "Case studies", "Contact us", "Book a call"]}
                    />

                    <FooterColumn
                        title="Company"
                        items={[
                            "Lead generation",
                            "Growth marketing",
                            "Web strategy",
                            "Conversion audit",
                            "Digital consulting",
                        ]}
                    />

                    <div>
                        <h4 className="text-sm font-semibold mb-3 text-[#000024]">
                            Social
                        </h4>
                        <ul className="space-y-2 text-sm text-black/70">
                            {SOCIAL_LINKS.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:opacity-70"
                                    >
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between px-6 text-xs text-black/60">
                <p>© 2025 Inyutek Enterprises. All rights reserved.</p>
                <div className="flex gap-5 mt-3 md:mt-0">
                    <span className="hover:opacity-70 cursor-pointer">Privacy policy</span>
                    <span className="hover:opacity-70 cursor-pointer">Terms of service</span>
                    <span className="hover:opacity-70 cursor-pointer">Cookie settings</span>
                </div>
            </div>
        </footer>
    )
}

function FooterColumn({
    title,
    items,
}: {
    title: string
    items: string[]
}) {
    return (
        <div>
            <h4 className="text-sm font-semibold mb-3 text-[#000024]">{title}</h4>
            <ul className="space-y-2 text-sm text-black/70">
                {items.map((item) => (
                    <li key={item} className="hover:opacity-70 cursor-pointer">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
