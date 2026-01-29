import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get or create visitor ID (UUID in cookie)
    let visitorId = request.cookies.get('visitor_id')?.value;

    if (!visitorId) {
        // Generate new visitor ID
        visitorId = crypto.randomUUID();
        response.cookies.set('visitor_id', visitorId, {
            maxAge: 365 * 24 * 60 * 60, // 1 year
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
        });
    }

    // Track page view asynchronously (don't block the request)
    const path = request.nextUrl.pathname;
    const referrer = request.headers.get('referer') || '';
    const userAgent = request.headers.get('user-agent') || '';

    // Send tracking data asynchronously
    if (typeof window === 'undefined') {
        // Server-side tracking
        fetch(`${request.nextUrl.origin}/api/analytics/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                visitorId,
                path,
                referrer,
                userAgent,
                timestamp: Date.now(),
            }),
        }).catch(() => {
            // Silently fail - don't block the request
        });
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
