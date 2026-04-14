import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    MessageSquare, 
    Search, 
    Trash2, 
    CheckCircle, 
    Mail, 
    Phone, 
    Clock, 
    X,
    XCircle,
    MoreVertical,
    ChevronRight,
    Loader2,
    Eye,
    Plus,
    Calendar
} from 'lucide-react';
import { apiFetch } from '../utils/api';

const AdminMessages = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [actionId, setActionId] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiFetch('admin/get_messages.php');
            const data = await response.json();
            if (response.ok) {
                setMessages(data.messages || []);
            } else {
                setError(data.error || 'Failed to fetch messages');
            }
        } catch (err) {
            setError('Connection error: Please check your network or server.');
            console.error('Failed to load messages:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        setActionId(id);
        const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
        try {
            const response = await apiFetch('admin/update_message_status.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            });
            if (response.ok) {
                setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
                if (selectedMessage && selectedMessage.id === id) {
                    setSelectedMessage({ ...selectedMessage, status: newStatus });
                }
            }
        } finally {
            setActionId(null);
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        setActionId(id);
        try {
            const response = await apiFetch('admin/delete_message.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                setMessages(messages.filter(m => m.id !== id));
                if (selectedMessage && selectedMessage.id === id) setSelectedMessage(null);
            }
        } finally {
            setActionId(null);
        }
    };

    const filteredMessages = messages.filter(m => {
        const fullName = m.full_name || '';
        const email = m.email || '';
        const subject = m.subject || '';
        return (
            fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="p-4 md:p-8 lg:p-10 w-full bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-600 p-3 rounded-2xl shadow-lg shadow-primary-500/20">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 leading-tight">Message Center</h1>
                            <p className="text-sm md:text-base text-slate-500 font-medium">Manage student inquiries and requests.</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600" />
                    <input 
                        type="text" 
                        placeholder="Search messages..."
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-600 outline-none shadow-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-600 font-bold text-sm">
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
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Subject</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center border-l border-slate-50">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan="4" className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2"/><p className="text-slate-400 font-medium">Fetching messages...</p></td></tr>
                                ) : filteredMessages.length === 0 ? (
                                    <tr><td colSpan="4" className="py-20 text-center"><Mail className="w-8 h-8 text-slate-200 mx-auto mb-2"/><p className="text-slate-400 font-medium font-sans">No messages found.</p></td></tr>
                                ) : filteredMessages.map(msg => (
                                    <tr 
                                        key={msg.id} 
                                        onClick={() => setSelectedMessage(msg)}
                                        className={`hover:bg-slate-50/50 transition-colors cursor-pointer group ${msg.status === 'unread' ? 'bg-primary-50/20' : ''}`}
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shrink-0 ${msg.status === 'unread' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                    {msg.full_name?.charAt(0) || 'U'}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className={`font-bold truncate ${msg.status === 'unread' ? 'text-slate-900' : 'text-slate-500'}`}>{msg.full_name}</h3>
                                                    <p className="text-xs text-slate-400 font-medium truncate">{msg.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-600 truncate max-w-[200px]">{msg.subject}</td>
                                        <td className="px-6 py-5 text-center border-l border-slate-50">
                                            <span className={`inline-block px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${msg.status === 'unread' ? 'bg-primary-50 text-primary-600 border-primary-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                {msg.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="text-primary-600 font-bold text-sm">View Details</div>
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
                        ) : filteredMessages.length === 0 ? (
                            <div className="py-20 text-center text-slate-400 font-medium font-sans">No messages found</div>
                        ) : filteredMessages.map(msg => (
                            <div 
                                key={msg.id} 
                                onClick={() => setSelectedMessage(msg)}
                                className={`p-5 active:bg-slate-50 transition-colors flex items-center justify-between gap-4 ${msg.status === 'unread' ? 'bg-primary-50/20' : ''}`}
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 relative ${msg.status === 'unread' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'bg-slate-100 text-slate-400'}`}>
                                        {msg.full_name?.charAt(0) || 'U'}
                                        {msg.status === 'unread' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-white rounded-full scale-110"></span>}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className={`font-bold text-base truncate ${msg.status === 'unread' ? 'text-slate-900' : 'text-slate-500'}`}>{msg.full_name}</h3>
                                        <p className="text-xs text-slate-400 font-medium truncate mb-2">{msg.subject}</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${msg.status === 'unread' ? 'bg-primary-50 text-primary-600 border-primary-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                {msg.status}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold">{new Date(msg.created_at).toLocaleDateString()}</span>
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

            {/* Message Detail Modal */}
            <AnimatePresence>
                {selectedMessage && (
                    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/50 backdrop-blur-sm">
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="w-full lg:max-w-xl bg-white h-full shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur z-10">
                                <div>
                                    <h2 className="text-xl font-bold font-display text-slate-900">Message Details</h2>
                                    <p className="text-sm text-slate-500">From {selectedMessage.full_name}</p>
                                </div>
                                <button 
                                    onClick={() => setSelectedMessage(null)}
                                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 space-y-8 flex-1 overflow-y-auto">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary-500/20">
                                            {selectedMessage.full_name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 leading-tight">{selectedMessage.full_name}</h3>
                                            <div className="flex flex-wrap gap-4 mt-1">
                                                <a href={`mailto:${selectedMessage.email}`} className="text-sm font-medium text-primary-600 flex items-center gap-1.5 hover:underline font-sans">
                                                    <Mail className="w-3.5 h-3.5" /> {selectedMessage.email}
                                                </a>
                                                {selectedMessage.phone && (
                                                    <a href={`tel:${selectedMessage.phone}`} className="text-sm font-medium text-slate-500 flex items-center gap-1.5 hover:underline font-sans">
                                                        <Phone className="w-3.5 h-3.5" /> {selectedMessage.phone}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 pt-2 uppercase tracking-wide">
                                        <Calendar className="w-3.5 h-3.5" /> Received on {new Date(selectedMessage.created_at).toLocaleString()}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject</p>
                                        <p className="text-sm font-bold text-slate-800">{selectedMessage.subject}</p>
                                    </div>

                                    <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Inquiry Content</p>
                                        <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap font-sans">
                                            {selectedMessage.message}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-8 mt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                                    <a 
                                        href={`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`}
                                        className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold text-center shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Mail className="w-5 h-5" /> Reply Now
                                    </a>
                                    <button 
                                        onClick={() => toggleStatus(selectedMessage.id, selectedMessage.status)}
                                        className={`flex-1 py-4 rounded-2xl font-bold transition-all border ${
                                            selectedMessage.status === 'unread' 
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                        }`}
                                    >
                                        {selectedMessage.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                                    </button>
                                </div>
                                <button 
                                    onClick={() => deleteMessage(selectedMessage.id)}
                                    className="w-full py-4 text-rose-500 font-bold hover:bg-rose-50 rounded-2xl transition-all flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete Conversation
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminMessages;
