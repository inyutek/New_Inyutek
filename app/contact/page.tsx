import { Metadata } from 'next'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { QuickContact } from '@/components/contact/QuickContact'
import { ContactFAQ } from '@/components/contact/ContactFAQ'
import { StickyMobileButtons } from '@/components/contact/StickyMobileButtons'
import { CTASection } from '@/components/sections/CTASection'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
    title: 'Book a Free Growth Audit | Inyutek',
    description: 'Book a free growth audit with Inyutek. Get clear funnel fixes to increase calls, bookings, and ecommerce sales—no pressure, just next steps.',
}

export default function ContactPage() {
    return (
        <main>
            <ContactHero />
            <ContactForm />
            <QuickContact />
            <ContactFAQ />

            {/* Final CTA Strip Reused from Home but with adjusted text handled by props if needed, or just standard CTA */}
            {/* User requested: 
          7) Final CTA strip
          H2: Ready to get a clear plan?
          Button: Schedule a Free Audit
          Secondary link: View Services
      */}
            {/* Since CTASection is hardcoded, I might need to make it flexible or create a specific one for here. 
          Given the reuse request vs specific content, I'll create a local variant or verify if CTASection is flexible.
          Looking at CTASection code, it's hardcoded. I will create a simple inline CTA section here 
          to match the spec exactly rather than hacking the reusable one. 
      */}

            <section className="py-32 bg-[#fbfbfb]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="type-h2 mb-8">
                        Ready to get a clear plan?
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#booking-form"
                            className="w-full sm:w-auto px-8 py-3 bg-[#000024] text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition-all hover:-translate-y-1"
                        >
                            Schedule a Free Audit
                        </a>
                        <a
                            href="/what-we-do"
                            className="w-full sm:w-auto px-8 py-3 text-[#000024] font-medium hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            View Services
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
            <StickyMobileButtons />
        </main>
    )
}
