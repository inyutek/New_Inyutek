import { LegalLayout } from "@/components/LegalLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy | Inyutek",
    description: "Inyutek’s Privacy Policy explains what data we collect, how we use it, cookies, analytics, advertising pixels, and how to request access or deletion.",
}

export default function PrivacyPolicy() {
    return (
        <LegalLayout
            title="Privacy Policy"
            // The wireframe mentions "Effective date: [01/01/2026]" in the header, 
            // but LegalLayout takes a lastUpdated prop. We can use that.
            lastUpdated="January 1, 2026"
        >
            <p className="mb-8">
                This Privacy Policy explains how Inyutek (“we,” “us,” “our”) collects, uses, and protects information when you use our website and services.
            </p>

            <div className="mb-12">
                <p><strong>Contact:</strong> <a href="mailto:inyutek@gmail.com" className="hover:underline">inyutek@gmail.com</a></p>
                <p><strong>Business location:</strong> Amravati Maharashtra India</p>
            </div>

            <section className="mb-12">
                <h2>Information we collect</h2>
                <p className="mb-4">We may collect the following types of information:</p>

                <h3 className="text-xl font-bold mt-6 mb-3">A) Information you provide</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>Name, email, phone/WhatsApp number</li>
                    <li>Business name, website/store URL, social links</li>
                    <li>Messages you send via forms, email, or WhatsApp</li>
                    <li>Information submitted in booking or audit forms – goals, budget ranges, challenges</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-3">B) Information collected automatically</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>IP address, device type, browser, pages visited, time on site, referral source</li>
                    <li>Cookies or similar technologies used for analytics and advertising measurement</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-3">C) Information from third parties</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>Advertising/analytics platforms may provide aggregated reporting – e.g., ad clicks, conversions</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2>How we use your information</h2>
                <p className="mb-4">We use collected information to:</p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>Respond to inquiries and schedule calls/audits</li>
                    <li>Provide services and deliver proposals or reports</li>
                    <li>Improve website performance, conversion rate, and user experience</li>
                    <li>Measure marketing effectiveness (analytics and conversion tracking)</li>
                    <li>Send service-related updates (e.g., booking confirmations, follow-ups)</li>
                </ul>
                <p>We do not sell your personal data.</p>
            </section>

            <section className="mb-12">
                <h2>Legal basis for processing (where applicable)</h2>
                <p className="mb-4">Depending on your location, we process data based on:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Consent</strong> – e.g., marketing cookies, pixels where required</li>
                    <li><strong>Contract</strong> – to provide services you request</li>
                    <li><strong>Legitimate interests</strong> – website security, improving performance, basic analytics</li>
                    <li><strong>Legal obligations</strong> – compliance requests</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2>Cookies, analytics, and advertising</h2>
                <p className="mb-4">We may use cookies and similar technologies for:</p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li><strong>Website functionality</strong> – essential cookies</li>
                    <li><strong>Analytics</strong> – e.g., Google Analytics</li>
                    <li><strong>Advertising measurement and retargeting</strong> – e.g., Meta Pixel, Google Ads tags</li>
                </ul>
                <p className="mb-4">You can control cookies via:</p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>Your browser settings</li>
                    <li>Our cookie banner/settings (if enabled)</li>
                </ul>
                <p>For details, see our Cookie Policy: <a href="/cookie-policy" className="text-blue-600 hover:underline">/cookie-policy</a></p>
            </section>

            <section className="mb-12">
                <h2>Google API Disclosure</h2>
                <p className="mb-4">
                    Our application uses Google APIs to provide core features. We strictly adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li><strong>Gmail API:</strong> Used solely to send follow-up emails and delivery of requested materials (e.g., blueprints) directly to users who have provided their email address.</li>
                    <li><strong>Google Sheets API:</strong> Used to securely store lead data collected via our website forms for the purpose of business follow-up and service delivery.</li>
                </ul>
                <p>
                    We do not share, sell, or use this data for any purposes other than those explicitly stated above.
                </p>
            </section>

            <section className="mb-12">
                <h2>Who we share data with</h2>
                <p className="mb-4">We may share information with trusted service providers who help us run our business, such as:</p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>Website hosting and analytics providers</li>
                    <li>Form/booking tools (e.g., scheduling software)</li>
                    <li>CRM/email tools used for lead management and follow-up</li>
                    <li>Advertising platforms for conversion measurement</li>
                </ul>
                <p>We may also disclose information if required by law, to protect rights/safety, or to prevent fraud.</p>
            </section>

            <section className="mb-12">
                <h2>How long we keep data</h2>
                <p className="mb-4">We retain personal information only as long as needed for:</p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>Providing services and support</li>
                    <li>Maintaining business records</li>
                    <li>Legal, tax, or compliance requirements</li>
                </ul>
                <p>You may request deletion – see “Your rights” below.</p>
            </section>

            <section className="mb-12">
                <h2>How we protect your data</h2>
                <p>We use reasonable administrative, technical, and organizational safeguards to protect information. However, no online system is 100% secure.</p>
            </section>

            <section className="mb-12">
                <h2>Your rights</h2>
                <p className="mb-4">Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>Request access to the personal data we hold about you</li>
                    <li>Request correction or deletion</li>
                    <li>Object to certain processing</li>
                    <li>Withdraw consent (where consent is the basis)</li>
                </ul>
                <p>To make a request, email <a href="mailto:inyutek@gmail.com" className="text-blue-600 hover:underline">inyutek@gmail.com</a> with the subject line: “Privacy Request.”</p>
            </section>

            <section className="mb-12">
                <h2>International data transfers</h2>
                <p>Your information may be processed in countries where our service providers operate. We take steps to work with reputable providers and protect data appropriately.</p>
            </section>

            <section className="mb-12">
                <h2>Children’s privacy</h2>
                <p>Our website and services are not intended for children under 13 (or the age required in your jurisdiction). We do not knowingly collect data from children.</p>
            </section>

            <section className="mb-12">
                <h2>Changes to this Privacy Policy</h2>
                <p>We may update this policy from time to time. The latest version will always be posted here with an updated effective date.</p>
            </section>

            <section className="mb-12">
                <h2>Contact</h2>
                <p className="mb-4">If you have questions about this policy:</p>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:inyutek@gmail.com" className="text-blue-600 hover:underline">inyutek@gmail.com</a></p>
                <p><strong>Address:</strong> Ganpati nagar, Old bypass Road Amravati Maharashtra India</p>
            </section>
        </LegalLayout>
    )
}
