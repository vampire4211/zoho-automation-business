import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// Enhanced blog posts table with media support
export const posts = sqliteTable("posts", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    content: text("content").notNull(), // Markdown or HTML
    summary: text("summary"),
    featuredImage: text("featured_image"), // Base64 WebP compressed
    galleryImages: text("gallery_images"), // JSON array of base64 images
    videoUrls: text("video_urls"), // JSON array of video URLs (YouTube, Vimeo)
    tags: text("tags"), // JSON array
    author: text("author").default("J&P Team"),
    publishedAt: integer("published_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
    category: text("category").default("General"),
    readTime: text("read_time").default("5 min read"),
    viewCount: integer("view_count").default(0),
    imageUrl: text("image_url"), // Keep for backward compatibility
});

// Enhanced portfolio projects table with galleries and links
export const projects = sqliteTable("projects", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    client: text("client"),
    description: text("description").notNull(),
    content: text("content"), // Detailed case study content
    featuredImage: text("featured_image"), // Base64 WebP compressed
    galleryImages: text("gallery_images"), // JSON array of base64 images
    demoUrl: text("demo_url"),
    githubUrl: text("github_url"),
    liveUrl: text("live_url"),
    technologies: text("technologies"), // JSON array
    challenges: text("challenges"), // What problems we solved
    solutions: text("solutions"), // How we solved them
    results: text("results"), // Impact/ROI details
    imageUrl: text("image_url"), // Keep for backward compatibility
    roi: text("roi"), // e.g., "300% ROI"
    roiLabel: text("roi_label"), // e.g., "In First Quarter"
    tags: text("tags"), // JSON string or comma-separated
    viewCount: integer("view_count").default(0),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Visitor tracking - Page views
export const pageViews = sqliteTable("page_views", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    visitorId: text("visitor_id").notNull(), // Anonymous UUID from cookie
    path: text("path").notNull(), // e.g., /blog, /about
    referrer: text("referrer"), // Where they came from
    userAgent: text("user_agent"), // Browser/device info
    ipHash: text("ip_hash"), // Hashed IP for privacy
    country: text("country"), // Geolocation
    city: text("city"),
    device: text("device"), // mobile/desktop/tablet
    timestamp: integer("timestamp", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Visitor tracking - Sessions
export const visitorSessions = sqliteTable("visitor_sessions", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    visitorId: text("visitor_id").notNull().unique(),
    firstVisit: integer("first_visit", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
    lastVisit: integer("last_visit", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
    totalVisits: integer("total_visits").default(1),
    totalPageViews: integer("total_page_views").default(0),
    email: text("email"), // NULL until they sign up for newsletter
    source: text("source"), // google, direct, social, etc.
    ipHash: text("ip_hash"), // To identify returning users by IP if cookies are cleared
    sessionDuration: integer("session_duration").default(0), // Current session duration in seconds
    country: text("country"),
    city: text("city"),
});

// Visit history - Individual session records
export const visitHistory = sqliteTable("visit_history", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    visitorId: text("visitor_id").notNull(),
    sessionStart: integer("session_start", { mode: "timestamp" }).notNull(),
    sessionEnd: integer("session_end", { mode: "timestamp" }).notNull(),
    durationSeconds: integer("duration_seconds").notNull(),
    pagesViewed: integer("pages_viewed").default(1),
    entryPage: text("entry_page"),
    exitPage: text("exit_page"),
    device: text("device"),
    source: text("source"),
});

// Newsletter subscribers (for Phase 2)
export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
    name: text("name"),
    visitorId: text("visitor_id"), // Link to visitor session
    subscribedAt: integer("subscribed_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
    source: text("source"), // popup, footer, etc.
    status: text("status").default("active"), // active, unsubscribed
});

// Contact form submissions
export const formSubmissions = sqliteTable("form_submissions", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    secondaryEmail: text("secondary_email"),
    phone: text("phone").notNull(),
    whatsapp: text("whatsapp"),
    services: text("services"), // JSON array of selected services
    message: text("message").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Job applications
export const jobApplications = sqliteTable("job_applications", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    positions: text("positions").notNull(), // JSON array of selected positions
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// About Us sections
export const aboutSections = sqliteTable("about_sections", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    imageData: text("image_data").notNull(), // Base64 encoded image
    displayOrder: integer("display_order").notNull(),
    reverse: integer("reverse").default(0), // 0 for false, 1 for true (SQLite doesn't have boolean)
});
