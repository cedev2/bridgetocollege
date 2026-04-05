import React from 'react';
import { motion } from 'framer-motion';
import { 
    GraduationCap, Globe, PenTool, MessageSquare, 
    Clipboard, Search, Check,
    Clock, FileText, Users, Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <section id="services" className="py-24 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6"
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed"
                    >
                        Comprehensive college application support tailored to your unique goals and aspirations.
                    </motion.p>
                </div>

                {/* Primary Services Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Rwandan Universities */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-emerald-50/40 rounded-[2.5rem] p-10 lg:p-12 border border-emerald-100 flex flex-col h-full hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
                    >
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-emerald-600">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Application to Rwandan Universities</h3>
                        <p className="text-slate-600 mb-8 font-medium">Expert guidance for local university applications and requirements.</p>
                        
                        <ul className="space-y-4 mb-10 flex-grow">
                            {[
                                "University selection guidance",
                                "Application form assistance",
                                "Document preparation",
                                "Scholarship opportunities",
                                "Deadline management"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-600">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                        <Check className="w-3 h-3 stroke-[3]" />
                                    </div>
                                    <span className="text-sm font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {["UR", "RP", "UKA", "AU", "and more"].map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-white/80 rounded-lg text-xs font-bold text-emerald-700 border border-emerald-100/50">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <Link 
                            to="/apply"
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-center hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                        >
                            Get Started
                        </Link>
                    </motion.div>

                    {/* U.S. Based Colleges */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-cyan-50/40 rounded-[2.5rem] p-10 lg:p-12 border border-cyan-100 flex flex-col h-full hover:shadow-xl hover:shadow-cyan-500/5 transition-all"
                    >
                        <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-8 text-cyan-600">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Application to U.S Based Colleges and Elsewhere</h3>
                        <p className="text-slate-600 mb-8 font-medium">Navigate the complex U.S. application process with confidence.</p>
                        
                        <ul className="space-y-4 mb-10 flex-grow">
                            {[
                                "Common Application support",
                                "College list development",
                                "Financial aid guidance",
                                "Visa application support"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-600">
                                    <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                                        <Check className="w-3 h-3 stroke-[3]" />
                                    </div>
                                    <span className="text-sm font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {["Ivy League", "Liberal Arts", "State Schools", "Community Colleges"].map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-white/80 rounded-lg text-xs font-bold text-cyan-700 border border-cyan-100/50">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <Link 
                            to="/apply"
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-center hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                        >
                            Get Started
                        </Link>
                    </motion.div>
                </div>

                {/* Specialized Services Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {[
                        {
                            title: "Essay Support",
                            icon: <PenTool className="w-6 h-6" />,
                            color: "text-amber-600",
                            bg: "bg-amber-50",
                            desc: "Craft compelling personal statements and supplemental essays that showcase your unique story.",
                            items: ["Brainstorming sessions", "Multiple draft revisions", "Grammar & style editing"]
                        },
                        {
                            title: "Interview Prep",
                            icon: <MessageSquare className="w-6 h-6" />,
                            color: "text-purple-600",
                            bg: "bg-purple-50",
                            desc: "Build confidence and communication skills for college admission interviews.",
                            items: ["Mock interview sessions", "Question preparation", "Body language coaching"]
                        },
                        {
                            title: "Common App Help",
                            icon: <Clipboard className="w-6 h-6" />,
                            color: "text-rose-600",
                            bg: "bg-rose-50",
                            desc: "Navigate the Common Application platform with expert guidance and support.",
                            items: ["Platform walkthrough", "Activity list optimization", "Submission strategy"]
                        },
                        {
                            title: "Scholarship Search",
                            icon: <Search className="w-6 h-6" />,
                            color: "text-blue-600",
                            bg: "bg-blue-50",
                            desc: "Find and apply for scholarships to make your education more affordable.",
                            items: ["Scholarship database access", "Application assistance", "Deadline tracking"]
                        }
                    ].map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
                        >
                            <div className={`w-12 h-12 ${service.bg} ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                                {service.icon}
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                            <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">{service.desc}</p>
                            <ul className="space-y-3 pt-6 border-t border-slate-50">
                                {service.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                        <div className="w-1 h-1 rounded-full bg-slate-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Our Process Section */}
                <div className="bg-white rounded-[3rem] p-12 lg:p-20 border border-slate-100 shadow-xl shadow-slate-200/20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-slate-900">Our Process</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-[2.25rem] left-[15%] right-[15%] h-px bg-slate-100 -z-10" />
                        
                        {[
                            {
                                step: "1",
                                title: "Initial Consultation",
                                icon: <Clock className="w-5 h-5" />,
                                bg: "bg-emerald-100 text-emerald-600",
                                desc: "We assess your goals, background, and create a personalized plan."
                            },
                            {
                                step: "2",
                                title: "Application Strategy",
                                icon: <FileText className="w-5 h-5" />,
                                bg: "bg-cyan-100 text-cyan-600",
                                desc: "Develop your college list and application timeline."
                            },
                            {
                                step: "3",
                                title: "Application Support",
                                icon: <Users className="w-5 h-5" />,
                                bg: "bg-amber-100 text-amber-600",
                                desc: "Work together on essays, forms, and interview preparation."
                            },
                            {
                                step: "4",
                                title: "Success & Beyond",
                                icon: <Trophy className="w-5 h-5" />,
                                bg: "bg-purple-100 text-purple-600",
                                desc: "Celebrate acceptances and prepare for your college journey."
                            }
                        ].map((process, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center relative"
                            >
                                <div className={`w-12 h-12 ${process.bg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-current/10 relative z-10`}>
                                    {process.icon}
                                </div>
                                <h5 className="font-bold text-slate-900 mb-3">{process.step}. {process.title}</h5>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">{process.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
