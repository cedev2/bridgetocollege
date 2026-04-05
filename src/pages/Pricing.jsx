import React from 'react';
import { motion } from 'framer-motion';
import { 
    Check, X, Star, Zap, Crown, 
    HelpCircle, Plus, ArrowRight,
    MessageSquare, GraduationCap, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Pricing = () => {
    const usPackages = [
        {
            name: "Essential",
            price: "25,000",
            subtitle: "Basic support for getting started",
            icon: <Star className="w-5 h-5" />,
            color: "emerald",
            features: [
                { name: "Initial consultation (1 hour)", active: true },
                { name: "Common App profile setup", active: true },
                { name: "Account setup assistance", active: true },
                { name: "Basic application guidance", active: true },
                { name: "Initial support", active: true },
                { name: "5 one-on-one sessions", active: false },
                { name: "Unlimited essay reviews", active: false },
                { name: "Interview preparation", active: false },
                { name: "Common App assistance", active: false },
                { name: "Scholarship search support", active: false },
                { name: "WhatsApp support", active: false },
                { name: "Weekly check-ins", active: false },
                { name: "Priority support", active: false },
                { name: "Financial aid optimization", active: false },
                { name: "Post-acceptance guidance", active: false },
                { name: "Family consultation", active: false },
                { name: "24/7 emergency support", active: false }
            ]
        },
        {
            name: "Comprehensive",
            price: "40,000",
            subtitle: "Complete support for your application journey",
            icon: <Zap className="w-5 h-5" />,
            color: "cyan",
            popular: true,
            features: [
                { name: "Initial consultation (1 hour)", active: true },
                { name: "Common App profile setup", active: true },
                { name: "Account setup assistance", active: true },
                { name: "Basic application guidance", active: true },
                { name: "Initial support", active: true },
                { name: "5 one-on-one sessions", active: true },
                { name: "Unlimited essay reviews", active: true },
                { name: "Interview preparation", active: true },
                { name: "Common App assistance", active: true },
                { name: "Scholarship search support", active: true },
                { name: "WhatsApp support", active: true },
                { name: "Weekly check-ins", active: true },
                { name: "Priority support", active: false },
                { name: "Financial aid optimization", active: false },
                { name: "Post-acceptance guidance", active: false },
                { name: "Family consultation", active: false },
                { name: "24/7 emergency support", active: false }
            ]
        },
        {
            name: "Premium",
            price: "60,000",
            subtitle: "VIP treatment with maximum support",
            icon: <Crown className="w-5 h-5" />,
            color: "orange",
            features: [
                { name: "Initial consultation (1 hour)", active: true },
                { name: "Common App profile setup", active: true },
                { name: "Account setup assistance", active: true },
                { name: "Basic application guidance", active: true },
                { name: "Initial support", active: true },
                { name: "5 one-on-one sessions", active: true },
                { name: "Unlimited essay reviews", active: true },
                { name: "Interview preparation", active: true },
                { name: "Common App assistance", active: true },
                { name: "Scholarship search support", active: true },
                { name: "WhatsApp support", active: true },
                { name: "Weekly check-ins", active: true },
                { name: "Priority support", active: true },
                { name: "Financial aid optimization", active: true },
                { name: "Post-acceptance guidance", active: true },
                { name: "Family consultation", active: true },
                { name: "24/7 emergency support", active: true }
            ]
        }
    ];

    const addons = [
        { name: "Extra Essay Review", price: "10,000 RWF", desc: "Additional essay review and feedback session" },
        { name: "Mock Interview", price: "20,000 RWF", desc: "One-on-one interview practice session" },
        { name: "Rush Service", price: "30,000 RWF", desc: "Expedited review within 24 hours" },
        { name: "Parent Consultation", price: "20,000 RWF", desc: "Dedicated session for parents and families" },
        { name: "Rwandan Universities Application", price: "5,000 RWF", desc: "Complete application support for local universities" }
    ];

    const faqs = [
        { q: "What's included in the initial consultation?", a: "We'll assess your academic background, goals, and create a personalized college application strategy." },
        { q: "Do you offer payment plans?", a: "Yes, we offer flexible payment plans to make our services accessible to all families." },
        { q: "Can I upgrade my package later?", a: "Yes! You can upgrade at any time and we'll credit what you've already paid." },
        { q: "What if I'm not satisfied?", a: "We offer a 30-day satisfaction guarantee. If you're not happy, we'll work to make it right." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {/* Header */}
                <header className="text-center mb-16 px-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6"
                    >
                        Transparent Pricing
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
                    >
                        Choose the package that best fits your needs. All packages include personalized support and expert guidance.
                    </motion.p>
                </header>

                {/* International Section */}
                <section className="mb-32">
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center gap-3 px-6 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                            <Globe className="w-5 h-5 text-cyan-600" />
                            <h2 className="text-lg font-bold text-slate-800">Applications to U.S.-based Universities and Elsewhere</h2>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {usPackages.map((pkg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className={`bg-white rounded-[2.5rem] p-8 border ${pkg.popular ? 'border-cyan-500 ring-4 ring-cyan-50' : 'border-slate-200'} shadow-sm relative flex flex-col h-full`}
                            >
                                {pkg.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-10">
                                    <div className={`w-12 h-12 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                                        pkg.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                                        pkg.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' : 'bg-orange-50 text-orange-600'
                                    }`}>
                                        {pkg.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">Application to U.S.-based Universities and Elsewhere - {pkg.name}</h3>
                                    <div className="flex items-end justify-center gap-1.5 my-6">
                                        <span className="text-4xl font-black text-slate-900">{pkg.price}</span>
                                        <span className="text-slate-500 font-bold mb-1">RWF</span>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium">{pkg.subtitle}</p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow pt-8 border-t border-slate-100">
                                    {pkg.features.map((feat, i) => (
                                        <li key={i} className={`flex items-start gap-3 text-sm ${feat.active ? 'text-slate-700' : 'text-slate-300'}`}>
                                            {feat.active ? (
                                                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                                    pkg.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 
                                                    pkg.color === 'cyan' ? 'bg-cyan-100 text-cyan-600' : 'bg-orange-100 text-orange-600'
                                                }`}>
                                                    <Check className="w-3 h-3 stroke-[3]" />
                                                </div>
                                            ) : (
                                                <div className="mt-0.5 w-5 h-5 flex items-center justify-center shrink-0">
                                                    <X className="w-4 h-4 text-slate-200" />
                                                </div>
                                            )}
                                            <span className={feat.active ? 'font-medium' : 'font-medium line-through decoration-slate-200'}>{feat.name}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link 
                                    to="/apply"
                                    className={`w-full py-4 rounded-2xl font-bold text-center transition-all ${
                                        pkg.color === 'emerald' ? 'bg-slate-900 text-white hover:bg-slate-800' : 
                                        pkg.color === 'cyan' ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'bg-orange-500 text-white hover:bg-orange-600'
                                    }`}
                                >
                                    Choose {pkg.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Rwandan Section */}
                <section className="mb-32">
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center gap-3 px-6 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                            <GraduationCap className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-lg font-bold text-slate-800">Applications to Rwandan Universities</h2>
                        </div>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] p-10 lg:p-12 border-2 border-emerald-500 ring-8 ring-emerald-50 shadow-sm text-center"
                        >
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Application to Rwandan Universities</h3>
                            <div className="flex items-end justify-center gap-1.5 my-6">
                                <span className="text-4xl font-black text-slate-900">5,000</span>
                                <span className="text-slate-500 font-bold mb-1">RWF</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium mb-10">Complete application support for local universities</p>

                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-left max-w-xl mx-auto mb-12 py-8 border-y border-slate-100">
                                {[
                                    "Guidance on university selection",
                                    "Application form assistance",
                                    "Document preparation",
                                    "Submission support",
                                    "Follow-up assistance"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                            <Check className="w-3 h-3 stroke-[3]" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <Link 
                                to="/apply"
                                className="inline-block px-12 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                            >
                                Choose Rwandan Universities
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Add-ons Section */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Add-on Services</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {addons.map((addon, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all"
                            >
                                <h4 className="text-lg font-bold text-slate-900 mb-2">{addon.name}</h4>
                                <div className="text-2xl font-black text-primary-600 mb-3">{addon.price}</div>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{addon.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-white rounded-[3rem] p-12 lg:p-20 border border-slate-100 shadow-xl shadow-slate-200/10">
                    <div className="text-center mb-16">
                        <HelpCircle className="w-12 h-12 text-primary-600 mx-auto mb-6" />
                        <h2 className="text-3xl font-display font-bold text-slate-900">Frequently Asked Questions</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="space-y-3"
                            >
                                <h4 className="text-lg font-bold text-slate-900">{faq.q}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Pricing;
