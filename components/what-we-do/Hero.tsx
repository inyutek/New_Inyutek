"use client"

import Link from "next/link"

export function Hero() {
    return (
        <div id="hero" className="relative bg-[#fbfbfb] pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center overflow-hidden">
            <div className="relative z-40 max-w-4xl mx-auto px-4 text-center">
                <h1 className="type-h1 mb-8 mx-auto">
                    Digital marketing services that drive calls, bookings, and sales
                </h1>

                <div className="max-w-4xl mx-auto mb-10 flex flex-col gap-6 items-center justify-center">
                    <p className="type-body max-w-2xl">
                        We build conversion focused landing pages, run Google/Meta campaigns + SEO, and set up tracking and follow up so growth is measurable not guessed.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-8 py-4 bg-[#000024] text-white text-base rounded-lg font-medium shadow-lg hover:opacity-90 transition-all hover:-translate-y-1 flex items-center justify-center min-w-[160px]"
                    >
                        Book a Free Growth Audit
                    </Link>
                    <Link
                        href="/how-we-work"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-[#000024] text-base border border-[#000024]/20 rounded-lg font-medium hover:bg-gray-50 transition-all hover:-translate-y-1 flex items-center justify-center"
                    >
                        See How We Work
                    </Link>
                </div>
                <div className="mt-6 text-sm text-gray-500 font-medium tracking-wide uppercase">
                    Free audit • clear priorities • zero pressure
                </div>
            </div>
        </div>
    )
}
