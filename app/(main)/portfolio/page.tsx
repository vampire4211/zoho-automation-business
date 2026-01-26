export default function PortfolioPage() {
    return (
        <main className="flex-grow">
            <section className="pt-24 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
                        Portfolio & Insights
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                        Explore our case studies in business automation and read our latest thinking on building scalable, efficient enterprise systems. We bridge the gap between complex legacy infrastructure and modern agility.
                    </p>
                </div>
            </section>
            <section className="py-12 px-6 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-border-dark">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl font-bold tracking-tight">Selected Work</h2>
                        <a className="text-sm font-bold text-primary flex items-center gap-1 hover:underline group" href="#">
                            View all projects <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <article className="group relative flex flex-col bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-8 lg:p-10 transition-all hover:border-primary hover:shadow-xl dark:hover:shadow-none h-full">
                            <div className="flex items-start justify-between mb-8">
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">FinTech</span>
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">north_east</span>
                            </div>
                            <div className="mb-8">
                                <span className="block text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tighter">300% ROI</span>
                                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">In First Quarter</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Automated Compliance Engine</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-base">
                                Replaced manual KYC verification for a global payments processor with an intelligent automated workflow, reducing error rates to near zero.
                            </p>
                            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-border-dark flex items-center gap-4 text-xs font-medium text-slate-500">
                                <span>Process Mining</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>RPA Implementation</span>
                            </div>
                        </article>
                        <article className="group relative flex flex-col bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-8 lg:p-10 transition-all hover:border-primary hover:shadow-xl dark:hover:shadow-none h-full">
                            <div className="flex items-start justify-between mb-8">
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">Logistics</span>
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">north_east</span>
                            </div>
                            <div className="mb-8">
                                <span className="block text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tighter">60% Faster</span>
                                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Fulfillment Cycle</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Supply Chain Orchestration</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-base">
                                Connected 5 disparate inventory systems into a single source of truth, enabling real-time global stock tracking and automated reordering.
                            </p>
                            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-border-dark flex items-center gap-4 text-xs font-medium text-slate-500">
                                <span>API Integration</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>Custom Dashboard</span>
                            </div>
                        </article>
                        <article className="group relative flex flex-col bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-8 lg:p-10 transition-all hover:border-primary hover:shadow-xl dark:hover:shadow-none h-full">
                            <div className="flex items-start justify-between mb-8">
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">Legal</span>
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">north_east</span>
                            </div>
                            <div className="mb-8">
                                <span className="block text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tighter">$2M Saved</span>
                                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Annually in Billable Hours</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Contract Analysis Bot</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-base">
                                Developed a custom NLP solution to pre-scan thousands of standard contracts, flagging anomalies for senior partners automatically.
                            </p>
                            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-border-dark flex items-center gap-4 text-xs font-medium text-slate-500">
                                <span>NLP / AI</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>Workflow Design</span>
                            </div>
                        </article>
                        <article className="group relative flex flex-col bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-8 lg:p-10 transition-all hover:border-primary hover:shadow-xl dark:hover:shadow-none h-full">
                            <div className="flex items-start justify-between mb-8">
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">Healthcare</span>
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">north_east</span>
                            </div>
                            <div className="mb-8">
                                <span className="block text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tighter">Zero Errors</span>
                                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">In Patient Data Migration</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Legacy System Bridge</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-base">
                                Securely automated the transfer of 500k+ sensitive patient records from on-premise mainframes to a cloud-based EMR architecture.
                            </p>
                            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-border-dark flex items-center gap-4 text-xs font-medium text-slate-500">
                                <span>Data Migration</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>Security Compliance</span>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section className="py-24 px-6 bg-slate-50 dark:bg-surface-dark/30 border-t border-slate-200 dark:border-border-dark">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-end justify-between mb-16">
                        <h2 className="text-2xl font-bold tracking-tight">Latest Insights</h2>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full border border-slate-300 dark:border-border-dark flex items-center justify-center hover:border-primary hover:text-primary transition-all bg-white dark:bg-surface-dark">
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                            </button>
                            <button className="w-10 h-10 rounded-full border border-slate-300 dark:border-border-dark flex items-center justify-center hover:border-primary hover:text-primary transition-all bg-white dark:bg-surface-dark">
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <a className="group block p-8 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark hover:border-primary/40 hover:shadow-md transition-all relative overflow-hidden" href="#">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">Management</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Oct 24, 2023</span>
                                </div>
                                <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                    <span className="material-symbols-outlined text-sm">timer</span> 5 min read
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                                The Hidden Cost of "Human-in-the-Loop"
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed line-clamp-2">
                                Why keeping humans in mundane operational loops creates exponential drag on scalability, and how to redesign workflows for autonomy safely.
                            </p>
                        </a>
                        <a className="group block p-8 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark hover:border-primary/40 hover:shadow-md transition-all relative overflow-hidden" href="#">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">Technology</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Oct 12, 2023</span>
                                </div>
                                <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                    <span className="material-symbols-outlined text-sm">timer</span> 8 min read
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                                RPA vs. Traditional Integration: A CTO's Guide
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed line-clamp-2">
                                Choosing the right tool for the job when legacy systems refuse to talk to modern APIs. A decision matrix for technical leaders.
                            </p>
                        </a>
                        <a className="group block p-8 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark hover:border-primary/40 hover:shadow-md transition-all relative overflow-hidden" href="#">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">Strategy</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Sep 28, 2023</span>
                                </div>
                                <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                    <span className="material-symbols-outlined text-sm">timer</span> 6 min read
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                                Scaling Operations Without Increasing Headcount
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed line-clamp-2">
                                Strategic automation layers that allow your core team to focus on high-value tasks instead of data entry and verification.
                            </p>
                        </a>
                    </div>
                    <div className="mt-16 text-center">
                        <button className="inline-flex items-center justify-center h-12 px-8 rounded-md border border-slate-300 dark:border-border-dark hover:border-primary hover:text-primary font-bold text-sm transition-all bg-white dark:bg-transparent">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
