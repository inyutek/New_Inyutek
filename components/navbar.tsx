"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [resourcesOpen, setResourcesOpen] = useState(false)
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
                    {pathname !== "/" && (
                        <Link href="/" className="hover:text-[#000024] transition-colors">
                            Home
                        </Link>
                    )}
                    <Link
                        href="/what-we-do"
                        className={`transition-colors ${pathname === "/what-we-do" ? "text-[#010B13] font-bold" : "hover:text-[#000024]"}`}
                    >
                        What We Do
                    </Link>
                    <Link
                        href="/how-we-work"
                        className={`transition-colors ${pathname === "/how-we-work" ? "text-[#010B13] font-bold" : "hover:text-[#000024]"}`}
                    >
                        How We Work
                    </Link>
                    <Link
                        href="/about"
                        className={`transition-colors ${pathname === "/about" ? "text-[#010B13] font-bold" : "hover:text-[#000024]"}`}
                    >
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
                            className={`flex items-center gap-1 transition-colors ${pathname === "/case-studies" || pathname === "/blog" || pathname === "/contact"
                                ? "text-[#010B13] font-bold"
                                : "hover:text-[#000024]"
                                }`}
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
                                    href="/blog"
                                    className="px-4 py-2 hover:bg-gray-50 text-left transition-colors text-gray-600 hover:text-[#000024]"
                                    onClick={() => setResourcesOpen(false)}
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-4 py-2 hover:bg-gray-50 text-left transition-colors text-gray-600 hover:text-[#000024]"
                                    onClick={() => setResourcesOpen(false)}
                                >
                                    Contact Us
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Book Call Button */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block w-[140px] flex justify-end">
                        <Link
                            href="/contact"
                            className="bg-[#000024] text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all hover:-translate-y-1"
                        >
                            Book a call
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[#000024]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg p-4 flex flex-col gap-4 overflow-hidden"
                    >
                        {pathname !== "/" && (
                            <Link href="/" className="text-base font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                                Home
                            </Link>
                        )}
                        <Link href="/what-we-do" className="text-base font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                            What We Do
                        </Link>
                        <Link href="/how-we-work" className="text-base font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                            How We Work
                        </Link>
                        <Link href="/about" className="text-base font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                            About
                        </Link>
                        <div className="py-2">
                            <div className="text-sm font-medium text-gray-400 mb-2">Resources</div>
                            <div className="pl-4 flex flex-col gap-3">
                                <Link href="/case-studies" className="text-base text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Case Studies</Link>
                                <Link href="/blog" className="text-base text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                                <Link href="/contact" className="text-base text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                            </div>
                        </div>
                        <Link href="/contact" className="w-full bg-[#000024] text-white text-center py-3 rounded-lg font-medium mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                            Book a call
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
