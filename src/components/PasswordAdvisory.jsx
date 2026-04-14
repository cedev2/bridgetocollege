import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Key, X, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { apiFetch } from '../utils/api';

const PasswordAdvisory = ({ user, onSuccess }) => {
    const [dismissed, setDismissed] = useState(false);

    // Automatically trigger dismissal in background so it never shows again
    useEffect(() => {
        const autoDismiss = async () => {
            try {
                await apiFetch('dismiss_password_advisory.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id })
                });
                // Update local storage so we don't show it again in this current session
                const updatedUser = { ...user, requires_password_change: false };
                localStorage.setItem('btc_user', JSON.stringify(updatedUser));
                onSuccess(updatedUser);
            } catch (err) {
                console.error('Auto-dismiss failed:', err);
            }
        };
        autoDismiss();
    }, []);

    const handleDismiss = () => {
        setDismissed(true);
    };

    if (dismissed) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 border border-slate-100 relative overflow-hidden"
            >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
                
                <button 
                    onClick={handleDismiss}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center mb-8 relative z-10">
                    <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-3xl flex items-center justify-center font-bold text-xl mb-6 rotate-12 shadow-inner">
                        <Key className="w-10 h-10 -rotate-12" />
                    </div>
                    
                    <div className="bg-primary-600/10 px-4 py-1.5 rounded-full flex items-center gap-2 mb-4">
                        <ShieldCheck className="w-4 h-4 text-primary-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-700">Security Recommendation</span>
                    </div>

                    <h2 className="text-2xl font-bold font-display text-slate-900 text-center leading-tight">Secure Your Account</h2>
                    <p className="text-sm text-slate-500 font-medium text-center mt-3 px-2">
                        Your account was created by an administrator. For your protection, we advise you to set a custom password.
                    </p>
                </div>

                <div className="space-y-4 relative z-10">
                    <button 
                        onClick={() => {
                            // Close modal and redirect to settings
                            handleDismiss();
                            window.location.href = '/settings';
                        }}
                        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all font-display text-lg"
                    >
                        Change Password Now <ArrowRight className="w-5 h-5" />
                    </button>
                    
                    <button 
                        onClick={handleDismiss}
                        className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors flex items-center justify-center gap-2"
                    >
                        Maybe Later
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-3 bg-slate-50 -mx-8 -mb-8 p-6">
                    <div className="mt-0.5">
                        <Info className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        You can change your password anytime in your account settings. This is a one-time advisory.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default PasswordAdvisory;
