import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Key, ArrowRight, ShieldCheck, ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiFetch } from '../utils/api';
import SEO from '../components/SEO.jsx';

const Login = ({ onLogin }) => {
    // Persistent view state (survives accidental reloads)
    const [view, setView] = useState(() => {
        return sessionStorage.getItem('btc_login_view') || 'login';
    });
    
    // Auto-save view state
    useEffect(() => {
        sessionStorage.setItem('btc_login_view', view);
    }, [view]);

    // Login form state
    const [formData, setFormData] = useState({ email: '', password: '' });
    
    // Forgot password state
    const [forgotEmail, setForgotEmail] = useState(() => sessionStorage.getItem('btc_forgot_email') || '');
    const [forgotCode, setForgotCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [devHint, setDevHint] = useState('');

    useEffect(() => {
        sessionStorage.setItem('btc_forgot_email', forgotEmail);
    }, [forgotEmail]);
    
    // Shared UI state
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await apiFetch('login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.removeItem('btc_login_view');
                sessionStorage.removeItem('btc_forgot_email');
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

    const handleRequestReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            const response = await apiFetch('request_reset.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail })
            });

            const data = await response.json();

            if (response.ok) {
                // Secret dev hint
                if (data._dev_code) {
                    setDevHint(data._dev_code);
                }
                setSuccessMsg(data.message);
                setView('forgot_reset'); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setError(data.error || 'Failed to request reset.');
            }
        } catch (err) {
            setError('Could not connect to server.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (newPassword.length < 8) {
            setLoading(false);
            return setError('Password must be at least 8 characters long.');
        }

        try {
            const response = await apiFetch('reset_password.php', {
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
                sessionStorage.removeItem('btc_login_view');
                sessionStorage.removeItem('btc_forgot_email');
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />

            <SEO 
                title={view === 'login' ? 'Login' : 'Reset Your Password'} 
                description="Securely access your Bridge to College account." 
            />

            <div className="w-full max-w-md relative z-10">
                <AnimatePresence mode="wait">
                    {view === 'login' && (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 lg:p-12"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md mx-auto mb-4 border border-slate-100">
                                    <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                                </div>
                                <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Welcome Back</h1>
                                <p className="text-slate-500 font-medium font-sans text-sm">Sign in to manage your college application.</p>
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
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-sans font-medium"
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
                                            onClick={() => setView('forgot_request')}
                                            className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-sans font-medium pr-12"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 p-1"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
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

                            <p className="mt-8 text-center text-slate-500 font-medium font-sans text-sm">
                                Don't have an account? <Link to="/register" className="text-primary-600 font-bold hover:underline">Register now</Link>
                            </p>
                        </motion.div>
                    )}

                    {view === 'forgot_request' && (
                        <motion.div
                            key="forgot_request"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 lg:p-12 relative overflow-hidden"
                        >
                            <button 
                                onClick={() => setView('login')}
                                className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 text-sm font-bold"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            
                            <div className="text-center mb-8 mt-6">
                                <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-[2rem] flex items-center justify-center font-bold text-xl mb-4 mx-auto rotate-12">
                                    <Key className="w-8 h-8 -rotate-12" />
                                </div>
                                <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Reset Password</h1>
                                <p className="text-slate-500 font-medium font-sans text-sm">Enter your email for a verification code.</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-shake">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleRequestReset} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Account Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none font-sans font-medium"
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

                    {view === 'forgot_reset' && (
                        <motion.div
                            key="forgot_reset"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 lg:p-12 relative"
                        >
                            <button 
                                onClick={() => setView('forgot_request')}
                                className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 text-sm font-bold"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            
                            <div className="text-center mb-8 mt-6">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h1 className="text-3xl font-display font-bold text-slate-900 mb-2 font-sans">Verify Code</h1>
                                <p className="text-slate-500 font-medium text-xs font-sans">Code sent to <b className="text-slate-700">{forgotEmail}</b></p>
                            </div>

                            {successMsg && (
                                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-xs font-bold text-center justify-center font-sans">
                                    {successMsg}
                                </div>
                            )}

                            {devHint && (
                                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl font-sans">
                                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Testing Code</p>
                                    <p className="text-sm font-medium text-amber-800">
                                        Use: <b className="text-lg font-black bg-white px-2 rounded border border-amber-200 ml-1">{devHint}</b>
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-shake font-sans">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleResetSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center block font-sans">6-Digit Code</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none font-display font-bold text-center text-3xl tracking-[0.5em] font-sans"
                                        placeholder="000000"
                                        value={forgotCode}
                                        onChange={(e) => setForgotCode(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 font-sans">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            required
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none font-sans font-medium pr-12"
                                            placeholder="8+ characters"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 p-1"
                                        >
                                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || forgotCode.length !== 6}
                                    className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Reset Password <CheckCircle className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {view === 'forgot_success' && (
                        <motion.div
                            key="forgot_success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 lg:p-12 text-center"
                        >
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h1 className="text-3xl font-display font-bold text-slate-900 mb-4 font-sans">Success!</h1>
                            <p className="text-slate-500 font-medium mb-8 font-sans text-sm">Your password has been updated. You can now log in.</p>
                            <button
                                onClick={() => setView('login')}
                                className="w-full py-4 rounded-2xl bg-primary-600 text-white font-bold text-lg shadow-xl hover:bg-primary-700 transition-all font-sans"
                            >
                                Back to Login
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12 text-center">
                    <a href="http://heloxtech.page.gd/?i=1" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-600 transition-colors text-[10px] font-bold uppercase tracking-widest font-sans">
                        Powered by <span className="text-slate-500 font-black">Helox tech</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
