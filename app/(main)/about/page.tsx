import { db } from '@/db';
import { aboutSections } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { Suspense, cache } from 'react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('about');

// Static generation with revalidation every 24 hours
export const revalidate = 86400;

// Cache the database query using React.cache
const getAboutSections = cache(async () => {
    const sections = await db.select().from(aboutSections).orderBy(asc(aboutSections.displayOrder));
    return sections;
});

async function AboutContent() {
    const sections = await getAboutSections();

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-deep-navy dark:text-white mb-6">
                        About <span className="text-primary">Us</span>
                    </h1>
                    <p className="text-xl text-slate-gray dark:text-slate-400 leading-relaxed">
                        Engineering clarity from chaos. Building the automated systems that power tomorrow's market leaders.
                    </p>
                </div>
            </div>

            {/* Zig-zag Content Sections */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className={`flex flex-col ${section.reverse === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 mb-24 last:mb-0`}
                    >
                        {/* Content */}
                        <div className="flex-1 space-y-4">
                            <h2 className="text-4xl font-bold text-deep-navy dark:text-white">
                                {section.title}
                            </h2>
                            <p className="text-lg text-slate-gray dark:text-slate-400 leading-relaxed">
                                {section.content}
                            </p>
                        </div>

                        {/* Image */}
                        <div className="flex-1 relative h-80 w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-border-dark">
                            <img
                                src={section.imageData}
                                alt={section.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-deep-navy dark:text-white mb-6">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-xl text-slate-gray dark:text-slate-400 mb-8">
                        Let's build something exceptional together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all"
                        >
                            Get in Touch
                        </a>
                        <a
                            href="/careers"
                            className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-lg transition-all"
                        >
                            Join Our Team
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AboutPage() {
    return (
        <Suspense fallback={<AboutPageSkeleton />}>
            <AboutContent />
        </Suspense>
    );
}

function AboutPageSkeleton() {
    return (
        <div className="min-h-screen bg-white dark:bg-background-dark">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-deep-navy dark:text-white mb-6">
                        About <span className="text-primary">Us</span>
                    </h1>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4 mx-auto"></div>
                </div>
            </div>

            {/* Loading Skeleton */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 mb-24 last:mb-0`}>
                        <div className="flex-1 space-y-4">
                            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-2/3"></div>
                            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        </div>
                        <div className="flex-1 h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
                    </div>
                ))}
            </div>

            {/* CTA Section Skeleton */}
            <div className="bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-2/3 mx-auto"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2 mx-auto"></div>
                    <div className="flex gap-4 justify-center">
                        <div className="h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        <div className="h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
