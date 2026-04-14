import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, LogOut, RefreshCw } from 'lucide-react';

const SessionModal = ({ isOpen, onConfirm, onLogout }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
                    >
                        <div className="p-8 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-amber-600 animate-bounce">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            
                            <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Session Activity Ended</h2>
                            <p className="text-slate-600 mb-8 px-4 leading-relaxed">
                                You have been inactive for 30 minutes. For your security, your session has expired.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <button
                                    onClick={onConfirm}
                                    className="flex-1 py-4 px-6 rounded-2xl bg-primary-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20"
                                >
                                    Login Again <RefreshCw className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={onLogout}
                                    className="flex-1 py-4 px-6 rounded-2xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                                >
                                    Dismiss <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Decorative Bottom Bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SessionModal;
