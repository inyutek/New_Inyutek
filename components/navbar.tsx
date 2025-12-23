export default function Navbar() {
    return (
        <header className="border-b border-line bg-page">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo (text only in Inter) */}
                <div className="text-ink font-semibold tracking-tight">Logo</div>

                {/* Right side placeholder */}
                <nav className="hidden md:flex items-center gap-8 text-sm text-ink/80">
                    <a className="hover:text-ink" href="#">Services</a>
                    <a className="hover:text-ink" href="#">Process</a>
                    <a className="hover:text-ink" href="#">Work</a>
                </nav>

                <button className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white">
                    Button
                </button>
            </div>
        </header>
    );
}
