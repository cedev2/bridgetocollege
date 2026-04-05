import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Preloader = ({ isLoading }) => {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center h-screen w-screen"
                    id="preloader"
                >
                    <div className="relative">
                        {/* Outer Glow */}
                        <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-2xl animate-pulse" />
                        
                        {/* Spinning Circle */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-24 h-24 border-4 border-slate-100 border-t-primary-600 rounded-full shadow-lg shadow-primary-500/10"
                        />
                        
                        {/* Center Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden shadow-inner p-1">
                                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
                            </div>
                        </div>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-center"
                    >
                        <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">
                            Bridge to <span className="text-primary-600">College</span>
                        </h2>
                        <div className="mt-2 flex gap-1 justify-center">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-1.5 h-1.5 rounded-full bg-primary-600"
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
