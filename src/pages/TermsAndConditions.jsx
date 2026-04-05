import React from 'react';
import { Scale, Mail } from 'lucide-react';

const TermsAndConditions = () => {
    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Scale className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight">Terms and Conditions</h1>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            Please read these Terms and Conditions carefully before using the Bridge to College website.
                        </p>
                    </header>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/40 border border-slate-100 text-slate-700 leading-relaxed font-medium">
                        
                        <div className="space-y-10">
                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">1. Acceptance of Terms</h2>
                                <p className="text-slate-600">
                                    By accessing and using this website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">2. Use of the Website</h2>
                                <p className="text-slate-600">
                                    You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">3. Intellectual Property</h2>
                                <p className="text-slate-600">
                                    All content on this website is the property of Bridge to College or its licensors and is protected by copyright laws. You may not reproduce or distribute any content without permission.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">4. Limitation of Liability</h2>
                                <p className="text-slate-600">
                                    Bridge to College is not liable for any damages arising from the use or inability to use this website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">5. Changes to Terms</h2>
                                <p className="text-slate-600">
                                    We reserve the right to update these Terms and Conditions at any time. Please review this page periodically for changes.
                                </p>
                            </section>

                            <section className="bg-primary-50 p-8 rounded-2xl border border-primary-100 mt-8">
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4 flex items-center gap-3">
                                    <Mail className="w-6 h-6 text-primary-600" /> 6. Contact
                                </h2>
                                <p className="text-slate-600 mb-4">
                                    If you have any questions about these Terms, please contact us at:
                                </p>
                                <a href="mailto:bridgetocollege.rwanda@gmail.com" className="font-bold text-primary-700 hover:text-primary-800 text-lg">
                                    bridgetocollege.rwanda@gmail.com
                                </a>
                            </section>
                        </div>

                    </div>
                </div>
        </div>
    );
};

export default TermsAndConditions;
