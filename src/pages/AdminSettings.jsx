import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, User, Lock, Save, Loader2, CheckCircle2, Trash2, Plus, Users, Phone, Tag, Type } from 'lucide-react';

const AdminSettings = ({ user, setUser }) => {
    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        email: user?.email || '',
        password: '',
        confirm_password: ''
    });
    
    const [profilePic, setProfilePic] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user?.profile_picture || null);
    
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setStatus({ type: 'error', message: 'Image size must be less than 5MB.' });
                return;
            }
            setProfilePic(file);
            // Create preview URL
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password && formData.password !== formData.confirm_password) {
            setStatus({ type: 'error', message: 'Passwords do not match.' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const submitData = new FormData();
            submitData.append('full_name', formData.full_name);
            submitData.append('email', formData.email);
            if (formData.password) {
                submitData.append('password', formData.password);
            }
            if (profilePic) {
                submitData.append('profile_picture', profilePic);
            }

            const response = await fetch('http://localhost/brigdetocollege/backend/admin/update_settings.php', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body: submitData // Don't set Content-Type header with FormData, browser will set boundary automatically
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Profile updated successfully!' });
                
                // Update local storage and app state
                const updatedUser = { ...data.user, token: user.token };
                localStorage.setItem('btc_user', JSON.stringify(updatedUser));
                if (setUser) setUser(updatedUser);
                
                setFormData(prev => ({ ...prev, password: '', confirm_password: '' }));
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to update settings.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error occurred.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const [staffList, setStaffList] = useState([]);
    const [isFetchingStaff, setIsFetchingStaff] = useState(false);
    const [staffFormData, setStaffFormData] = useState({
        full_name: '',
        role: '',
        description: '',
        phone: '',
        tags: ''
    });
    const [staffImage, setStaffImage] = useState(null);
    const [staffPreviewUrl, setStaffPreviewUrl] = useState(null);
    const [staffStatus, setStaffStatus] = useState({ type: '', message: '' });
    const [isSubmittingStaff, setIsSubmittingStaff] = useState(false);
    const staffFileInputRef = useRef(null);

    React.useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        setIsFetchingStaff(true);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/get_staff.php');
            const data = await response.json();
            if (data.success) {
                setStaffList(data.staff);
            }
        } catch (error) {
            console.error('Error fetching staff:', error);
        } finally {
            setIsFetchingStaff(false);
        }
    };

    const handleStaffChange = (e) => {
        setStaffFormData({ ...staffFormData, [e.target.name]: e.target.value });
    };

    const handleStaffFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setStaffImage(file);
            setStaffPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleAddStaff = async (e) => {
        e.preventDefault();
        setIsSubmittingStaff(true);
        setStaffStatus({ type: '', message: '' });

        try {
            const submitData = new FormData();
            Object.keys(staffFormData).forEach(key => {
                submitData.append(key, staffFormData[key]);
            });
            if (staffImage) {
                submitData.append('image', staffImage);
            }

            const response = await fetch('http://localhost/brigdetocollege/backend/admin/add_staff.php', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body: submitData
            });

            const data = await response.json();
            if (data.success) {
                setStaffStatus({ type: 'success', message: 'Staff member added!' });
                setStaffFormData({ full_name: '', role: '', description: '', phone: '', tags: '' });
                setStaffImage(null);
                setStaffPreviewUrl(null);
                fetchStaff();
            } else {
                setStaffStatus({ type: 'error', message: data.error || 'Failed to add staff.' });
            }
        } catch (error) {
            setStaffStatus({ type: 'error', message: 'Network error.' });
        } finally {
            setIsSubmittingStaff(false);
        }
    };

    const deleteStaff = async (id) => {
        if (!window.confirm('Are you sure you want to delete this staff member?')) return;

        try {
            const response = await fetch(`http://localhost/brigdetocollege/backend/admin/delete_staff.php?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                fetchStaff();
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    };

    return (
        <div className="p-6 lg:p-10 w-full">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Account Settings</h1>
                    <p className="text-slate-500 font-medium">Manage your personal profile and security preferences.</p>
                </header>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
                >
                    <div className="p-8 lg:p-10">
                        {status.message && (
                            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 font-medium ${
                                status.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`}>
                                {status.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                                {status.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            {/* Profile Picture Section */}
                            <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-slate-100">
                                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 bg-slate-100 shadow-xl relative inline-flex items-center justify-center">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-12 h-12 text-slate-300" />
                                        )}
                                        {/* Overlay Hover */}
                                        <div className="absolute inset-0 bg-slate-900/40 hidden group-hover:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                            <Camera className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    
                                    <div className="absolute bottom-0 right-0 p-2 bg-primary-600 rounded-full text-white shadow-lg border-2 border-white translate-x-2 -translate-y-2">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                    
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        accept="image/png, image/jpeg, image/gif"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Profile Picture</h3>
                                    <p className="text-slate-500 text-sm mt-1 mb-4">Upload a high-res picture in JPG, PNG layout.<br/>Maximum size allowed is 5MB.</p>
                                    <button 
                                        type="button" 
                                        onClick={() => fileInputRef.current.click()}
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors"
                                    >
                                        Choose New Photo
                                    </button>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <User className="w-4 h-4 text-slate-400" /> Administrative Name
                                    </label>
                                    <input 
                                        type="text" 
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all shadow-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-slate-400" /> Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Security Area */}
                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-primary-600" /> Security
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">Leave password fields blank if you do not wish to change your current password.</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">New Password</label>
                                        <input 
                                            type="password" 
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Confirm New Password</label>
                                        <input 
                                            type="password" 
                                            name="confirm_password"
                                            value={formData.confirm_password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-8 flex justify-end">
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3.5 rounded-2xl bg-primary-600 text-white font-bold text-sm shadow-xl shadow-primary-500/20 hover:bg-primary-700 hover:-translate-y-1 transition-all flex items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* Staff Management Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-12 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
                >
                    <div className="p-8 lg:p-10">
                        <header className="mb-8">
                            <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-3">
                                <Users className="w-7 h-7 text-primary-600" /> Team Management
                            </h2>
                            <p className="text-slate-500 font-medium">Add or remove staff members appearing on the About page.</p>
                        </header>

                        {staffStatus.message && (
                            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 font-medium ${
                                staffStatus.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`}>
                                {staffStatus.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                                {staffStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleAddStaff} className="space-y-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100 mb-10">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-primary-600" /> Add New Staff Member
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            name="full_name"
                                            value={staffFormData.full_name}
                                            onChange={handleStaffChange}
                                            required
                                            placeholder="e.g. Emery TWAJAMAHORO"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Role / Title</label>
                                    <div className="relative">
                                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            name="role"
                                            value={staffFormData.role}
                                            onChange={handleStaffChange}
                                            required
                                            placeholder="e.g. Founder & Lead Counselor"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Phone (Optional)</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            name="phone"
                                            value={staffFormData.phone}
                                            onChange={handleStaffChange}
                                            placeholder="+250 ..."
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Tags (Comma-separated)</label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            name="tags"
                                            value={staffFormData.tags}
                                            onChange={handleStaffChange}
                                            placeholder="Leadership, Strategy"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Short Description</label>
                                <textarea 
                                    name="description"
                                    value={staffFormData.description}
                                    onChange={handleStaffChange}
                                    placeholder="Brief bio or description..."
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-600 outline-none transition-all"
                                ></textarea>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div 
                                    className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 bg-white overflow-hidden flex items-center justify-center cursor-pointer hover:border-primary-600 transition-colors"
                                    onClick={() => staffFileInputRef.current.click()}
                                >
                                    {staffPreviewUrl ? (
                                        <img src={staffPreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Camera className="w-8 h-8 text-slate-300" />
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <input 
                                        type="file" 
                                        ref={staffFileInputRef}
                                        onChange={handleStaffFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <p className="text-sm text-slate-500 mb-2">Upload staff photo (Square aspect ratio recommended)</p>
                                    <button 
                                        type="button"
                                        onClick={() => staffFileInputRef.current.click()}
                                        className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-sm transition-all"
                                    >
                                        Select Image
                                    </button>
                                </div>
                                <button 
                                    type="submit"
                                    disabled={isSubmittingStaff}
                                    className="w-full sm:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {isSubmittingStaff ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                                    Add Member
                                </button>
                            </div>
                        </form>

                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800">Current Roster</h3>
                            {isFetchingStaff ? (
                                <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>
                            ) : staffList.length === 0 ? (
                                <p className="text-center p-8 bg-slate-50 rounded-2xl text-slate-400 font-medium italic">No staff members added yet.</p>
                            ) : (
                                <div className="grid gap-4">
                                    {staffList.map((member) => (
                                        <div key={member.id} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                                                {member.image_path ? (
                                                    <img src={member.image_path} alt={member.full_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300"><User className="w-8 h-8" /></div>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-slate-900">{member.full_name}</h4>
                                                <p className="text-sm text-primary-600 font-semibold">{member.role}</p>
                                            </div>
                                            <button 
                                                onClick={() => deleteStaff(member.id)}
                                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                                title="Delete staff member"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminSettings;
