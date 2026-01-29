import 'dotenv/config';
import { createClient } from '@libsql/client';

const dbUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl || !authToken) {
    throw new Error('Missing environment variables');
}

const client = createClient({
    url: dbUrl,
    authToken: authToken,
});

async function updateColumn() {
    try {
        console.log('Updating about_sections table...');

        // SQLite doesn't support RENAME COLUMN directly in older versions
        // We need to check if column exists first
        const result = await client.execute('PRAGMA table_info(about_sections)');
        const hasImageData = result.rows.some((row: any) => row.name === 'image_data');

        if (!hasImageData) {
            console.log('Adding image_data column...');
            await client.execute('ALTER TABLE about_sections ADD COLUMN image_data TEXT');

            // Copy data from image_url to image_data if needed
            await client.execute('UPDATE about_sections SET image_data = image_url WHERE image_data IS NULL');
        }

        console.log('✅ Column update completed successfully!');
    } catch (error) {
        console.error('❌ Update failed:', error);
        process.exit(1);
    }
}

updateColumn();
