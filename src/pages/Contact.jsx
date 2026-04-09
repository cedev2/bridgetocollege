import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Phone, 
    MessageSquare, 
    Instagram, 
    Clock, 
    MapPin, 
    Send, 
    ArrowRight,
    CheckCircle2,
    Loader2
} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/send_contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
                setFormData({ full_name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                setError(data.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Unable to connect to the server. Please check your connection.');
            console.error('Submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { 
            icon: <Phone className="w-5 h-5 text-primary-600" />, 
            label: 'Phone', 
            value: '+250 791 799 081',
            href: 'tel:+250791799081'
        },
        { 
            icon: <Mail className="w-5 h-5 text-primary-600" />, 
            label: 'Email', 
            value: 'bridgetocollege.rwanda@gmail.com',
            href: 'mailto:bridgetocollege.rwanda@gmail.com'
        },
        { 
            icon: <div className="text-primary-600"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>, 
            label: 'WhatsApp', 
            value: '+250 791 799 081',
            href: 'https://wa.me/250791799081'
        },
        { 
            icon: <Instagram className="w-5 h-5 text-primary-600" />, 
            label: 'Instagram', 
            value: '@bridgetocollege',
            href: 'https://instagram.com/bridgetocollege'
        }
    ];

    const faqs = [
        {
            q: "How quickly do you respond to inquiries?",
            a: "We respond to all inquiries within 24 hours during business days. For urgent matters, WhatsApp is the fastest way to reach us."
        },
        {
            q: "Do you offer free consultations?",
            a: "Yes! We offer a free 15-minute initial consultation to discuss your goals and how we can help you achieve them."
        },
        {
            q: "Can you help with applications outside Rwanda and the U.S.?",
            a: "While we specialize in Rwandan and U.S. applications, we can provide guidance for other countries on a case-by-case basis."
        },
        {
            q: "Do you work with students outside Rwanda?",
            a: "We work with students from across East Africa and beyond through our online services and virtual consultations."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {/* Header */}
                <header className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4"
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
                    >
                        Ready to start your college journey? We're here to help. Reach out to us through any of the channels below.
                    </motion.p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                            <Send className="w-6 h-6 text-primary-600" /> Send Us a Message
                        </h2>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium animate-shake">
                                {error}
                            </div>
                        )}

                        {submitted ? (
                            <div className="text-center py-20 animate-fade-in">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                <p className="text-slate-500 font-medium mb-8">We've received your message and will get back to you within 24 hours.</p>
                                <button 
                                    onClick={() => setSubmitted(false)}
                                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Full Name *</label>
                                        <input 
                                            type="text" 
                                            name="full_name"
                                            required
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Email Address *</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                        <input 
                                            type="text" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+250 XXX XXX XXX"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Subject *</label>
                                        <select 
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all cursor-pointer"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="About Our Services">About Our Services</option>
                                            <option value="Pricing Questions">Pricing Questions</option>
                                            <option value="Schedule Consultation">Schedule Consultation</option>
                                            <option value="Support">Support</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Message *</label>
                                    <textarea 
                                        name="message"
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help you..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" /> Send Message
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-slate-400 font-medium pb-2">We typically respond within 24 hours during business days.</p>
                            </form>
                        )}
                    </motion.div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Info Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                {contactInfo.map((info, idx) => (
                                    <a 
                                        key={idx}
                                        href={info.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{info.label}</p>
                                            <p className="text-sm font-bold text-slate-700 group-hover:text-primary-600 transition-colors">{info.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Office Hours */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary-600" /> Office Hours
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Monday - Friday</span>
                                    <span className="text-slate-900 font-bold">8:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Saturday</span>
                                    <span className="text-slate-900 font-bold">9:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Sunday</span>
                                    <span className="text-slate-400 font-bold">Closed</span>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <p className="text-xs text-slate-400 font-medium italic leading-relaxed">
                                        Emergency Support: Available 24/7 for Premium package clients
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Location */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary-600" /> Location
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">Kigali, Rwanda</h4>
                                    <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                                        We serve students across Rwanda and internationally through our online services.
                                        In-person meetings available in Kigali by appointment.
                                    </p>
                                </div>
                                <a 
                                    href="https://maps.google.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
                                >
                                    View on Google Maps <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>

                         {/* Quick Actions */}
                         <div className="bg-primary-50 rounded-3xl p-6 border border-primary-100">
                             <h3 className="text-sm font-black text-primary-800 uppercase tracking-widest mb-4">Quick Actions</h3>
                             <div className="space-y-3">
                                 {[
                                     { name: 'Chat on WhatsApp', href: 'https://wa.me/250791799081' },
                                     { name: 'Schedule a Call', href: '#' },
                                     { name: 'Send Quick Email', href: 'mailto:bridgetocollege.rwanda@gmail.com' }
                                 ].map((action, i) => (
                                     <a 
                                         key={i}
                                         href={action.href}
                                         className="block w-full py-3 px-4 bg-white hover:bg-primary-600 hover:text-white text-primary-700 font-bold text-sm rounded-xl border border-primary-200 transition-all text-center"
                                     >
                                         {action.name}
                                     </a>
                                 ))}
                             </div>
                         </div>
                    </div>
                </div>

                {/* FAQs */}
                <section className="mt-32">
                     <div className="text-center mb-16">
                         <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                         <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full"></div>
                     </div>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                        {faqs.map((faq, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="space-y-2"
                            >
                                <h4 className="text-lg font-bold text-slate-900">{faq.q}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
