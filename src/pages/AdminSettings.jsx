import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Mail, Lock, Save, Loader2, CheckCircle2, 
    Plus, Users, Phone, Tag, Type, Edit2, Trash2, 
    Star, GraduationCap, Quote, X, Camera, Upload 
} from 'lucide-react';

const AdminSettings = ({ user, setUser }) => {
    const [activeTab, setActiveTab] = useState('account');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    // --- ACCOUNT SETTINGS STATE ---
    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        email: user?.email || '',
        password: '',
        confirm_password: ''
    });
    const [profilePic, setProfilePic] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user?.profile_picture || null);
    const fileInputRef = useRef(null);

    // --- TESTIMONIAL STATE ---
    const [testimonials, setTestimonials] = useState([]);
    const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [testimonialForm, setTestimonialForm] = useState({
        name: '', location: '', university: '', content: '', rating: 5, year: '', is_featured: 0
    });

    // --- UNIVERSITY STATE ---
    const [universities, setUniversities] = useState([]);
    const [isUniModalOpen, setIsUniModalOpen] = useState(false);
    const [editingUni, setEditingUni] = useState(null);
    const [uniForm, setUniForm] = useState({ name: '', logo_path: '' });

    // --- TEAM STATE ---
    const [staff, setStaff] = useState([]);
    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [staffForm, setStaffForm] = useState({
        full_name: '', role: '', description: '', phone: '', tags: '', image_path: ''
    });
    const [photoFile, setPhotoFile] = useState(null);

    // --- STATISTICS STATE ---
    const [stats, setStats] = useState([]);
    const [editingStat, setEditingStat] = useState(null);

    useEffect(() => {
        if (activeTab === 'testimonials') fetchAllTestimonials();
        if (activeTab === 'universities') fetchAllUniversities();
        if (activeTab === 'team') fetchAllStaff();
        if (activeTab === 'stats') fetchAllStats();
    }, [activeTab]);

    // --- FETCHERS ---
    const fetchAllTestimonials = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_testimonials.php', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await response.json();
            if (response.ok) setTestimonials(data.testimonials);
        } finally { setLoading(false); }
    };

    const fetchAllUniversities = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_universities.php', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await response.json();
            if (response.ok) setUniversities(data.universities);
        } finally { setLoading(false); }
    };

    const fetchAllStaff = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_staff.php', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await response.json();
            if (response.ok) setStaff(data.staff);
        } finally { setLoading(false); }
    };

    const fetchAllStats = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_stats.php', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await response.json();
            if (response.ok) setStats(data.stats);
        } finally { setLoading(false); }
    };

    // --- ACCOUNT ACTIONS ---
    const handleAccountSubmit = async (e) => {
        e.preventDefault();
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

            const response = await fetch('http://localhost/brigdetocollege/backend/admin/update_settings.php', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: submitData
            });
            const data = await response.json();
            if (response.ok) {
                setStatus({ type: 'success', message: 'Profile updated!' });
                const updatedUser = { ...data.user, token: user.token };
                localStorage.setItem('btc_user', JSON.stringify(updatedUser));
                if (setUser) setUser(updatedUser);
            }
        } finally { setLoading(false); }
    };

    // --- TESTIMONIAL ACTIONS ---
    const handleSaveTestimonial = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_testimonials.php', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(editingTestimonial ? { ...testimonialForm, id: editingTestimonial.id } : testimonialForm)
            });
            if (response.ok) {
                setIsTestimonialModalOpen(false);
                fetchAllTestimonials();
            }
        } catch (err) { alert('Error saving testimonial'); }
    };

    const handleDeleteTestimonial = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch('http://localhost/brigdetocollege/backend/admin/manage_testimonials.php', {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ id })
            });
            fetchAllTestimonials();
        } catch (err) { alert('Error deleting'); }
    };

    // --- UNIVERSITY ACTIONS ---
    const handleSaveUni = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_universities.php', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(editingUni ? { ...uniForm, id: editingUni.id } : uniForm)
            });
            if (response.ok) {
                setIsUniModalOpen(false);
                fetchAllUniversities();
            }
        } catch (err) { alert('Error saving'); }
    };

    const handleDeleteUni = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch('http://localhost/brigdetocollege/backend/admin/manage_universities.php', {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ id })
            });
            fetchAllUniversities();
        } catch (err) { alert('Error deleting'); }
    };

    // --- STAFF ACTIONS ---
    const handleSaveStaff = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(staffForm).forEach(key => {
            if (staffForm[key] !== null) formData.append(key, staffForm[key]);
        });
        if (editingStaff) formData.append('id', editingStaff.id);
        if (photoFile) formData.append('photo', photoFile);

        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_staff.php', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: formData
            });
            if (response.ok) {
                setIsStaffModalOpen(false);
                setPhotoFile(null);
                fetchAllStaff();
            }
        } catch (err) { alert('Error saving staff member'); }
    };

    const handleDeleteStaff = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch('http://localhost/brigdetocollege/backend/admin/manage_staff.php', {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ id })
            });
            fetchAllStaff();
        } catch (err) { alert('Error deleting'); }
    };

    // --- STATS ACTIONS ---
    const handleUpdateStat = async (stat) => {
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_stats.php', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(stat)
            });
            if (response.ok) {
                setEditingStat(null);
                fetchAllStats();
            }
        } catch (err) { alert('Error updating statistic'); }
    };

    return (
        <div className="p-6 lg:p-10 w-full min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Platform Management</h1>
                        <p className="text-slate-500 font-medium">Manage website content and account preferences.</p>
                    </div>
                    
                    <div className="flex p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200">
                        {[
                            { id: 'account', label: 'Account', icon: User },
                            { id: 'testimonials', label: 'Success Stories', icon: Quote },
                            { id: 'universities', label: 'Universities', icon: GraduationCap },
                            { id: 'team', label: 'Our Team', icon: Users },
                            { id: 'stats', label: 'Statistics', icon: Star }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'text-slate-500 hover:text-primary-600 hover:bg-slate-50'}`}
                            >
                                <tab.icon className="w-4 h-4" /> {tab.label}
                            </button>
                        ))}
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {/* ACCOUNT TAB */}
                    {activeTab === 'account' && (
                        <motion.div 
                            key="account"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden max-w-4xl"
                        >
                            <div className="p-8 lg:p-10">
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
                                            <p className="text-slate-500 text-sm mt-1 mb-4">Max size 2MB. JPG or PNG.</p>
                                            <button type="button" onClick={() => fileInputRef.current.click()} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm">Change Photo</button>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Display Name</label>
                                            <input className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Email Address</label>
                                            <input className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">New Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Confirm Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none" value={formData.confirm_password} onChange={e => setFormData({...formData, confirm_password: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" disabled={loading} className="px-8 py-3.5 rounded-2xl bg-primary-600 text-white font-bold shadow-xl shadow-primary-500/20 flex items-center gap-2">
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5"/>} Save Profile
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {/* TESTIMONIALS TAB */}
                    {activeTab === 'testimonials' && (
                        <motion.div key="testimonials" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
                             <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Success Stories Management</h2>
                                <button onClick={() => { setEditingTestimonial(null); setTestimonialForm({ name:'', location:'', university:'', content:'', rating:5, year:'', is_featured:0 }); setIsTestimonialModalOpen(true); }} className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary-600/20"><Plus className="w-4 h-4"/> Add Story</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {testimonials.map(t => (
                                    <div key={t.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => ( <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} /> ))}
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => { setEditingTestimonial(t); setTestimonialForm(t); setIsTestimonialModalOpen(true); }} className="p-2 bg-slate-100 hover:bg-primary-100 text-slate-600 hover:text-primary-600 rounded-lg"><Edit2 className="w-4 h-4"/></button>
                                                <button onClick={() => handleDeleteTestimonial(t.id)} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm italic mb-6 line-clamp-3">"{t.content}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">{t.name.charAt(0)}</div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                                                <p className="text-xs text-slate-500">{t.university}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* UNIVERSITIES TAB */}
                    {activeTab === 'universities' && (
                        <motion.div key="universities" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Partner Universities</h2>
                                <button onClick={() => { setEditingUni(null); setUniForm({ name: '', logo_path: '' }); setIsUniModalOpen(true); }} className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-sm flex items-center gap-2"><Plus className="w-4 h-4"/> Add University</button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {universities.map(uni => (
                                    <div key={uni.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center gap-3 relative group">
                                        <GraduationCap className="w-8 h-8 text-slate-300 group-hover:text-primary-600 transition-colors" />
                                        <span className="text-xs font-bold text-slate-700">{uni.name}</span>
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setEditingUni(uni); setUniForm(uni); setIsUniModalOpen(true); }} className="p-1.5 bg-slate-100 text-slate-600 rounded-lg"><Edit2 className="w-3 h-3"/></button>
                                            <button onClick={() => handleDeleteUni(uni.id)} className="p-1.5 bg-rose-50 text-rose-600 rounded-lg"><Trash2 className="w-3 h-3"/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* TEAM TAB */}
                    {activeTab === 'team' && (
                        <motion.div key="team" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Team Management</h2>
                                <button onClick={() => { setEditingStaff(null); setStaffForm({ full_name: '', role: '', description: '', phone: '', tags: '', image_path: '' }); setPhotoFile(null); setIsStaffModalOpen(true); }} className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Add Member</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {staff.map(member => (
                                    <div key={member.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group text-center">
                                        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-slate-100">
                                            <img src={member.image_path ? `http://localhost/brigdetocollege/${member.image_path}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&background=random`} className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-1">{member.full_name}</h4>
                                        <p className="text-xs text-primary-600 font-bold uppercase mb-4">{member.role}</p>
                                        <div className="flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4">
                                            <button onClick={() => { setEditingStaff(member); setStaffForm(member); setIsStaffModalOpen(true); }} className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Edit2 className="w-4 h-4"/></button>
                                            <button onClick={() => handleDeleteStaff(member.id)} className="p-2 bg-rose-50 text-rose-600 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STATISTICS TAB */}
                    {activeTab === 'stats' && (
                        <motion.div key="stats" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Platform Statistics</h2>
                                <p className="text-sm text-slate-500">Update the impact numbers shown on the website.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {stats.map(stat => (
                                    <div key={stat.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-2xl bg-primary-100 text-primary-600`}>
                                                <Star className="w-5 h-5"/>
                                            </div>
                                            <button onClick={() => setEditingStat(stat)} className="p-2 text-slate-400 hover:text-primary-600 transition-colors"><Edit2 className="w-4 h-4"/></button>
                                        </div>
                                        {editingStat && editingStat.id === stat.id ? (
                                            <div className="space-y-4">
                                                <input className="w-full p-3 rounded-xl border border-slate-200" value={editingStat.label} onChange={e => setEditingStat({...editingStat, label: e.target.value})} />
                                                <input className="w-full p-3 rounded-xl border border-slate-200" value={editingStat.value} onChange={e => setEditingStat({...editingStat, value: e.target.value})} />
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleUpdateStat(editingStat)} className="flex-1 py-3 bg-primary-600 text-white font-bold rounded-xl">Save</button>
                                                    <button onClick={() => setEditingStat(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl">Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h4 className="text-3xl font-display font-black text-slate-900 mb-1">{stat.value}</h4>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* MODALS */}
            {isTestimonialModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">
                        <h2 className="text-xl font-bold mb-6">{editingTestimonial ? 'Update' : 'Add'} Story</h2>
                        <form onSubmit={handleSaveTestimonial} className="grid grid-cols-2 gap-4">
                            <input className="p-3 rounded-xl border border-slate-200 col-span-2" placeholder="Full Name" value={testimonialForm.name} onChange={e => setTestimonialForm({...testimonialForm, name: e.target.value})} />
                            <input className="p-3 rounded-xl border border-slate-200" placeholder="University" value={testimonialForm.university} onChange={e => setTestimonialForm({...testimonialForm, university: e.target.value})} />
                            <input className="p-3 rounded-xl border border-slate-200" placeholder="Year" value={testimonialForm.year} onChange={e => setTestimonialForm({...testimonialForm, year: e.target.value})} />
                            <textarea className="p-3 rounded-xl border border-slate-200 col-span-2" placeholder="Testimonial Content" value={testimonialForm.content} onChange={e => setTestimonialForm({...testimonialForm, content: e.target.value})} />
                            <button type="submit" className="col-span-2 py-4 bg-primary-600 text-white font-bold rounded-2xl">Save Story</button>
                            <button type="button" onClick={()=>setIsTestimonialModalOpen(false)} className="col-span-2 py-2 text-slate-400">Cancel</button>
                        </form>
                    </motion.div>
                </div>
            )}

            {isUniModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
                        <h2 className="text-xl font-bold mb-6">{editingUni ? 'Update' : 'Add'} University</h2>
                        <form onSubmit={handleSaveUni} className="space-y-4">
                            <input className="w-full p-4 rounded-xl bg-slate-50" placeholder="University Name" value={uniForm.name} onChange={e => setUniForm({...uniForm, name: e.target.value})} />
                            <button type="submit" className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl">Save</button>
                            <button type="button" onClick={()=>setIsUniModalOpen(false)} className="w-full py-2 text-slate-400">Cancel</button>
                        </form>
                    </motion.div>
                </div>
            )}

            {isStaffModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">
                        <h2 className="text-xl font-bold mb-6">{editingStaff ? 'Update' : 'Add'} Team Member</h2>
                        <form onSubmit={handleSaveStaff} className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center">
                                    {(photoFile || staffForm.image_path) ? <img src={photoFile ? URL.createObjectURL(photoFile) :`http://localhost/brigdetocollege/${staffForm.image_path}`} className="w-full h-full object-cover" /> : <Upload className="text-slate-300" />}
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setPhotoFile(e.target.files[0])} />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <input className="w-full p-3 rounded-xl border border-slate-200" placeholder="Full Name" value={staffForm.full_name} onChange={e => setStaffForm({...staffForm, full_name: e.target.value})} />
                                    <input className="w-full p-3 rounded-xl border border-slate-200" placeholder="Role" value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value})} />
                                </div>
                            </div>
                            <textarea className="w-full p-3 rounded-xl border border-slate-200" placeholder="Bio" value={staffForm.description} onChange={e => setStaffForm({...staffForm, description: e.target.value})} />
                            <input className="w-full p-3 rounded-xl border border-slate-200" placeholder="Tags" value={staffForm.tags} onChange={e => setStaffForm({...staffForm, tags: e.target.value})} />
                            <button type="submit" className="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl">Save Member</button>
                            <button type="button" onClick={()=>setIsStaffModalOpen(false)} className="w-full py-2 text-slate-400">Cancel</button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminSettings;
