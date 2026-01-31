'use client';

import { useState, useEffect, FormEvent } from 'react';

export default function NewsletterPopup() {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Check if user already subscribed
        const subscribed = localStorage.getItem('newsletter_subscribed');
        if (subscribed) return;

        // Check if marketing cookies are accepted
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) return;

        const { marketing } = JSON.parse(consent);
        if (!marketing) return;

        // Check dismissal timestamp
        const dismissed = localStorage.getItem('newsletter_dismissed');
        const REAPPEAR_TIME = 30 * 1000; // 30 seconds

        const show = () => setShowPopup(true);

        if (dismissed) {
            const timeSinceDismissed = Date.now() - new Date(dismissed).getTime();
            if (timeSinceDismissed < REAPPEAR_TIME) {
                // If dismissed recently, schedule it to reappear when the 30s is up
                const remainingTime = REAPPEAR_TIME - timeSinceDismissed;
                const timer = setTimeout(show, remainingTime);
                return () => clearTimeout(timer);
            } else {
                // If 30s passed, show immediately (or you could add a small delay for UX)
                const timer = setTimeout(show, 1000);
                return () => clearTimeout(timer);
            }
        }

        // First time visit (or storage cleared)
        // Show popup after 10 seconds or on scroll
        const timer = setTimeout(show, 10000);

        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowPopup(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const visitorId = localStorage.getItem('visitor_id');

            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, visitorId }),
            });

            if (res.ok) {
                setSuccess(true);
                localStorage.setItem('newsletter_subscribed', 'true');
                // Optional: Close popup automatically after a few seconds
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            } else {
                console.error('Failed to subscribe');
            }
        } catch (error) {
            console.error('Error submitting newsletter form:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDismiss = () => {
        setShowPopup(false);
        // Record dismissal time to show again in 30 seconds
        localStorage.setItem('newsletter_dismissed', new Date().toISOString());
    };

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                {/* Close Button */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {success ? (
                    <div className="text-center py-8">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold text-deep-navy dark:text-white mb-2">
                            You're Subscribed!
                        </h3>
                        <p className="text-slate-gray dark:text-slate-400">
                            Check your inbox for our welcome email.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Icon */}
                        <div className="text-center mb-6">
                            <div className="text-5xl mb-4">📬</div>
                            <h3 className="text-2xl font-bold text-deep-navy dark:text-white mb-2">
                                Stay in the Loop
                            </h3>
                            <p className="text-slate-gray dark:text-slate-400">
                                Get automation insights, case studies, and exclusive tips delivered to your inbox.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-deep-navy dark:text-white mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-deep-navy dark:text-white"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-deep-navy dark:text-white mb-2">
                                    Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-deep-navy dark:text-white"
                                    placeholder="Your name"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Subscribing...' : 'Subscribe Now'}
                            </button>

                            <p className="text-xs text-center text-slate-400">
                                No spam, ever. Unsubscribe anytime.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
