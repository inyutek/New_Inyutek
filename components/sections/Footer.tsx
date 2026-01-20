"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

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
            <ScrollReveal enableDesktop={false} className="max-w-7xl mx-auto rounded-2xl border border-black/5 bg-white px-10 py-16 md:px-14 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

                    {/* Left */}
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-[#000024]">
                            Inyutek — Lead Generation & Digital Marketing
                        </h3>

                        <a
                            href="mailto:hello@inyutek.com"
                            className="mt-2 block text-sm text-black/70 hover:opacity-70"
                        >
                            hello@inyutek.com
                        </a>

                        <p className="mt-3 text-base md:text-sm text-black/70 max-w-sm">
                            We help local service businesses and e-commerce brands generate more calls, bookings, and sales through funnels, ads, SEO, and automation.
                        </p>


                    </div>

                    <FooterColumn
                        title="Quick Links"
                        items={["Home", "Services", "Process", "About", "Contact / Book a Call"]}
                    />

                    <FooterColumn
                        title="Services"
                        items={[
                            "Local SEO Services",
                            "Google Ads Management",
                            "Social Media Marketing",
                            "Ecommerce Marketing",
                            "Conversion Rate Optimization (CRO)",
                            "CRM & Marketing Automation"
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
            </ScrollReveal>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between px-6 text-xs text-black/60">
                <p>© 2026 Inyutek. All rights reserved.</p>
                <div className="flex gap-5 mt-3 md:mt-0">
                    <Link href="/privacy-policy" className="hover:opacity-70 cursor-pointer">Privacy policy</Link>
                    <Link href="/terms-of-service" className="hover:opacity-70 cursor-pointer">Terms of service</Link>
                    <Link href="/cookie-settings" className="hover:opacity-70 cursor-pointer">Cookie settings</Link>
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
                    <li key={item} className="hover:opacity-70 cursor-pointer text-base md:text-sm">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
