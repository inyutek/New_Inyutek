import { LegalLayout } from "@/components/LegalLayout"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms & Conditions | Inyutek",
    description: "Read Inyutek’s Terms & Conditions covering service use, payments, intellectual property, limitations, and contact information.",
    robots: {
        index: false,
        follow: false,
    },
}

export default function TermsAndConditions() {
    return (
        <LegalLayout
            title="Terms & Conditions"
            description="These Terms govern your use of Inyutek—we, us, our—and our website, services, and communications."
            lastUpdated="January 1, 2026"
        >
            <p className="lead">
                <strong>Contact:</strong> inyutek@gmail.com<br />
                <strong>Business location:</strong> AMRAVATI MAHARSHTRA INDIA
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Acceptance of Terms</h2>
            <p>
                By accessing this website or purchasing/using our services, you agree to these Terms. If you do not agree, do not use the website or services.
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Services</h2>
            <p>
                We provide digital marketing services, which may include depending on the engagement: strategy, landing pages, conversion rate optimization, paid advertising management, SEO, content guidance, CRM/automation setup, analytics, and reporting.
            </p>
            <p className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <strong>Important:</strong> We may update or change service offerings at any time. Specific deliverables, timelines, and scope will be defined in a written proposal or agreement.
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>No Guarantees</h2>
            <p>
                Marketing performance depends on factors outside our control (market conditions, offer quality, pricing, competition, website performance, ad platforms, and your operational capacity to handle leads).
            </p>
            <p className="mt-4">
                We do not guarantee specific outcomes e.g., rankings, leads, revenue, ROAS.
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Client Responsibilities</h2>
            <p>To deliver results efficiently, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Provide accurate information and timely approvals</li>
                <li>Maintain access to relevant accounts website, ad accounts, analytics, CRM</li>
                <li>Respond to leads promptly especially for local service businesses</li>
                <li>Ensure your products/services comply with applicable laws and platform policies</li>
            </ul>
            <p className="mt-4">
                Delays in approvals or missing access may affect timelines and outcomes.
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Payments & Fees</h2>
            <p>If you purchase services from us:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Fees, billing cycle, and payment terms will be stated in your proposal/agreement</li>
                <li>Late payments may pause work until the account is current</li>
                <li>Third-party costs (ad spend, tools, subscriptions, hosting, plugins) are paid by you unless explicitly stated otherwise</li>
            </ul>
            <p className="mt-4">
                <strong>Refunds:</strong> Unless otherwise stated in writing, payments for work delivered or time spent are non-refundable.
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Intellectual Property</h2>
            <p>
                We retain ownership of our internal frameworks, templates, methods, and know-how.
            </p>
            <p>
                Upon full payment, you receive rights to use the final deliverables created specifically for you e.g., copy, landing page assets, unless otherwise stated in writing.
            </p>
            <p>
                You must not copy, resell, or redistribute our website content or materials without written permission.
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Confidentiality</h2>
            <p>
                If you share confidential information with us, we will use it only to deliver services and will not disclose it publicly, except as required by law or with your permission.
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Third-Party Platforms & Tools</h2>
            <p>
                Our services may involve third-party platforms e.g., Google, Meta, Shopify, email tools, CRMs. We are not responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Platform outages or policy changes</li>
                <li>Account suspensions caused by policy violations</li>
                <li>Changes in algorithms, pricing, or ad auction dynamics</li>
                <li>Data loss or issues caused by third-party providers</li>
            </ul>
            <p className="mt-4">
                You agree to follow the terms and policies of all third-party platforms you use.
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Limitation of Liability</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>We are not liable for indirect, incidental, special, or consequential damages</li>
                <li>Our total liability for any claim related to services or the website will not exceed the amount you paid us for the services giving rise to the claim</li>
            </ul>

            <hr className="border-gray-100 my-10" />

            <h2>Termination</h2>
            <p>We may suspend or terminate access to the website or services if:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>You violate these Terms</li>
                <li>Payment is overdue</li>
                <li>You request or engage in unlawful or policy-violating activities</li>
            </ul>
            <p className="mt-4">
                Either party may terminate a service engagement according to the written proposal/agreement.
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Governing Law</h2>
            <p>
                These Terms are governed by the laws of [MAHARASHTRA, INDIA]. Any disputes will be subject to the courts located in [AMRAVATI, Maharashtra].
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Changes to These Terms</h2>
            <p>
                We may update these Terms from time to time. Updates will be posted on this page with a revised effective date.
            </p>

            <hr className="border-gray-100 my-10" />

            <h2>Contact</h2>
            <p>For questions about these Terms:</p>
            <p>
                <strong>Email:</strong> <a href="mailto:inyutek@gmail.com" className="text-[#000024] underline underline-offset-4 hover:opacity-70">inyutek@gmail.com</a><br />
                <strong>Address:</strong> Ganpati nagar, Old bypass Road Amravati Maharashtra India
            </p>
        </LegalLayout>
    )
}
