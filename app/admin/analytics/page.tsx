import { db } from '@/db';
import { visitorSessions, pageViews } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Analytics Dashboard - The Clear Architect',
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

    // Calculate Statss
    const totalVisitors = await db.select({ count: sql<number>`count(*)` }).from(visitorSessions);
    const totalViews = await db.select({ count: sql<number>`count(*)` }).from(pageViews);

    // Safe stats access
    const visitorCount = totalVisitors[0]?.count || 0;
    const viewCount = totalViews[0]?.count || 0;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-deep-navy dark:text-white mb-8">Analytics Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-lg shadow-sm border border-slate-200 dark:border-border-dark">
                        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Visitors</h3>
                        <p className="text-3xl font-bold text-deep-navy dark:text-white mt-2">{visitorCount}</p>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-lg shadow-sm border border-slate-200 dark:border-border-dark">
                        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Page Views</h3>
                        <p className="text-3xl font-bold text-deep-navy dark:text-white mt-2">{viewCount}</p>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-lg shadow-sm border border-slate-200 dark:border-border-dark">
                        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Avg. Views / Visit</h3>
                        <p className="text-3xl font-bold text-deep-navy dark:text-white mt-2">
                            {visitorCount > 0 ? (viewCount / visitorCount).toFixed(1) : 0}
                        </p>
                    </div>
                </div>

                {/* Sessions Table */}
                <div className="bg-white dark:bg-surface-dark rounded-lg shadow-sm border border-slate-200 dark:border-border-dark overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark">
                        <h2 className="text-lg font-semibold text-deep-navy dark:text-white">Recent Sessions</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-slate-500">Visitor ID</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Location</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Duration</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Views</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Last Active</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-border-dark">
                                {sessions.map((session) => (
                                    <tr key={session.id} className="hover:bg-slate-50 dark:hover:bg-opacity-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                                            {session.visitorId.substring(0, 12)}...
                                        </td>
                                        <td className="px-6 py-4 text-deep-navy dark:text-slate-300">
                                            {session.city && session.country ? (
                                                <span>{session.city}, {session.country}</span>
                                            ) : (
                                                <span className="text-slate-400 italic">Unknown (Localhost)</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-deep-navy dark:text-slate-300">
                                            {formatDuration(session.sessionDuration || 0)}
                                        </td>
                                        <td className="px-6 py-4 text-deep-navy dark:text-slate-300">
                                            {session.totalPageViews}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {session.lastVisit ? formatDate(session.lastVisit) : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Page Views */}
                <div className="bg-white dark:bg-surface-dark rounded-lg shadow-sm border border-slate-200 dark:border-border-dark overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark">
                        <h2 className="text-lg font-semibold text-deep-navy dark:text-white">Recent Page Views</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-slate-500">Path</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Visitor</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Location</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-border-dark">
                                {recentViews.map((view) => (
                                    <tr key={view.id} className="hover:bg-slate-50 dark:hover:bg-opacity-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-primary">
                                            {view.path}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                                            {view.visitorId.substring(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                            {view.country || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {view.timestamp ? formatDate(view.timestamp) : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
        timeZone: 'UTC',
        timeZoneName: 'short'
    }).format(date);
}
