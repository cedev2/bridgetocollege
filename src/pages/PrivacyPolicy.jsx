import React from 'react';
import { Shield, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            Your privacy is important to us. This Privacy Policy explains how Bridge to College collects, uses, and protects your information when you use our website.
                        </p>
                    </header>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/40 border border-slate-100 text-slate-700 leading-relaxed font-medium">
                        
                        <div className="space-y-12">
                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">Information We Collect</h2>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li>Personal information you provide (such as name, email address, etc.)</li>
                                    <li>Usage data (such as pages visited, time spent on site, etc.)</li>
                                    <li>Cookies and similar tracking technologies</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">How We Use Your Information</h2>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li>To provide and maintain our services</li>
                                    <li>To improve and personalize your experience</li>
                                    <li>To communicate with you about updates or offers</li>
                                    <li>To analyze website usage and trends</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">Information Sharing</h2>
                                <p className="text-slate-600">
                                    We do not sell or rent your personal information. We may share information with trusted third parties who assist us in operating our website, as required by law, or to protect our rights.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">Your Choices</h2>
                                <p className="text-slate-600">
                                    You can choose to disable cookies through your browser settings. You may also contact us to update or delete your personal information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">Security</h2>
                                <p className="text-slate-600">
                                    We take reasonable measures to protect your information, but no method of transmission over the Internet is 100% secure.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">Changes to This Policy</h2>
                                <p className="text-slate-600">
                                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
                                </p>
                            </section>

                            <section className="bg-primary-50 p-8 rounded-2xl border border-primary-100">
                                <h2 className="text-2xl font-bold font-display text-slate-900 mb-4 flex items-center gap-3">
                                    <Mail className="w-6 h-6 text-primary-600" /> Contact Us
                                </h2>
                                <p className="text-slate-600 mb-4">
                                    If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
