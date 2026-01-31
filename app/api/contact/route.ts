import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { formSubmissions } from '@/db/schema';
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
        const { nameOrCompany, email, secondaryEmail, phone, whatsapp, services, description } = body;

        // Validate required fields
        if (!nameOrCompany || !email || !phone || !description || !services || services.length === 0) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Insert into database
        await db.insert(formSubmissions).values({
            name: nameOrCompany,
            email,
            secondaryEmail: secondaryEmail || null,
            phone,
            whatsapp: whatsapp || null,
            services: JSON.stringify(services),
            message: description,
        });

        return NextResponse.json(
            { success: true, message: 'Form submitted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json(
            { error: 'Failed to submit form' },
            { status: 500 }
        );
    }
}
