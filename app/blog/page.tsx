import Link from 'next/link'
import { getPosts } from '@/lib/notion'

export const revalidate = 60 // revalidate every minute

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#000024] mb-6">
                        Inyutek Blog
                    </h1>
                    <p className="text-xl text-gray-600">
                        Insights, updates, and stories from our team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col h-full bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300"
                        >
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-500 mb-4 border border-gray-100">
                                    {post.date}
                                </span>
                                <h2 className="text-2xl font-bold text-[#000024] mb-3 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 line-clamp-3">
                                    {post.summary}
                                </p>
                            </div>
                            <div className="mt-auto flex items-center text-blue-600 font-medium">
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
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl">
                        <p className="text-xl text-gray-500 mb-2">No posts found.</p>
                        <p className="text-gray-400">Make sure your Notion database is connected and has published posts.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
