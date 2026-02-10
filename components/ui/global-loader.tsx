"use client"

import { useEffect, useState } from "react"

export function GlobalLoader() {
    const [show, setShow] = useState(true)
    const [isHiding, setIsHiding] = useState(false)

    useEffect(() => {
        // Determine wait time based on entry animation
        // The previous script waited 1200ms
        const timer = setTimeout(() => {
            setIsHiding(true) // Trigger exit animation

            // Wait for exit animation to finish (e.g., 500ms) before unmounting
            setTimeout(() => {
                setShow(false)
            }, 500)
        }, 1200)

        return () => clearTimeout(timer)
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
                // Common styles from globals.css should apply via ID, 
                // but we keep inline structure to match original look if needed.
            }}
        >
            <span className="loader-text">INYUTEK</span>
        </div>
    )
}
