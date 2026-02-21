export function WhatMakesItWork() {
    return (
        <section className="py-24 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="max-w-xl">
                        <h2 className="type-h2 mb-6">
                            Marketing works when the funnel is measurable
                        </h2>
                        <p className="type-lead">
                            Most businesses try random tactics. We focus on the full path: Traffic → Landing page → Conversion → Follow-up → Revenue, with tracking at every step.
                        </p>
                    </div>

                    <div className="rounded-2xl">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {["Clear offer", "Conversion-first pages", "Qualified leads", "Fast follow-up", "Weekly optimization"].map((item, i) => (
                                <span key={i} className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#000024] shadow-sm border border-gray-100">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
