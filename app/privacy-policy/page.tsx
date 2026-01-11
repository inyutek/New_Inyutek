import { LegalLayout } from "@/components/LegalLayout"

export default function PrivacyPolicy() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <LegalLayout
            title="Privacy Policy"
            description="How we collect, use, and protect your information."
            lastUpdated={currentDate}
        >
            <p className="lead">
                At <strong>Inyutek</strong>, privacy is treated as part of trust—not a checkbox.
                This policy explains how we collect, use, and protect information when you interact with our website or services.
            </p>

            <p>
                By using this site, you agree to the practices described below.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>1. Information We Collect</h3>
            <p>
                We collect information in two ways: information you provide directly and information collected automatically.
            </p>

            <h4>Information you provide</h4>
            <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Company name</li>
                <li>Phone number</li>
                <li>Any information you submit via forms or communication</li>
            </ul>

            <h4>Information collected automatically</h4>
            <ul className="list-disc pl-5 space-y-2">
                <li>IP address</li>
                <li>Browser and device type</li>
                <li>Pages visited and time spent</li>
                <li>Referral source</li>
            </ul>
            <p className="mt-4">
                This data helps us understand how our website performs and how users interact with it.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>2. How We Use Your Information</h3>
            <p>Your information is used to:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Respond to inquiries and consultation requests</li>
                <li>Deliver services and proposals</li>
                <li>Improve website experience and performance</li>
                <li>Analyze traffic, conversions, and funnel behavior</li>
                <li>Communicate relevant updates (only if opted in)</li>
            </ul>
            <p className="mt-6 font-medium">
                We <strong>do not sell, rent, or trade personal data</strong>.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>3. Cookies & Tracking</h3>
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Measure site performance</li>
                <li>Understand user behavior</li>
                <li>Optimize conversion paths</li>
            </ul>
            <p className="mt-4">
                You can control or disable cookies via your browser or cookie settings page.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>4. Third-Party Services</h3>
            <p>We may use trusted third-party tools such as:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Analytics platforms</li>
                <li>CRM systems</li>
                <li>Automation and marketing tools</li>
            </ul>
            <p className="mt-4">
                These providers only access data necessary for their function and are required to safeguard it.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>5. Data Security</h3>
            <p>
                We apply reasonable technical and organizational measures to protect your data.
                However, no digital system is completely secure.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>6. Data Retention</h3>
            <p>We retain data only as long as necessary to:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Fulfill business purposes</li>
                <li>Meet legal obligations</li>
                <li>Maintain operational records</li>
            </ul>

            <hr className="border-gray-100 my-10" />

            <h3>7. Your Rights</h3>
            <p>You may request to:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Access your personal data</li>
                <li>Correct or delete your information</li>
                <li>Withdraw consent for communications</li>
            </ul>
            <p className="mt-4">
                Requests can be sent to the contact details below.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>8. Contact</h3>
            <p>For privacy-related questions, contact:</p>
            <p>
                <strong>Email:</strong> <a href="mailto:your-email@inyutek.com" className="text-[#000024] underline underline-offset-4 hover:opacity-70">your-email@inyutek.com</a><br />
                <strong>Company:</strong> Inyutek
            </p>
        </LegalLayout>
    )
}
