import { LegalLayout } from "@/components/LegalLayout"

export default function TermsOfService() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <LegalLayout
            title="Terms of Service"
            description="The rules and regulations for using our website."
            lastUpdated={currentDate}
        >
            <p className="lead">
                These Terms govern your use of the Inyutek website and services.
                By accessing or using this website, you agree to these Terms.
            </p>

            <p>
                If you do not agree, please discontinue use.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>1. Use of Website</h3>
            <p>
                You agree to use this website for lawful purposes only.
                You must not misuse, disrupt, or attempt to gain unauthorized access to the site.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>2. Services Disclaimer</h3>
            <p>
                Information on this website is provided for general business and marketing purposes.
                Results depend on multiple factors and <strong>are not guaranteed</strong>.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>3. Intellectual Property</h3>
            <p>
                All content, designs, text, and materials on this website are owned by Inyutek unless stated otherwise.
            </p>
            <p>
                You may not copy, reproduce, or distribute any content without written permission.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>4. Limitation of Liability</h3>
            <p>Inyutek is not liable for:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Indirect or consequential damages</li>
                <li>Loss of data or revenue</li>
                <li>Business interruption arising from site use</li>
            </ul>
            <p className="mt-4">
                Use of this site is at your own risk.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>5. External Links</h3>
            <p>
                This website may link to third-party sites.
                We are not responsible for their content or practices.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>6. Termination</h3>
            <p>
                We reserve the right to restrict or terminate access to the site if these Terms are violated.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>7. Changes to Terms</h3>
            <p>
                We may update these Terms at any time.
                Continued use after updates implies acceptance.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>8. Governing Law</h3>
            <p>
                These Terms are governed by applicable laws based on our operating jurisdiction.
            </p>

            <hr className="border-gray-100 my-10" />

            <h3>9. Contact</h3>
            <p>For questions regarding these Terms:</p>
            <p>
                <strong>Email:</strong> <a href="mailto:your-email@inyutek.com" className="text-[#000024] underline underline-offset-4 hover:opacity-70">your-email@inyutek.com</a><br />
                <strong>Company:</strong> Inyutek
            </p>
        </LegalLayout>
    )
}
