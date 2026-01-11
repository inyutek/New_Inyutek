import { LegalLayout } from "@/components/LegalLayout"

export default function CookieSettings() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <LegalLayout
            title="Cookie Settings"
            description="Control how we use cookies."
            lastUpdated={currentDate}
        >
            <p className="lead">
                Cookies help us understand how visitors use our website and improve performance.
                You are in control of how cookies are used.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>1. What Are Cookies?</h3>
            <p>
                Cookies are small data files stored on your device when you visit a website.
                They help websites remember preferences and analyze usage.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>2. Types of Cookies We Use</h3>

            <div className="space-y-6 mt-6">
                <div>
                    <h4 className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Essential Cookies
                    </h4>
                    <p className="text-sm mt-1">Required for core website functionality. Cannot be disabled.</p>
                </div>

                <div>
                    <h4 className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Analytics Cookies
                    </h4>
                    <p className="text-sm mt-1">Help us understand visitor behavior to improve performance.</p>
                </div>

                <div>
                    <h4 className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        Marketing Cookies
                    </h4>
                    <p className="text-sm mt-1">Used to measure campaign effectiveness. Not used to sell personal data.</p>
                </div>
            </div>

            <hr className="border-gray-100 my-10" />

            <h3>3. Managing Cookie Preferences</h3>
            <p>You can:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Accept or reject non-essential cookies</li>
                <li>Change preferences anytime via this page</li>
                <li>Disable cookies through your browser settings</li>
            </ul>

            <hr className="border-gray-100 my-10" />

            <h3>4. Third-Party Cookies</h3>
            <p>
                Some cookies may be placed by trusted third-party tools we use for analytics or performance tracking.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>5. Updates to This Policy</h3>
            <p>
                We may update cookie usage as tools or regulations change.
                Updates will be reflected on this page.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>6. Contact</h3>
            <p>For cookie-related questions:</p>
            <p>
                <strong>Email:</strong> <a href="mailto:your-email@inyutek.com" className="text-[#000024] underline underline-offset-4 hover:opacity-70">your-email@inyutek.com</a><br />
                <strong>Company:</strong> Inyutek
            </p>
        </LegalLayout>
    )
}
