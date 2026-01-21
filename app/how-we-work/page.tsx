"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { BlueprintForm } from "@/components/ui/blueprint-form"

export default function HowWeWorkPage() {
    const [isBlueprintOpen, setIsBlueprintOpen] = useState(false)

    return (
        <section className="bg-[#fbfbfb] min-h-screen flex flex-col items-center justify-center py-24 px-6">
            <button
                onClick={() => setIsBlueprintOpen(true)}
                className="px-10 py-4 bg-[#000024] text-white rounded-lg font-bold text-lg shadow-xl hover:bg-[#000024]/90 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
                See the Blueprint
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <Modal isOpen={isBlueprintOpen} onClose={() => setIsBlueprintOpen(false)}>
                <BlueprintForm onClose={() => setIsBlueprintOpen(false)} />
            </Modal>
        </section>
    )
}
