import { db } from '@/db';
import { projects } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Suspense, cache } from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('portfolio');

// ISR with 1-hour revalidation
export const revalidate = 3600;

// Cache the database query
const getProjects = cache(async () => {
    const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));
    return allProjects;
});

async function PortfolioContent() {
    const allProjects = await getProjects();

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark">
            {/* Header */}
            <section className="pt-24 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
                        Portfolio & Insights
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                        Explore our case studies in business automation and read our latest thinking on building scalable, efficient enterprise systems.
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-12 px-6 border-t border-slate-200 dark:border-border-dark">
                <div className="max-w-7xl mx-auto">
                    {allProjects.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🚀</div>
                            <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-2">
                                Projects Coming Soon
                            </h2>
                            <p className="text-slate-gray dark:text-slate-400">
                                We're documenting our amazing projects. Check back soon to see our work!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {allProjects.map((project) => {
                                const tags = project.tags ? JSON.parse(project.tags) : [];
                                const technologies = project.technologies ? JSON.parse(project.technologies) : [];

                                return (
                                    <Link
                                        key={project.id}
                                        href={`/portfolio/${project.slug}`}
                                        className="group relative flex flex-col bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-8 lg:p-10 transition-all hover:border-primary hover:shadow-xl dark:hover:shadow-none h-full"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-8">
                                            {tags.length > 0 && (
                                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
                                                    {tags[0]}
                                                </span>
                                            )}
                                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                                                north_east
                                            </span>
                                        </div>

                                        {/* Featured Image */}
                                        {(project.featuredImage || project.imageUrl) && (
                                            <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <img
                                                    src={project.featuredImage || project.imageUrl || ''}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}

                                        {/* Client */}
                                        {project.client && (
                                            <p className="text-xs uppercase tracking-wider text-slate-400 mb-4">
                                                {project.client}
                                            </p>
                                        )}

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6 flex-grow">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        {technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {technologies.slice(0, 4).map((tech: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {technologies.length > 4 && (
                                                    <span className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                                                        +{technologies.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* ROI */}
                                        {project.roi && (
                                            <div className="flex items-baseline gap-4 pt-6 border-t border-slate-200 dark:border-border-dark">
                                                <div>
                                                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                                                        {project.roiLabel || 'Impact'}
                                                    </p>
                                                    <p className="text-2xl font-bold text-primary">{project.roi}</p>
                                                </div>
                                                {project.viewCount && project.viewCount > 0 && (
                                                    <div className="ml-auto">
                                                        <p className="text-xs text-slate-400">
                                                            {project.viewCount} views
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default function PortfolioPage() {
    return (
        <Suspense fallback={<PortfolioPageSkeleton />}>
            <PortfolioContent />
        </Suspense>
    );
}

function PortfolioPageSkeleton() {
    return (
        <div className="min-h-screen bg-white dark:bg-background-dark">
            <section className="pt-24 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-2/3 mb-8"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2"></div>
                </div>
            </section>

            <section className="py-12 px-6 border-t border-slate-200 dark:border-border-dark">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-8 lg:p-10"
                        >
                            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/4 mb-8"></div>
                            <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-6"></div>
                            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
                            <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-6"></div>
                            <div className="flex gap-2 mb-6">
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                ))}
                            </div>
                            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
