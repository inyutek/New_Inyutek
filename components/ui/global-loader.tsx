"use client"

import { useEffect, useState, useRef } from "react"

export function GlobalLoader() {
    const [show, setShow] = useState(true)
    const [isHiding, setIsHiding] = useState(false)
    const dismissed = useRef(false)
    const mountTime = useRef(Date.now())

    useEffect(() => {
        // Minimum time the loader must stay visible (ms)
        // This lets the entrance animation complete gracefully
        const MIN_DISPLAY_MS = 800

        const dismiss = () => {
            if (dismissed.current) return

            // Ensure loader has been visible for at least MIN_DISPLAY_MS
            const elapsed = Date.now() - mountTime.current
            if (elapsed < MIN_DISPLAY_MS) {
                setTimeout(dismiss, MIN_DISPLAY_MS - elapsed)
                return
            }

            dismissed.current = true
            setIsHiding(true) // Trigger CSS exit animation

            // Wait for CSS exit animation (400ms transition) before unmounting
            setTimeout(() => {
                setShow(false)
            }, 500)
        }

        // PRIMARY: Listen for hero-ready (hero images loaded + browser painted)
        const onHeroReady = () => dismiss()
        window.addEventListener("hero-ready", onHeroReady)

        // SECONDARY: Listen for the browser's load event (covers non-hero pages)
        const onPageLoad = () => dismiss()
        window.addEventListener("load", onPageLoad)

        // If the page already loaded before this effect ran (e.g. cached/SPA nav)
        if (document.readyState === "complete") {
            dismiss()
        }

        // SAFETY FALLBACK: 10s max — never leave users stuck on the loader
        const safety = setTimeout(dismiss, 10000)

        return () => {
            window.removeEventListener("hero-ready", onHeroReady)
            window.removeEventListener("load", onPageLoad)
            clearTimeout(safety)
        }
    }, [])

    if (!show) return null

    return (
        <div
            id="inyutek-loader"
            aria-hidden="true"
            className={isHiding ? "loader-hide" : ""}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000024',
            }}
        >
            <span className="loader-text">INYUTEK</span>
        </div>
    )
}
