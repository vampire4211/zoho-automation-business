'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export default function Breadcrumbs() {
    const pathname = usePathname();

    // Don't show on homepage
    if (pathname === '/') return null;

    const segments = pathname.split('/').filter(Boolean);

    // Generate breadcrumb items
    const breadcrumbItems = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;
        // Format label: "about-us" -> "About Us"
        const label = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());

        return {
            label,
            href,
            isLast: index === segments.length - 1
        };
    });

    // JSON-LD Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: process.env.NEXT_PUBLIC_SITE_URL || 'https://thecleararchitect.com'
            },
            ...breadcrumbItems.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.label,
                item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thecleararchitect.com'}${item.href}`
            }))
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <nav aria-label="Breadcrumb" className="py-4 text-sm text-slate-gray dark:text-slate-400">
                <ol className="flex items-center space-x-2">
                    <li>
                        <Link
                            href="/"
                            className="hover:text-primary transition-colors flex items-center"
                            aria-label="Home"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </Link>
                    </li>

                    {breadcrumbItems.map((item) => (
                        <Fragment key={item.href}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 dark:text-slate-600">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </li>
                            <li>
                                {item.isLast ? (
                                    <span className="font-medium text-deep-navy dark:text-white" aria-current="page">
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link href={item.href} className="hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        </Fragment>
                    ))}
                </ol>
            </nav>
        </>
    );
}
