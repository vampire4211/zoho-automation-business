'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Helper to get or create visitor ID
    const getVisitorIdLocal = () => {
        if (typeof window === 'undefined') return '';
        let vid = localStorage.getItem('visitor_id');
        if (!vid) {
            vid = 'v_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('visitor_id', vid);
        }
        // Sync with cookie if needed, but for now just returning the ID
        return vid;
    };

    // 1. Track Page View on Route Change
    useEffect(() => {
        const visitorId = getVisitorIdLocal();
        const url = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;

        // Send Page View
        fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                visitorId,
                path: pathname,
                referrer: document.referrer,
                userAgent: navigator.userAgent
            })
        }).catch(console.error);

        // 2. Start Heartbeat (every 10 seconds)
        if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);

        heartbeatIntervalRef.current = setInterval(() => {
            if (document.visibilityState === 'visible') {
                fetch('/api/analytics/heartbeat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ visitorId, path: pathname })
                }).catch(e => console.error('Heartbeat failed', e));
            }
        }, 10000); // 10 seconds

        return () => {
            if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
        };
    }, [pathname, searchParams]);

    // 3. Handle Tab Close / Unload
    useEffect(() => {
        const handleUnload = () => {
            const visitorId = getVisitorIdLocal();
            navigator.sendBeacon('/api/analytics/heartbeat', JSON.stringify({ visitorId, path: pathname }));
        };

        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, [pathname]);

    return null;
}
