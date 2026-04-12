import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Download, 
    BarChart2, 
    Users, 
    CheckCircle, 
    Clock, 
    Globe, 
    Loader2, 
    FileSpreadsheet,
    PieChart as PieChartIcon
} from 'lucide-react';
import { apiFetch } from '../utils/api';
import { 
    PieChart, Pie, Cell, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const AdminReports = ({ user }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        const fetchAllSubmissions = async () => {
            setLoading(true);
            try {
                const response = await apiFetch('admin/get_all_submissions.php');
                const data = await response.json();
                if (response.ok) {
                    setSubmissions(data.submissions || []);
                } else {
                    setError(data.error || 'Failed to fetch data for reports');
                }
            } catch (err) {
                setError('Connection error: Failed to reach the server.');
            } finally {
                setLoading(false);
            }
        };
        fetchAllSubmissions();
    }, [user.token]);

    const handleExportCSV = () => {
        setExporting(true);
        setTimeout(() => {
            try {
                if (submissions.length === 0) {
                    alert('No data to export.');
                    setExporting(false);
                    return;
                }

                // Define standard headers
                const headers = [
                    'Applicant ID', 'Application Date', 'Full Name', 'Email', 'Phone',
                    'Applicant Type', 'High School Major', 'GPA', 'Target Countries',
                    'Interested Universities', 'Package', 'Start Year', 'Status', 'Goals'
                ];

                // Map data to rows
                const rows = submissions.map(sub => [
                    sub.id,
                    new Date(sub.created_at).toLocaleDateString(),
                    `"${(sub.applicant_name || sub.full_name || '').replace(/"/g, '""')}"`, // prefer aliased name
                    `"${(sub.email || '').replace(/"/g, '""')}"`,
                    `"${(sub.phone || '').replace(/"/g, '""')}"`,
                    `"${(sub.applicant_type || '').replace(/"/g, '""')}"`,
                    `"${(sub.major_highschool || '').replace(/"/g, '""')}"`,
                    `"${(sub.gpa || '').replace(/"/g, '""')}"`,
                    `"${(sub.target_countries || '').replace(/"/g, '""')}"`,
                    `"${(sub.interested_universities || '').replace(/"/g, '""')}"`,
                    `"${(sub.package || '').replace(/"/g, '""')}"`,
                    `"${(sub.start_year || '').replace(/"/g, '""')}"`,
                    sub.status,
                    `"${(sub.goals || '').replace(/"/g, '""').replace(/\n/g, ' ')}"` 
                ]);

                // Combine headers and rows
                const csvContent = [
                    headers.join(','),
                    ...rows.map(row => row.join(','))
                ].join('\n');

                // Create a Blob and trigger download
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `BTC_Reports_${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            } catch (e) {
                console.error("Export failed: ", e);
                alert("Failed to export data. See console for details.");
            } finally {
                setExporting(false);
            }
        }, 500); // Small delay to show spinner
    };

    // Calculate Summary Metrics
    const totalApplicants = submissions.length;
    const completedApps = submissions.filter(s => s.status === 'Complete').length;
    const pendingApps = submissions.filter(s => s.status === 'Pending').length;
    
    // Unique countries
    const countriesArray = submissions.map(s => s.target_countries).filter(Boolean);
    const uniqueCountries = new Set();
    countriesArray.forEach(list => list.split(',').forEach(c => uniqueCountries.add(c.trim())));
    const countriesCount = uniqueCountries.size;

    // --- CHART DATA PREPARATION ---
    
    // Status Pie Chart
    const statusData = [
        { name: 'Complete', value: completedApps, color: '#10b981' }, // emerald-500
        { name: 'Pending', value: pendingApps, color: '#f59e0b' },   // amber-500
        { name: 'Reject', value: submissions.filter(s => s.status === 'Reject').length, color: '#f43f5e' } // rose-500
    ].filter(item => item.value > 0);

    // Applicant Type Bar Chart
    const typeCount = submissions.reduce((acc, curr) => {
        let type = curr.applicant_type || 'Unknown';
        if (type.includes('High school')) type = 'High School';
        else if (type.includes('University')) type = 'Transfer';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});
    const typeData = Object.keys(typeCount).map(key => ({
        name: key,
        Applicants: typeCount[key]
    }));

    // Target Countries Bar Chart
    const countryCount = {};
    countriesArray.forEach(list => {
        list.split(',').forEach(c => {
            const country = c.trim();
            countryCount[country] = (countryCount[country] || 0) + 1;
        });
    });
    // Sort by count descending and take top 5
    const countryData = Object.keys(countryCount)
        .map(key => ({ name: key, Count: countryCount[key] }))
        .sort((a, b) => b.Count - a.Count)
        .slice(0, 5);

    return (
        <div className="p-4 md:p-8 lg:p-10 w-full min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-600 p-3 rounded-2xl shadow-lg shadow-primary-500/20">
                            <BarChart2 className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 leading-tight">System Reports</h1>
                            <p className="text-sm md:text-base text-slate-500 font-medium font-sans">Business analytics and data export.</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleExportCSV}
                        disabled={loading || exporting || submissions.length === 0}
                        className={`w-full md:w-auto px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all ${loading || exporting || submissions.length === 0 ? 'opacity-70 cursor-not-allowed' : 'hover:bg-emerald-700 hover:-translate-y-1'}`}
                    >
                        {exporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                        {exporting ? 'Generating CSV...' : 'Export to CSV'}
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-600 font-bold text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                            <Users className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Applicants</p>
                            <p className="text-3xl font-black text-slate-900">{loading ? '-' : totalApplicants}</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <CheckCircle className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Completed Apps</p>
                            <p className="text-3xl font-black text-slate-900">{loading ? '-' : completedApps}</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <Clock className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Reviews</p>
                            <p className="text-3xl font-black text-slate-900">{loading ? '-' : pendingApps}</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <Globe className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Target Countries</p>
                            <p className="text-3xl font-black text-slate-900">{loading ? '-' : countriesCount}</p>
                        </div>
                    </motion.div>
                </div>

                {/* --- ANALYTICS CHARTS --- */}
                {!loading && submissions.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Status Distribution (Pie) */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <PieChartIcon className="w-5 h-5 text-primary-600" /> Application Status
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={statusData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {statusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ fontWeight: 'bold' }}
                                        />
                                        <Legend iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Top Countries (Bar) */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-indigo-600" /> Top Target Countries
                            </h3>
                            <div className="h-64 mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={countryData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} width={80} />
                                        <Tooltip 
                                            cursor={{ fill: '#f8fafc' }}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey="Count" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Applicant Types (Bar) */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5 text-cyan-600" /> Applicant Demographics
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={typeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 500 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} allowDecimals={false} />
                                        <Tooltip 
                                            cursor={{ fill: '#f8fafc' }}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey="Applicants" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Report Area */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                    {loading ? (
                        <>
                            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                            <h3 className="text-xl font-bold text-slate-900">Crunching Numbers...</h3>
                            <p className="text-slate-500 mt-2 font-medium">Aggregating system statistics.</p>
                        </>
                    ) : submissions.length === 0 ? (
                        <>
                            <FileSpreadsheet className="w-16 h-16 text-slate-200 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900">No Data Available</h3>
                            <p className="text-slate-500 mt-2 font-medium">There are no applications to report on yet.</p>
                        </>
                    ) : (
                        <div className="max-w-md w-full">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <FileSpreadsheet className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display">Data Ready for Export</h3>
                            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                                You have {totalApplicants} complete applicant records ready to be analyzed. Exporting will provide a perfectly formatted spreadsheet including all specific preferences and applicant goals.
                            </p>
                            <button 
                                onClick={handleExportCSV}
                                disabled={exporting}
                                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg inline-flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all"
                            >
                                {exporting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                                Export {totalApplicants} Records
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
