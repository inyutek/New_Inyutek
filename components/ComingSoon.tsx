import Image from "next/image"

export default function ComingSoon({ children }: { children?: React.ReactNode }) {
    return (
        <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center">
            <Image
                src="/coming-soon.webp"
                alt="Coming Soon"
                fill
                quality={80}
                className="object-cover"
                priority
            />
            <div className="relative z-10 text-white text-center p-4 flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 drop-shadow-lg">
                    COMING SOON
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-md mx-auto drop-shadow-md mb-8">
                    We are working hard to bring you something amazing. Stay tuned!
                </p>
                {children}
            </div>
            <div className="absolute inset-0 bg-black/40 z-0" />
        </div>
    )
}
