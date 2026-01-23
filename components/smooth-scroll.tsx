'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { usePathname, useSearchParams } from 'next/navigation'

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // removed invalid options
            touchMultiplier: 2,
        })
        lenisRef.current = lenis

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    useEffect(() => {
        if (lenisRef.current && window.location.hash) {
            const target = document.querySelector(window.location.hash) as HTMLElement | null
            if (target) {
                // Small delay to ensure render
                setTimeout(() => {
                    lenisRef.current?.scrollTo(target)
                }, 100)
            }
        }
    }, [pathname, searchParams])

    return <>{children}</>
}
