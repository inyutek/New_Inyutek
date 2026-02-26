"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

/* ─── Types ──────────────────────────────────────────────── */
type ConsentState = "granted" | "denied"

interface ConsentChoices {
    analytics_storage: ConsentState
    ad_storage: ConsentState
    ad_user_data: ConsentState
    ad_personalization: ConsentState
}

/* ─── Helpers ────────────────────────────────────────────── */
const STORAGE_KEY = "inyutek_cookie_consent"

/** Push a consent‑mode update into the dataLayer / gtag. */
function updateGoogleConsent(choices: ConsentChoices) {
    if (typeof window === "undefined") return
    const w = window as Window & { gtag?: (...args: unknown[]) => void }
    if (w.gtag) {
        w.gtag("consent", "update", { ...choices })
    }
}

function saveConsent(choices: ConsentChoices) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choices))
}

function loadConsent(): ConsentChoices | null {
    if (typeof window === "undefined") return null
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? (JSON.parse(raw) as ConsentChoices) : null
    } catch {
        return null
    }
}

const ALL_GRANTED: ConsentChoices = {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
}

const ALL_DENIED: ConsentChoices = {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
}

/* ─── Component ──────────────────────────────────────────── */
export function CookieBanner() {
    const [visible, setVisible] = useState(false)
    const [showPreferences, setShowPreferences] = useState(false)
    const [analytics, setAnalytics] = useState(false)
    const [marketing, setMarketing] = useState(false)

    /* On mount: if user already chose, apply that & hide banner. */
    useEffect(() => {
        const saved = loadConsent()
        if (saved) {
            updateGoogleConsent(saved)
            setVisible(false)
        } else {
            /* Small delay so page finishes painting before banner animates in */
            const timer = setTimeout(() => setVisible(true), 1200)
            return () => clearTimeout(timer)
        }
    }, [])

    /* ── actions ── */
    function acceptAll() {
        saveConsent(ALL_GRANTED)
        updateGoogleConsent(ALL_GRANTED)
        setVisible(false)
    }

    function rejectAll() {
        saveConsent(ALL_DENIED)
        updateGoogleConsent(ALL_DENIED)
        setVisible(false)
    }

    function savePreferences() {
        const choices: ConsentChoices = {
            analytics_storage: analytics ? "granted" : "denied",
            ad_storage: marketing ? "granted" : "denied",
            ad_user_data: marketing ? "granted" : "denied",
            ad_personalization: marketing ? "granted" : "denied",
        }
        saveConsent(choices)
        updateGoogleConsent(choices)
        setVisible(false)
    }

    /* ── render ── */
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="cookie-banner"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className="fixed bottom-0 inset-x-0 z-[9998] flex justify-center px-4 pb-4 sm:pb-6 pointer-events-none"
                >
                    <div
                        className="pointer-events-auto w-full max-w-[520px] rounded-2xl border border-black/5 bg-white shadow-[0_8px_40px_rgba(0,0,36,0.12)] overflow-hidden"
                        style={{ fontFamily: "var(--font-inter, Inter, system-ui, sans-serif)" }}
                    >
                        {/* ── Main panel ── */}
                        <div className="px-6 pt-6 pb-5">
                            <p className="text-[15px] leading-relaxed text-[#010B13]/80 m-0">
                                We use cookies to improve your experience and measure site
                                performance.{" "}
                                <Link
                                    href="/cookie-policy"
                                    className="text-[#000024] font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
                                >
                                    Cookie Policy
                                </Link>
                            </p>

                            {/* ── Buttons ── */}
                            <div className="flex flex-wrap items-center gap-2.5 mt-5">
                                <button
                                    onClick={acceptAll}
                                    className="flex-1 min-w-[120px] rounded-lg bg-[#000024] text-white text-sm font-semibold py-2.5 px-5 cursor-pointer transition-all duration-200 hover:bg-[#000024]/90 hover:shadow-md active:scale-[0.97]"
                                >
                                    Accept all
                                </button>
                                <button
                                    onClick={rejectAll}
                                    className="flex-1 min-w-[120px] rounded-lg border border-black/10 bg-white text-[#000024] text-sm font-semibold py-2.5 px-5 cursor-pointer transition-all duration-200 hover:bg-[#fbfbfb] hover:border-black/15 active:scale-[0.97]"
                                >
                                    Reject all
                                </button>
                                <button
                                    onClick={() => setShowPreferences((p) => !p)}
                                    className="w-full sm:w-auto rounded-lg text-[#000024]/60 text-[13px] font-medium py-2 px-3 cursor-pointer transition-colors duration-200 hover:text-[#000024] hover:bg-black/[0.03]"
                                >
                                    {showPreferences ? "Hide preferences" : "Manage preferences"}
                                </button>
                            </div>
                        </div>

                        {/* ── Preferences panel ── */}
                        <AnimatePresence>
                            {showPreferences && (
                                <motion.div
                                    key="prefs"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="border-t border-black/5 px-6 py-5 space-y-4 bg-[#fbfbfb]">
                                        {/* Essential — always on */}
                                        <PreferenceRow
                                            label="Essential"
                                            description="Required for the site to work. Always active."
                                            checked={true}
                                            disabled
                                            color="#000024"
                                        />
                                        {/* Analytics */}
                                        <PreferenceRow
                                            label="Analytics"
                                            description="Helps us understand how visitors use the site."
                                            checked={analytics}
                                            onChange={setAnalytics}
                                            color="#000024"
                                        />
                                        {/* Marketing */}
                                        <PreferenceRow
                                            label="Marketing"
                                            description="Used to measure campaign effectiveness."
                                            checked={marketing}
                                            onChange={setMarketing}
                                            color="#000024"
                                        />

                                        <button
                                            onClick={savePreferences}
                                            className="w-full rounded-lg bg-[#000024] text-white text-sm font-semibold py-2.5 cursor-pointer transition-all duration-200 hover:bg-[#000024]/90 hover:shadow-md active:scale-[0.97] mt-1"
                                        >
                                            Save preferences
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/* ─── Toggle row ─────────────────────────────────────────── */
function PreferenceRow({
    label,
    description,
    checked,
    onChange,
    disabled,
    color,
}: {
    label: string
    description: string
    checked: boolean
    onChange?: (value: boolean) => void
    disabled?: boolean
    color: string
}) {
    return (
        <label
            className={`flex items-start justify-between gap-4 ${disabled ? "" : "cursor-pointer"}`}
        >
            <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-[#000024] block">{label}</span>
                <span className="text-xs text-[#6B7280] leading-snug block mt-0.5">
                    {description}
                </span>
            </div>

            {/* Toggle switch */}
            <span
                role="switch"
                aria-checked={checked}
                aria-label={label}
                onClick={(e) => {
                    if (disabled) return
                    e.preventDefault()
                    onChange?.(!checked)
                }}
                className={`
                    relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent
                    transition-colors duration-200 ease-in-out focus:outline-none
                    ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
                `}
                style={{
                    backgroundColor: checked ? color : "#E5E7EB",
                }}
            >
                <span
                    className={`
                        pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0
                        transition-transform duration-200 ease-in-out
                        ${checked ? "translate-x-5" : "translate-x-0"}
                    `}
                />
            </span>
        </label>
    )
}
