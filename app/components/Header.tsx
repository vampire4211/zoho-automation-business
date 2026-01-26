import Link from 'next/link';

export default function Header() {
    return (
        <header className="w-full border-b border-solid border-slate-200 dark:border-border-dark sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-primary">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M24 4L44 24L24 44L4 24L24 4ZM24 16L32 24L24 32L16 24L24 16Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <h1 className="text-lg font-bold tracking-tight text-deep-navy dark:text-white">J&P Zoho Business Automation</h1>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <Link className="text-base font-medium text-slate-gray dark:text-slate-300 hover:text-primary transition-colors" href="/">Home</Link>
                    <Link className="text-base font-medium text-slate-gray dark:text-slate-300 hover:text-primary transition-colors" href="/services">Services</Link>
                    <Link className="text-base font-medium text-slate-gray dark:text-slate-300 hover:text-primary transition-colors" href="/portfolio">Portfolio</Link>
                    <Link className="text-base font-medium text-slate-gray dark:text-slate-300 hover:text-primary transition-colors" href="/blog">Blog</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/contact" className="hidden md:flex items-center justify-center h-10 px-6 rounded-md border border-slate-200 dark:border-border-dark hover:border-primary hover:text-primary text-deep-navy dark:text-white text-base font-bold transition-all">
                        Contact
                    </Link>
                    <button className="md:hidden p-2 text-deep-navy dark:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
