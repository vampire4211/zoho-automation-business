'use client';

import { useState } from 'react';
import { validateEmail, validatePhone } from '@/lib/utils';

// Note: Can't export metadata in client components, but adding this for when converted to server component
// import { generatePageMetadata } from '@/lib/metadata';
// export const metadata = generatePageMetadata('careers');

const jobPositions = [
    {
        id: 'zoho-developer',
        title: 'Zoho Developer',
        description: 'Design, develop, and customize Zoho applications to meet business requirements. Work with Deluge scripting and integrate with external systems.',
        requirements: ['3+ years Zoho experience', 'Deluge scripting expertise', 'API integration knowledge']
    },
    {
        id: 'n8n-developer',
        title: 'n8n Developer',
        description: 'Build and maintain workflow automations using n8n. Create custom nodes and integrate multiple services seamlessly.',
        requirements: ['Experience with n8n or similar workflow tools', 'JavaScript/TypeScript proficiency', 'API integration skills']
    },
    {
        id: 'dotnet-developer',
        title: '.NET Developer',
        description: 'Develop robust backend solutions using .NET Core/Framework. Build APIs and integrate with various business systems.',
        requirements: ['3+ years .NET experience', 'C# proficiency', 'RESTful API development', 'SQL Server knowledge']
    },
    {
        id: 'react-developer',
        title: 'React Developer',
        description: 'Build modern, responsive web applications using React and Next.js. Create reusable components and optimize performance.',
        requirements: ['Strong React.js skills', 'Next.js experience', 'TypeScript knowledge', 'State management (Redux/Zustand)']
    },
    {
        id: 'automation-developer',
        title: 'Automation Developer',
        description: 'Design and implement business process automation solutions. Work with multiple automation platforms and create custom integrations.',
        requirements: ['Experience with automation platforms', 'Scripting knowledge (Python/JavaScript)', 'Problem-solving skills', 'Integration expertise']
    }
];

export default function CareersPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        selectedPositions: [] as string[]
    });

    const [errors, setErrors] = useState({
        email: '',
        phone: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'email' || name === 'phone') {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCheckboxChange = (positionId: string) => {
        setFormData(prev => ({
            ...prev,
            selectedPositions: prev.selectedPositions.includes(positionId)
                ? prev.selectedPositions.filter(p => p !== positionId)
                : [...prev.selectedPositions, positionId]
        }));
    };

    const validateForm = (): boolean => {
        const newErrors = { email: '', phone: '' };
        let isValid = true;

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number with country code';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage('');

        if (formData.selectedPositions.length === 0) {
            setSubmitMessage('Please select at least one position');
            return;
        }

        if (!validateForm()) {
            setSubmitMessage('Please fix the errors before submitting.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/careers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit application');
            }

            setSubmitMessage('Thank you for your application! We will review it and get back to you soon.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                selectedPositions: []
            });
            setErrors({ email: '', phone: '' });
        } catch (error) {
            console.error('Error submitting application:', error);
            setSubmitMessage('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-deep-navy dark:text-white mb-4">
                        Join Our <span className="text-primary">Team</span>
                    </h1>
                    <p className="text-slate-gray dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        We're looking for talented individuals passionate about automation, innovation, and building the future of business technology.
                    </p>
                </div>

                {/* Open Positions */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-deep-navy dark:text-white mb-8">Open Positions</h2>
                    <div className="grid gap-6">
                        {jobPositions.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-8 transition-all hover:shadow-lg"
                            >
                                <div className="flex items-start gap-4">
                                    <input
                                        type="checkbox"
                                        id={job.id}
                                        checked={formData.selectedPositions.includes(job.id)}
                                        onChange={() => handleCheckboxChange(job.id)}
                                        className="mt-1 w-5 h-5 text-primary border-slate-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <label htmlFor={job.id} className="cursor-pointer">
                                            <h3 className="text-2xl font-bold text-deep-navy dark:text-white mb-2">
                                                {job.title}
                                            </h3>
                                            <p className="text-slate-gray dark:text-slate-400 mb-4">
                                                {job.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {job.requirements.map((req, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20"
                                                    >
                                                        {req}
                                                    </span>
                                                ))}
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Form */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-slate-200 dark:border-border-dark p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-deep-navy dark:text-white mb-6">Apply Now</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-deep-navy dark:text-white font-medium mb-2">
                                Full Name <span className="text-primary">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-deep-navy dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-deep-navy dark:text-white font-medium mb-2">
                                Email <span className="text-primary">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 bg-white dark:bg-surface-dark border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-border-dark'} rounded-lg text-deep-navy dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-deep-navy dark:text-white font-medium mb-2">
                                Phone Number <span className="text-primary">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 bg-white dark:bg-surface-dark border ${errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-border-dark'} rounded-lg text-deep-navy dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                                placeholder="+91 1234567890"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>

                        {/* Success/Error Message */}
                        {submitMessage && (
                            <div className={`p-4 rounded-lg ${submitMessage.includes('Thank you') ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>
                                {submitMessage}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
