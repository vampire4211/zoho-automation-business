import 'dotenv/config';
import { createClient } from '@libsql/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const dbUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl || !authToken) {
    throw new Error('Missing environment variables');
}

const client = createClient({
    url: dbUrl,
    authToken: authToken,
});

// Convert image to base64
function imageToBase64(imagePath: string): string {
    const imageBuffer = readFileSync(imagePath);
    return `data:image/png;base64,${imageBuffer.toString('base64')}`;
}

const images = {
    team: imageToBase64(join(__dirname, '../public/images/about/about_team_collaboration_1769707567693.png')),
    innovation: imageToBase64(join(__dirname, '../public/images/about/about_innovation_1769707587392.png')),
    growth: imageToBase64(join(__dirname, '../public/images/about/about_growth_1769707611797.png')),
    partnership: imageToBase64(join(__dirname, '../public/images/about/about_client_partnership_1769707633704.png')),
};

const aboutData = [
    { title: 'Who We Are', content: 'We are The Clear Architect - a team of passionate automation experts, developers, and innovators dedicated to transforming businesses through intelligent automation. Founded on the belief that technology should empower, not complicate, we bring clarity to chaos and efficiency to complexity.', imageData: images.team, displayOrder: 1, reverse: 0 },
    { title: 'What We Do', content: 'We specialize in building custom automation solutions that streamline workflows, integrate systems, and unlock business potential. From Zoho customizations to n8n workflows, from .NET applications to React dashboards - we architect the systems that power tomorrow\'s market leaders.', imageData: images.innovation, displayOrder: 2, reverse: 1 },
    { title: 'Our Mission', content: 'To engineer clarity from chaos. We believe every business deserves automation solutions that are not just powerful, but also intuitive and maintainable. Our mission is to build the automated systems that free teams to focus on what truly matters - innovation and growth.', imageData: images.growth, displayOrder: 3, reverse: 0 },
    { title: 'Our Values', content: 'Excellence, transparency, and partnership drive everything we do. We don\'t just deliver projects - we craft solutions. We don\'t just serve clients - we build lasting relationships. Every line of code, every integration, every workflow is designed with precision and care.', imageData: images.partnership, displayOrder: 4, reverse: 1 },
    { title: 'What Sets Us Apart', content: 'Deep technical expertise meets business acumen. We understand both the code and the boardroom. We speak automation, integration, and transformation fluently. Our solutions don\'t just work - they scale, adapt, and evolve with your business needs.', imageData: images.innovation, displayOrder: 5, reverse: 0 },
    { title: 'Beyond Clients - Building Bonds', content: 'We\'re not looking for transactions; we\'re building partnerships. Your success is our success. We invest time in understanding your unique challenges, your team dynamics, and your long-term vision. Together, we create automation ecosystems that truly transform how you work.', imageData: images.team, displayOrder: 6, reverse: 1 },
    { title: 'Why Join Our Team', content: 'Be part of something exceptional. Work on cutting-edge automation projects, collaborate with talented developers, and grow in an environment that values innovation, continuous learning, and work-life balance. We invest in our people because we know that great teams build great solutions.', imageData: images.growth, displayOrder: 7, reverse: 0 },
    { title: 'Our Vision for the Future', content: 'To be the global standard in business automation excellence. We\'re building the future where every business, regardless of size, has access to enterprise-grade automation solutions. Where technology amplifies human potential. Where clarity triumphs over complexity.', imageData: images.partnership, displayOrder: 8, reverse: 1 }
];

async function seedAbout() {
    try {
        console.log('Seeding about sections with base64 images...');

        // Clear existing data
        await client.execute('DELETE FROM about_sections');

        // Insert new data with base64 images using raw SQL
        for (const item of aboutData) {
            await client.execute({
                sql: `INSERT INTO about_sections (title, content, image_url, image_data, display_order, reverse) VALUES (?, ?, ?, ?, ?, ?)`,
                args: [item.title, item.content, 'placeholder.png', item.imageData, item.displayOrder, item.reverse]
            });
        }

        console.log('✅ About sections with images seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding about sections:', error);
        process.exit(1);
    }
}

seedAbout();
