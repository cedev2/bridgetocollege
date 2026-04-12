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
    LayoutDashboard,
    X,
    GraduationCap,
    Globe,
    BookOpen,
    Calendar,
    Star,
    Award,
    Loader2,
    HardDrive,
    MessageCircle,
    User,
    Check
} from 'lucide-react';
import { apiFetch, getImageUrl } from '../utils/api';

const universities = [
    "Berea College", "Rollins College", "Colby College", "Trinity College", "Grinnell College",
    "University of Chicago", "Vanderbilt University", "Washington and Lee University", "Emory University",
    "University of Southern California", "Oberlin College", "Wake Forest University", "University of Richmond",
    "Clark University", "Davidson College", "University of Notre Dame", "Stanford University",
    "Dartmouth College", "Brown University", "Columbia University", "Duke University",
    "University of Pennsylvania", "Pomona College", "Swarthmore College", "Bowdoin College",
    "Haverford College", "Harvard University", "Yale University", "Princeton University",
    "Massachusetts Institute of Technology", "Amherst College", "African Leadership University (ALU)",
    "Kepler College", "Other"
];

const AdminDashboard = ({ user }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    
    // Manual Registration State
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [registerStep, setRegisterStep] = useState(1);
    const [manualForm, setManualForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        contact_method: 'Email',
        applicant_type: 'High school graduate (first-year/freshman) applicant',
        application_timing: 'Regular decision applicant',
        major_highschool: '',
        gpa: '',
        target_countries: 'United States',
        interested_universities: '', // Admin can type or comma-separate
        package: 'Essential',
        started_application: 'No',
        intended_field: '',
        start_year: new Date().getFullYear().toString(),
        goals: 'Manually added by Admin',
        has_transcripts: 'No'
    });
    const [registering, setRegistering] = useState(false);

    useEffect(() => {
        fetchAllSubmissions();
    }, []);

    const fetchAllSubmissions = async () => {
        setLoading(true);
        try {
            const response = await apiFetch('admin/get_all_submissions.php');
            const data = await response.json();
            if (response.ok) {
                setSubmissions(data.submissions || []);
            } else {
                setError(data.error || 'Failed to fetch applicants');
            }
        } catch (err) {
            setError('Connection error: Failed to reach the server.');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        setUpdatingId(id);
        try {
            const response = await apiFetch('admin/update_submission_status.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            });
            const data = await response.json();
            if (data.success) {
                setSubmissions(submissions.map(s => s.id === id ? { ...s, status: newStatus } : s));
                if (selectedStudent && selectedStudent.id === id) {
                    setSelectedStudent({ ...selectedStudent, status: newStatus });
                }
            } else {
                alert(data.error || 'Failed to update status');
            }
        } catch (err) {
            console.error(err);
            alert('Connection error: Could not update status.');
        } finally {
            setUpdatingId(null);
        }
    };

    const handleManualRegister = async (e) => {
        e.preventDefault();
        setRegistering(true);
        try {
            const response = await apiFetch('admin/create_manual_submission.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(manualForm)
            });
            const data = await response.json();
            if (response.ok) {
                setIsRegisterModalOpen(false);
                setRegisterStep(1);
                setManualForm({
                    full_name: '', email: '', phone: '', contact_method: 'Email',
                    applicant_type: 'High school graduate (first-year/freshman) applicant',
                    application_timing: 'Regular decision applicant',
                    major_highschool: '', gpa: '', target_countries: 'United States',
                    interested_universities: '', package: 'Essential', started_application: 'No',
                    intended_field: '', start_year: new Date().getFullYear().toString(),
                    goals: 'Manually added by Admin', has_transcripts: 'No'
                });
                fetchAllSubmissions(); // Refresh list
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (err) {
            alert('Connection error during registration');
        } finally {
            setRegistering(false);
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Complete': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Reject': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-amber-50 text-amber-600 border-amber-100';
        }
    };

    const filteredSubmissions = submissions.filter(s => {
        const fullName = s.full_name || '';
        const email = s.email || '';
        const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || s.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-4 md:p-8 lg:p-10 w-full min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-600 p-3 rounded-2xl shadow-lg shadow-primary-500/20">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 leading-tight">Applicant Manager</h1>
                            <p className="text-sm md:text-base text-slate-500 font-medium font-sans">Track and process student applications.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsRegisterModalOpen(true)}
                        className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all"
                    >
                        <Plus className="w-5 h-5" /> Register Student
                    </button>
                </div>

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
                    <div className="flex gap-2">
                        <select 
                            className="flex-1 md:flex-none px-6 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none shadow-sm cursor-pointer font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat pr-12"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Complete">Completed</option>
                            <option value="Reject">Rejected</option>
                        </select>
                        <button onClick={fetchAllSubmissions} className="p-3.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-slate-600">
                            <Clock className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-600 font-bold text-sm animate-shake">
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto no-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Student</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Applied On</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center border-l border-slate-50">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan="4" className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2"/><p className="text-slate-400 font-medium">Fetching applicants...</p></td></tr>
                                ) : filteredSubmissions.length === 0 ? (
                                    <tr><td colSpan="4" className="py-20 text-center"><Users className="w-8 h-8 text-slate-200 mx-auto mb-2"/><p className="text-slate-400 font-medium">No applicants found matching your search.</p></td></tr>
                                ) : filteredSubmissions.map(sub => (
                                    <tr 
                                        key={sub.id} 
                                        onClick={() => setSelectedStudent(sub)}
                                        className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold shrink-0">
                                                    {sub.full_name?.charAt(0) || 'S'}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-slate-900 truncate">{sub.full_name}</h3>
                                                    <p className="text-xs text-slate-500 font-medium truncate">{sub.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-600">{new Date(sub.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-5 text-center border-l border-slate-50">
                                            <span className={`inline-block px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${getStatusStyles(sub.status)}`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 text-primary-600 font-bold text-sm">
                                                View Details
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden divide-y divide-slate-100">
                        {loading ? (
                            <div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2"/><p className="text-slate-400 font-medium">Loading...</p></div>
                        ) : filteredSubmissions.length === 0 ? (
                            <div className="py-20 text-center text-slate-400 font-medium font-sans">No applicants found</div>
                        ) : filteredSubmissions.map(sub => (
                            <div 
                                key={sub.id} 
                                onClick={() => setSelectedStudent(sub)}
                                className="p-5 active:bg-slate-50 transition-colors flex items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg shrink-0">
                                        {sub.full_name?.charAt(0) || 'S'}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-slate-900 text-base truncate">{sub.full_name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${getStatusStyles(sub.status)}`}>
                                                {sub.status}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold">{new Date(sub.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-primary-600 shink-0">
                                    <Plus className="w-5 h-5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedStudent && (
                    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/50 backdrop-blur-sm">
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="w-full lg:max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-y-auto"
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
                                {/* Personal Info */}
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Contact & Personal Info</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-700 font-sans">
                                            <Mail className="w-4 h-4 text-primary-500" /> {selectedStudent.email}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-700 font-sans">
                                            <Phone className="w-4 h-4 text-primary-500" /> {selectedStudent.phone}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                            <span className="text-slate-400 mr-1">Pref:</span> {selectedStudent.contact_method}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                            <span className="text-slate-400 mr-1">Added:</span> {new Date(selectedStudent.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Academic Background */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <GraduationCap className="w-5 h-5 text-primary-600" />
                                        <h3 className="font-bold text-slate-900">Academic Background</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white border border-slate-100 p-4 rounded-2xl">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">High School / Major</p>
                                            <p className="text-sm font-bold text-slate-700">{selectedStudent.major_highschool || 'Not specified'}</p>
                                        </div>
                                        <div className="bg-white border border-slate-100 p-4 rounded-2xl">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Current GPA</p>
                                            <p className="text-sm font-bold text-primary-600">{selectedStudent.gpa || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-slate-100 p-4 rounded-2xl">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Applicant Type</p>
                                        <p className="text-sm font-bold text-slate-700">{selectedStudent.applicant_type}</p>
                                    </div>
                                </div>

                                {/* College Preferences */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Globe className="w-5 h-5 text-emerald-600" />
                                        <h3 className="font-bold text-slate-900">Interest & Preferences</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-emerald-50/50 border border-emerald-100/50 p-4 rounded-2xl">
                                            <p className="text-[10px] font-bold text-emerald-600/60 uppercase mb-2">Target Countries</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(selectedStudent.target_countries || 'Not specified').split(',').map((c, i) => (
                                                    <span key={i} className="px-2.5 py-1 bg-white border border-emerald-100 text-xs font-bold text-emerald-700 rounded-lg">{c.trim()}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Desired Universities</p>
                                            <p className="text-sm text-slate-600 leading-relaxed font-medium">{selectedStudent.interested_universities || 'None specified'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Goals */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Star className="w-5 h-5 text-amber-500" />
                                        <h3 className="font-bold text-slate-900">Personal Goals</h3>
                                    </div>
                                    <div className="bg-amber-50/30 p-5 rounded-[2rem] border border-amber-100/50 italic text-sm text-slate-600 leading-relaxed">
                                        "{selectedStudent.goals || 'No specific goals provided.'}"
                                    </div>
                                </div>

                                {/* Update Status */}
                                <div className="pt-8 mt-4 border-t border-slate-200">
                                    <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Update Application Status</h3>
                                    <div className="flex gap-3">
                                        <select 
                                            className="flex-1 p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-600 font-bold text-slate-700 shadow-inner"
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
            </AnimatePresence>

            {/* Manual Registration Modal - FULL FORM VERSION */}
            <AnimatePresence>
                {isRegisterModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-20">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Administrative Entry</h3>
                                    <p className="text-sm text-slate-500 font-medium">Record a full application manually.</p>
                                </div>
                                <button onClick={() => setIsRegisterModalOpen(false)} className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"><X className="w-5 h-5" /></button>
                            </div>

                            <form onSubmit={handleManualRegister} className="p-8 space-y-10 overflow-y-auto flex-1 font-sans">
                                {/* Section 1: Contact */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center"><User className="w-4 h-4" /></div>
                                        <h4 className="font-bold text-slate-800">Student Identity</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name *</label>
                                            <input type="text" required className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-medium" placeholder="Legal Name" value={manualForm.full_name} onChange={(e) => setManualForm({...manualForm, full_name: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address *</label>
                                            <input type="email" required className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-medium text-primary-600" placeholder="email@example.com" value={manualForm.email} onChange={(e) => setManualForm({...manualForm, email: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                                            <input type="tel" className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-medium" placeholder="+250..." value={manualForm.phone} onChange={(e) => setManualForm({...manualForm, phone: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Preference</label>
                                            <select className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-bold text-slate-700" value={manualForm.contact_method} onChange={(e) => setManualForm({...manualForm, contact_method: e.target.value})}>
                                                <option>Email</option>
                                                <option>WhatsApp</option>
                                                <option>Phone Call</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Academics */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center"><GraduationCap className="w-4 h-4" /></div>
                                        <h4 className="font-bold text-slate-800">Academic Profile</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Applicant Type</label>
                                            <select className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-bold text-slate-700" value={manualForm.applicant_type} onChange={(e) => setManualForm({...manualForm, applicant_type: e.target.value})}>
                                                <option value="High school graduate (first-year/freshman) applicant">First-year Freshman</option>
                                                <option value="University Student (transfer applicant)">Transfer Student</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">High School Major</label>
                                            <input type="text" className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-medium" placeholder="e.g. PCM, HEG" value={manualForm.major_highschool} onChange={(e) => setManualForm({...manualForm, major_highschool: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current GPA/Grades</label>
                                            <input type="text" className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-bold text-emerald-600 placeholder:text-slate-300" placeholder="e.g. 75/100" value={manualForm.gpa} onChange={(e) => setManualForm({...manualForm, gpa: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Intended Field</label>
                                            <input type="text" className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-medium" placeholder="Engineering, Medicine..." value={manualForm.intended_field} onChange={(e) => setManualForm({...manualForm, intended_field: e.target.value})} />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Preferences */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center"><Globe className="w-4 h-4" /></div>
                                        <h4 className="font-bold text-slate-800">Service & Preferences</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Countries</label>
                                            <select className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-bold text-slate-700" value={manualForm.target_countries} onChange={(e) => setManualForm({...manualForm, target_countries: e.target.value})}>
                                                <option>United States</option>
                                                <option>Rwanda</option>
                                                <option>Canada</option>
                                                <option>Europe</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Service Package</label>
                                            <select className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-bold text-slate-700" value={manualForm.package} onChange={(e) => setManualForm({...manualForm, package: e.target.value})}>
                                                <option>Essential</option>
                                                <option>Comprehensive</option>
                                                <option>Premium</option>
                                                <option>Rwandan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Student Goals / Admin Notes</label>
                                        <textarea rows="4" className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none font-medium resize-none" placeholder="Provide extra context about the student..." value={manualForm.goals} onChange={(e) => setManualForm({...manualForm, goals: e.target.value})}></textarea>
                                    </div>
                                </div>

                                <div className="sticky bottom-0 bg-white/90 backdrop-blur pt-6 pb-2 z-10 border-t border-slate-100 flex gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setIsRegisterModalOpen(false)}
                                        className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                                    >
                                        Discard
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={registering}
                                        className="flex-[2] py-4 bg-primary-600 text-white rounded-2xl font-bold font-display text-lg shadow-xl shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                                    >
                                        {registering ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Check className="w-6 h-6" /> Complete Administrative Onboarding</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
