"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, CheckCircle2, Sparkles, Mail, AlertCircle } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { submitContactForm } from "@/app/actions/contact"

// Blueprint Button Component
function BlueprintButton({ token, userName }: { token: string; userName: string }) {
    const [state, setState] = useState<'ready' | 'sending' | 'sent' | 'error'>('ready');
    const [message, setMessage] = useState('');

    async function handleClick() {
        setState('sending');

        try {
            const response = await fetch('/api/blueprint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            const data = await response.json();

            if (data.success) {
                setState('sent');
                if (data.already_sent) {
                    setMessage(`Blueprint was already sent on ${new Date(data.sent_at).toLocaleDateString()}`);
                } else {
                    setMessage(`Blueprint sent to ${data.email}!`);
                }
            } else {
                setState('error');
                setMessage(data.error || 'Failed to send blueprint. Please try again.');
            }
        } catch (error) {
            setState('error');
            setMessage('Network error. Please check your connection.');
        }
    }

    return (
        <section id="booking-form" className="bg-white py-24 px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center py-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                </div>

                <h3 className="type-card-title mb-2">Thanks, {userName}! 🎉</h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                    Your information has been saved. Get your personalized AI implementation blueprint:
                </p>

                <button
                    onClick={handleClick}
                    disabled={state === 'sending' || state === 'sent'}
                    className={`
                        px-8 py-4 text-lg font-semibold rounded-xl
                        transition-all duration-300 ease-out
                        flex items-center justify-center gap-3 mx-auto
                        min-w-[280px]
                        ${state === 'ready'
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                            : ''
                        }
                        ${state === 'sending'
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white opacity-80 cursor-wait'
                            : ''
                        }
                        ${state === 'sent'
                            ? 'bg-green-500 text-white cursor-default'
                            : ''
                        }
                        ${state === 'error'
                            ? 'bg-red-500 text-white hover:bg-red-600 cursor-pointer'
                            : ''
                        }
                    `}
                >
                    {state === 'ready' && (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Get Your AI Blueprint
                        </>
                    )}
                    {state === 'sending' && (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating your blueprint...
                        </>
                    )}
                    {state === 'sent' && (
                        <>
                            <Mail className="w-5 h-5" />
                            Blueprint Sent!
                        </>
                    )}
                    {state === 'error' && (
                        <>
                            <AlertCircle className="w-5 h-5" />
                            Try Again
                        </>
                    )}
                </button>

                {message && (
                    <p className={`mt-4 text-sm ${state === 'error' ? 'text-red-600' : 'text-gray-600'}`}>
                        {message}
                    </p>
                )}

                {state === 'sent' && (
                    <p className="mt-6 text-xs text-gray-400">
                        Check your inbox (and spam folder) for the email.
                    </p>
                )}
            </div>
        </section>
    );
}

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")
    const [token, setToken] = useState("")
    const [userName, setUserName] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus("submitting")
        setErrorMessage("")

        const formData = new FormData(e.currentTarget)

        try {
            const result = await submitContactForm(null, formData)

            if (result.success) {
                setStatus("success")
                setToken(result.token || "")
                setUserName(result.name || "")
            } else {
                setStatus("error")
                setErrorMessage(result.message || "Something went wrong. Please try again.")
            }
        } catch (error) {
            setStatus("error")
            setErrorMessage("An unexpected error occurred. Please try again.")
        }
    }

    // Show Blueprint button after successful submission
    if (status === "success" && token) {
        return <BlueprintButton token={token} userName={userName} />
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
