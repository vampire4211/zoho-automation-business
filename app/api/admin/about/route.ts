import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { aboutSections } from '@/db/schema';
import { asc, eq, gte, sql } from 'drizzle-orm';

// GET — fetch all about sections ordered by display_order
export async function GET() {
    try {
        const sections = await db
            .select()
            .from(aboutSections)
            .orderBy(asc(aboutSections.displayOrder));

        return NextResponse.json({ success: true, sections }, { status: 200 });
    } catch (error) {
        console.error('Error fetching about sections:', error);
        return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
    }
}

// POST — insert a new about section at a specific position
// - `position` (1-based): where to insert.
//   All existing sections at >= position get shifted down by 1.
// - `reverse` is auto-calculated from position: (position - 1) % 2
//   → position 1, 3, 5 … → reverse = 0 (normal)
//   → position 2, 4, 6 … → reverse = 1 (flipped)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, content, imageData, position } = body;

        // Validate required fields
        if (!title || !content || !imageData) {
            return NextResponse.json(
                { error: 'Missing required fields: title, content, imageData' },
                { status: 400 }
            );
        }

        // Validate word count (max 52 words)
        const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount > 52) {
            return NextResponse.json(
                { error: `Description exceeds 52 words (current: ${wordCount})` },
                { status: 400 }
            );
        }

        // Get all current sections to determine valid positions
        const existing = await db
            .select({ id: aboutSections.id, displayOrder: aboutSections.displayOrder })
            .from(aboutSections)
            .orderBy(asc(aboutSections.displayOrder));

        const totalSections = existing.length;

        // Determine insert position (default: append at end)
        // Valid range: 1 to totalSections + 1
        let insertAt = typeof position === 'number' ? position : totalSections + 1;
        insertAt = Math.max(1, Math.min(insertAt, totalSections + 1));

        // Auto-calculate reverse from position: odd positions = normal, even = reversed
        const autoReverse = (insertAt - 1) % 2; // 0 or 1

        // Shift all sections at >= insertAt down by 1
        if (insertAt <= totalSections) {
            await db
                .update(aboutSections)
                .set({ displayOrder: sql`${aboutSections.displayOrder} + 1` })
                .where(gte(aboutSections.displayOrder, insertAt));

            // After shifting, recalculate reverse values for all shifted sections
            // Fetch them fresh after the shift
            const shifted = await db
                .select({ id: aboutSections.id, displayOrder: aboutSections.displayOrder })
                .from(aboutSections)
                .where(gte(aboutSections.displayOrder, insertAt + 1)) // everything after insert point
                .orderBy(asc(aboutSections.displayOrder));

            // Update reverse for each shifted section based on its new displayOrder
            for (const section of shifted) {
                const newReverse = (section.displayOrder - 1) % 2;
                await db
                    .update(aboutSections)
                    .set({ reverse: newReverse })
                    .where(eq(aboutSections.id, section.id));
            }
        }

        // Insert the new section at the chosen position
        const newSection = await db
            .insert(aboutSections)
            .values({
                title: title.trim(),
                content: content.trim(),
                imageData,
                displayOrder: insertAt,
                reverse: autoReverse,
            })
            .returning();

        return NextResponse.json(
            { success: true, section: newSection[0], insertedAt: insertAt, reverse: autoReverse },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding about section:', error);
        return NextResponse.json({ error: 'Failed to add section' }, { status: 500 });
    }
}

// DELETE — remove a section by id, then re-normalize display orders + reverse
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
        }

        // Delete the section
        await db.delete(aboutSections).where(eq(aboutSections.id, parseInt(id)));

        // Re-fetch remaining sections ordered by displayOrder
        const remaining = await db
            .select({ id: aboutSections.id })
            .from(aboutSections)
            .orderBy(asc(aboutSections.displayOrder));

        // Re-normalize: assign clean sequential displayOrder + correct reverse
        for (let i = 0; i < remaining.length; i++) {
            const newOrder = i + 1;
            const newReverse = i % 2; // 0-indexed: i=0 → reverse=0, i=1 → reverse=1
            await db
                .update(aboutSections)
                .set({ displayOrder: newOrder, reverse: newReverse })
                .where(eq(aboutSections.id, remaining[i].id));
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting about section:', error);
        return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 });
    }
}
