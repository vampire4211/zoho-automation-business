import { db } from '@/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Suspense, cache } from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('blog');

// ISR with 1-hour revalidation
export const revalidate = 3600;

// Cache the database query
const getBlogPosts = cache(async () => {
    const allPosts = await db.select().from(posts).orderBy(desc(posts.publishedAt));
    return allPosts;
});

async function BlogContent() {
    const allPosts = await getBlogPosts();

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark py-16 px-4">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-deep-navy dark:text-white mb-6">
                    Our <span className="text-primary">Blog</span>
                </h1>
                <p className="text-xl text-slate-gray dark:text-slate-400 max-w-3xl">
                    Insights, tutorials, and stories from the automation trenches.
                </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPosts.length === 0 ? (
                    <div className="col-span-full text-center py-20">
                        <div className="text-6xl mb-4">📝</div>
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-2">
                            Coming Soon
                        </h2>
                        <p className="text-slate-gray dark:text-slate-400">
                            We're working on amazing content for you. Check back soon!
                        </p>
                    </div>
                ) : (
                    allPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Featured Image */}
                            {(post.featuredImage || post.imageUrl) && (
                                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={post.featuredImage || post.imageUrl || ''}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6">
                                {/* Category & Read Time */}
                                <div className="flex items-center gap-3 mb-3 text-sm">
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                                        {post.category}
                                    </span>
                                    <span className="text-slate-gray dark:text-slate-400">
                                        {post.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-bold text-deep-navy dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h2>

                                {/* Summary */}
                                {post.summary && (
                                    <p className="text-slate-gray dark:text-slate-400 line-clamp-3 mb-4">
                                        {post.summary}
                                    </p>
                                )}

                                {/* Meta */}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-gray dark:text-slate-400">
                                        {post.author}
                                    </span>
                                    {post.viewCount && post.viewCount > 0 && (
                                        <span className="text-slate-gray dark:text-slate-400">
                                            {post.viewCount} views
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default function BlogPage() {
    return (
        <Suspense fallback={<BlogPageSkeleton />}>
            <BlogContent />
        </Suspense>
    );
}

function BlogPageSkeleton() {
    return (
        <div className="min-h-screen bg-white dark:bg-background-dark py-16 px-4">
            {/* Header Skeleton */}
            <div className="max-w-6xl mx-auto mb-16">
                <div className="h-14 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/3 mb-6"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-2/3"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl overflow-hidden">
                        <div className="h-48 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                        <div className="p-6 space-y-3">
                            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/3"></div>
                            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                            <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
