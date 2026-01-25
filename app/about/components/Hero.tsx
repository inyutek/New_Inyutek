"use client"

import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#fbfbfb] overflow-hidden">
            <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <h1 className="type-h1 mb-8">
                    A lead generation agency built for measurable growth
                </h1>

                <p className="type-body mb-10 max-w-3xl mx-auto">
                    Inyutek helps local service businesses and ecommerce brands generate more calls, bookings, and sales through conversion-focused funnels, performance marketing, and tracking that proves what’s working.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-8 py-4 bg-[#000024] text-white text-base rounded-lg font-bold shadow-lg hover:opacity-90 transition-all hover:-translate-y-1 flex items-center justify-center"
                    >
                        Book a Free Growth Audit
                    </Link>
                    <Link
                        href="/what-we-do"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-[#000024] text-base border border-[#000024]/10 rounded-lg font-bold hover:bg-gray-50 transition-all hover:-translate-y-1 flex items-center justify-center"
                    >
                        View Services
                    </Link>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Free audit
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Clear priorities
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Zero pressure
                    </span>
                </div>
            </ScrollReveal>

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl opacity-60"></div>
            </div>
        </section>
    )
}
