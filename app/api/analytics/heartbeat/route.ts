import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visitorSessions, visitHistory, pageViews } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import crypto from 'crypto';

export async function GET() {
    return NextResponse.json({ status: 'Heartbeat endpoint is active' });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { visitorId, path } = body;

        if (!visitorId) {
            return NextResponse.json({ error: 'Missing visitorId' }, { status: 400 });
        }

        const now = new Date();
        const currentTime = now.getTime();

        // 1. Find existing session
        // First try finding by visitorId (cookie)
        let session = await db.query.visitorSessions.findFirst({
            where: eq(visitorSessions.visitorId, visitorId)
        });

        // If not found by ID, try finding by IP hash (to handle "cleared cookies" scenario)
        if (!session) {
            const ip = request.headers.get('x-forwarded-for') ||
                request.headers.get('x-real-ip') ||
                'unknown';
            const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

            session = await db.query.visitorSessions.findFirst({
                where: eq(visitorSessions.ipHash, ipHash)
            });

            // If we found a session by IP, we might want to update the client with this "old" ID
            // but for now, we'll just track against this session record
            if (session) {
                // If the client sent a DIFFERENT visitorId (newly generated), might need to merge or just use the old one?
                // For simplicity, we update the existing record to known the new "visitorId" if we want to re-cookie them
                // But let's stick to updating the record we found
            }
        }

        if (session) {
            const lastVisitTime = session.lastVisit ?? now;
            const timeSinceLastVisit = (currentTime - new Date(lastVisitTime).getTime()) / 1000 / 60; // minutes

            if (timeSinceLastVisit > 30) {
                // SESSION EXPIRED - Archive it and start new
                // Calculate duration of the PREVIOUS session
                const firstVisitTime = session.firstVisit ?? now;
                const prevDuration = Math.floor((new Date(lastVisitTime).getTime() - new Date(firstVisitTime).getTime()) / 1000);

                if (prevDuration > 0) {
                    // Get active pages for history context
                    const entryExit = await db.select({ path: pageViews.path, timestamp: pageViews.timestamp })
                        .from(pageViews)
                        .where(eq(pageViews.visitorId, session.visitorId))
                        .orderBy(desc(pageViews.timestamp))
                        .limit(1); // Rough approx, ideally we query strictly by time range

                    await db.insert(visitHistory).values({
                        visitorId: session.visitorId,
                        sessionStart: session.firstVisit!,
                        sessionEnd: session.lastVisit!,
                        durationSeconds: prevDuration,
                        pagesViewed: session.totalPageViews, // Store the count from that session
                        device: 'unknown', // Could refine
                        source: session.source
                    });
                }

                // Reset session for "New Visit"
                await db.update(visitorSessions)
                    .set({
                        firstVisit: now,
                        lastVisit: now,
                        totalVisits: (session.totalVisits || 0) + 1,
                        sessionDuration: 0,
                        totalPageViews: 1, // Start at 1 for this new session
                    })
                    .where(eq(visitorSessions.id, session.id));
            } else {
                // ACTIVE SESSION - Update heartbeat
                const newDuration = Math.floor((currentTime - new Date(session.firstVisit!).getTime()) / 1000);

                await db.update(visitorSessions)
                    .set({
                        lastVisit: now,
                        sessionDuration: newDuration
                    })
                    .where(eq(visitorSessions.id, session.id));
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Heartbeat error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
