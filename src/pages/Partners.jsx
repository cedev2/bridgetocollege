import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    Globe, 
    Award, 
    Building2, 
    ArrowRight, 
    ExternalLink,
    Loader2
} from 'lucide-react';
import { apiFetch, getImageUrl } from '../utils/api';
import SEO from '../components/SEO.jsx';

const Partners = () => {
    const [partners, setPartners] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiFetch('get_public_content.php');
                const data = await response.json();
                if (response.ok) {
                    setPartners(data.partners || []);
                    setStats(data.stats || []);
                }
            } catch (error) {
                console.error('Error fetching partners:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const categories = [
        'Rwandan University',
        'Rwandan High School',
        'International University',
        'Scholarship & Funding',
        'Educational Organization'
    ];

    const getPartnersByCategory = (category) => {
        return partners.filter(p => p.category === category);
    };

    const partnerStats = [
        { label: 'University Partners', value: partners.filter(p => p.category.includes('University')).length, icon: Award, color: 'text-primary-500', bg: 'bg-primary-50' },
        { label: 'Countries', value: '15+', icon: Globe, color: 'text-sky-500', bg: 'bg-sky-50' },
        { label: 'Scholarship Programs', value: partners.filter(p => p.category === 'Scholarship & Funding').length, icon: ArrowRight, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Educational Organizations', value: partners.filter(p => p.category === 'Educational Organization').length, icon: Building2, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
                    <p className="text-slate-500 font-medium animate-pulse">Loading Our Network...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <SEO 
                title="Our Global Network & Partners" 
                description="Explore our extensive network of partner universities and educational organizations in Rwanda and worldwide. We collaborate with leading institutions to provide students with premier scholarship and higher education opportunities." 
                keywords="University Partners Rwanda, International Education Network, Scholarship Providers, Rwandan High Schools"
            />
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            Our Global Network
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-6 leading-tight"
                        >
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-sky-400">Partners</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-600 font-medium leading-relaxed"
                        >
                            We work with leading universities, organizations, and institutions worldwide to provide our students with the best opportunities for higher education.
                        </motion.p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
                        {partnerStats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center group hover:shadow-xl hover:-translate-y-1 transition-all"
                            >
                                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                                    <stat.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-display font-black text-slate-900 mb-1">{stat.value}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl opacity-50" />
            </section>

            {/* Partners List Sections */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
                    {categories.map((category, catIdx) => {
                        const filtered = getPartnersByCategory(category);
                        return (
                            <div key={category} id={category.toLowerCase().replace(/ /g, '-')}>
                                <div className="flex items-center gap-6 mb-12">
                                    <h2 className="text-3xl font-display font-bold text-slate-900 whitespace-nowrap">
                                        {category} Partners
                                    </h2>
                                    <div className="h-px bg-slate-100 flex-1" />
                                </div>

                                {filtered.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                        {filtered.map((partner, pIdx) => (
                                            <motion.a
                                                key={partner.id}
                                                href={partner.website_url || '#'}
                                                target={partner.website_url ? "_blank" : "_self"}
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: pIdx * 0.05 }}
                                                className="group bg-slate-50/50 p-8 rounded-3xl border border-slate-100 hover:bg-white hover:border-primary-100 hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center text-center relative"
                                            >
                                                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                                                    {partner.logo_path ? (
                                                        <img 
                                                            src={getImageUrl(partner.logo_path)} 
                                                            alt={partner.name} 
                                                            className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                                        />
                                                    ) : (
                                                        <Building2 className="w-10 h-10 text-slate-300 group-hover:text-primary-500" />
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-slate-700 group-hover:text-primary-600 transition-colors">
                                                    {partner.name}
                                                </span>
                                                {partner.website_url && (
                                                    <ExternalLink className="absolute top-4 right-4 w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                )}
                                            </motion.a>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-slate-50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                                        <p className="text-slate-400 font-medium">No {category.toLowerCase()} partners listed yet. Please check back soon.</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-primary-50/50 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden border border-primary-100/50">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mb-6">Become Our Partner</h2>
                            <p className="text-slate-600 font-medium mb-10 leading-relaxed">
                                Are you an educational institution, organization, or scholarship provider interested in partnering with us? Help us to expose collaborative opportunities that benefit students.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a 
                                    href="/contact" 
                                    className="px-10 py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-xl shadow-primary-600/20 hover:bg-primary-700 transition-all flex items-center gap-2 group"
                                >
                                    Partner With Us
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a 
                                    href="/contact" 
                                    className="px-10 py-4 text-slate-600 font-bold hover:text-primary-600 transition-colors"
                                >
                                    Learn About Our Mission
                                </a>
                            </div>
                        </div>
                        
                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-200/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Partners;
