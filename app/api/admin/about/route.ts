import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { aboutSections } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';

// GET — fetch all about sections
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

// POST — add a new about section
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, content, imageData, reverse } = body;

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

        // Get current max displayOrder
        const existing = await db
            .select({ displayOrder: aboutSections.displayOrder })
            .from(aboutSections)
            .orderBy(asc(aboutSections.displayOrder));

        const maxOrder = existing.length > 0
            ? Math.max(...existing.map(s => s.displayOrder))
            : 0;

        // Insert new section
        const newSection = await db
            .insert(aboutSections)
            .values({
                title: title.trim(),
                content: content.trim(),
                imageData,
                displayOrder: maxOrder + 1,
                reverse: reverse ? 1 : 0,
            })
            .returning();

        return NextResponse.json(
            { success: true, section: newSection[0] },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding about section:', error);
        return NextResponse.json({ error: 'Failed to add section' }, { status: 500 });
    }
}

// DELETE — remove a section by id
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
        }

        await db.delete(aboutSections).where(eq(aboutSections.id, parseInt(id)));

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting about section:', error);
        return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 });
    }
}
