const requirements = [
    "Access to your website/landing builder or we build a landing page for you.",
    "Access to ad accounts if running ads.",
    "Your best offers/services/products + typical customer questions.",
    "Fast response to leads especially for local service businesses."
]

const metrics = ["Calls / bookings / purchases", "Conversion rate", "Cost per lead / acquisition", "Lead quality", "Speed-to-lead"]

export function RequirementsSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                    {/* What we need */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-[#000024]">
                            What we need from you to move fast
                        </h2>
                        <ul className="space-y-4">
                            {requirements.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#000024] mt-2.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-100">
                            <p className="text-sm text-yellow-800 font-medium">
                                <span className="font-bold block mb-1">Note important:</span>
                                If you miss calls or reply late, lead quality will look worse even if marketing is working.
                            </p>
                        </div>
                    </div>

                    {/* Communication & Reporting */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-[#000024]">
                            How you'll know it's working
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-lg mb-4">We track what matters:</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {metrics.map((metric, i) => (
                                        <div key={i} className="bg-gray-50 px-3 py-2 rounded text-sm font-medium text-gray-600 border border-gray-100">
                                            {metric}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Reporting promise</h3>
                                <p className="text-gray-600">
                                    Simple, trust-building. Weekly update: what we changed, what improved, and what we're testing next.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
