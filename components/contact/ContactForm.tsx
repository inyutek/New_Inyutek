"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, CheckCircle2, Link, Mail, Sparkles } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { submitContactForm } from "@/app/actions/contact"




export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")
    const [submissionData, setSubmissionData] = useState<{ token: string; name: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus("submitting")
        setErrorMessage("")

        const formData = new FormData(e.currentTarget)

        try {
            const result = await submitContactForm(null, formData)

            if (result.success) {
                setStatus("success")
                if (result.token && result.name) {
                    setSubmissionData({ token: result.token, name: result.name })
                }
            } else {
                setStatus("error")
                setErrorMessage(result.message || "Something went wrong. Please try again.")
            }
        } catch (error) {
            setStatus("error")
            setErrorMessage("An unexpected error occurred. Please try again.")
        }
    }

    // Fallback success state (if no token for some reason)
    if (status === "success") {
        return (
            <section id="booking-form" className="bg-white py-24 px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center py-12 bg-green-50 rounded-2xl border border-green-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="type-card-title mb-2">Request Received!</h3>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                        Thanks for booking an audit. We'll review your details and confirm the time shortly.
                    </p>

                    <div className="space-y-6">
                        {submissionData ? (
                            <BlueprintButton token={submissionData.token} userName={submissionData.name} />
                        ) : (
                            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                                Blueprint is available via email. To get instant access next time, please ensure your details are correct.
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setStatus("idle")
                                setSubmissionData(null)
                            }}
                            className="text-[#000024] font-medium underline hover:text-opacity-80 block mx-auto text-sm"
                        >
                            Submit another response
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="booking-form" className="bg-white py-24 px-6 lg:px-8 scroll-mt-20">
            <ScrollReveal className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="type-h2 mb-4">
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
                                We'll never share your details. You'll only get follow-ups related to your audit.
                            </p>
                        </div>
                    </form>
                </div>
            </ScrollReveal>
        </section>
    )
}

function BlueprintButton({ token, userName }: { token: string, userName: string }) {
    const [status, setStatus] = useState<"ready" | "sending" | "sent" | "error">("ready")

    const handleSend = async () => {
        setStatus("sending")
        try {
            const response = await fetch("/api/blueprint", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            })
            if (!response.ok) throw new Error("Failed")
            setStatus("sent")
        } catch (e) {
            setStatus("error")
        }
    }

    if (status === "sent") {
        return (
            <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-[#000024] mb-1">Blueprint Sent!</h3>
                <p className="text-sm text-gray-600">Check your inbox for the AI Blueprint.</p>
            </div>
        )
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
            <button
                onClick={handleSend}
                disabled={status === "sending"}
                className="group relative px-8 py-4 bg-[#000024] text-white rounded-xl font-medium shadow-xl hover:bg-[#000024]/90 hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-lg w-full sm:w-auto"
            >
                <div className="flex items-center justify-center gap-3">
                    {status === "sending" ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin text-white/80" />
                            <span>Sending specific Blueprint...</span>
                        </>
                    ) : (
                        <>
                            <div className="bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
                                <Sparkles className="w-5 h-5 text-yellow-300" />
                            </div>
                            <span className="text-lg">Get Your AI Blueprint</span>
                        </>
                    )}
                </div>
                {status === "error" && (
                    <span className="absolute -bottom-8 left-0 right-0 text-xs text-red-500 font-medium">
                        Failed to send. Please try again.
                    </span>
                )}
            </button>
            <p className="text-xs text-gray-500 mt-4 max-w-xs mx-auto">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5 align-middle"></span>
                Generated instantly using your provided details.
            </p>
        </div>
    )
}
