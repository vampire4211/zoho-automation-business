import { db } from './db';
import { formSubmissions } from './db/schema';

async function checkDatabase() {
    try {
        console.log('Connecting to database...');

        // Fetch all form submissions
        const submissions = await db.select().from(formSubmissions);

        console.log('\n✅ Database connection successful!');
        console.log(`\n📊 Total submissions: ${submissions.length}\n`);

        if (submissions.length > 0) {
            console.log('📝 Recent submissions:');
            submissions.forEach((sub, index) => {
                console.log(`\n--- Submission ${index + 1} ---`);
                console.log(`Name: ${sub.name}`);
                console.log(`Email: ${sub.email}`);
                console.log(`Secondary Email: ${sub.secondaryEmail || 'N/A'}`);
                console.log(`Phone: ${sub.phone}`);
                console.log(`WhatsApp: ${sub.whatsapp || 'N/A'}`);
                console.log(`Services: ${sub.services}`);
                console.log(`Message: ${sub.message}`);
                console.log(`Created: ${sub.createdAt}`);
            });
        } else {
            console.log('No submissions found yet. Try submitting the contact form!');
        }

    } catch (error) {
        console.error('❌ Database error:', error);
        process.exit(1);
    }
}

checkDatabase();
