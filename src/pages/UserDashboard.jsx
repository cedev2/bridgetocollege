import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, FileText, Send, User } from 'lucide-react';

const UserDashboard = ({ user }) => {
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`http://localhost/brigdetocollege/backend/get_status.php`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setStatusData(data.submission);
                }
            } catch (err) {
                console.error('Error fetching status:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [user.id]);

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

    return (
        <div className="p-6 lg:p-10 w-full">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Hello, {user.full_name}!</h1>
                    <p className="text-slate-500 font-medium">Track your application progress and updates here.</p>
                </header>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Status Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:col-span-2 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                <FileText className="w-6 h-6 text-primary-600" /> Application Status
                            </h2>
                            {statusData && (
                                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(statusData.status)}`}>
                                    {statusData.status}
                                </span>
                            )}
                        </div>

                        <div className="p-8 lg:p-12 text-center">
                            {!statusData ? (
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
                                        {getStatusIcon(statusData.status)}
                                        <div className="text-center">
                                            <p className="text-slate-500">Current Status</p>
                                            <p className="text-3xl font-bold text-slate-900">{statusData.status}</p>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 inline-block">
                                        <p className="text-sm text-slate-600">
                                            {statusData.status === 'Pending' && "Your application is currently being reviewed by our team. We'll update you soon!"}
                                            {statusData.status === 'Complete' && "Congratulations! Your application has been processed successfully."}
                                            {statusData.status === 'Reject' && "We regret to inform you that your application could not be processed at this time."}
                                        </p>
                                    </div>
                                    <p className="text-xs text-slate-400">Submitted on {new Date(statusData.created_at).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Profile Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8"
                    >
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <User className="w-6 h-6 text-primary-600" /> My Profile
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Full Name</p>
                                <p className="font-semibold text-slate-700">{user.full_name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Email Address</p>
                                <p className="font-semibold text-slate-700">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Account Type</p>
                                <span className="inline-block mt-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-bold">
                                    Student
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
