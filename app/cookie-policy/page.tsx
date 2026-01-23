import { Metadata } from 'next'
import Footer from '@/components/sections/Footer'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export const metadata: Metadata = {
    title: 'Cookie Policy | Inyutek',
    description: 'Inyutek’s Cookie Policy explains what cookies are, how we use them for essential features, analytics, and advertising, and how you can manage preferences.',
}

export default function CookiePolicyPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* Header Section */}
            <section className="pt-40 pb-16 px-6 lg:px-8 bg-[#fbfbfb]">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-5xl font-black text-[#000024] tracking-tight mb-6">
                            Cookie Policy
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Effective date: 01/01/2026
                        </p>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            This Cookie Policy explains how Inyutek (“we,” “us,” “our”) uses cookies and similar technologies on our website.
                        </p>
                        <div className="mt-8 text-sm text-gray-500">
                            <p>Contact: <a href="mailto:hello@inyutek.com" className="text-[#000024] font-medium hover:underline">hello@inyutek.com</a></p>
                            <p>Business location: Amravati Maharashtra India</p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-6 lg:px-8">
                <div className="max-w-3xl mx-auto prose prose-lg prose-headings:text-[#000024] prose-p:text-gray-600 prose-a:text-[#000024]">

                    <ScrollReveal>
                        <h2>What are cookies?</h2>
                        <p>
                            Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember preferences, and understand how users interact with pages.
                        </p>
                        <p>
                            We may also use similar technologies pixels, tags, SDKs that serve related purposes.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal className="mt-12">
                        <h2>How we use cookies</h2>
                        <p>We use cookies for:</p>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-[#000024] mb-2">A) Essential cookies</h3>
                                <p>Required for basic website functionality and security e.g., page navigation, form handling, fraud prevention.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#000024] mb-2">B) Preference cookies</h3>
                                <p>Remember your settings e.g., language, cookie choices.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#000024] mb-2">C) Analytics cookies</h3>
                                <p>Help us understand how visitors use the site e.g., pages visited, time on site so we can improve performance and conversions.</p>
                                <p className="text-sm italic">Example tools: Google Analytics or your analytics provider.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#000024] mb-2">D) Marketing/advertising cookies</h3>
                                <p>Used to measure campaigns and, where applicable, support retargeting.</p>
                                <p className="text-sm italic">Example tools: Meta Pixel, Google Ads tags or equivalent.</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="mt-12">
                        <h2>Managing cookie preferences</h2>
                        <p>You can manage cookies in several ways:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Use our cookie banner/settings if available to accept, reject, or customize non-essential cookies</li>
                            <li>Adjust browser settings to block or delete cookies</li>
                            <li>Use platform tools e.g., Google/Meta ad settings where applicable</li>
                        </ul>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-6">
                            <p className="text-sm font-medium text-gray-900 m-0">
                                Note: Blocking certain cookies may affect site functionality.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="mt-12">
                        <h2>Third-party cookies</h2>
                        <p>
                            Some cookies may be set by third-party providers e.g., analytics or advertising platforms. These providers may collect information according to their own privacy policies.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal className="mt-12">
                        <h2>Changes to this Cookie Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time. The updated version will be posted on this page with a revised effective date.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal className="mt-12">
                        <h2>Contact</h2>
                        <p>If you have questions about cookies:</p>
                        <div className="bg-[#fbfbfb] p-8 rounded-2xl border border-gray-100 not-prose">
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="font-semibold text-[#000024] min-w-[80px]">Email:</span>
                                    <a href="mailto:hello@inyutek.com" className="hover:text-[#000024] transition-colors">hello@inyutek.com</a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-semibold text-[#000024] min-w-[80px]">Address:</span>
                                    <span>Ganpati nagar, Old bypass Road Amravati Maharashtra India</span>
                                </li>
                            </ul>
                        </div>
                    </ScrollReveal>

                </div>
            </section>

            <Footer />
        </main>
    )
}
