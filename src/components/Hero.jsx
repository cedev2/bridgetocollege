import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, GraduationCap, CheckCircle } from 'lucide-react';

const Hero = ({ user }) => {
    const images = ['/bg1.jpg', '/bg2.jpg', '/bg3.jpg', '/bg4.jpg'];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <section id="home" className="relative z-0 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Slider Background */}
            <div className="absolute inset-0 -z-20 w-full h-full bg-slate-900 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        alt="Background Slider"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-slate-900/70 -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-8">
                            <GraduationCap className="w-4 h-4" />
                            <span>Your Trusted Partner for Higher Education</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl mb-8 leading-tight font-display font-bold text-white drop-shadow-xl">
                            Unlock Your Path to <br /><span className="text-primary-400">Global Education</span>
                        </h1>

                        <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
                            We empower Rwandan students to achieve their dreams of higher education in Rwanda, the United States, and beyond through personalized guidance.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={user ? (user.role === 'admin' ? "/admin-dashboard" : "/dashboard") : "/register"} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                {user ? (user.role === 'admin' ? "View Admin Dashboard" : "View My Dashboard") : "Start Your Application"}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href="/#services" className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                                Explore Services
                            </a>
                        </div>

                        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-200 bg-black/20 w-fit mx-auto px-8 py-4 rounded-3xl backdrop-blur-md border border-white/10">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>95% Success Rate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>169+ Students Helped</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
