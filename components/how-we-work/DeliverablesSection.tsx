const deliverables = [
    { title: "Conversion audit scorecard", desc: "What's broken + What to fix first." },
    { title: "Funnel map", desc: "Click → Lead → Booked call / Purchase." },
    { title: "Landing page improvements", desc: "Copy + Structure + CTAs." },
    { title: "Tracking setup", desc: "Forms, Calls, WhatsApp, Purchases based on your model." },
    { title: "Follow-up system", desc: "Auto-replies + Reminders + Basic nurturing." }
]

export function DeliverablesSection() {
    return (
        <section className="py-24 bg-white text-[#000024]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="type-h2 mb-8">
                            What you'll receive in the first 14 days
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We move fast to get your foundation solid so we can start generating data and results.
                        </p>
                    </div>
                    <div className="space-y-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                <svg className="w-6 h-6 text-green-500 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="text-xl font-bold text-[#000024]">{item.title}</h3>
                                    <p className="text-gray-600 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
