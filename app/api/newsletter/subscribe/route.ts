import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { newsletterSubscribers, visitorSessions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
    // Check Rate Limit
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
        );
    }

    try {
        const body = await request.json();
        const { email, name, visitorId } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Insert subscriber
        await db.insert(newsletterSubscribers).values({
            email,
            name: name || null,
            visitorId: visitorId || null,
            subscribedAt: new Date(),
            source: 'popup',
            status: 'active',
        }).onConflictDoNothing();

        // Link email to visitor session if visitorId exists
        if (visitorId) {
            await db
                .update(visitorSessions)
                .set({ email })
                .where(eq(visitorSessions.visitorId, visitorId));
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
