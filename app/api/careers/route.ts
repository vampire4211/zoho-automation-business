import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { jobApplications } from '@/db/schema';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, selectedPositions } = body;

        // Validate required fields
        if (!name || !email || !phone || !selectedPositions || selectedPositions.length === 0) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Insert into database
        await db.insert(jobApplications).values({
            name,
            email,
            phone,
            positions: JSON.stringify(selectedPositions),
        });

        return NextResponse.json(
            { success: true, message: 'Application submitted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error submitting application:', error);
        return NextResponse.json(
            { error: 'Failed to submit application' },
            { status: 500 }
        );
    }
}
