import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('privacy');

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-background-dark py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-deep-navy dark:text-white mb-8">
                    Privacy Policy
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-lg text-slate-gray dark:text-slate-400 mb-8">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">1. Information We Collect</h2>
                        <p className="text-slate-gray dark:text-slate-400 mb-4">
                            We collect information to provide better services to our users. The information we collect includes:
                        </p>
                        <ul className="list-disc pl-6 text-slate-gray dark:text-slate-400 space-y-2">
                            <li><strong>Analytics Data:</strong> Page views, visit duration, device type, browser information, and referral source</li>
                            <li><strong>Contact Information:</strong> Name, email, phone number when you submit forms or subscribe to our newsletter</li>
                            <li><strong>Technical Data:</strong> IP address (hashed for privacy), cookies, and usage data</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">2. How We Use Your Information</h2>
                        <p className="text-slate-gray dark:text-slate-400 mb-4">
                            We use the collected information for:
                        </p>
                        <ul className="list-disc pl-6 text-slate-gray dark:text-slate-400 space-y-2">
                            <li>Understanding how visitors use our website</li>
                            <li>Improving our services and user experience</li>
                            <li>Sending newsletters and updates (only if you subscribe)</li>
                            <li>Responding to inquiries and providing customer support</li>
                            <li>Website security and fraud prevention</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">3. Cookies</h2>
                        <p className="text-slate-gray dark:text-slate-400 mb-4">
                            We use cookies to enhance your browsing experience. See our <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a> for detailed information.
                        </p>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <p className="text-sm text-slate-gray dark:text-slate-400">
                                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be disabled. They include visitor identification (for analytics) and session management.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">4. Data Security</h2>
                        <p className="text-slate-gray dark:text-slate-400">
                            We implement appropriate security measures to protect your personal information:
                        </p>
                        <ul className="list-disc pl-6 text-slate-gray dark:text-slate-400 space-y-2">
                            <li>IP addresses are hashed using SHA-256 encryption</li>
                            <li>All data transmissions are encrypted using HTTPS</li>
                            <li>Access to personal data is restricted to authorized personnel only</li>
                            <li>Regular security audits and updates</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">5. Data Retention</h2>
                        <p className="text-slate-gray dark:text-slate-400">
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. Analytics data is automatically deleted after 2 years.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">6. Third-Party Services</h2>
                        <p className="text-slate-gray dark:text-slate-400">
                            We do not sell, trade, or transfer your personally identifiable information to third parties. We may share anonymous, aggregated data for business analytics purposes.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">7. Your Rights</h2>
                        <p className="text-slate-gray dark:text-slate-400 mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-slate-gray dark:text-slate-400 space-y-2">
                            <li>Know what data we collect about you</li>
                            <li>Unsubscribe from our newsletter at any time</li>
                            <li>Contact us regarding your data privacy concerns</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">8. Contact Us</h2>
                        <p className="text-slate-gray dark:text-slate-400">
                            If you have questions about this Privacy Policy, please contact us at{' '}
                            <a href="/contact" className="text-primary hover:underline">our contact page</a>.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-deep-navy dark:text-white mb-4">9. Changes to This Policy</h2>
                        <p className="text-slate-gray dark:text-slate-400">
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last updated" date.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
