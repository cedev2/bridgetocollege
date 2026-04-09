import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Loader2, Key } from 'lucide-react';

const ForcePasswordChange = ({ user, onSuccess }) => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 8) {
            return setError('Password must be at least 8 characters long.');
        }

        if (password !== confirm) {
            return setError('Passwords do not match.');
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/change_password.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ new_password: password })
            });

            const data = await response.json();

            if (response.ok) {
                // Update local storage to remove the flag
                const updatedUser = { ...user, requires_password_change: false };
                localStorage.setItem('btc_user', JSON.stringify(updatedUser));
                onSuccess(updatedUser);
            } else {
                setError(data.error || 'Failed to update password.');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-100"
            >
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-xl mb-4 relative">
                        <Lock className="w-8 h-8" />
                        <div className="absolute -bottom-1 -right-1 bg-amber-400 p-1.5 rounded-full border-2 border-white">
                            <Key className="w-3 h-3 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold font-display text-slate-900 text-center">Action Required</h2>
                    <p className="text-sm text-slate-500 font-medium text-center mt-2">
                        Your account was created by an administrator. For security reasons, you must set a new password before accessing your dashboard.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold animate-shake text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">New Password *</label>
                        <input 
                            type="password" 
                            required
                            placeholder="At least 8 characters"
                            className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Confirm Password *</label>
                        <input 
                            type="password" 
                            required
                            placeholder="Type it again"
                            className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-medium"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 mt-6 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all font-display text-lg"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><ShieldCheck className="w-6 h-6" /> Secure My Account</>}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ForcePasswordChange;
