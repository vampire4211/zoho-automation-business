'use client';

import { useState } from 'react';

type FAQItem = {
    question: string;
    answer: string;
};

interface FAQProps {
    items: FAQItem[];
    title?: string;
}

export default function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
    // FAQPage Schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
            }
        }))
    };

    return (
        <section className="py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-deep-navy dark:text-white mb-8 text-center">
                    {title}
                </h2>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <FAQItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ item }: { item: FAQItem }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-200 dark:border-border-dark rounded-lg overflow-hidden bg-white dark:bg-surface-dark transition-all duration-200 hover:shadow-md">
            <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-lg text-deep-navy dark:text-white pr-4">
                    {item.question}
                </span>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>

            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 pt-0 text-slate-gray dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {item.answer}
                </div>
            </div>
        </div>
    );
}
