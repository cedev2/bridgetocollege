import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    CheckCircle, 
    DollarSign, 
    GraduationCap, 
    Star, 
    Quote,
    ChevronRight,
    MapPin,
    ArrowRight
} from 'lucide-react';
import { apiFetch, getImageUrl } from '../utils/api';

const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        // Parse the number (e.g., "100 +" -> 100, "95%" -> 95, "330K +" -> 330)
        const match = end.toString().match(/(\d+(\.\d+)?)/);
        const target = match ? parseFloat(match[1]) : 0;
        const suffix = end.toString().replace(match ? match[0] : '', '');
        
        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * target);
            
            setCount(currentCount);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }, [end, duration]);
    
    // Format if it was "330K +" -> the animated part is 330, suffix is "K +"
    const match = end.toString().match(/(\d+(\.\d+)?)/);
    const suffix = end.toString().replace(match ? match[0] : '', '');
    
    return <span>{count}{suffix}</span>;
};

const SuccessStories = () => {
    const [stats, setStats] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPublicContent();
    }, []);

    const fetchPublicContent = async () => {
        try {
            const response = await apiFetch('get_public_content.php');
            const data = await response.json();
            if (response.ok) {
                setStats(data.stats || []);
                setFeatured(data.featured_testimonials || []);
                setTestimonials(data.testimonials || []);
                setUniversities(data.universities || []);
            }
        } catch (err) {
            console.error('Failed to load success stories:', err);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'Users': return <Users className="w-6 h-6" />;
            case 'CheckCircle': return <CheckCircle className="w-6 h-6" />;
            case 'DollarSign': return <DollarSign className="w-6 h-6" />;
            case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
            default: return <Users className="w-6 h-6" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6"
                    >
                        Success <span className="text-primary-600">Stories</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto mb-16"
                    >
                        Hear from students who achieved their college dreams with our support and guidance.
                    </motion.p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                    {getIcon(stat.icon)}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                                    <CountUp end={stat.value} />
                                </h3>
                                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Stories */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-slate-900">Featured Success Stories</h2>
                        <div className="w-20 h-1.5 bg-primary-600 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {featured.map((story, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-primary-50/50 rounded-3xl p-8 border border-primary-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-xl hover:shadow-primary-500/5 transition-all"
                            >
                                <div className="shrink-0 w-24 h-24 rounded-full bg-primary-200 flex items-center justify-center font-bold text-primary-700 text-2xl overflow-hidden shadow-lg border-4 border-white">
                                    {story.image_path ? (
                                        <img src={getImageUrl(story.image_path)} alt={story.name} className="w-full h-full object-cover" />
                                    ) : story.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{story.name}</h3>
                                            <p className="text-sm font-medium text-primary-600 flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" /> {story.location}
                                            </p>
                                        </div>
                                        <Quote className="w-10 h-10 text-primary-200" />
                                    </div>
                                    <p className="text-slate-700 leading-relaxed italic mb-6">
                                        "{story.content}"
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-600 text-white text-xs font-bold rounded-full">
                                            {story.university}
                                        </div>
                                        <span className="text-xs font-bold text-primary-700 bg-primary-100 px-3 py-1 rounded-lg">Full Scholarship</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-slate-900">What Our Students Say</h2>
                        <div className="w-20 h-1.5 bg-primary-600 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((t, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-primary-200 transition-colors"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                                    ))}
                                </div>
                                <p className="text-slate-600 mb-8 italic flex-1">"{t.content}"</p>
                                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                                        <p className="text-xs text-slate-500">{t.university}{t.year ? `, ${t.year}` : ''}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* University Acceptances */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-slate-900">Where Our Students Get Accepted</h2>
                        <div className="w-20 h-1.5 bg-primary-600 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {universities.map((uni, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center gap-3 aspect-video group cursor-default"
                            >
                                {uni.logo_path ? (
                                    <img src={getImageUrl(uni.logo_path)} alt={uni.name} className="h-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                    <GraduationCap className="w-8 h-8 text-slate-300 group-hover:text-primary-400 transition-colors" />
                                )}
                                <span className="text-xs font-bold text-slate-700">{uni.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SuccessStories;
