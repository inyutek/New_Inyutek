"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const BRAND_COLOR = "#000024"

// ✅ Real contact details
const PHONE_NUMBER = "9112235551"
const WHATSAPP_NUMBER = "919112235551"

const WHATSAPP_TEXT = encodeURIComponent(
    "Hi Inyutek team, I want to schedule a meeting."
)

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`
const CALL_LINK = `tel:${PHONE_NUMBER}`

export function Navbar() {
    const [open, setOpen] = useState(false)
    const [resourcesOpen, setResourcesOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)
    const resourcesRef = useRef<HTMLDivElement | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const pathname = usePathname()
    const router = useRouter()

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setResourcesOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setResourcesOpen(false)
        }, 150)
    }

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
        e.preventDefault()
        if (pathname === "/") {
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        } else {
            router.push(`/#${id}`)
        }
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
            if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
                setResourcesOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    return (
        <nav className="border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-50">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Left: Brand */}
                <div className="w-[140px]">
                    <Link
                        href="/"
                        onClick={(e) => {
                            if (window.location.pathname === "/") {
                                e.preventDefault()
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                        }}
                        className="font-bold text-xl uppercase tracking-wider text-[#000024]"
                    >
                        INYUTEK
                    </Link>
                </div>

                {/* Center: Links */}
                <div className="hidden md:flex flex-1 justify-center gap-8 text-sm font-medium text-gray-600 items-center">
                    <a
                        href="/#services"
                        onClick={(e) => handleScroll(e, "services")}
                        className="hover:text-[#000024] transition-colors cursor-pointer"
                    >
                        Services
                    </a>
                    <a
                        href="/#process"
                        onClick={(e) => handleScroll(e, "process")}
                        className="hover:text-[#000024] transition-colors cursor-pointer"
                    >
                        Process
                    </a>
                    <Link href="/about" className="hover:text-[#000024] transition-colors">
                        About
                    </Link>

                    {/* Resources Dropdown */}
                    <div
                        className="relative"
                        ref={resourcesRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            onClick={() => setResourcesOpen(!resourcesOpen)}
                            className="flex items-center gap-1 hover:text-[#000024] transition-colors"
                        >
                            Resources
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} />
                        </button>

                        {resourcesOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden flex flex-col py-1 animate-in fade-in zoom-in-95 duration-200">
                                <Link
                                    href="/case-studies"
                                    className="px-4 py-2 hover:bg-gray-50 text-left transition-colors text-gray-600 hover:text-[#000024]"
                                    onClick={() => setResourcesOpen(false)}
                                >
                                    Case Studies
                                </Link>
                                <Link
                                    href="/portfolio"
                                    className="px-4 py-2 hover:bg-gray-50 text-left transition-colors text-gray-600 hover:text-[#000024]"
                                    onClick={() => setResourcesOpen(false)}
                                >
                                    Portfolio
                                </Link>
                                <Link
                                    href="/newsletter"
                                    className="px-4 py-2 hover:bg-gray-50 text-left transition-colors text-gray-600 hover:text-[#000024]"
                                    onClick={() => setResourcesOpen(false)}
                                >
                                    Newsletter
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Book Call Dropdown */}
                <div className="w-[140px] flex justify-end relative" ref={ref}>
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="bg-[#000024] text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all hover:-translate-y-1"
                    >
                        Book a call
                    </button>

                    {open && (
                        <div className="absolute right-0 top-12 w-56 rounded-xl border border-black/10 bg-white shadow-lg overflow-hidden">
                            <a
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 text-sm text-black/80 hover:bg-black/5"
                            >
                                WhatsApp
                                <div className="text-xs text-black/50 mt-0.5">
                                    Message us directly
                                </div>
                            </a>

                            <a
                                href={CALL_LINK}
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 text-sm text-black/80 hover:bg-black/5"
                            >
                                Call
                                <div className="text-xs text-black/50 mt-0.5">
                                    {PHONE_NUMBER}
                                </div>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
