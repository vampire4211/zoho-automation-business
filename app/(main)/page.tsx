import { getOrganizationSchema, getServiceSchema } from '@/lib/metadata';

export default function Home() {
  const organizationSchema = getOrganizationSchema();
  const serviceSchema = getServiceSchema();

  return (
    <main className="flex-grow">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="relative py-20 lg:py-32 px-6 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-deep-navy dark:text-white">
                Mastering Complexity through <span className="text-primary">Automation</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-gray dark:text-slate-400 max-w-2xl leading-relaxed">
                Streamline operations and scale efficiently with enterprise-grade workflow solutions designed for the modern global business.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/contact" className="h-14 px-8 bg-primary hover:bg-primary/90 text-white text-base font-bold rounded-md transition-all flex items-center gap-2 border border-transparent">
                Book Audit
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a href="/portfolio" className="h-14 px-8 bg-transparent border border-slate-200 dark:border-slate-700 hover:border-primary text-deep-navy dark:text-white hover:text-primary text-base font-bold rounded-md transition-all flex items-center justify-center">
                View Case Studies
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square w-full flex items-center justify-center p-8">
              <svg className="w-full h-full text-deep-navy dark:text-white" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-label="Automation network visualization diagram">
                <circle cx="200" cy="200" fill="none" r="80" stroke="#1D4ED8" strokeWidth="1.5"></circle>
                <circle cx="200" cy="200" fill="#1D4ED8" r="8"></circle>
                <circle cx="100" cy="120" fill="none" r="40" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"></circle>
                <circle cx="100" cy="120" fill="currentColor" fillOpacity="0.5" r="4"></circle>
                <line stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" x1="128" x2="170" y1="142" y2="176"></line>
                <circle cx="300" cy="120" fill="none" r="40" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"></circle>
                <circle cx="300" cy="120" fill="currentColor" fillOpacity="0.5" r="4"></circle>
                <line stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" x1="272" x2="230" y1="142" y2="176"></line>
                <circle cx="300" cy="280" fill="none" r="40" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"></circle>
                <circle cx="300" cy="280" fill="currentColor" fillOpacity="0.5" r="4"></circle>
                <line stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" x1="272" x2="230" y1="258" y2="224"></line>
                <circle cx="100" cy="280" fill="none" r="40" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"></circle>
                <circle cx="100" cy="280" fill="currentColor" fillOpacity="0.5" r="4"></circle>
                <line stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" x1="128" x2="170" y1="258" y2="224"></line>
                <rect fill="none" height="20" stroke="#64748B" strokeWidth="1" transform="rotate(45 200 40)" width="20" x="190" y="30"></rect>
                <rect fill="none" height="20" stroke="#64748B" strokeWidth="1" transform="rotate(45 200 360)" width="20" x="190" y="350"></rect>
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-border-dark">
            <div className="px-4 flex flex-col items-center md:items-start text-center md:text-left gap-1">
              <span className="text-4xl lg:text-5xl font-bold text-deep-navy dark:text-white tracking-tight">60%</span>
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-gray">Task Reduction</span>
            </div>
            <div className="px-4 flex flex-col items-center md:items-start text-center md:text-left gap-1 pt-8 md:pt-0">
              <span className="text-4xl lg:text-5xl font-bold text-deep-navy dark:text-white tracking-tight">200+</span>
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-gray">Projects Completed</span>
            </div>
            <div className="px-4 flex flex-col items-center md:items-start text-center md:text-left gap-1 pt-8 md:pt-0">
              <span className="text-4xl lg:text-5xl font-bold text-deep-navy dark:text-white tracking-tight">$10M+</span>
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-gray">Saved Globally</span>
            </div>
            <div className="px-4 flex flex-col items-center md:items-start text-center md:text-left gap-1 pt-8 md:pt-0">
              <span className="text-4xl lg:text-5xl font-bold text-deep-navy dark:text-white tracking-tight">24/7</span>
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-gray">Automated Ops</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-deep-navy dark:text-white">Our Methodology</h2>
            <p className="text-slate-gray dark:text-slate-400 text-lg max-w-2xl mx-auto">A systematic approach to identifying bottlenecks and implementing scalable automation architectures.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-slate-200 dark:border-border-dark rounded-lg hover:border-primary transition-colors duration-300">
              <div className="w-16 h-16 mb-6 text-primary">
                <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" aria-label="Audit icon">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-deep-navy dark:text-white">1. Audit</h3>
              <p className="text-slate-gray dark:text-slate-400 leading-relaxed">We analyze your current workflows, identifying inefficiencies and high-value automation opportunities.</p>
            </div>
            <div className="p-8 border border-slate-200 dark:border-border-dark rounded-lg hover:border-primary transition-colors duration-300">
              <div className="w-16 h-16 mb-6 text-primary">
                <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" aria-label="Build icon">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-deep-navy dark:text-white">2. Build</h3>
              <p className="text-slate-gray dark:text-slate-400 leading-relaxed">Our engineers design and deploy custom automation architectures tailored to your specific ecosystem.</p>
            </div>
            <div className="p-8 border border-slate-200 dark:border-border-dark rounded-lg hover:border-primary transition-colors duration-300">
              <div className="w-16 h-16 mb-6 text-primary">
                <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" aria-label="Scale icon">
                  <line x1="12" x2="12" y1="1" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-deep-navy dark:text-white">3. Scale</h3>
              <p className="text-slate-gray dark:text-slate-400 leading-relaxed">We monitor performance and iterate, ensuring your systems grow seamlessly alongside your business.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">Ready to reclaim your time?</h2>
          <div className="flex justify-center">
            <a href="/contact" className="h-14 px-10 bg-white text-primary hover:bg-slate-50 text-base font-bold rounded-md transition-all border-none inline-flex items-center justify-center">
              Schedule Your Free Audit
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
