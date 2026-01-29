import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="w-full border-b border-solid border-slate-200 dark:border-border-dark sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-primary/20">
                        <Image
                            src="/images/logo.png"
                            alt="J&P Zoho Business Automation"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <h1 className="text-lg font-bold tracking-tight text-deep-navy dark:text-white">J&P Zoho Business Automation</h1>
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link className="text-base font-medium text-slate-gray dark:text-slate-300 hover:text-primary transition-colors" href="/">Home</Link>
                    <Link className="text-base font-medium text-slate-gray dark:text-slate-300 hover:text-primary transition-colors" href="/about">About</Link>
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
