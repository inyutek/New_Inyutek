"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, CheckCircle2 } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { submitContactForm } from "@/app/actions/contact"

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus("submitting")
        setErrorMessage("")

        const formData = new FormData(e.currentTarget)

        try {
            const result = await submitContactForm(null, formData)

            if (result.success) {
                setStatus("success")
            } else {
                setStatus("error")
                setErrorMessage(result.message || "Something went wrong. Please try again.")
            }
        } catch (error) {
            setStatus("error")
            setErrorMessage("An unexpected error occurred. Please try again.")
        }
    }

    if (status === "success") {
        return (
            <section id="booking-form" className="bg-white py-24 px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center py-12 bg-green-50 rounded-2xl border border-green-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#000024] mb-2">Request Received!</h3>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                        Thanks for booking an audit. We'll review your details and confirm the time shortly.
                    </p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="text-[#000024] font-medium underline hover:text-opacity-80"
                    >
                        Submit another response
                    </button>
                </div>
            </section>
        )
    }

    return (
        <section id="booking-form" className="bg-white py-24 px-6 lg:px-8 scroll-mt-20">
            <ScrollReveal className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000024] tracking-tight mb-4">
                        Answer 4 quick questions so we can make the call useful
                    </h2>

                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {status === "error" && (
                            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                {errorMessage}
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[#000024] mb-2">Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="Your full name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#000024] mb-2">Business Name</label>
                                <input
                                    required
                                    type="text"
                                    name="businessName"
                                    placeholder="Your company"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[#000024] mb-2">Work Email</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="name@company.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#000024] mb-2">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    placeholder="+91 999 999 9999"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#000024] mb-2">Website / Instagram / Store Link</label>
                            <input
                                type="url"
                                name="website"
                                placeholder="https://..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[#000024] mb-2">Business Type</label>
                                <select
                                    required
                                    name="businessType"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                                >
                                    <option value="">Select type...</option>
                                    <option value="local_service">Local Service</option>
                                    <option value="ecommerce">Ecommerce</option>
                                    <option value="startup">Startup</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#000024] mb-2">Primary Goal</label>
                                <select
                                    required
                                    name="goal"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                                >
                                    <option value="">Select goal...</option>
                                    <option value="more_calls">More calls</option>
                                    <option value="more_bookings">More bookings</option>
                                    <option value="more_sales">More sales</option>
                                    <option value="lower_cpa">Lower CPA</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#000024] mb-2">Biggest problem right now</label>
                            <textarea
                                required
                                name="problem"
                                rows={3}
                                placeholder="Briefly describe what you want to solve..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024] resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#000024] mb-2">Monthly marketing budget (Optional)</label>
                            <select
                                name="budget"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#000024]/10 bg-gray-50 text-[#000024]"
                            >
                                <option value="">Select budget range...</option>
                                <option value="0-25k">₹0 – 25k</option>
                                <option value="25-75k">₹25 – 75k</option>
                                <option value="75k+">₹75k+</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full px-8 py-4 bg-[#000024] text-white text-lg rounded-lg font-medium shadow-lg hover:bg-[#000024]/90 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {status === "submitting" ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Scheduling...
                                    </>
                                ) : (
                                    "Schedule Audit Call"
                                )}
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                We’ll never share your details. You’ll only get follow-ups related to your audit.
                            </p>
                        </div>
                    </form>
                </div>
            </ScrollReveal>
        </section>
    )
}
