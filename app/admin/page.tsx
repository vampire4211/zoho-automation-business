import { db } from '@/db';
import { visitorSessions, pageViews } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Dashboard | The Clear Architect',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AnalyticsDashboard() {
    // Fetch Sessions
    const sessions = await db.select().from(visitorSessions).orderBy(desc(visitorSessions.lastVisit)).limit(50);

    // Fetch Recent Page Views
    const recentViews = await db.select().from(pageViews).orderBy(desc(pageViews.timestamp)).limit(50);

    // Calculate Stats
    const totalVisitors = await db.select({ count: sql<number>`count(*)` }).from(visitorSessions);
    const totalViews = await db.select({ count: sql<number>`count(*)` }).from(pageViews);

    // Safe stats access
    const visitorCount = totalVisitors[0]?.count || 0;
    const viewCount = totalViews[0]?.count || 0;
    const avgViews = visitorCount > 0 ? (viewCount / visitorCount).toFixed(1) : '0';

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            {/* Top Navigation Bar style decoration */}
            <div className="h-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 absolute top-0 w-full z-0">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-blue-200 font-semibold tracking-wide uppercase text-sm mb-1">Overview</h2>
                        <h1 className="text-4xl font-bold text-white">Analytics Operations</h1>
                    </div>
                    <div className="hidden sm:block">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-500/30">
                            Live Data
                        </span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatsCard
                        title="Total Visitors"
                        value={visitorCount.toLocaleString()}
                        icon={<UsersIcon />}
                        trend="+12% from last week"
                        trendUp={true}
                    />
                    <StatsCard
                        title="Total Page Views"
                        value={viewCount.toLocaleString()}
                        icon={<EyeIcon />}
                        trend="+8% from last week"
                        trendUp={true}
                    />
                    <StatsCard
                        title="Avg. Views / Visit"
                        value={avgViews}
                        icon={<ChartBarIcon />}
                        trend="Consistent"
                        trendUp={true}
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Recent Sessions */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700/50 flex flex-col h-[500px]">
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <GlobeIcon className="w-5 h-5 text-blue-500" />
                                Recent Sessions
                            </h3>
                            <button className="text-slate-400 hover:text-blue-500 transition-colors text-xs font-semibold uppercase tracking-wider">
                                View All
                            </button>
                        </div>
                        <div className="overflow-auto flex-1 custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-slate-700/30 sticky top-0 z-10 backdrop-blur-md">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                    {sessions.map((session) => (
                                        <tr key={session.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500 mb-0.5">
                                                        {session.visitorId.substring(0, 8)}
                                                    </span>
                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {session.totalPageViews} views
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${session.country ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                                    <span className="text-sm text-slate-600 dark:text-col-300">
                                                        {session.city || 'Unknown City'}, {session.country || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                        {formatDuration(session.sessionDuration || 0)}
                                                    </span>
                                                    <span className="text-xs text-slate-400">
                                                        {session.lastVisit ? formatDate(session.lastVisit) : '-'}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Page Views */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700/50 flex flex-col h-[500px]">
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <ActivityIcon className="w-5 h-5 text-indigo-500" />
                                Live Activity
                            </h3>
                            <button className="text-slate-400 hover:text-indigo-500 transition-colors text-xs font-semibold uppercase tracking-wider">
                                Realtime
                            </button>
                        </div>
                        <div className="overflow-auto flex-1 custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-slate-700/30 sticky top-0 z-10 backdrop-blur-md">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Path</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Visitor</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                    {recentViews.map((view) => (
                                        <tr key={view.id} className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono">
                                                    {view.path}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                                                    {view.visitorId.substring(0, 8)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                                    {view.timestamp ? formatTime(view.timestamp) : '-'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Components
function StatsCard({ title, value, icon, trend, trendUp }: any) {
    return (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700 hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
                <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-xl text-blue-600 dark:text-blue-400">
                    {icon}
                </div>
                {trend && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${trendUp ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <div className="mt-4">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
                <h4 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</h4>
            </div>
        </div>
    );
}

// Icons
function UsersIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    );
}

function ChartBarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    );
}

function GlobeIcon({ className = "h-6 w-6" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function ActivityIcon({ className = "h-6 w-6" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    );
}

// Helpers
function formatDuration(seconds: number) {
    if (!seconds) return '0s';
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

function formatTime(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date);
}
