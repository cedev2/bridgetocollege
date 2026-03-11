import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Mail, Phone, GraduationCap, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';

const ApplicationForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        residence: '',
        educationLevel: '',
        targetCountry: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 2000);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <section id="get-started" className="py-24 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl mb-4">Ready to Start Your <span className="text-primary-600">Journey?</span></h2>
                    <p className="text-slate-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="grid md:grid-cols-3">
                        {/* Sidebar info */}
                        <div className="bg-primary-900 p-8 text-white hidden md:block">
                            <h3 className="text-xl font-display font-bold mb-6">Contact Info</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <Phone className="w-5 h-5 text-accent-400 shrink-0" />
                                    <div>
                                        <p className="text-sm text-primary-300">WhatsApp</p>
                                        <p className="font-medium">+250 791 799 081</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Mail className="w-5 h-5 text-accent-400 shrink-0" />
                                    <div>
                                        <p className="text-sm text-primary-300">Email</p>
                                        <p className="font-medium">bridgetocollege.rwanda@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Clock className="w-5 h-5 text-accent-400 shrink-0" />
                                    <div>
                                        <p className="text-sm text-primary-300">Response Time</p>
                                        <p className="font-medium">Within 24 Hours</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-4 bg-primary-800/50 rounded-2xl border border-primary-700">
                                <p className="text-sm text-primary-200 italic">
                                    "Bridge to college helped me get into African Leadership University. Their support was incredible!"
                                </p>
                                <div className="mt-3 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-accent-400 text-primary-900 flex items-center justify-center font-bold text-xs">AM</div>
                                    <div>
                                        <p className="text-xs font-bold">Alice M.</p>
                                        <p className="text-[10px] text-primary-300">Now at ALU</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="md:col-span-2 p-8 lg:p-12">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                                    <User className="w-4 h-4 text-primary-600" /> Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all outline-none"
                                                    placeholder="John Doe"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-primary-600" /> Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all outline-none"
                                                    placeholder="john@example.com"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-primary-600" /> Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all outline-none"
                                                    placeholder="+250 ..."
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-primary-600" /> City of Residence
                                                </label>
                                                <input
                                                    type="text"
                                                    name="residence"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all outline-none"
                                                    placeholder="Kigali"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                                    Target Region
                                                </label>
                                                <select
                                                    name="targetCountry"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all outline-none"
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Region</option>
                                                    <option value="Rwanda">Rwanda</option>
                                                    <option value="USA">United States</option>
                                                    <option value="Europe">Europe</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                                    Current Education Level
                                                </label>
                                                <select
                                                    name="educationLevel"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all outline-none"
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Level</option>
                                                    <option value="High School Senior">High School Senior</option>
                                                    <option value="High School Graduate">High School Graduate</option>
                                                    <option value="University Student">University Student</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">How can we help you?</label>
                                            <textarea
                                                name="message"
                                                rows="4"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all outline-none resize-none"
                                                placeholder="Tell us about your goals..."
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full py-4 rounded-xl bg-primary-600 text-white font-bold text-lg shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Submit Application <ChevronRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Send className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-3xl font-display font-bold mb-4">Application Sent!</h3>
                                        <p className="text-slate-600 mb-8">
                                            Thank you for choosing Bridge to College. We have received your information and will contact you via email or WhatsApp within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="text-primary-600 font-bold hover:underline"
                                        >
                                            Submit another application
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApplicationForm;
