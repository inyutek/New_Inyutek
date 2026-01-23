import type { Metadata } from "next"
import HowWeWorkClient from "./client"

export const metadata: Metadata = {
    title: "How We Work: Lead Generation Process | Inyutek",
    description: "See our lead generation process: audit, funnel build, launch, and weekly optimization to drive calls, bookings, and e-commerce sales.",
}

export default function HowWeWorkPage() {
    return <HowWeWorkClient />
}
