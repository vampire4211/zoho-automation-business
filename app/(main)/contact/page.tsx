'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { countryCodes, findCountryByCode, validateEmail, validatePhone } from '@/lib/utils';
// Note: Can't export metadata in client components, but adding this for when converted to server component
// import { generatePageMetadata } from '@/lib/metadata';
// export const metadata = generatePageMetadata('contact');

function ContactContent() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    nameOrCompany: '',
    email: '',
    secondaryEmail: '',
    phone: '',
    whatsapp: '',
    services: [] as string[],
    description: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    secondaryEmail: '',
    phone: '',
    whatsapp: ''
  });

  const [phoneCountryCode, setPhoneCountryCode] = useState('+91');
  const [whatsappCountryCode, setWhatsappCountryCode] = useState('+91');
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [showWhatsappDropdown, setShowWhatsappDropdown] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const serviceOptions = [
    'Starter Automation',
    'Growth Automation',
    'Smart Automation + AI',
    'Agentic AI (n8n)',
    'Legal Web Scraping',
    'Web Applications',
    'Ongoing Support & Optimization'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (name === 'email' || name === 'secondaryEmail' || name === 'phone' || name === 'whatsapp') {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'phone' | 'whatsapp') => {
    let value = e.target.value;

    // Auto-detect country code if user types +
    if (value.startsWith('+')) {
      const detected = findCountryByCode(value);
      if (detected) {
        if (field === 'phone') {
          setPhoneCountryCode(detected.code);
        } else {
          setWhatsappCountryCode(detected.code);
        }
      }
    } else if (!value.startsWith('+') && value.length > 0) {
      // Add country code if not present
      const code = field === 'phone' ? phoneCountryCode : whatsappCountryCode;
      value = code + ' ' + value;
    }

    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors = { email: '', secondaryEmail: '', phone: '', whatsapp: '' };
    let isValid = true;

    // Validate primary email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate secondary email if provided
    if (formData.secondaryEmail && !validateEmail(formData.secondaryEmail)) {
      newErrors.secondaryEmail = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate phone
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number with country code';
      isValid = false;
    }

    // Validate WhatsApp if provided
    if (formData.whatsapp && !validatePhone(formData.whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid phone number with country code';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  // Auto-select service from URL parameter
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && serviceOptions.includes(serviceParam)) {
      setFormData(prev => ({
        ...prev,
        services: prev.services.includes(serviceParam)
          ? prev.services
          : [...prev.services, serviceParam]
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage('');

    // Validate form
    if (!validateForm()) {
      setSubmitMessage('Please fix the errors before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      setSubmitMessage('Thank you for contacting us! We will get back to you soon.');

      // Reset form
      setFormData({
        nameOrCompany: '',
        email: '',
        secondaryEmail: '',
        phone: '',
        whatsapp: '',
        services: [],
        description: ''
      });
      setErrors({ email: '', secondaryEmail: '', phone: '', whatsapp: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-deep-navy dark:text-white mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-slate-gray dark:text-slate-400 text-lg">
            We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-slate-200 dark:border-border-dark p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name or Company */}
            <div>
              <label htmlFor="nameOrCompany" className="block text-deep-navy dark:text-white font-medium mb-2">
                Individual Name or Company Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="nameOrCompany"
                name="nameOrCompany"
                value={formData.nameOrCompany}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-deep-navy dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your name or company name"
              />
            </div>

            {/* Email Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-deep-navy dark:text-white font-medium mb-2">
                  Primary Email <span className="text-primary">*</span>
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
              <div>
                <label htmlFor="secondaryEmail" className="block text-deep-navy dark:text-white font-medium mb-2">
                  Secondary Email
                </label>
                <input
                  type="email"
                  id="secondaryEmail"
                  name="secondaryEmail"
                  value={formData.secondaryEmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-surface-dark border ${errors.secondaryEmail ? 'border-red-500' : 'border-slate-200 dark:border-border-dark'} rounded-lg text-deep-navy dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  placeholder="secondary@email.com"
                />
                {errors.secondaryEmail && <p className="text-red-500 text-sm mt-1">{errors.secondaryEmail}</p>}
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-deep-navy dark:text-white font-medium mb-2">
                  Phone Number <span className="text-primary">*</span>
                </label>
                <div className="relative flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
                      className="h-full px-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-deep-navy dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      {countryCodes.find(c => c.code === phoneCountryCode)?.flag || '🌐'} {phoneCountryCode}
                    </button>
                    {showPhoneDropdown && (
                      <div className="absolute z-10 mt-1 w-64 max-h-60 overflow-auto bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg shadow-lg">
                        {countryCodes.map((country) => (
                          <button
                            key={country.code + country.country}
                            type="button"
                            onClick={() => {
                              setPhoneCountryCode(country.code);
                              setShowPhoneDropdown(false);
                              setFormData(prev => ({ ...prev, phone: country.code + ' ' }));
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                          >
                            <span>{country.flag}</span>
                            <span className="flex-1">{country.name}</span>
                            <span className="text-slate-500">{country.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e, 'phone')}
                    onFocus={() => setShowPhoneDropdown(false)}
                    required
                    className={`flex-1 px-4 py-3 bg-white dark:bg-surface-dark border ${errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-border-dark'} rounded-lg text-deep-navy dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                    placeholder="+91 1234567890"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-deep-navy dark:text-white font-medium mb-2">
                  WhatsApp Number
                </label>
                <div className="relative flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowWhatsappDropdown(!showWhatsappDropdown)}
                      className="h-full px-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-deep-navy dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      {countryCodes.find(c => c.code === whatsappCountryCode)?.flag || '🌐'} {whatsappCountryCode}
                    </button>
                    {showWhatsappDropdown && (
                      <div className="absolute z-10 mt-1 w-64 max-h-60 overflow-auto bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg shadow-lg">
                        {countryCodes.map((country) => (
                          <button
                            key={country.code + country.country}
                            type="button"
                            onClick={() => {
                              setWhatsappCountryCode(country.code);
                              setShowWhatsappDropdown(false);
                              setFormData(prev => ({ ...prev, whatsapp: country.code + ' ' }));
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                          >
                            <span>{country.flag}</span>
                            <span className="flex-1">{country.name}</span>
                            <span className="text-slate-500">{country.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => handlePhoneChange(e, 'whatsapp')}
                    onFocus={() => setShowWhatsappDropdown(false)}
                    className={`flex-1 px-4 py-3 bg-white dark:bg-surface-dark border ${errors.whatsapp ? 'border-red-500' : 'border-slate-200 dark:border-border-dark'} rounded-lg text-deep-navy dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                    placeholder="+91 1234567890"
                  />
                </div>
                {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
              </div>
            </div>

            {/* Services Checkboxes */}
            <div>
              <label className="block text-deep-navy dark:text-white font-medium mb-3">
                Which service(s) are you interested in? <span className="text-primary">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {serviceOptions.map((service) => (
                  <label
                    key={service}
                    className="flex items-center space-x-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg px-4 py-3 cursor-pointer hover:border-primary transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleCheckboxChange(service)}
                      className="w-5 h-5 text-primary bg-white dark:bg-surface-dark border-slate-300 dark:border-border-dark rounded focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-deep-navy dark:text-white">{service}</span>
                  </label>
                ))}
              </div>
              {formData.services.length === 0 && (
                <p className="text-slate-gray dark:text-slate-400 text-sm mt-2">Please select at least one service</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-deep-navy dark:text-white font-medium mb-2">
                Description <span className="text-primary">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-deep-navy dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Tell us more about your requirements..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || formData.services.length === 0}
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </div>

            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`p-4 rounded-lg ${submitMessage.includes('Thank you')
                ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-slate-gray dark:text-slate-400 mb-4">Or reach us directly at:</p>
          <div className="flex flex-wrap justify-center gap-6 text-primary">
            <a href="mailto:info@zohoautomation.com" className="hover:text-primary-hover transition-colors">
              📧 info@zohoautomation.com
            </a>
            <a href="tel:+15550000000" className="hover:text-primary-hover transition-colors">
              📞 +1 (555) 000-0000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-background-dark py-16 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
