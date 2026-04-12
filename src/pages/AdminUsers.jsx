import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, 
    Search, 
    Shield, 
    Trash2, 
    UserPlus, 
    Mail, 
    Calendar,
    MoreVertical,
    X,
    CheckCircle,
    AlertCircle,
    Loader2,
    Filter,
    ArrowUpDown
} from 'lucide-react';
import { apiFetch } from '../utils/api';

const AdminUsers = ({ user }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await apiFetch('admin/get_users.php');
            const data = await response.json();
            if (response.ok) {
                setUsers(data.users || []);
            } else {
                setError(data.error || 'Failed to fetch users');
            }
        } catch (err) {
            setError('Connection error: Failed to reach the server.');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        
        setActionLoading(true);
        try {
            const response = await apiFetch('admin/get_users.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: userId })
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(users.filter(u => u.id !== userId));
                setSuccessMessage('User deleted successfully');
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                alert(data.error || 'Failed to delete user');
            }
        } catch (err) {
            alert('Connection error');
        } finally {
            setActionLoading(false);
        }
    };

    const updateUserRole = async (userId, newRole) => {
        setActionLoading(true);
        try {
            const response = await apiFetch('admin/get_users.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: userId, role: newRole })
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
                setSuccessMessage(`User promoted to ${newRole}`);
                setTimeout(() => setSuccessMessage(''), 3000);
                if (selectedUser && selectedUser.id === userId) {
                    setSelectedUser({ ...selectedUser, role: newRole });
                }
            } else {
                alert(data.error || 'Failed to update role');
            }
        } catch (err) {
            alert('Connection error');
        } finally {
            setActionLoading(false);
        }
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             u.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'All' || u.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const getRoleBadgeStyles = (role) => {
        switch (role) {
            case 'admin': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'user': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="p-4 md:p-8 lg:p-10 w-full min-h-screen bg-slate-50 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/20 text-white">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">User Management</h1>
                            <p className="text-sm md:text-base text-slate-500 font-medium">Manage accounts and system access levels.</p>
                        </div>
                    </div>
                    {successMessage && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2 font-bold text-sm"
                        >
                            <CheckCircle className="w-4 h-4" /> {successMessage}
                        </motion.div>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600" />
                        <input 
                            type="text" 
                            placeholder="Search by name or email..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <select 
                                className="pl-10 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none shadow-sm cursor-pointer font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat"
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                            >
                                <option value="All">All Roles</option>
                                <option value="admin">Admins</option>
                                <option value="user">Students</option>
                            </select>
                        </div>
                        <button onClick={fetchUsers} className="p-3.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
                            <Loader2 className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-600 font-bold text-sm">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Table Container */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Joined Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-sans">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center">
                                            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto mb-4" />
                                            <p className="text-slate-400 font-medium">Loading users list...</p>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center">
                                            <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                            <p className="text-slate-400 font-medium">No users found.</p>
                                        </td>
                                    </tr>
                                ) : filteredUsers.map(u => (
                                    <tr key={u.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedUser(u)}>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-100 shadow-sm">
                                                    {u.profile_picture ? (
                                                        <img src={u.profile_picture} alt="" className="w-full h-full object-cover rounded-2xl" />
                                                    ) : (
                                                        u.full_name?.charAt(0) || 'U'
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="text-sm font-bold text-slate-900 truncate">{u.full_name}</h3>
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium truncate mt-0.5">
                                                        <Mail className="w-3 h-3" /> {u.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider ${getRoleBadgeStyles(u.role)}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {new Date(u.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); deleteUser(u.id); }}
                                                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                                                    title="Delete User"
                                                    disabled={u.id === user.id}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* User Details Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-20">
                                <h3 className="text-2xl font-bold text-slate-900">User Profile</h3>
                                <button onClick={() => setSelectedUser(null)} className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"><X className="w-5 h-5" /></button>
                            </div>

                            <div className="p-8 space-y-8 overflow-y-auto">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-3xl border-2 border-indigo-100 shadow-xl mb-4">
                                        {selectedUser.profile_picture ? (
                                            <img src={selectedUser.profile_picture} alt="" className="w-full h-full object-cover rounded-3xl" />
                                        ) : (
                                            selectedUser.full_name?.charAt(0) || 'U'
                                        )}
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900">{selectedUser.full_name}</h4>
                                    <p className="text-slate-500 font-medium">{selectedUser.email}</p>
                                    <div className="mt-3 flex gap-2">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border ${getRoleBadgeStyles(selectedUser.role)}`}>
                                            {selectedUser.role}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">User ID</p>
                                        <p className="text-sm font-bold text-slate-700">#{selectedUser.id}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Joined</p>
                                        <p className="text-sm font-bold text-slate-700">{new Date(selectedUser.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100">
                                    <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Account Management</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div>
                                                <p className="text-sm font-bold text-slate-700">Account Role</p>
                                                <p className="text-xs text-slate-500">Update system permissions</p>
                                            </div>
                                            <select 
                                                className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm"
                                                value={selectedUser.role}
                                                onChange={(e) => updateUserRole(selectedUser.id, e.target.value)}
                                                disabled={actionLoading || selectedUser.id === user.id}
                                            >
                                                <option value="user">Student</option>
                                                <option value="admin">Administrator</option>
                                            </select>
                                        </div>
                                        
                                        <button 
                                            onClick={() => deleteUser(selectedUser.id)}
                                            disabled={actionLoading || selectedUser.id === user.id}
                                            className="w-full py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold hover:bg-rose-100 transition-all flex items-center justify-center gap-2 border border-rose-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Trash2 className="w-5 h-5" /> Delete Account Permanently
                                        </button>
                                        {selectedUser.id === user.id && (
                                            <p className="text-center text-[10px] text-rose-400 font-bold uppercase tracking-widest mt-2">You cannot delete or modify your own root account</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminUsers;
