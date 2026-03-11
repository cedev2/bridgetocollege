import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe, PenTool, Users, FileCheck, Search } from 'lucide-react';

const services = [
    {
        title: 'Rwandan University Applications',
        description: 'Expert guidance for local university applications and admission requirements in Rwanda.',
        icon: <BookOpen className="w-8 h-8 text-primary-600" />,
        color: 'bg-blue-50',
    },
    {
        title: 'U.S. & International Applications',
        description: 'Navigate the complex U.S. and international application process with professional support.',
        icon: <Globe className="w-8 h-8 text-primary-600" />,
        color: 'bg-indigo-50',
    },
    {
        title: 'Essay & Interview Prep',
        description: 'Perfect your essays and ace your interviews with our expert coaching and feedback.',
        icon: <PenTool className="w-8 h-8 text-primary-600" />,
        color: 'bg-amber-50',
    },
    {
        title: 'Common App Assistance',
        description: 'Complete setup and guidance for your Common Application account and profile.',
        icon: <FileCheck className="w-8 h-8 text-primary-600" />,
        color: 'bg-green-50',
    },
    {
        title: 'Scholarship Search',
        description: 'Identify and apply for scholarships that match your profile and financial needs.',
        icon: <Search className="w-8 h-8 text-primary-600" />,
        color: 'bg-purple-50',
    },
    {
        title: 'Personalized Strategy',
        description: 'A custom roadmap tailored to your academic goals and career aspirations.',
        icon: <Users className="w-8 h-8 text-primary-600" />,
        color: 'bg-rose-50',
    },
];

const Services = () => {
    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl mb-4"
                    >
                        Comprehensive Support for Your <span className="text-primary-600">Journey</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-lg max-w-2xl mx-auto"
                    >
                        We provide every tool and resource you need to navigate the path to higher education successfully.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
                        >
                            <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-display font-bold mb-4 text-slate-900">{service.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
