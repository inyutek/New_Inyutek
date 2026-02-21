import { ProcessStepCard } from "./ProcessStepCard"

const steps = [
    {
        title: "Step 1 - Audit & Diagnose",
        do: "Review your offer, website/landing page, ads/SEO, tracking, and competitors.",
        get: "A short action plan with the top 3 bottlenecks blocking growth."
    },
    {
        title: "Step 2 - Funnel Plan",
        do: "Clarify your positioning, craft the core message, and map the conversion path.",
        get: "Funnel map + page outline + KPI targets (calls/bookings/sales)."
    },
    {
        title: "Step 3 - Build & Launch",
        do: "Build/upgrade landing pages, set up tracking, implement CRM follow-up, and launch campaigns.",
        get: "A working system that can generate leads - not a \u0022strategy doc.\u0022"
    },
    {
        title: "Step 4 - Optimize & Scale",
        do: "Weekly iteration: improve conversion rate, reduce CPL/CPA, and increase lead quality.",
        get: "Ongoing testing + reporting + scaling plan."
    }
]

export function ProcessSection() {
    return (
        <section className="py-24 md:py-32 bg-[#fbfbfb]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="type-h1 text-center mb-16 md:mb-24">
                    Our lead generation process
                </h2>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {steps.map((step, index) => (
                        <ProcessStepCard key={index} step={step} />
                    ))}
                </div>
            </div>
        </section>
    )
}
