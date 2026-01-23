"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

const PHONE_NUMBER = "9112235551"
const WHATSAPP_NUMBER = "919112235551"
const WHATSAPP_TEXT = encodeURIComponent("Hi Inyutek team, I want to to inquire about services.")
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`
const CALL_LINK = `tel:${PHONE_NUMBER}`
const EMAIL = "hello@inyutek.com"
const LOCATION = "Amravati Maharashtra India"

export function QuickContact() {
    return (
        <section className="bg-[#fbfbfb] py-20 px-6 lg:px-8 border-y border-gray-100">
            <ScrollReveal className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#000024] mb-4">Prefer to talk fast?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <a href={CALL_LINK} className="flex flex-col items-center p-8 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#000024]/5 transition-colors">
                            <Phone className="w-6 h-6 text-[#000024]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#000024] mb-1">Call</h3>
                        <p className="text-gray-500 text-sm">{"+91 " + PHONE_NUMBER}</p>
                    </a>

                    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex flex-col items-center p-8 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#000024]/5 transition-colors">
                            <MessageCircle className="w-6 h-6 text-[#000024]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#000024] mb-1">WhatsApp</h3>
                        <p className="text-gray-500 text-sm">Click to message</p>
                    </a>

                    <a href={`mailto:${EMAIL}`} className="flex flex-col items-center p-8 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#000024]/5 transition-colors">
                            <Mail className="w-6 h-6 text-[#000024]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#000024] mb-1">Email</h3>
                        <p className="text-gray-500 text-sm">{EMAIL}</p>
                    </a>

                    <div className="flex flex-col items-center p-8 bg-white rounded-xl border border-gray-100 group">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 transition-colors">
                            <MapPin className="w-6 h-6 text-[#000024]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#000024] mb-1">Location</h3>
                        <p className="text-gray-500 text-sm text-center">{LOCATION}</p>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}
