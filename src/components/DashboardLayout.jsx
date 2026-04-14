import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Users,
    LayoutDashboard,
    Home,
    LogOut,
    Menu,
    X,
    FileText,
    Settings,
    GraduationCap,
    Globe,
    MessageSquare,
    BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { apiFetch, getImageUrl } from '../utils/api';

const DashboardLayout = ({ user, logout, children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // Define links based on user role
    const getNavLinks = () => {
        const links = [
            { name: 'Dashboard', path: user?.role === 'admin' ? '/admin-dashboard' : '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
            ...(user?.role === 'user' ? [{ name: 'My Application', path: '/apply', icon: <FileText className="w-5 h-5" /> }] : []),
            ...(user?.role === 'admin' ? [{ name: 'Users', path: '/admin-users', icon: <Users className="w-5 h-5" /> }] : []),
            ...(user?.role === 'admin' ? [{ name: 'Messages', path: '/admin-messages', icon: <MessageSquare className="w-5 h-5" /> }] : []),
            ...(user?.role === 'admin' ? [{ name: 'Reports', path: '/admin-reports', icon: <BarChart2 className="w-5 h-5" /> }] : []),
            { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
            { name: 'Common App', path: 'https://www.commonapp.org/', icon: <Globe className="w-5 h-5" />, isExternal: true },
            { name: 'Back to Website', path: '/', icon: <Home className="w-5 h-5" /> }
        ];
        return links;
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 flex items-center justify-between border-b border-white/10">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="block text-xl font-display font-bold tracking-tight leading-none">Bridge<span className="text-primary-400"> to </span>College</span>
                            <span className="text-xs text-slate-400 font-medium">{user?.role === 'admin' ? 'Management Area' : 'Student Scholar'}</span>
                        </div>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 pb-2 border-b border-white/10">
                    {user && (
                        <div className="flex items-center gap-3 mb-6">
                            {user.profile_picture ? (
                                <img src={getImageUrl(user.profile_picture)} alt="Profile" className="w-12 h-12 rounded-xl object-cover border border-primary-500/20" />
                            ) : (
                                <div className="w-12 h-12 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center font-bold text-lg border border-primary-500/20">
                                    {user.full_name?.charAt(0) || 'U'}
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="font-bold text-sm truncate">{user.full_name}</div>
                                <div className="text-xs text-primary-400 font-medium capitalize">{user.role}</div>
                            </div>
                        </div>
                    )}
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Menu</div>
                    {getNavLinks().map((link) => {
                        const isActive = location.pathname === link.path && !link.isExternal;
                        const commonClasses = `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                ? 'bg-primary-600/20 text-primary-400 border border-primary-500/20'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`;

                        if (link.isExternal) {
                            return (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setSidebarOpen(false)}
                                    className={commonClasses}
                                >
                                    {link.icon}
                                    {link.name}
                                </a>
                            );
                        }

                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setSidebarOpen(false)}
                                className={commonClasses}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all border border-transparent hover:border-rose-500/20"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-30 sticky top-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="block text-lg font-display font-bold text-slate-900 leading-tight">Bridge to College</span>
                            <span className="block text-[10px] text-primary-600 font-bold uppercase tracking-wider">
                                {user?.role === 'admin' ? 'Management Console' : 'Scholar Portal'}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2.5 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all pointer-events-auto"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
