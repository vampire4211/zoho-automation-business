
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions | The Clear Architect",
    description: "Terms and conditions regarding data collection and usage.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-background-dark py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-deep-navy dark:text-white mb-8">
                    Terms and Conditions
                </h1>

                <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
                    <p>
                        Welcome to The Clear Architect. By using our website, you acknowledge and agree to the following terms regarding data collection and usage:
                    </p>

                    <div className="bg-slate-50 dark:bg-surface-dark p-6 rounded-lg border border-slate-200 dark:border-border-dark">
                        <h2 className="text-xl font-semibold text-deep-navy dark:text-white mb-4">
                            Data Collection Transparency
                        </h2>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>
                                <strong className="text-deep-navy dark:text-blue-200">Traffic Data:</strong> We collect anonymous ingress and egress information (such as page views and session duration) to analyze website traffic and improve user experience.
                            </li>
                            <li>
                                <strong className="text-deep-navy dark:text-blue-200">Form Submissions:</strong> If you voluntarily submit a form (such as the contact form or newsletter subscription), we store the information you provide to respond to your inquiry or fulfill your request.
                            </li>
                        </ul>
                    </div>

                    <p className="text-sm text-slate-500">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>
    );
}
