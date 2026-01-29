import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('cookies');

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-background-dark py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-deep-navy dark:text-white mb-8">
                    Cookie Policy
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-lg text-slate-gray dark:text-slate-400 mb-8">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">What Are Cookies?</h2>
                        <p className="text-slate-gray dark:text-slate-400">
                            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and understand how our website is used.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">Cookies We Use</h2>

                        <div className="space-y-6">
                            {/* Essential Cookies */}
                            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg p-6">
                                <h3 className="text-xl font-bold text-deep-navy dark:text-white mb-3">
                                    Essential Cookies (Always Active)
                                </h3>
                                <p className="text-slate-gray dark:text-slate-400 mb-4">
                                    These cookies are necessary for the website to function properly and cannot be disabled.
                                </p>

                                <div className="space-y-4">
                                    <div className="border-l-4 border-primary pl-4">
                                        <p className="font-semibold text-deep-navy dark:text-white">visitor_id</p>
                                        <p className="text-sm text-slate-gray dark:text-slate-400">
                                            <strong>Purpose:</strong> Uniquely identifies visitors for analytics and session tracking
                                        </p>
                                        <p className="text-sm text-slate-gray dark:text-slate-400">
                                            <strong>Duration:</strong> 1 year
                                        </p>
                                        <p className="text-sm text-slate-gray dark:text-slate-400">
                                            <strong>Type:</strong> First-party, HttpOnly
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg p-6">
                                <h3 className="text-xl font-bold text-deep-navy dark:text-white mb-3">
                                    Analytics Cookies (Included in Essential)
                                </h3>
                                <p className="text-slate-gray dark:text-slate-400 mb-4">
                                    We classify analytics as essential for our business operations and website security.
                                </p>

                                <ul className="list-disc pl-6 text-slate-gray dark:text-slate-400 space-y-2">
                                    <li>Understanding visitor behavior and traffic patterns</li>
                                    <li>Identifying security threats and unusual activity</li>
                                    <li>Improving website performance and user experience</li>
                                    <li>Measuring the effectiveness of our content</li>
                                </ul>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg p-6">
                                <h3 className="text-xl font-bold text-deep-navy dark:text-white mb-3">
                                    Marketing Cookies (Optional)
                                </h3>
                                <p className="text-slate-gray dark:text-slate-400 mb-4">
                                    These cookies enable personalized features and require your consent.
                                </p>

                                <div className="space-y-4">
                                    <div className="border-l-4 border-primary pl-4">
                                        <p className="font-semibold text-deep-navy dark:text-white">newsletter_dismissed</p>
                                        <p className="text-sm text-slate-gray dark:text-slate-400">
                                            <strong>Purpose:</strong> Remembers if you dismissed the newsletter popup
                                        </p>
                                        <p className="text-sm text-slate-gray dark:text-slate-400">
                                            <strong>Duration:</strong> 30 days
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <p className="font-semibold text-deep-navy dark:text-white">newsletter_subscribed</p>
                                        <p className="text-sm text-slate-gray dark:text-slate-400">
                                            <strong>Purpose:</strong> Prevents showing newsletter popup if you've already subscribed
                                        </p>
                                        <p className="text-sm text-slate-gray dark:text-slate-400">
                                            <strong>Duration:</strong> Persistent
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">Managing Cookies</h2>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                            <h3 className="font-semibold text-deep-navy dark:text-white mb-2">Your Choices</h3>
                            <ul className="list-disc pl-6 text-slate-gray dark:text-slate-400 space-y-2">
                                <li><strong>Marketing Cookies:</strong> You can accept or decline these via our cookie consent banner</li>
                                <li><strong>Browser Settings:</strong> Most browsers allow you to refuse all cookies or indicate when a cookie is being sent</li>
                                <li><strong>Note:</strong> Disabling essential cookies may affect website functionality</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">Data We Collect via Cookies</h2>
                        <p className="text-slate-gray dark:text-slate-400 mb-4">
                            Through cookies, we collect:
                        </p>
                        <ul className="list-disc pl-6 text-slate-gray dark:text-slate-400 space-y-2">
                            <li>Pages visited and time spent on each page</li>
                            <li>Device type (mobile, desktop, tablet)</li>
                            <li>Browser and operating system information</li>
                            <li>Referral source (how you found our website)</li>
                            <li>General location (country/city level only)</li>
                        </ul>

                        <div className="mt-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                            <p className="text-sm text-slate-gray dark:text-slate-400">
                                <strong>Privacy Note:</strong> IP addresses are hashed using SHA-256 encryption before storage, ensuring your privacy while allowing us to detect unique visitors.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">Updates to This Policy</h2>
                        <p className="text-slate-gray dark:text-slate-400">
                            We may update this Cookie Policy occasionally. Any changes will be posted on this page with an updated revision date.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">Contact Us</h2>
                        <p className="text-slate-gray dark:text-slate-400">
                            If you have questions about our use of cookies, please{' '}
                            <a href="/contact" className="text-primary hover:underline">contact us</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
