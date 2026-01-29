
import { db } from "./index";
import * as schema from "./schema";

const initialPosts = [
    {
        slug: "hidden-cost-human-in-loop",
        title: 'The Hidden Cost of "Human-in-the-Loop"',
        content: "Content for hidden cost...",
        summary: "Why keeping humans in mundane operational loops creates exponential drag on scalability.",
        category: "Management",
        readTime: "5 min read",
        imageUrl: ""
    },
    {
        slug: "rpa-vs-traditional-integration",
        title: "RPA vs. Traditional Integration: A CTO's Guide",
        content: "Content for RPA vs Integration...",
        summary: "Choosing the right tool for the job when legacy systems refuse to talk to modern APIs.",
        category: "Technology",
        readTime: "8 min read",
        imageUrl: ""
    },
    {
        slug: "scaling-operations-without-headcount",
        title: "Scaling Operations Without Increasing Headcount",
        content: "Content for Scaling Operations...",
        summary: "Strategic automation layers that allow your core team to focus on high-value tasks.",
        category: "Strategy",
        readTime: "6 min read",
        imageUrl: ""
    }
];

const initialProjects = [
    {
        slug: "fintech-compliance-engine",
        title: "Automated Compliance Engine",
        client: "FinTech Client",
        description: "Replaced manual KYC verification for a global payments processor.",
        roi: "300% ROI",
        roiLabel: "In First Quarter",
        tags: "Process Mining, RPA Implementation"
    },
    {
        slug: "logistics-supply-chain",
        title: "Supply Chain Orchestration",
        client: "Logistics Client",
        description: "Connected 5 disparate inventory systems into a single source of truth.",
        roi: "60% Faster",
        roiLabel: "Fulfillment Cycle",
        tags: "API Integration, Custom Dashboard"
    },
    {
        slug: "legal-contract-analysis",
        title: "Contract Analysis Bot",
        client: "Legal Firm",
        description: "Developed a custom NLP solution to pre-scan thousands of standard contracts.",
        roi: "$2M Saved",
        roiLabel: "Annually in Billable Hours",
        tags: "NLP / AI, Workflow Design"
    },
    {
        slug: "healthcare-legacy-bridge",
        title: "Legacy System Bridge",
        client: "Healthcare Provider",
        description: "Securely automated the transfer of patient records from mainframes to cloud.",
        roi: "Zero Errors",
        roiLabel: "In Patient Data Migration",
        tags: "Data Migration, Security Compliance"
    }
];

async function seed() {
    console.log("Seeding posts...");
    for (const post of initialPosts) {
        await db.insert(schema.posts).values(post).onConflictDoNothing();
    }

    console.log("Seeding projects...");
    for (const project of initialProjects) {
        await db.insert(schema.projects).values(project).onConflictDoNothing();
    }

    console.log("Seeding complete.");
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
