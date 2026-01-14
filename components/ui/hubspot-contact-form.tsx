"use client"

import { useEffect } from "react"

export function HubSpotContactForm() {
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://js-na2.hsforms.net/forms/embed/244865257.js"
        script.async = true
        script.defer = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <div className="w-full">
            <h3 className="text-2xl font-semibold mb-6 text-[#000024]">Contact Us</h3>
            <div
                className="hs-form-frame"
                data-region="na2"
                data-form-id="f4b1d60f-91eb-4713-8714-0f0d7012dc17"
                data-portal-id="244865257"
            ></div>
        </div>
    )
}
