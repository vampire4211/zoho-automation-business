import { Metadata } from 'next';

// Site configuration
export const siteConfig = {
    name: 'The Clear Architect',
    title: 'The Clear Architect - Mastering Complexity through Automation',
    description: 'Enterprise-grade workflow automation solutions designed for modern global businesses. Streamline operations, reduce tasks by 60%, and scale efficiently.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thecleararchitect.com',
    ogImage: '/og-image.png',
    links: {
        twitter: 'https://twitter.com/thecleararchitect',
        linkedin: 'https://linkedin.com/company/thecleararchitect',
    },
};

// Page-specific metadata
export const pageMetadata = {
    home: {
        title: 'The Clear Architect - Mastering Complexity through Automation',
        description: 'Enterprise-grade workflow automation solutions designed for modern global businesses. Streamline operations, reduce tasks by 60%, and scale efficiently.',
        keywords: ['automation', 'workflow automation', 'business automation', 'Zoho', 'enterprise automation', 'process optimization'],
    },
    about: {
        title: 'About Us - The Clear Architect',
        description: 'Learn how The Clear Architect helps businesses master complexity through intelligent automation. Our mission, values, and commitment to excellence.',
        keywords: ['about', 'company', 'mission', 'automation experts', 'business consulting'],
    },
    services: {
        title: 'Automation Services - The Clear Architect',
        description: 'Comprehensive automation services including workflow audit, custom automation builds, and scalable solutions for businesses of all sizes.',
        keywords: ['automation services', 'workflow audit', 'custom automation', 'business solutions', 'consulting'],
    },
    portfolio: {
        title: 'Portfolio & Case Studies - The Clear Architect',
        description: 'Explore our successful automation implementations. Real results from real businesses: 60% task reduction, $10M+ saved globally.',
        keywords: ['portfolio', 'case studies', 'success stories', 'automation examples', 'client results'],
    },
    blog: {
        title: 'Blog - Automation Insights & Best Practices',
        description: 'Expert insights on workflow automation, best practices, industry trends, and practical guides for optimizing your business processes.',
        keywords: ['automation blog', 'workflow tips', 'business optimization', 'automation guides', 'industry insights'],
    },
    contact: {
        title: 'Contact Us - The Clear Architect',
        description: 'Ready to transform your business with automation? Book a free audit and discover how we can help you reclaim your time and scale efficiently.',
        keywords: ['contact', 'book audit', 'consultation', 'get in touch', 'automation inquiry'],
    },
    careers: {
        title: 'Careers - Join The Clear Architect Team',
        description: 'Join our team of automation experts. Explore career opportunities and help businesses master complexity through innovative solutions.',
        keywords: ['careers', 'jobs', 'hiring', 'automation jobs', 'join our team'],
    },
    privacy: {
        title: 'Privacy Policy - The Clear Architect',
        description: 'Our commitment to protecting your privacy. Learn how we collect, use, and safeguard your personal information.',
        keywords: ['privacy policy', 'data protection', 'privacy', 'gdpr'],
    },
    cookies: {
        title: 'Cookie Policy - The Clear Architect',
        description: 'Learn about how we use cookies to enhance your browsing experience and the choices you have.',
        keywords: ['cookie policy', 'cookies', 'tracking', 'privacy'],
    },
};

// Generate metadata for a specific page
export function generatePageMetadata(page: keyof typeof pageMetadata): Metadata {
    const pageData = pageMetadata[page];
    const url = `${siteConfig.url}${page === 'home' ? '' : `/${page}`}`;

    return {
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        authors: [{ name: 'The Clear Architect' }],
        creator: 'The Clear Architect',
        publisher: 'The Clear Architect',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: url,
            title: pageData.title,
            description: pageData.description,
            siteName: siteConfig.name,
            images: [
                {
                    url: siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: siteConfig.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: pageData.title,
            description: pageData.description,
            images: [siteConfig.ogImage],
            creator: '@thecleararchitect',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

// JSON-LD structured data generators
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        description: siteConfig.description,
        sameAs: [
            siteConfig.links.twitter,
            siteConfig.links.linkedin,
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            availableLanguage: 'English',
        },
    };
}

export function getServiceSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Business Automation Consulting',
        provider: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
        },
        areaServed: 'Worldwide',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Automation Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Workflow Audit',
                        description: 'Comprehensive analysis of current workflows to identify automation opportunities',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Custom Automation Build',
                        description: 'Tailored automation solutions designed for your specific business needs',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Scalable Solutions',
                        description: 'Enterprise-grade automation that grows with your business',
                    },
                },
            ],
        },
    };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.url}`,
        })),
    };
}
