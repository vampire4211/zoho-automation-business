'use client';

export default function ServicesPage() {
  const services = [
    {
      id: 'A-01',
      icon: 'rocket_launch',
      name: 'Starter Automation',
      description: 'Essential Zoho One setup with basic CRM and workflow automation for quick wins.',
      price: '$199 – $299',
      priceType: 'One-time',
      included: [
        'Zoho One core apps setup (CRM + basic apps)',
        'Basic CRM pipeline configuration',
        '2–3 simple workflows (lead assignment, follow-up reminders)',
        'Email & task automation',
        '1 basic dashboard'
      ],
      notIncluded: [
        'Custom apps',
        'AI agents',
        'Third-party integrations',
        'Advanced reports'
      ]
    },
    {
      id: 'B-02',
      icon: 'sync_alt',
      name: 'Growth Automation',
      description: 'Full CRM automation with custom Zoho Creator app and integrations.',
      price: '$549 – $749',
      priceType: 'One-time',
      included: [
        'Full CRM automation (sales stages, rules)',
        '1 simple Zoho Creator app (single-purpose)',
        '1 Zoho integration (CRM ↔ Books or Desk)',
        'Workflow optimization (up to 5–6 workflows)',
        '1 dashboard + 3–4 standard reports',
        'Basic documentation'
      ],
      notIncluded: [
        'AI agents',
        'Predictive analytics',
        'Multiple integrations',
        'Third-party tools'
      ]
    },
    {
      id: 'C-03',
      icon: 'smart_toy',
      name: 'Smart Automation + AI',
      description: 'End-to-end automation with AI agents and predictive insights.',
      price: '$899 – $1,299',
      priceType: 'One-time',
      included: [
        'End-to-end Zoho One automation',
        '1 AI agent (lead qualification or follow-ups)',
        'Predictive or AI-assisted insights',
        '2–3 integrations (Zoho + 3rd-party allowed)',
        'Advanced workflows',
        'Full documentation & handover'
      ],
      notIncluded: [
        'Multiple AI agents',
        'Custom ML models',
        'Unlimited integrations'
      ]
    },
    {
      id: 'D-04',
      icon: 'psychology',
      name: 'Agentic AI (n8n)',
      description: 'Intelligent workflow automation with agentic AI using n8n platform.',
      price: '$299 – $699',
      priceType: 'One-time',
      included: [
        'Design of agentic workflow in n8n',
        'Automation between apps (CRM, email, WhatsApp, APIs)',
        'One defined AI use-case only',
        'Error handling & logs'
      ],
      notIncluded: [
        'Complex ML training',
        'Multiple agents',
        'UI dashboards'
      ]
    },
    {
      id: 'E-05',
      icon: 'travel_explore',
      name: 'Legal Web Scraping',
      description: 'Automated data extraction from public sources with compliance.',
      price: '$199 – $499',
      priceType: 'One-time',
      included: [
        'Scraping of public, legally accessible data only',
        'robots.txt respected',
        'Rate-limited scraping',
        'Clean structured output (CSV / DB)'
      ],
      notIncluded: [
        'Login-based scraping',
        'Bypassing protections',
        'Real-time scraping'
      ]
    },
    {
      id: 'F-06',
      icon: 'code',
      name: 'Web Applications',
      description: 'Custom web applications with modern stack and Zoho integration.',
      price: '$499 – $1,499',
      priceType: 'Project-based',
      included: [
        'Custom web app (React frontend)',
        'Backend APIs (.NET / Node)',
        'Integration with Zoho / automation tools',
        'Basic authentication & roles'
      ],
      notIncluded: [
        'Mobile apps',
        'Heavy UI animations',
        'Enterprise-scale infra'
      ]
    },
    {
      id: 'G-07',
      icon: 'support_agent',
      name: 'Ongoing Support & Optimization',
      description: 'Continuous monitoring, maintenance, and optimization of your automations.',
      price: '$99 – $199',
      priceType: 'Per Month',
      included: [
        'Workflow monitoring',
        'Minor changes & fixes',
        'Performance optimization',
        'Monthly review call'
      ],
      notIncluded: [
        'New modules',
        'Major redesigns',
        'New AI use-cases'
      ]
    }
  ];

  return (
    <main className="flex-grow bg-white dark:bg-background-dark py-12 md:py-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-primary font-bold mb-2 tracking-widest uppercase">/ Services_Catalog_V2.0</div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">Services & Pricing</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg font-light">Comprehensive automation solutions tailored to your business needs and budget.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>UPDATED_2026</span>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 dark:border-border-dark">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-100 dark:bg-surface-dark">
                <th className="border border-slate-300 dark:border-border-dark p-4 text-left w-1/4">
                  <div className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">Service Name</div>
                </th>
                <th className="border border-slate-300 dark:border-border-dark p-4 text-left w-1/2">
                  <div className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">What&apos;s Included / Not Included</div>
                </th>
                <th className="border border-slate-300 dark:border-border-dark p-4 text-center w-1/4">
                  <div className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">Pricing</div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={service.id}
                  className={`${index % 2 === 0
                    ? 'bg-white dark:bg-[#0f172a]'
                    : 'bg-slate-50 dark:bg-[#15233b]'
                    } hover:bg-slate-100 dark:hover:bg-[#1a2c4e] transition-colors`}
                >
                  {/* Service Name Column */}
                  <td className="border border-slate-300 dark:border-border-dark p-6 align-top">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="material-symbols-outlined text-primary text-2xl">{service.icon}</span>
                      <div>
                        <div className="text-xs font-mono text-slate-400 mb-1">ID: {service.id}</div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white mb-2">{service.name}</div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </td>

                  {/* Scope Column */}
                  <td className="border border-slate-300 dark:border-border-dark p-6 align-top">
                    {/* Included */}
                    <div className="mb-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Included
                      </h4>
                      <ul className="space-y-2">
                        {service.included.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Not Included */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        Not Included
                      </h4>
                      <ul className="space-y-2">
                        {service.notIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <span className="text-slate-400 mt-0.5 flex-shrink-0">×</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>

                  {/* Pricing Column */}
                  <td className="border border-slate-300 dark:border-border-dark p-6 align-top">
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">{service.price}</div>
                        <div className="text-xs uppercase tracking-wide text-slate-500">{service.priceType}</div>
                      </div>
                      <a
                        href={`/contact?service=${encodeURIComponent(service.name)}`}
                        className="w-full px-6 py-3 bg-white dark:bg-surface-dark border-2 border-slate-200 dark:border-border-dark hover:border-primary hover:bg-primary hover:text-white text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider rounded-lg transition-all text-center flex items-center justify-center gap-2"
                      >
                        Get Started
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center p-8 bg-slate-50 dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Need a Custom Solution?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Looking for something specific? We can create a tailored package that fits your unique requirements.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all"
          >
            Contact Our Team
            <span className="material-symbols-outlined">chat</span>
          </a>
        </div>
      </div>
    </main>
  );
}
