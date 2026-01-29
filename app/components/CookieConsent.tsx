'use client';

import { useState, useEffect } from 'react';

interface CookiePreferences {
    essential: boolean;
    marketing: boolean;
}

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        essential: true,
        marketing: false,
    });

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Show banner after 1 second
            setTimeout(() => setShowBanner(true), 1000);
        } else {
            // Load saved preferences
            setPreferences(JSON.parse(consent));
        }
    }, []);

    const acceptAll = async () => {
        const prefs = { essential: true, marketing: true };
        savePreferences(prefs);
    };

    const acceptEssentialOnly = async () => {
        const prefs = { essential: true, marketing: false };
        savePreferences(prefs);
    };

    const savePreferences = async (prefs: CookiePreferences) => {
        // Save to localStorage
        localStorage.setItem('cookie_consent', JSON.stringify(prefs));
        setPreferences(prefs);
        setShowBanner(false);

        // Get visitor ID from cookie
        const visitorId = document.cookie
            .split('; ')
            .find(row => row.startsWith('visitor_id='))
            ?.split('=')[1];

        // Save to database
        try {
            await fetch('/api/cookies/consent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    visitorId,
                    essential: prefs.essential ? 1 : 0,
                    marketing: prefs.marketing ? 1 : 0,
                }),
            });
        } catch (error) {
            console.error('Failed to save cookie preferences:', error);
        }
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-surface-dark border-t-2 border-primary shadow-2xl">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🍪</span>
                            <h3 className="text-lg font-bold text-deep-navy dark:text-white">
                                We Value Your Privacy
                            </h3>
                        </div>
                        <p className="text-sm text-slate-gray dark:text-slate-400 leading-relaxed">
                            We use cookies to analyze site traffic and improve your experience.
                            <strong className="text-deep-navy dark:text-white"> Essential cookies</strong> (including analytics for security and performance) are always active.
                            <strong className="text-deep-navy dark:text-white"> Marketing cookies</strong> enable personalized content like our newsletter.
                        </p>
                        <a
                            href="/privacy"
                            className="text-sm text-primary hover:underline inline-block mt-1"
                        >
                            Learn more in our Privacy Policy →
                        </a>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={acceptEssentialOnly}
                            className="px-6 py-3 border-2 border-slate-300 dark:border-border-dark text-deep-navy dark:text-white rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                            Essential Only
                        </button>
                        <button
                            onClick={acceptAll}
                            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                        >
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
