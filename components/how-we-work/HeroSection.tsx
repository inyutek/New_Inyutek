import Link from "next/link"

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h1 className="type-h1 mb-8">
                    How we turn clicks into calls, bookings, and sales
                </h1>
                <p className="type-body max-w-2xl mx-auto mb-10">
                    A simple, repeatable system: we diagnose what's leaking, build the funnel, launch fast, then optimize weekly based on real conversion data.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-8 py-4 bg-[#000024] text-white rounded-lg font-medium text-lg shadow-xl hover:bg-[#000024]/90 transition-all hover:-translate-y-1 text-center"
                    >
                        Book a Free Growth Audit
                    </Link>
                    <Link
                        href="/what-we-do"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-[#000024] border border-[#000024]/10 rounded-lg font-medium text-lg hover:bg-gray-50 transition-all hover:-translate-y-1 text-center"
                    >
                        See what we do
                    </Link>
                </div>

                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Free audit • clear priorities • zero pressure
                </p>
            </div>
        </section>
    )
}
