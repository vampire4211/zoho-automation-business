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

async function seedPortfolio() {
    try {
        console.log('🚀 Seeding portfolio projects with images...\n');

        // Clear existing projects
        await client.execute('DELETE FROM projects');

        const artifactsDir = 'C:/Users/admin/.gemini/antigravity/brain/9b2a7e34-74c6-4e3a-bc4d-9969760244e5';

        // Compress project images
        console.log('Compressing images...');
        const img1 = await compressImageToBase64(join(artifactsDir, 'project_crm_dashboard_1769710572744.png'));
        const img2 = await compressImageToBase64(join(artifactsDir, 'project_workflow_automation_1769710589333.png'));
        console.log('✓ Images compressed\n');

        const projects = [
            {
                slug: 'enterprise-crm-transformation',
                title: 'Enterprise CRM Transformation',
                client: 'Global Financial Services',
                description: 'Complete Zoho CRM implementation with custom automation workflows, reducing sales cycle by 60% and increasing deal closure rate by 45%.',
                content: `# Enterprise CRM Transformation Case Study

## Challenge
Our client, a leading financial services firm, was struggling with a fragmented sales process across 5 different legacy systems. Data inconsistency and manual processes were costing them deals.

## Solution
We implemented a unified Zoho CRM system with:
- Custom lead scoring algorithms
- Automated workflow routing
- Real-time analytics dashboards
- Integration with their existing ERP and marketing tools

## Results
- **60% faster sales cycle**
- **45% increase in deal closure**
- **$2.4M additional revenue** in first year
- **80% reduction in data entry time**

## Technologies Used
- Zoho CRM
- Zoho Flow
- Custom APIs
- Power BI integration`,
                featuredImage: img1,
                galleryImages: null,
                demoUrl: null,
                githubUrl: null,
                liveUrl: null,
                technologies: JSON.stringify(['Zoho CRM', 'Zoho Flow', 'REST APIs', 'Power BI']),
                challenges: 'Multiple legacy systems, inconsistent data, manual processes slowing sales team.',
                solutions: 'Unified CRM platform, automated workflows, real-time dashboards, seamless integrations.',
                results: '60% faster sales cycle, 45% higher closure rate, $2.4M additional annual revenue.',
                roi: '320% ROI',
                roiLabel: 'First Year',
                tags: JSON.stringify(['CRM', 'FinTech', 'Enterprise']),
                viewCount: 0,
            },
            {
                slug: 'manufacturing-workflow-automation',
                title: 'Smart Manufacturing Workflow Automation',
                client: 'Industrial Equipment Manufacturer',
                description: 'End-to-end automation of order processing, inventory management, and production scheduling, resulting in 40% operational cost reduction.',
                content: `# Manufacturing Workflow Automation

## The Problem
Manual order processing and disconnected inventory systems led to delays, errors, and excess inventory costs.

## Our Approach
We built a comprehensive automation system that:
1. Automatically processes incoming orders
2. Checks inventory in real-time
3. Triggers production schedules
4. Updates customers on order status
5. Manages supplier relationships

## Impact
- **40% reduction in operational costs**
- **95% order accuracy** (up from 78%)
- **50% faster order fulfillment**
- **Zero stock-outs** since implementation

## Technology Stack
- Zoho Creator for custom apps
- Zoho Inventory
- IoT sensor integration
- Custom workflow engine`,
                featuredImage: img2,
                galleryImages: null,
                demoUrl: null,
                githubUrl: null,
                liveUrl: null,
                technologies: JSON.stringify(['Zoho Creator', 'Zoho Inventory', 'IoT', 'Custom APIs', 'Node.js']),
                challenges: 'Manual processes, inventory errors, production delays, customer dissatisfaction.',
                solutions: 'Automated order processing, real-time inventory, smart scheduling, integrated notifications.',
                results: '40% cost reduction, 95% order accuracy, 50% faster fulfillment, zero stock-outs.',
                roi: '280% ROI',
                roiLabel: 'Within 18 Months',
                tags: JSON.stringify(['Manufacturing', 'Automation', 'IoT']),
                viewCount: 0,
            },
            {
                slug: 'healthcare-patient-management',
                title: 'Healthcare Patient Management System',
                client: 'Multi-Location Clinic Network',
                description: 'Integrated patient management, appointment scheduling, and billing automation serving 50,000+ patients across 12 locations.',
                content: `# Healthcare Patient Management System

## Overview
A growing clinic network needed to modernize their patient management and eliminate scheduling conflicts across 12 locations.

## What We Built
- Centralized patient database
- Intelligent appointment scheduling
- Automated billing and insurance claims
- HIPAA-compliant document management
- Patient portal with mobile app

## Outcomes
- **30% increase in patient capacity**
- **90% reduction in scheduling conflicts**
- **25% faster insurance claim processing**
- **Patient satisfaction up 40%**

## Implementation
6-month phased rollout with minimal disruption to daily operations.`,
                featuredImage: null,
                galleryImages: null,
                demoUrl: null,
                githubUrl: null,
                liveUrl: null,
                technologies: JSON.stringify(['Zoho Creator', 'Zoho Forms', 'Mobile SDK', 'HIPAA Compliance']),
                challenges: 'Scheduling conflicts, manual billing, dispersed patient data, HIPAA compliance.',
                solutions: 'Centralized system, smart scheduling, automated billing, secure cloud storage.',
                results: '30% capacity increase, 90% fewer conflicts, 25% faster claims, 40% higher satisfaction.',
                roi: '220% ROI',
                roiLabel: 'In Two Years',
                tags: JSON.stringify(['Healthcare', 'Patient Management', 'Compliance']),
                viewCount: 0,
            },
        ];

        for (const project of projects) {
            await client.execute({
                sql: `INSERT INTO projects (slug, title, client, description, content, featured_image, gallery_images, demo_url, github_url, live_url, technologies, challenges, solutions, results, roi, roi_label, tags, view_count)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    project.slug,
                    project.title,
                    project.client,
                    project.description,
                    project.content,
                    project.featuredImage,
                    project.galleryImages,
                    project.demoUrl,
                    project.githubUrl,
                    project.liveUrl,
                    project.technologies,
                    project.challenges,
                    project.solutions,
                    project.results,
                    project.roi,
                    project.roiLabel,
                    project.tags,
                    project.viewCount,
                ],
            });
            console.log(`✓ Created project: ${project.title}`);
        }

        console.log('\n✅ Portfolio projects seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding portfolio:', error);
        process.exit(1);
    }
}

seedPortfolio();
