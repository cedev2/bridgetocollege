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
    X
} from 'lucide-react';

const AdminDashboard = ({ user }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Applicants State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        fetchAllSubmissions();
    }, []);

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
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-600 p-3 rounded-2xl shadow-lg shadow-primary-500/20">
                            <LayoutDashboard className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-slate-900">Applicants Management</h1>
                            <p className="text-slate-500 font-medium">Review and process student applications.</p>
                        </div>
                    </div>
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
            </div>

            {/* Applicant Details Modal */}
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
                         <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
                             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Contact Info</h3>
                             <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                 <Mail className="w-4 h-4 text-slate-400" /> {selectedStudent.email}
                             </div>
                             <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                 <Phone className="w-4 h-4 text-slate-400" /> {selectedStudent.phone} ({selectedStudent.contact_method})
                             </div>
                         </div>

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
