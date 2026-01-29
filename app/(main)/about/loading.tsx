import Link from 'next/link';

export default function LoadingAbout() {
    return (
        <div className="min-h-screen bg-white dark:bg-background-dark">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-deep-navy dark:text-white mb-6">
                        About <span className="text-primary">Us</span>
                    </h1>
                    <p className="text-xl text-slate-gray dark:text-slate-400 leading-relaxed">
                        Loading...
                    </p>
                </div>
            </div>

            {/* Loading Skeleton */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="flex flex-col md:flex-row items-center gap-12 mb-24 last:mb-0">
                        <div className="flex-1 space-y-4">
                            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-2/3"></div>
                            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        </div>
                        <div className="flex-1 h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
