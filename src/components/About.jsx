import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Award } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <img
                                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=500"
                                    alt="University campus"
                                    className="rounded-3xl shadow-lg"
                                />
                                <div className="bg-accent-400 p-8 rounded-3xl text-primary-900">
                                    <p className="text-4xl font-display font-bold mb-2">95%</p>
                                    <p className="font-semibold text-sm uppercase tracking-wider">Success Rate</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-primary-600 p-8 rounded-3xl text-white">
                                    <p className="text-4xl font-display font-bold mb-2">169+</p>
                                    <p className="font-semibold text-sm uppercase tracking-wider">Students Helped</p>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=500"
                                    alt="Students studying"
                                    className="rounded-3xl shadow-lg"
                                />
                            </div>
                        </div>
                        {/* Background decorative blob */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-50 rounded-full blur-3xl opacity-50" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl lg:text-5xl mb-8 leading-tight">
                            Empowering the Next Generation of <span className="text-primary-600">Global Leaders</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            At Bridge to College, we believe that education is the ultimate equalizer. Our mission is to bridge the gap between talented students and world-class educational opportunities.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary-600 shrink-0">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-1">Integrity First</h4>
                                    <p className="text-slate-500">We provide honest, transparent guidance that puts the student's best interest first.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary-600 shrink-0">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-1">Tailored Excellence</h4>
                                    <p className="text-slate-500">Every student is unique. Our strategies are customized to individual strengths and goals.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary-600 shrink-0">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-1">Proven Results</h4>
                                    <p className="text-slate-500">Our track record speaks for itself with hundreds of successful placements.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
