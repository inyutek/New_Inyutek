'use client'

import { ReactNode, useEffect, useRef, Suspense, useState } from 'react'
import Lenis from 'lenis'
import { usePathname, useSearchParams } from 'next/navigation'

function HashScrollHandler({ lenis }: { lenis: Lenis | null }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (lenis && window.location.hash) {
            const target = document.querySelector(window.location.hash) as HTMLElement | null
            if (target) {
                // Small delay to ensure render
                setTimeout(() => {
                    lenis.scrollTo(target)
                }, 100)
            }
        }
    }, [pathname, searchParams, lenis])

    return null
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)
    // Force re-render when lenis is ready
    const [lenis, setLenis] = useState<Lenis | null>(null)

    useEffect(() => {
        const newLenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        })
        lenisRef.current = newLenis
        setLenis(newLenis)

        function raf(time: number) {
            newLenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            newLenis.destroy()
            lenisRef.current = null
            setLenis(null)
        }
    }, [])

    return (
        <>
            <Suspense fallback={null}>
                <HashScrollHandler lenis={lenisRef.current} />
            </Suspense>
            {children}
        </>
    )
}
