import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Key, ArrowRight, ShieldCheck, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = ({ onLogin }) => {
    // view can be: 'login' | 'forgot_request' | 'forgot_reset' | 'forgot_success'
    const [view, setView] = useState('login');
    
    // Login form state
    const [formData, setFormData] = useState({ email: '', password: '' });
    
    // Forgot password state
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotCode, setForgotCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    // Shared UI state
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    // 1. Handle standard login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                const userSession = { ...data.user, token: data.token };
                onLogin(userSession);

                if (userSession.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Could not connect to server.');
        } finally {
            setLoading(false);
        }
    };

    // 2. Handle request for reset code
    const handleRequestReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/request_reset.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail })
            });

            const data = await response.json();

            if (response.ok) {
                // Secret dev hint if we passed it back, since mail might not work in local XAMPP
                if (data._dev_code) {
                    console.log("DEV HINT: Your reset code is", data._dev_code);
                    localStorage.setItem('dev_reset_code', data._dev_code); // Optional helper for dev
                }
                setSuccessMsg(data.message);
                setView('forgot_reset'); 
            } else {
                setError(data.error || 'Failed to request reset.');
            }
        } catch (err) {
            setError('Could not connect to server.');
        } finally {
            setLoading(false);
        }
    };

    // 3. Handle actual password reset submission
    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (newPassword.length < 8) {
            setLoading(false);
            return setError('Password must be at least 8 characters long.');
        }

        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/reset_password.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: forgotEmail, 
                    code: forgotCode,
                    new_password: newPassword 
                })
            });

            const data = await response.json();

            if (response.ok) {
                setView('forgot_success');
            } else {
                setError(data.error || 'Failed to reset password.');
            }
        } catch (err) {
            setError('Could not connect to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center relative bg-slate-50 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <AnimatePresence mode="wait">
                    {/* --- LOGIN VIEW --- */}
                    {view === 'login' && (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 lg:p-12"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md mx-auto mb-4 border border-slate-100">
                                    <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                                </div>
                                <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Welcome Back</h1>
                                <p className="text-slate-500 font-medium">Sign in to manage your college application.</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-shake">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLoginSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary-600" /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-medium"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                            <Lock className="w-4 h-4 text-primary-600" /> Password
                                        </label>
                                        <button 
                                            type="button"
                                            onClick={() => { setError(''); setView('forgot_request'); }}
                                            className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-medium"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-2xl bg-primary-600 text-white font-bold text-lg shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Sign In <LogIn className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>

                            <p className="mt-8 text-center text-slate-500 font-medium">
                                Don't have an account? <Link to="/register" className="text-primary-600 font-bold hover:underline">Register now</Link>
                            </p>
                        </motion.div>
                    )}

                    {/* --- FORGOT PASSWORD REQUEST VIEW --- */}
                    {view === 'forgot_request' && (
                        <motion.div
                            key="forgot_request"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 lg:p-12 relative overflow-hidden"
                        >
                            <button 
                                onClick={() => { setError(''); setView('login'); }}
                                className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 text-sm font-bold"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            
                            <div className="text-center mb-8 mt-6">
                                <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-[2rem] flex items-center justify-center font-bold text-xl mb-4 mx-auto rotate-12">
                                    <Key className="w-8 h-8 -rotate-12" />
                                </div>
                                <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Reset Password</h1>
                                <p className="text-slate-500 font-medium">Enter your email and we'll send you a 6-digit verification code.</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-shake">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleRequestReset} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary-600" /> Account Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-medium"
                                        placeholder="your@email.com"
                                        value={forgotEmail}
                                        onChange={(e) => setForgotEmail(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Send Reset Code <ArrowRight className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {/* --- FORGOT PASSWORD RESET VIEW --- */}
                    {view === 'forgot_reset' && (
                        <motion.div
                            key="forgot_reset"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 lg:p-12 relative"
                        >
                            <button 
                                onClick={() => { setError(''); setView('forgot_request'); }}
                                className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 text-sm font-bold"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            
                            <div className="text-center mb-8 mt-6">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Create New Password</h1>
                                <p className="text-slate-500 font-medium">We sent a 6-digit code to <br/><b className="text-slate-700">{forgotEmail}</b></p>
                            </div>

                            {successMsg && (
                                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-sm font-bold text-center">
                                    {successMsg}
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-shake">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleResetSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center block">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-display font-bold text-center text-2xl tracking-[1em]"
                                        placeholder="000000"
                                        value={forgotCode}
                                        onChange={(e) => setForgotCode(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>

                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-primary-600" /> New Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-medium"
                                        placeholder="At least 8 characters"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || forgotCode.length !== 6}
                                    className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Set New Password <CheckCircle className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {/* --- SUCCESS VIEW --- */}
                    {view === 'forgot_success' && (
                        <motion.div
                            key="forgot_success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 lg:p-12 text-center"
                        >
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl mb-6 mx-auto">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">Password Updated!</h1>
                            <p className="text-slate-500 font-medium mb-8">Your account password has been successfully reset. You can now log in with your new password.</p>
                            
                            <button
                                onClick={() => {
                                    setFormData({ ...formData, password: '' });
                                    setView('login');
                                }}
                                className="w-full py-4 rounded-2xl bg-primary-600 text-white font-bold text-lg shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all"
                            >
                                Go to Login
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Login;
