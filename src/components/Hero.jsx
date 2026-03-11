import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, CheckCircle } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/50 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent-100/30 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold mb-6">
                            <GraduationCap className="w-4 h-4" />
                            <span>Your Trusted Partner for Higher Education</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl mb-6 leading-tight">
                            Unlock Your Path to <span className="text-primary-600">Global Education</span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-8 max-w-2xl">
                            We empower Rwandan students to achieve their dreams of higher education in Rwanda, the United States, and beyond through personalized guidance.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#get-started" className="btn-primary flex items-center justify-center gap-2 group">
                                Start Your Application
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#services" className="btn-secondary flex items-center justify-center gap-2">
                                Explore Services
                            </a>
                        </div>

                        <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm font-medium text-slate-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>95% Success Rate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>169+ Students Helped</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1523050335392-9ae8a27d011e?auto=format&fit=crop&q=80&w=1000"
                                alt="Students celebrating graduation"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-400 rounded-2xl -z-10 rotate-12" />
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-600 rounded-full blur-xl opacity-20 -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
