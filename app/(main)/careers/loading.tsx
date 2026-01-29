export default function LoadingCareers() {
    return (
        <div className="min-h-screen bg-white dark:bg-background-dark py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-deep-navy dark:text-white mb-4">
                        Join Our <span className="text-primary">Team</span>
                    </h1>
                    <p className="text-slate-gray dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        Loading positions...
                    </p>
                </div>

                {/* Loading Skeleton */}
                <div className="grid gap-6 mb-16">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-8 animate-pulse">
                            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
                            <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                            <div className="flex gap-2">
                                <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
