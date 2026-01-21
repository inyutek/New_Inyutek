"use client"

import { useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"

export function BlueprintForm({ onClose }: { onClose: () => void }) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("submitting")

        try {
            const formData = new FormData(e.target as HTMLFormElement)
            const data = {
                name: formData.get("name"),
                email: formData.get("email"),
                website: formData.get("website"),
            }

            const response = await fetch("/api/blueprint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Submission failed")
            }

            setStatus("success")
        } catch (error) {
            console.error("Error submitting form:", error)
            setStatus("idle") // Allow retry
            alert("Something went wrong. Please try again.")
        }
    }

    if (status === "success") {
        return (
            <div className="flex flex-col items-center text-center py-12 px-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#000024] mb-2">Blueprint Sent!</h3>
                <p className="text-gray-500 mb-8 max-w-sm">
                    Check your inbox (and spam folder) in a few minutes. We've sent you the complete breakdown.
                </p>
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-gray-100 text-[#000024] font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Close
                </button>
            </div>
        )
    }

    return (
        <div className="py-2">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#000024] mb-2">Get the Blueprint</h3>
                <p className="text-gray-500">
                    See exactly how we structure funnels, tracking, and campaigns for our clients.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-[#000024] mb-1.5">Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#000024] mb-1.5">Work Email</label>
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#000024] mb-1.5">Website <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input
                        type="url"
                        name="website"
                        placeholder="https://company.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-4 w-full px-8 py-3 bg-[#000024] text-white rounded-lg font-medium shadow-lg hover:bg-[#000024]/90 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                    {status === "submitting" ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send Me the Blueprint"
                    )}
                </button>

                <p className="text-xs text-center text-gray-400 mt-2">
                    Zero spam. Unsubscribe at any time.
                </p>
            </form>
        </div>
    )
}
