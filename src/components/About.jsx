import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Award, Users, Phone, Loader2 } from 'lucide-react';

const About = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await fetch('http://localhost/brigdetocollege/backend/get_staff.php');
                const data = await response.json();
                if (data.success) {
                    setStaff(data.staff);
                }
            } catch (error) {
                console.error('Error fetching staff:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6"
                    >
                        About Bridge to College
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Empowering students to achieve their higher education dreams through personalized guidance and expert support.
                    </motion.p>
                </div>

                {/* Founder's Story Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">Our Founder's Story</h2>
                        <div className="space-y-6 text-slate-600 leading-relaxed">
                            <p>
                                Bridge to College was founded with a simple yet powerful vision: to make quality higher education 
                                accessible to every ambitious student, regardless of their background or circumstances.
                            </p>
                            <p>
                                Having navigated the complex world of college applications myself, I understand the challenges 
                                students face - from understanding requirements to crafting compelling essays and preparing 
                                for interviews.
                            </p>
                            <p>
                                Our mission is to bridge the gap between dreams and reality, providing the guidance and support 
                                that every student deserves on their journey to higher education.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-emerald-50/50 rounded-[2.5rem] p-12 text-center border border-emerald-100/50 relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                                <Users className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Founded in 2024</h3>
                            <p className="text-slate-500">With a passion for education and student success</p>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl" />
                    </motion.div>
                </div>

                {/* Mission & Values Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <h2 className="text-3xl font-display font-bold text-slate-900 mb-12">Our Mission & Values</h2>
                    <div className="max-w-5xl mx-auto space-y-8 text-left bg-slate-50/50 p-8 lg:p-12 rounded-[2rem] border border-slate-100">
                        <p className="text-slate-700 leading-relaxed">
                            <strong className="text-slate-900">Mission:</strong> To support students in Rwanda through personalized mentorship, essay coaching, admissions advising, and scholarship application support — guiding them step by step from crafting to submitting competitive university applications.
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            <strong className="text-slate-900">Vision:</strong> To create equitable access to higher education opportunities for every motivated Rwandan student, regardless of background or income.
                        </p>
                        <p className="text-slate-700 italic border-t border-slate-200 pt-8 mt-8">
                            "Our commitment is to bridge the gap between dreams and reality, providing the guidance and support that every student deserves on their journey to higher education."
                        </p>
                    </div>
                </motion.div>

                {/* Meet Our Team Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-display font-bold text-slate-900 mb-16">Meet Our Team</h2>
                    
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {staff.map((member, index) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group flex flex-col items-center text-center"
                                >
                                    <div className="w-28 h-28 rounded-full overflow-hidden mb-8 ring-8 ring-slate-50 group-hover:ring-primary-50 transition-all shadow-inner">
                                        <img 
                                            src={member.image_path ? `http://localhost/brigdetocollege/${member.image_path}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&background=random`} 
                                            alt={member.full_name} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">{member.full_name}</h3>
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-6 border border-slate-100/50">
                                        {member.role}
                                    </div>
                                    <p className="text-slate-500/80 leading-relaxed text-sm mb-8 max-w-[240px]">
                                        {member.description}
                                    </p>
                                    
                                    {member.phone && (
                                        <div className="text-slate-400 text-sm font-medium mb-8">
                                            {member.phone}
                                        </div>
                                    )}

                                    {member.tags && (
                                        <div className="flex flex-wrap justify-center gap-3 mt-auto">
                                            {member.tags.split(',').map((tag, i) => (
                                                <span key={i} className="px-3.5 py-1.5 bg-white text-slate-500 rounded-xl text-[10px] font-bold border border-slate-100 shadow-sm uppercase tracking-wider">
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default About;
