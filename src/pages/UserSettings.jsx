import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
    User, Mail, Lock, Save, Loader2, CheckCircle2, 
    Camera
} from 'lucide-react';
import { apiFetch, getImageUrl } from '../utils/api';

const UserSettings = ({ user, setUser }) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        email: user?.email || '',
        password: '',
        confirm_password: ''
    });

    const [profilePic, setProfilePic] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(() => getImageUrl(user?.profile_picture));
    const fileInputRef = useRef(null);

    const handleAccountSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        if (formData.password && formData.password !== formData.confirm_password) {
            setStatus({ type: 'error', message: 'Passwords do not match.' });
            return;
        }

        setLoading(true);
        try {
            const submitData = new FormData();
            submitData.append('full_name', formData.full_name);
            submitData.append('email', formData.email);
            if (formData.password) submitData.append('password', formData.password);
            if (profilePic) submitData.append('profile_picture', profilePic);

            // Using centralized apiFetch
            const response = await apiFetch('update_profile.php', {
                method: 'POST',
                body: submitData
            });

            const data = await response.json();
            if (response.ok) {
                setStatus({ type: 'success', message: 'Profile updated successfully!' });
                const updatedUser = { ...data.user, token: user.token };
                localStorage.setItem('btc_user', JSON.stringify(updatedUser));
                if (setUser) setUser(updatedUser);
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to update profile.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Connection error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 lg:p-10 w-full min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-2 leading-tight">Account Settings</h1>
                    <p className="text-sm md:text-base text-slate-500 font-medium">Manage your profile information and security.</p>
                </header>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
                >
                    <div className="p-5 md:p-10">
                        {status.message && (
                            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 font-medium ${status.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                                <CheckCircle2 className="w-5 h-5" /> {status.message}
                            </div>
                        )}
                        <form onSubmit={handleAccountSubmit} className="space-y-8">
                            <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-slate-100">
                                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 bg-slate-100 shadow-xl flex items-center justify-center">
                                        {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <User className="w-12 h-12 text-slate-300" />}
                                    </div>
                                    <div className="absolute bottom-0 right-0 p-2 bg-primary-600 rounded-full text-white shadow-lg border-2 border-white translate-x-2 -translate-y-2"><Camera className="w-4 h-4" /></div>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                                        const file = e.target.files[0];
                                        if(file) { setProfilePic(file); setPreviewUrl(URL.createObjectURL(file)); }
                                    }} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Profile Picture</h3>
                                    <p className="text-slate-500 text-sm mt-1 mb-4">Update your photo. Max size 2MB.</p>
                                    <button type="button" onClick={() => fileInputRef.current.click()} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors">Change Photo</button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><User className="w-4 h-4 text-slate-400"/> Full Name</label>
                                    <input 
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary-600 outline-none transition-all" 
                                        value={formData.full_name} 
                                        onChange={e => setFormData({...formData, full_name: e.target.value})} 
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400"/> Email Address</label>
                                    <input 
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary-600 outline-none transition-all" 
                                        value={formData.email} 
                                        onChange={e => setFormData({...formData, email: e.target.value})} 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Security</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Lock className="w-4 h-4 text-slate-400"/> New Password</label>
                                        <input 
                                            type="password" 
                                            placeholder="Leave blank to keep current" 
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary-600 outline-none transition-all" 
                                            value={formData.password} 
                                            onChange={e => setFormData({...formData, password: e.target.value})} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            placeholder="••••••••" 
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary-600 outline-none transition-all" 
                                            value={formData.confirm_password} 
                                            onChange={e => setFormData({...formData, confirm_password: e.target.value})} 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button 
                                    type="submit" 
                                    disabled={loading} 
                                    className="px-8 py-3.5 rounded-2xl bg-primary-600 text-white font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5"/>} 
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UserSettings;
