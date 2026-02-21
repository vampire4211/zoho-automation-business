'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Session {
    id: number;
    visitorId: string;
    totalPageViews: number | null;
    sessionDuration: number | null;
    lastVisit: string | null;
    country: string | null;
    city: string | null;
}

interface PageView {
    id: number;
    visitorId: string;
    path: string;
    timestamp: string | null;
}

interface AnalyticsStats {
    visitorCount: number;
    viewCount: number;
    avgViews: string;
    sessions: Session[];
    recentViews: PageView[];
}

interface AboutSection {
    id: number;
    title: string;
    content: string;
    imageData: string;
    displayOrder: number;
    reverse: number;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function formatDuration(seconds: number) {
    if (!seconds) return '0s';
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
}

function formatDate(dateStr: string | null) {
    if (!dateStr) return '-';
    return new Intl.DateTimeFormat('en-US', {
        month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    }).format(new Date(dateStr));
}

function formatTime(dateStr: string | null) {
    if (!dateStr) return '-';
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).format(new Date(dateStr));
}

// ─────────────────────────────────────────────
// SVG Icon components
// ─────────────────────────────────────────────
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
function GlobeIcon({ className = 'h-6 w-6' }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
function ActivityIcon({ className = 'h-6 w-6' }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    );
}

// ─────────────────────────────────────────────
// Stats Card
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// Analytics Tab (fetches data on mount)
// ─────────────────────────────────────────────
function AnalyticsTab() {
    const [data, setData] = useState<AnalyticsStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/analytics')
            .then(res => res.json())
            .then(json => {
                if (json.error) throw new Error(json.error);
                setData(json);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 text-sm">Loading analytics...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center py-32">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6 text-center max-w-sm">
                <p className="text-red-600 dark:text-red-400 font-medium">Failed to load analytics</p>
                <p className="text-red-500 dark:text-red-500 text-sm mt-1">{error}</p>
            </div>
        </div>
    );

    return (
        <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatsCard title="Total Visitors" value={data?.visitorCount.toLocaleString()} icon={<UsersIcon />} trend="+12% from last week" trendUp={true} />
                <StatsCard title="Total Page Views" value={data?.viewCount.toLocaleString()} icon={<EyeIcon />} trend="+8% from last week" trendUp={true} />
                <StatsCard title="Avg. Views / Visit" value={data?.avgViews} icon={<ChartBarIcon />} trend="Consistent" trendUp={true} />
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
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Last 50</span>
                    </div>
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 dark:bg-slate-700/30 sticky top-0 z-10 backdrop-blur-md">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                {data?.sessions.map((session) => (
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
                                                <div className={`w-2 h-2 rounded-full ${session.country ? 'bg-green-500' : 'bg-slate-300'}`} />
                                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                                    {session.city || 'Unknown'}, {session.country || 'N/A'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    {formatDuration(session.sessionDuration || 0)}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    {formatDate(session.lastVisit)}
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
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Realtime</span>
                    </div>
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 dark:bg-slate-700/30 sticky top-0 z-10 backdrop-blur-md">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Path</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Visitor</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                {data?.recentViews.map((view) => (
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
                                                {formatTime(view.timestamp)}
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
    );
}

// ─────────────────────────────────────────────
// About Us Tab
// ─────────────────────────────────────────────
function AboutUsTab() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [sections, setSections] = useState<AboutSection[]>([]);
    const [loadingSections, setLoadingSections] = useState(true);

    const [form, setForm] = useState({
        title: '',
        content: '',
        imageData: '',
        imagePreview: '',
    });

    // Position: 1-based. -1 means "append at end" (default, computed after fetch)
    const [insertPosition, setInsertPosition] = useState<number>(-1);
    const [wordCount, setWordCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const MAX_WORDS = 52;

    // The resolved insert position (1-based)
    const resolvedPosition = insertPosition === -1 ? sections.length + 1 : insertPosition;
    // Auto zig-zag: odd position → reverse=0 (normal), even → reverse=1
    const autoReverse = (resolvedPosition - 1) % 2 === 0 ? 'Normal (Text Left, Image Right)' : 'Reversed (Image Left, Text Right)';
    const autoReverseValue = (resolvedPosition - 1) % 2;

    // Fetch existing sections
    const fetchSections = useCallback(() => {
        setLoadingSections(true);
        fetch('/api/admin/about')
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setSections(json.sections);
                    // Reset to "append at end" when sections reload
                    setInsertPosition(-1);
                }
            })
            .catch(console.error)
            .finally(() => setLoadingSections(false));
    }, []);

    useEffect(() => { fetchSections(); }, [fetchSections]);

    // Handle description change with word capping
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        const words = val.trim().split(/\s+/).filter(Boolean);

        if (words.length > MAX_WORDS) {
            const capped = words.slice(0, MAX_WORDS).join(' ');
            setForm(prev => ({ ...prev, content: capped }));
            setWordCount(MAX_WORDS);
        } else {
            setForm(prev => ({ ...prev, content: val }));
            setWordCount(words.length === 0 && val === '' ? 0 : words.length);
        }
    };

    // Handle image upload → convert to base64
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setSubmitStatus({ type: 'error', message: 'Please upload a valid image file.' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setSubmitStatus({ type: 'error', message: 'Image must be under 5MB.' });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setForm(prev => ({ ...prev, imageData: base64, imagePreview: base64 }));
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const fakeEvent = { target: { files: [file] } } as any;
            handleImageChange(fakeEvent);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus(null);

        if (!form.title.trim()) {
            setSubmitStatus({ type: 'error', message: 'Title is required.' });
            return;
        }
        if (!form.content.trim()) {
            setSubmitStatus({ type: 'error', message: 'Description is required.' });
            return;
        }
        if (wordCount > MAX_WORDS) {
            setSubmitStatus({ type: 'error', message: `Description exceeds ${MAX_WORDS} words.` });
            return;
        }
        if (!form.imageData) {
            setSubmitStatus({ type: 'error', message: 'Please upload an image.' });
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/admin/about', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: form.title.trim(),
                    content: form.content.trim(),
                    imageData: form.imageData,
                    position: resolvedPosition,
                }),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.error || 'Failed to add section');
            }

            setSubmitStatus({
                type: 'success',
                message: `✅ Section added at position ${resolvedPosition} with ${autoReverseValue === 0 ? 'normal' : 'reversed'} layout!`,
            });
            setForm({ title: '', content: '', imageData: '', imagePreview: '' });
            setWordCount(0);
            if (fileInputRef.current) fileInputRef.current.value = '';
            fetchSections();
        } catch (err: any) {
            setSubmitStatus({ type: 'error', message: err.message || 'Something went wrong.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this section?')) return;
        setDeletingId(id);
        try {
            await fetch(`/api/admin/about?id=${id}`, { method: 'DELETE' });
            fetchSections();
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* ── Left: Add Section Form ── */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                {/* Form Header */}
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700/50 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-800 dark:to-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New Section</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Appears on the About Us page</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                            Title <span className="text-blue-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="e.g. Our Mission"
                            maxLength={100}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/60 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Description <span className="text-blue-500">*</span>
                            </label>
                            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md transition-colors ${wordCount > MAX_WORDS
                                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                : wordCount >= MAX_WORDS * 0.85
                                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                                }`}>
                                {wordCount} / {MAX_WORDS} words
                            </span>
                        </div>
                        <textarea
                            value={form.content}
                            onChange={handleContentChange}
                            placeholder="Write a description... (max 52 words including all parts of speech)"
                            rows={5}
                            className={`w-full px-4 py-3 rounded-xl border ${wordCount >= MAX_WORDS
                                ? 'border-amber-400 focus:ring-amber-400'
                                : 'border-slate-200 dark:border-slate-600 focus:ring-blue-500'
                                } bg-slate-50 dark:bg-slate-700/60 text-slate-900 dark:text-white placeholder-slate-400 focus:border-transparent outline-none focus:ring-2 transition-all text-sm resize-none`}
                        />
                        {wordCount >= MAX_WORDS && (
                            <div className="flex items-center gap-1.5 mt-1.5">
                                <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-xs text-amber-600 dark:text-amber-400">
                                    Maximum {MAX_WORDS} words reached — no more words can be added.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                            Section Image <span className="text-blue-500">*</span>
                        </label>

                        {form.imagePreview ? (
                            <div className="relative rounded-xl overflow-hidden border-2 border-blue-400 dark:border-blue-500">
                                <img
                                    src={form.imagePreview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm(prev => ({ ...prev, imageData: '', imagePreview: '' }));
                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                    }}
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-lg font-bold shadow-lg transition-colors"
                                >
                                    ×
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-2">
                                    <p className="text-white text-xs font-medium">Image ready ✓</p>
                                </div>
                            </div>
                        ) : (
                            <div
                                onDrop={handleDrop}
                                onDragOver={e => e.preventDefault()}
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-48 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-700/40 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors">
                                        Click to upload or drag & drop
                                    </p>
                                    <p className="text-xs text-slate-400 mt-0.5">PNG, JPG, WEBP — max 5MB</p>
                                </div>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    {/* Position Selector */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Insert at Position
                        </label>

                        {/* Dropdown — 1..N to insert before an existing row; blank = append at end */}
                        <select
                            value={insertPosition === -1 ? '' : insertPosition}
                            onChange={e => setInsertPosition(e.target.value === '' ? -1 : Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/60 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                        >
                            <option value="">Append at end (default)</option>
                            {sections.map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1} — before &quot;{sections[i]?.title || `Row ${i + 1}`}&quot;
                                </option>
                            ))}
                        </select>

                        {/* Auto layout info */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white ${autoReverseValue === 0 ? 'bg-blue-500' : 'bg-purple-500'
                                }`}>
                                {resolvedPosition}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Auto Zig-Zag Layout</p>
                                <p className="text-xs text-blue-600 dark:text-blue-400">{autoReverse}</p>
                            </div>
                            <div className="ml-auto flex gap-1 items-center">
                                {/* mini zig-zag visual */}
                                <div className={`w-5 h-3 rounded bg-blue-300 dark:bg-blue-600 ${autoReverseValue === 0 ? 'order-1' : 'order-2'}`} />
                                <div className={`w-3 h-3 rounded bg-slate-300 dark:bg-slate-500 ${autoReverseValue === 0 ? 'order-2' : 'order-1'}`} />
                            </div>
                        </div>

                        {/* Visual order preview */}
                        {sections.length > 0 && (
                            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <div className="px-3 py-2 bg-slate-100 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order Preview</p>
                                </div>
                                <div className="p-3 space-y-1.5 max-h-48 overflow-y-auto">
                                    {Array.from({ length: sections.length + 1 }, (_, i) => i + 1).map(pos => {
                                        const isInsertHere = pos === resolvedPosition;
                                        // sections shifted: if pos >= resolvedPosition, show sections[pos-2], else sections[pos-1]
                                        const existingIdx = pos < resolvedPosition ? pos - 1 : pos - 2;
                                        const existingSection = pos !== resolvedPosition ? sections[existingIdx] : null;
                                        const posReverse = (pos - 1) % 2;

                                        return (
                                            <div
                                                key={pos}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${isInsertHere
                                                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-400'
                                                    : 'bg-slate-50 dark:bg-slate-700/40 text-slate-600 dark:text-slate-300'
                                                    }`}
                                            >
                                                <span className={`w-5 h-5 rounded flex items-center justify-center font-bold flex-shrink-0 ${isInsertHere ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400'
                                                    }`}>{pos}</span>

                                                {isInsertHere ? (
                                                    <span className="font-semibold flex items-center gap-1.5">
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                        NEW SECTION GOES HERE
                                                    </span>
                                                ) : (
                                                    <span className="truncate flex-1">{existingSection?.title || '—'}</span>
                                                )}

                                                <span className={`ml-auto flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono ${isInsertHere
                                                    ? 'bg-white/20 text-white'
                                                    : posReverse === 0
                                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                                    }`}>
                                                    {posReverse === 0 ? 'TXT→IMG' : 'IMG→TXT'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Status message */}
                    {submitStatus && (
                        <div className={`p-4 rounded-xl border text-sm font-medium ${submitStatus.type === 'success'
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
                            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400'
                            }`}>
                            {submitStatus.message}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !form.title || !form.content || !form.imageData}
                        className="w-full py-3.5 px-6 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:shadow-none"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Adding Section...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add to About Us Page
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* ── Right: Existing Sections ── */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700/50 bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-slate-800 dark:to-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Existing Sections</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{sections.length} section{sections.length !== 1 ? 's' : ''} total</p>
                        </div>
                    </div>
                    <button
                        onClick={fetchSections}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        title="Refresh"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-auto max-h-[700px]">
                    {loadingSections ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : sections.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">No sections yet</p>
                            <p className="text-slate-400 text-xs mt-1">Add your first section using the form</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {sections.map((section, index) => (
                                <div
                                    key={section.id}
                                    className="group flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 bg-slate-50/50 dark:bg-slate-700/30 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all"
                                >
                                    {/* Order badge */}
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                                        {index + 1}
                                    </div>

                                    {/* Thumbnail */}
                                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-600 border border-slate-300 dark:border-slate-500">
                                        <img
                                            src={section.imageData}
                                            alt={section.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                                {section.title}
                                            </h4>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                {section.reverse === 1 && (
                                                    <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded font-medium">
                                                        Rev
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(section.id)}
                                                    disabled={deletingId === section.id}
                                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50"
                                                    title="Delete section"
                                                >
                                                    {deletingId === section.id ? (
                                                        <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                            {section.content}
                                        </p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">
                                            {countWords(section.content)} words
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Main Admin Page
// ─────────────────────────────────────────────
type Tab = 'analytics' | 'about';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<Tab>('analytics');

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        {
            id: 'analytics',
            label: 'Analytics',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
        {
            id: 'about',
            label: 'About Us',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            {/* Hero gradient header */}
            <div className="h-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 absolute top-0 w-full z-0">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Top bar */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-blue-200 font-semibold tracking-wide uppercase text-sm mb-1">
                            Admin Portal
                        </h2>
                        <h1 className="text-4xl font-bold text-white">
                            {activeTab === 'analytics' ? 'Analytics Operations' : 'About Us Manager'}
                        </h1>
                    </div>
                    <div className="hidden sm:block">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-500/30">
                            {activeTab === 'analytics' ? '● Live Data' : '✎ Content Editor'}
                        </span>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 w-fit mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab.id
                                ? 'bg-white text-slate-900 shadow-lg'
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="transition-all duration-300">
                    {activeTab === 'analytics' && <AnalyticsTab />}
                    {activeTab === 'about' && <AboutUsTab />}
                </div>
            </div>
        </div>
    );
}
