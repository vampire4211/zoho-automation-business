import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 text-primary">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M24 4L44 24L24 44L4 24L24 4ZM24 16L32 24L24 32L16 24L24 16Z" fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-lg font-bold tracking-tight text-deep-navy dark:text-white">The Clear Architect</span>
                        </div>
                        <p className="text-slate-gray dark:text-slate-400 text-sm leading-relaxed">
                            Engineering clarity from chaos. We build the automated systems that power tomorrow&apos;s market leaders.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-deep-navy dark:text-white">Services</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link className="text-sm text-slate-gray dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="/services">Workflow Automation</Link></li>
                            <li><Link className="text-sm text-slate-gray dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">System Integration</Link></li>
                            <li><Link className="text-sm text-slate-gray dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Data Consulting</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-deep-navy dark:text-white">Company</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link className="text-sm text-slate-gray dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="/about">About Us</Link></li>
                            <li><Link className="text-sm text-slate-gray dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="/careers">Careers</Link></li>
                            <li><Link className="text-sm text-slate-gray dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-deep-navy dark:text-white">Connect</h4>
                        <div className="flex gap-4">
                            <Link className="w-10 h-10 rounded-full border border-slate-200 dark:border-border-dark flex items-center justify-center text-slate-gray dark:text-slate-300 hover:border-primary hover:text-primary transition-all" href="#">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                            </Link>
                            <Link className="w-10 h-10 rounded-full border border-slate-200 dark:border-border-dark flex items-center justify-center text-slate-gray dark:text-slate-300 hover:border-primary hover:text-primary transition-all" href="#">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 dark:border-border-dark gap-4">
                    <p className="text-xs text-slate-gray dark:text-slate-400">
                        © 2024 The Clear Architect. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link className="text-xs text-slate-gray dark:text-slate-400 hover:text-primary" href="#">Privacy Policy</Link>
                        <Link className="text-xs text-slate-gray dark:text-slate-400 hover:text-primary" href="/terms">Terms and Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
