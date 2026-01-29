import 'dotenv/config';
import { createClient } from '@libsql/client';
import sharp from 'sharp';
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

// Helper to compress image to base64 WebP
async function compressImageToBase64(imagePath: string): Promise<string> {
    const imageBuffer = readFileSync(imagePath);
    const compressed = await sharp(imageBuffer)
        .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 70 })
        .toBuffer();
    return `data:image/webp;base64,${compressed.toString('base64')}`;
}

async function seedBlog() {
    try {
        console.log('🌱 Seeding blog posts with images...\n');

        // Clear existing posts
        await client.execute('DELETE FROM posts');

        const artifactsDir = 'C:/Users/admin/.gemini/antigravity/brain/9b2a7e34-74c6-4e3a-bc4d-9969760244e5';

        // Compress blog images
        console.log('Compressing images...');
        const img1 = await compressImageToBase64(join(artifactsDir, 'blog_automation_trends_1769710534533.png'));
        const img2 = await compressImageToBase64(join(artifactsDir, 'blog_zoho_integration_1769710551282.png'));
        console.log('✓ Images compressed\n');

        const blogPosts = [
            {
                slug: 'future-of-business-automation',
                title: 'The Future of Business Automation: Trends to Watch in 2026',
                summary: 'Discover the emerging trends reshaping business automation and how your organization can stay ahead of the curve.',
                content: `# The Future of Business Automation

Business automation is evolving at an unprecedented pace. In 2026, we're seeing transformative changes that are redefining how companies operate.

## Key Trends

### 1. AI-Powered Workflows
Artificial intelligence is no longer a buzzword—it's becoming the backbone of modern automation systems. From predictive analytics to intelligent decision-making, AI is enabling businesses to automate complex processes that previously required human intervention.

### 2. Hyper-Integration
The days of siloed systems are ending. Modern automation platforms seamlessly connect CRM, ERP, marketing tools, and more into unified workflows.

### 3. Low-Code/No-Code Solutions
Empowering business users to build automation without extensive technical knowledge is becoming the norm.

## What This Means for Your Business

Companies that embrace these trends are seeing:
- 40% reduction in operational costs
- 60% faster process execution
- 80% improvement in data accuracy

The future is automated. The question is: will you lead or follow?`,
                featuredImage: img1,
                galleryImages: null,
                videoUrls: null,
                tags: JSON.stringify(['Automation', 'AI', 'Trends']),
                author: 'J&P Automation Team',
                category: 'Insights',
                readTime: '8 min read',
                viewCount: 0,
            },
            {
                slug: 'zoho-integration-best-practices',
                title: 'Zoho Integration Best Practices: Connecting Your Business Stack',
                summary: 'Learn how to seamlessly integrate Zoho applications with your existing tools for maximum efficiency and data flow.',
                content: `# Zoho Integration Best Practices

Zoho offers powerful automation capabilities, but true transformation happens when you integrate it with your entire business ecosystem.

## Why Integration Matters

Without proper integration, your data lives in silos, leading to:
- Duplicate data entry
- Inconsistent information
- Missed opportunities
- Wasted time

## Our Proven Integration Framework

### Phase 1: Map Your Data Flow
Understand how information moves through your organization.

### Phase 2: Choose the Right Tools
- Zoho Flow for workflow automation
- Custom APIs for complex integrations
- Third-party connectors when needed

### Phase 3: Test & Validate
Never skip testing. A small error in integration can cascade into major issues.

## Real Results

One of our clients saw:
- 75% reduction in manual data entry
- 90% faster quote-to-cash cycle
- Zero data synchronization errors

Integration isn't just technical—it's transformational.`,
                featuredImage: img2,
                galleryImages: null,
                videoUrls: JSON.stringify(['https://www.youtube.com/watch?v=example']),
                tags: JSON.stringify(['Zoho', 'Integration', 'Best Practices']),
                author: 'Technical Team',
                category: 'Tutorials',
                readTime: '6 min read',
                viewCount: 0,
            },
            {
                slug: 'crm-automation-roi',
                title: '5 Ways CRM Automation Delivers Immediate ROI',
                summary: 'Automating your CRM isn\'t just about efficiency—it\'s about unlocking revenue.  Here\'s how to see returns within weeks.',
                content: `# 5 Ways CRM Automation Delivers Immediate ROI

CRM automation often pays for itself in the first quarter. Here's how.

## 1. Sales Team Productivity (+45%)
Automated lead scoring and routing means your best leads get to the right people instantly.

## 2. Faster Follow-Ups (+60%)
Automated emails and reminders ensure no lead falls through the cracks.

## 3. Better Forecasting
Real-time pipeline visibility with automated reporting helps you make smarter decisions.

## 4. Customer Retention (+30%)
Automated check-ins and renewal reminders keep customers engaged.

## 5. Reduced Admin Time (-50%)
Your team spends time selling, not data entry.

The numbers don't lie: automation is a revenue multiplier.`,
                featuredImage: null,
                galleryImages: null,
                videoUrls: null,
                tags: JSON.stringify(['CRM', 'ROI', 'Sales']),
                author: 'J&P Team',
                category: 'Business',
                readTime: '5 min read',
                viewCount: 0,
            },
        ];

        for (const post of blogPosts) {
            await client.execute({
                sql: `INSERT INTO posts (slug, title, summary, content, featured_image, gallery_images, video_urls, tags, author, category, read_time, view_count)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    post.slug,
                    post.title,
                    post.summary,
                    post.content,
                    post.featuredImage,
                    post.galleryImages,
                    post.videoUrls,
                    post.tags,
                    post.author,
                    post.category,
                    post.readTime,
                    post.viewCount,
                ],
            });
            console.log(`✓ Created post: ${post.title}`);
        }

        console.log('\n✅ Blog posts seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding blog:', error);
        process.exit(1);
    }
}

seedBlog();
