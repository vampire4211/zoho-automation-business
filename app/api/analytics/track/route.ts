import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pageViews, visitorSessions, visitHistory } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export async function GET() {
    return NextResponse.json({ status: 'Analytics tracking endpoint is active' });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { visitorId, path, referrer, userAgent } = body;

        if (!visitorId || !path) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get IP address and hash it for privacy
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

        // Detect device type from user agent
        const device = userAgent.toLowerCase().includes('mobile') ? 'mobile' :
            userAgent.toLowerCase().includes('tablet') ? 'tablet' : 'desktop';

        // Extract source from referrer
        let source = 'direct';
        if (referrer) {
            try {
                const refUrl = new URL(referrer);
                const hostname = refUrl.hostname;

                if (hostname.includes('google')) source = 'google';
                else if (hostname.includes('facebook')) source = 'facebook';
                else if (hostname.includes('twitter') || hostname.includes('x.com')) source = 'twitter';
                else if (hostname.includes('linkedin')) source = 'linkedin';
                else if (hostname.includes('instagram')) source = 'instagram';
                else if (!hostname.includes(request.headers.get('host') || '')) source = 'referral';
            } catch (e) {
                // Invalid referrer URL
            }
        }

        // Extract geolocation from headers (Vercel, CloudFront, etc.)
        const country = request.headers.get('x-vercel-ip-country') ||
            request.headers.get('cf-ipcountry') ||
            request.headers.get('x-country-code') ||
            'unknown';

        const city = request.headers.get('x-vercel-ip-city') ||
            request.headers.get('x-city') ||
            'unknown';

        const now = new Date();

        // Record page view
        await db.insert(pageViews).values({
            visitorId,
            path,
            referrer: referrer || null,
            userAgent,
            ipHash,
            device,
            country: country !== 'unknown' ? country : null,
            city: city !== 'unknown' ? city : null,
            timestamp: now,
        });

        // Check if session exists
        const existingSession = await db
            .select()
            .from(visitorSessions)
            .where(eq(visitorSessions.visitorId, visitorId))
            .limit(1);

        if (existingSession.length > 0) {
            const session = existingSession[0];
            const firstVisitTime = session.firstVisit ?? now;
            const lastVisitTime = session.lastVisit ?? now;
            const currentTime = now.getTime();

            // Check if this is a new session (more than 30 minutes since last visit)
            const timeSinceLastVisit = (currentTime - new Date(lastVisitTime).getTime()) / 1000 / 60; // minutes

            if (timeSinceLastVisit > 30) {
                // NEW SESSION - Save the previous session to history first
                const previousSessionDuration = Math.floor((new Date(lastVisitTime).getTime() - new Date(firstVisitTime).getTime()) / 1000);

                // Get entry and exit pages for previous session
                const sessionPageViews = await db
                    .select()
                    .from(pageViews)
                    .where(eq(pageViews.visitorId, visitorId))
                    .orderBy(pageViews.timestamp);

                const entryPage = sessionPageViews.length > 0 ? sessionPageViews[0].path : null;
                const exitPage = sessionPageViews.length > 0 ? sessionPageViews[sessionPageViews.length - 1].path : null;
                const pagesInSession = sessionPageViews.filter(pv => {
                    if (!pv.timestamp) return false; // Skip if timestamp is null
                    const pvTime = new Date(pv.timestamp).getTime();
                    return pvTime >= new Date(firstVisitTime).getTime() && pvTime <= new Date(lastVisitTime).getTime();
                }).length;

                // Save previous session to history
                if (previousSessionDuration > 0) {
                    await db.insert(visitHistory).values({
                        visitorId,
                        sessionStart: firstVisitTime,
                        sessionEnd: lastVisitTime,
                        durationSeconds: previousSessionDuration,
                        pagesViewed: pagesInSession,
                        entryPage,
                        exitPage,
                        device,
                        source: session.source || 'direct',
                    });
                }

                // Start new session
                await db
                    .update(visitorSessions)
                    .set({
                        firstVisit: now,
                        lastVisit: now,
                        totalVisits: (session.totalVisits ?? 0) + 1,
                        totalPageViews: (session.totalPageViews ?? 0) + 1,
                        sessionDuration: 0, // Reset for new session
                        country: country !== 'unknown' ? country : session.country, // Update if we have better info
                        city: city !== 'unknown' ? city : session.city,
                    })
                    .where(eq(visitorSessions.visitorId, visitorId));
            } else {
                // SAME SESSION - Just update last visit time and page views
                // Also update location if we found it now but didn't have it before
                const currentDuration = Math.floor((currentTime - new Date(firstVisitTime).getTime()) / 1000);

                const updates: any = {
                    lastVisit: now,
                    totalPageViews: (session.totalPageViews ?? 0) + 1,
                    sessionDuration: currentDuration,
                };

                if (country !== 'unknown' && !session.country) updates.country = country;
                if (city !== 'unknown' && !session.city) updates.city = city;

                await db
                    .update(visitorSessions)
                    .set(updates)
                    .where(eq(visitorSessions.visitorId, visitorId));
            }
        } else {
            // FIRST VISIT - Create new session
            await db.insert(visitorSessions).values({
                visitorId,
                firstVisit: now,
                lastVisit: now,
                totalVisits: 1,
                totalPageViews: 1,
                source,
                sessionDuration: 0,
                ipHash,
                country: country !== 'unknown' ? country : null,
                city: city !== 'unknown' ? city : null,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics tracking error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
