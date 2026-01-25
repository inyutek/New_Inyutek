import Link from 'next/link'
import * as motion from "framer-motion/client"
import { getPosts } from '@/lib/notion'
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Reveal, staggerContainer, staggerItem } from "@/components/motion-presets"

export const revalidate = 60 // revalidate every minute

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <div className="bg-[#fbfbfb] min-h-screen pt-40 pb-24">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Hero Section */}
                <ScrollReveal className="max-w-3xl mx-auto text-center mb-24">
                    <Reveal>
                        <h1 className="type-h1 mb-6">
                            Inyutek Blog
                        </h1>
                        <p className="type-lead-hero mx-auto max-w-2xl">
                            Insights, updates, and stories from our team.
                        </p>
                    </Reveal>
                </ScrollReveal>

                {/* Posts Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {posts.map((post) => (
                        <motion.div key={post.id} variants={staggerItem} className="h-full">
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="mb-6 relative z-10">
                                    <span className="inline-block px-3 py-1 bg-gray-50 rounded-full text-xs font-bold tracking-wider text-gray-500 uppercase mb-5 border border-gray-100">
                                        {post.date}
                                    </span>
                                    <h2 className="type-card-title mb-4 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                                        {post.summary}
                                    </p>
                                </div>
                                <div className="mt-auto flex items-center text-blue-600 font-bold tracking-tight relative z-10">
                                    Read Article
                                    <svg
                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {posts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm"
                    >
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#000024] mb-2">No posts found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Make sure your Notion database is connected and has published posts with the correct status.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
