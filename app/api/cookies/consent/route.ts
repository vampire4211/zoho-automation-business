import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { visitorId, essential, marketing } = body;

        if (!visitorId) {
            return NextResponse.json({ error: 'Missing visitorId' }, { status: 400 });
        }

        // Create cookie_consent table if it doesn't exist
        await db.run(sql`
      CREATE TABLE IF NOT EXISTS cookie_consent (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visitor_id TEXT NOT NULL,
        essential INTEGER DEFAULT 1,
        marketing INTEGER DEFAULT 0,
        timestamp INTEGER DEFAULT (strftime('%s', 'now'))
      )
    `);

        // Insert or update consent preferences
        await db.run(sql`
      INSERT INTO cookie_consent (visitor_id, essential, marketing)
      VALUES (${visitorId}, ${essential}, ${marketing})
      ON CONFLICT(visitor_id) DO UPDATE SET
        essential = ${essential},
        marketing = ${marketing},
        timestamp = strftime('%s', 'now')
    `);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Cookie consent save error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
