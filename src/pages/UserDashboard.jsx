import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, FileText, Send, User } from 'lucide-react';

const UserDashboard = ({ user }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`http://localhost/brigdetocollege/backend/get_status.php`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setSubmissions(data.submissions || []);
                }
            } catch (err) {
                console.error('Error fetching status:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [user.id, user.token]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Complete': return <CheckCircle2 className="w-8 h-8 text-emerald-500" />;
            case 'Reject': return <XCircle className="w-8 h-8 text-rose-500" />;
            default: return <Clock className="w-8 h-8 text-amber-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Complete': return 'bg-emerald-50 border-emerald-100 text-emerald-700';
            case 'Reject': return 'bg-rose-50 border-rose-100 text-rose-700';
            default: return 'bg-amber-50 border-amber-100 text-amber-700';
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
        </div>
    );

    const latestSubmission = submissions[0];

    return (
        <div className="p-6 lg:p-10 w-full min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Hello, {user.full_name}!</h1>
                    <p className="text-slate-500 font-medium">Track your application progress and updates here.</p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Status Card */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                    <FileText className="w-6 h-6 text-primary-600" /> Recent Application
                                </h2>
                                {latestSubmission && (
                                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(latestSubmission.status)}`}>
                                        {latestSubmission.status}
                                    </span>
                                )}
                            </div>

                            <div className="p-8 lg:p-12 text-center">
                                {submissions.length === 0 ? (
                                    <div className="space-y-6">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                            <Send className="w-10 h-10 text-slate-300" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900">No Application Submitted</h3>
                                        <p className="text-slate-500 max-w-sm mx-auto">
                                            You haven't started your application yet. Ready to take the first step towards your dream college?
                                        </p>
                                        <Link to="/apply" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all">
                                            Start Application Now
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="flex flex-col items-center gap-4">
                                            {getStatusIcon(latestSubmission.status)}
                                            <div className="text-center">
                                                <p className="text-slate-500">Current Status</p>
                                                <p className="text-3xl font-bold text-slate-900">{latestSubmission.status}</p>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 inline-block">
                                            <p className="text-sm text-slate-600">
                                                {latestSubmission.status === 'Pending' && "Your application is currently being reviewed by our team. We'll update you soon!"}
                                                {latestSubmission.status === 'Complete' && "Congratulations! Your application has been processed successfully."}
                                                {latestSubmission.status === 'Reject' && "We regret to inform you that your application could not be processed at this time."}
                                            </p>
                                        </div>
                                        <p className="text-xs text-slate-400">Latest activity on {new Date(latestSubmission.created_at).toLocaleDateString()}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* History Table */}
                        {submissions.length > 1 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
                            >
                                <div className="p-6 border-b border-slate-100 bg-slate-50/50 font-bold text-slate-900 text-lg">
                                    Application History
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-100">
                                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Application ID</th>
                                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-sm">
                                            {submissions.map((sub, index) => (
                                                <tr key={sub.id} className={`${index === 0 ? 'bg-primary-50/20' : ''}`}>
                                                    <td className="px-6 py-4 font-bold text-slate-600">{new Date(sub.created_at).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-slate-500 font-medium">#{sub.id.toString().padStart(4, '0')}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(sub.status)}`}>
                                                            {sub.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Profile Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 h-fit lg:sticky lg:top-8"
                    >
                        <div className="flex flex-col items-center mb-8 pb-8 border-b border-slate-100">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-50 mb-4 bg-slate-100 flex items-center justify-center">
                                {user?.profile_picture ? (
                                    <img 
                                        src={user.profile_picture.startsWith('http') ? user.profile_picture : `http://localhost/brigdetocollege/backend/${user.profile_picture}`} 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <User className="w-10 h-10 text-slate-300" />
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">{user.full_name}</h2>
                            <p className="text-sm font-bold text-primary-600 uppercase tracking-widest mt-1">Student</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                                <p className="font-semibold text-slate-700 truncate">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Submissions</p>
                                <p className="font-semibold text-slate-700">{submissions.length} Applications</p>
                            </div>
                            <Link to="/settings" className="block w-full py-4 text-center rounded-2xl bg-slate-50 text-slate-600 font-bold text-sm border border-slate-100 hover:bg-slate-100 transition-colors">
                                Edit Profile
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
