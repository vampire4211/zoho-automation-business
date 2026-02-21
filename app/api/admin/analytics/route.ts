import { NextResponse } from 'next/server';
import { db } from '@/db';
import { visitorSessions, pageViews } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const [sessions, recentViews, totalVisitors, totalViews] = await Promise.all([
            db.select().from(visitorSessions).orderBy(desc(visitorSessions.lastVisit)).limit(50),
            db.select().from(pageViews).orderBy(desc(pageViews.timestamp)).limit(50),
            db.select({ count: sql<number>`count(*)` }).from(visitorSessions),
            db.select({ count: sql<number>`count(*)` }).from(pageViews),
        ]);

        const visitorCount = totalVisitors[0]?.count || 0;
        const viewCount = totalViews[0]?.count || 0;
        const avgViews = visitorCount > 0 ? (viewCount / visitorCount).toFixed(1) : '0';

        return NextResponse.json({
            visitorCount,
            viewCount,
            avgViews,
            sessions,
            recentViews,
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
    }
}
