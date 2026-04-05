import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, 
    Search, 
    Filter, 
    Download, 
    CheckCircle, 
    XCircle, 
    Clock, 
    MoreVertical, 
    Mail,
    Phone,
    Plus,
    Edit2,
    Trash2,
    Star,
    GraduationCap,
    LayoutDashboard,
    Quote,
    X,
    Upload
} from 'lucide-react';

const AdminDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('applicants');
    const [submissions, setSubmissions] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Staff Form State
    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [staffForm, setStaffForm] = useState({
        full_name: '', role: '', description: '', phone: '', tags: '', image_path: ''
    });
    const [photoFile, setPhotoFile] = useState(null);
    
    // Testimonial Form State
    const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [testimonialForm, setTestimonialForm] = useState({
        name: '', location: '', university: '', content: '', rating: 5, year: '', is_featured: 0
    });

    // University Form State
    const [isUniModalOpen, setIsUniModalOpen] = useState(false);
    const [editingUni, setEditingUni] = useState(null);
    const [uniForm, setUniForm] = useState({ name: '', logo_path: '' });

    // Applicants State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        if (activeTab === 'applicants') fetchAllSubmissions();
        if (activeTab === 'testimonials') fetchAllTestimonials();
        if (activeTab === 'universities') fetchAllUniversities();
        if (activeTab === 'staff') fetchAllStaff();
    }, [activeTab]);

    const fetchAllSubmissions = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/get_all_submissions.php', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await response.json();
            if (response.ok) setSubmissions(data.submissions);
        } catch (err) { setError('Failed to load apps'); }
        finally { setLoading(false); }
    };

    const fetchAllTestimonials = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_testimonials.php', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await response.json();
            if (response.ok) setTestimonials(data.testimonials);
        } catch (err) { setError('Failed to load testimonials'); }
        finally { setLoading(false); }
    };

    const fetchAllUniversities = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_universities.php', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await response.json();
            if (response.ok) setUniversities(data.universities);
        } catch (err) { setError('Failed to load universities'); }
        finally { setLoading(false); }
    };

    const fetchAllStaff = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/manage_staff.php', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await response.json();
            if (response.ok) setStaff(data.staff);
        } catch (err) { setError('Failed to load team members'); }
        finally { setLoading(false); }
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

    // --- SUBMISSION ACTIONS (Original) ---
    const updateStatus = async (id, newStatus) => {
        setUpdatingId(id);
        try {
            const response = await fetch('http://localhost/brigdetocollege/backend/admin/update_status.php', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ id, status: newStatus })
            });
            if (response.ok) {
                setSubmissions(submissions.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
                if (selectedStudent && selectedStudent.id === id) setSelectedStudent({ ...selectedStudent, status: newStatus });
            }
        } finally { setUpdatingId(null); }
    };

    const filteredSubmissions = submissions.filter(sub => {
        const matchesSearch = sub.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || sub.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || sub.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Complete': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Reject': return 'bg-rose-50 text-rose-700 border-rose-100';
            default: return 'bg-amber-50 text-amber-700 border-amber-100';
        }
    };

    return (
        <div className="p-6 lg:p-10 w-full bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                
                {/* Modern Side/Top Navigation */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-600 p-3 rounded-2xl shadow-lg shadow-primary-500/20">
                            <LayoutDashboard className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-slate-900">Admin Console</h1>
                            <p className="text-slate-500 font-medium">Manage platform content and applications.</p>
                        </div>
                    </div>

                    <div className="flex p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200">
                        {[
                            { id: 'applicants', label: 'Applicants', icon: Users },
                            { id: 'testimonials', label: 'Success Stories', icon: Quote },
                            { id: 'universities', label: 'Universities', icon: GraduationCap },
                            { id: 'staff', label: 'Our Team', icon: Users }
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
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'applicants' && (
                        <motion.div 
                            key="applicants"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                             {/* Filters & Search */}
                             <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <div className="flex-1 relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600" />
                                    <input 
                                        type="text" 
                                        placeholder="Search applicants..."
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-600 outline-none shadow-sm transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select 
                                    className="px-6 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none shadow-sm cursor-pointer font-bold text-slate-700"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Complete">Completed</option>
                                    <option value="Reject">Rejected</option>
                                </select>
                            </div>

                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Student</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredSubmissions.map(sub => (
                                            <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                                                            {sub.full_name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-slate-900">{sub.full_name}</h3>
                                                            <p className="text-xs text-slate-500 font-medium">{sub.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm font-bold text-slate-600">{new Date(sub.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-5">
                                                    <span className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${getStatusStyles(sub.status)}`}>
                                                        {sub.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <button onClick={() => setSelectedStudent(sub)} className="text-primary-600 font-bold text-sm hover:underline">View Details</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'testimonials' && (
                        <motion.div 
                            key="testimonials"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Manage Success Stories</h2>
                                <button 
                                    onClick={() => {
                                        setEditingTestimonial(null);
                                        setTestimonialForm({ name: '', location: '', university: '', content: '', rating: 5, year: '', is_featured: 0 });
                                        setIsTestimonialModalOpen(true);
                                    }}
                                    className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-sm flex items-center gap-2 hover:bg-primary-700 shadow-lg shadow-primary-600/20"
                                >
                                    <Plus className="w-4 h-4" /> Add Testimonial
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {testimonials.map(t => (
                                    <div key={t.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                                                ))}
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => {
                                                    setEditingTestimonial(t);
                                                    setTestimonialForm(t);
                                                    setIsTestimonialModalOpen(true);
                                                }} className="p-2 bg-slate-100 hover:bg-primary-100 text-slate-600 hover:text-primary-600 rounded-lg transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDeleteTestimonial(t.id)} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm italic mb-6 line-clamp-3">"{t.content}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                                                {t.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                                                <p className="text-xs text-slate-500 font-medium">{t.university}</p>
                                            </div>
                                        </div>
                                        {t.is_featured == 1 && (
                                            <span className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Featured</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'universities' && (
                        <motion.div 
                            key="universities"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Manage Partner Universities</h2>
                                <button 
                                    onClick={() => {
                                        setEditingUni(null);
                                        setUniForm({ name: '', logo_path: '' });
                                        setIsUniModalOpen(true);
                                    }}
                                    className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-sm flex items-center gap-2 hover:bg-primary-700"
                                >
                                    <Plus className="w-4 h-4" /> Add University
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {universities.map(uni => (
                                    <div key={uni.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center gap-3 group relative">
                                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                                            <GraduationCap className="w-6 h-6 text-slate-400 group-hover:text-primary-600" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">{uni.name}</span>
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => {
                                                setEditingUni(uni);
                                                setUniForm(uni);
                                                setIsUniModalOpen(true);
                                            }} className="p-1.5 bg-slate-100 hover:bg-primary-100 text-slate-600 rounded-lg">
                                                <Edit2 className="w-3 h-3" />
                                            </button>
                                            <button onClick={() => handleDeleteUni(uni.id)} className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'staff' && (
                        <motion.div 
                            key="staff"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Manage Team Members</h2>
                                <button 
                                    onClick={() => {
                                        setEditingStaff(null);
                                        setStaffForm({ full_name: '', role: '', description: '', phone: '', tags: '', image_path: '' });
                                        setPhotoFile(null);
                                        setIsStaffModalOpen(true);
                                    }}
                                    className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-sm flex items-center gap-2 hover:bg-primary-700 shadow-lg shadow-primary-600/20"
                                >
                                    <Plus className="w-4 h-4" /> Add Team Member
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {staff.map(member => (
                                    <div key={member.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative group text-center">
                                        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-slate-100">
                                            <img 
                                                src={member.image_path ? `http://localhost/brigdetocollege/${member.image_path}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&background=random`} 
                                                alt={member.full_name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-1">{member.full_name}</h4>
                                        <p className="text-xs text-primary-600 font-bold uppercase tracking-wider mb-3">{member.role}</p>
                                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{member.description}</p>
                                        
                                        <div className="flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4">
                                            <button onClick={() => {
                                                setEditingStaff(member);
                                                setStaffForm(member);
                                                setIsStaffModalOpen(true);
                                            }} className="p-2 bg-slate-100 hover:bg-primary-100 text-slate-600 hover:text-primary-600 rounded-lg transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDeleteStaff(member.id)} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-1 mt-2">
                                            {member.tags && member.tags.split(',').map((tag, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-slate-50 text-[10px] font-bold text-slate-400 rounded-md border border-slate-100 uppercase">{tag.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Testimonial Modal */}
            {isTestimonialModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">{editingTestimonial ? 'Edit' : 'Add'} Testimonial</h2>
                            <button onClick={() => setIsTestimonialModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"><X className="w-5 h-5"/></button>
                        </div>
                        <form onSubmit={handleSaveTestimonial} className="p-8 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Student Name</label>
                                    <input required className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-600" value={testimonialForm.name} onChange={e => setTestimonialForm({...testimonialForm, name: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase">University</label>
                                    <input required className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-600" value={testimonialForm.university} onChange={e => setTestimonialForm({...testimonialForm, university: e.target.value})} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Content</label>
                                <textarea required rows="4" className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-600" value={testimonialForm.content} onChange={e => setTestimonialForm({...testimonialForm, content: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Rating</label>
                                    <select className="w-full p-3 rounded-xl border border-slate-200 outline-none" value={testimonialForm.rating} onChange={e => setTestimonialForm({...testimonialForm, rating: e.target.value})}>
                                        {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} Stars</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Year</label>
                                    <input className="w-full p-3 rounded-xl border border-slate-200 outline-none" value={testimonialForm.year} onChange={e => setTestimonialForm({...testimonialForm, year: e.target.value})} placeholder="2023" />
                                </div>
                                <div className="space-y-2 flex flex-col items-center justify-center pt-5">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={testimonialForm.is_featured == 1} onChange={e => setTestimonialForm({...testimonialForm, is_featured: e.target.checked ? 1 : 0})} className="w-4 h-4 rounded text-primary-600" />
                                        <span className="text-sm font-bold text-slate-700">Featured?</span>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-500/20 transition-all">Save Testimonial</button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* University Modal */}
            {isUniModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">{editingUni ? 'Edit' : 'Add'} University</h2>
                        <form onSubmit={handleSaveUni} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">University Name</label>
                                <input required className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-primary-600" value={uniForm.name} onChange={e => setUniForm({...uniForm, name: e.target.value})} />
                            </div>
                            <button type="submit" className="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-500/20 transition-all">Save Changes</button>
                            <button type="button" onClick={() => setIsUniModalOpen(false)} className="w-full py-4 text-slate-500 font-bold">Cancel</button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Applicant Details Modal (Modified) */}
            {selectedStudent && (
                 <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/50 backdrop-blur-sm">
                 <motion.div 
                     initial={{ x: '100%' }}
                     animate={{ x: 0 }}
                     exit={{ x: '100%' }}
                     className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-y-auto"
                 >
                     <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur z-10">
                         <div>
                             <h2 className="text-xl font-bold font-display text-slate-900">{selectedStudent.full_name}'s Profile</h2>
                             <p className="text-sm text-slate-500">Application Details</p>
                         </div>
                         <button 
                             onClick={() => setSelectedStudent(null)}
                             className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
                         >
                             <X className="w-5 h-5" />
                         </button>
                     </div>

                     <div className="p-6 space-y-8 flex-1">
                         {/* Contact Box */}
                         <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
                             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Contact Info</h3>
                             <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                 <Mail className="w-4 h-4 text-slate-400" /> {selectedStudent.email}
                             </div>
                             <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                 <Phone className="w-4 h-4 text-slate-400" /> {selectedStudent.phone} ({selectedStudent.contact_method})
                             </div>
                         </div>

                         {/* Status Update Area */}
                         <div className="pt-6 border-t border-slate-200">
                             <h3 className="text-sm font-bold text-slate-900 mb-3">Update Application Status</h3>
                             <div className="flex gap-3">
                                 <select 
                                     className="flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-600 font-medium"
                                     value={selectedStudent.status}
                                     onChange={(e) => updateStatus(selectedStudent.id, e.target.value)}
                                     disabled={updatingId === selectedStudent.id}
                                 >
                                     <option value="Pending">Pending Review</option>
                                     <option value="Complete">Mark Complete</option>
                                     <option value="Reject">Reject Application</option>
                                 </select>
                                 {updatingId === selectedStudent.id && (
                                     <div className="w-12 flex items-center justify-center">
                                         <div className="w-5 h-5 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                                     </div>
                                 )}
                             </div>
                         </div>
                     </div>
                 </motion.div>
             </div>
            )}
        </div>
    );
};

export default AdminDashboard;
