import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = ({ user, logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/#about' },
        { name: 'Services', href: '/#services' },
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'Pricing', href: '/pricing' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-white py-4 shadow-sm border-b border-slate-100'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:scale-110 transition-transform">
                            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-2xl font-display font-bold text-primary-900 tracking-tight">
                            Bridge<span className="text-primary-600">to</span>College
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {!user ? (
                            <>
                                {navLinks.map((link) => (
                                    link.href.startsWith('/#') ? (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                ))}
                                
                                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                                
                                <div className="flex items-center gap-3">
                                    <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-primary-600 transition-colors px-4">Login</Link>
                                    <Link to="/register" className="px-6 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all">
                                        Get Started
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                {location.pathname === '/' ? (
                                    <Link to={user.role === 'admin' ? '/admin-dashboard' : '/dashboard'} className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-primary-600 transition-colors">
                                        <LayoutDashboard className="w-4 h-4" /> Profile
                                    </Link>
                                ) : (
                                    <Link to="/" className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-primary-600 transition-colors">
                                        Home
                                    </Link>
                                )}
                                
                                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                                
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-all"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-primary-600"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in border-t border-slate-100 shadow-xl">
                    <div className="px-4 pt-4 pb-6 space-y-3 sm:px-6">
                        {!user ? (
                            <>
                                {navLinks.map((link) => (
                                    link.href.startsWith('/#') ? (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="block px-3 py-2 text-slate-700 hover:text-primary-600 font-semibold text-lg"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="block px-3 py-2 text-slate-700 hover:text-primary-600 font-semibold text-lg"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                ))}
                                <div className="pt-4 border-t border-slate-100 space-y-3">
                                    <Link to="/login" className="block w-full p-3 rounded-xl bg-slate-50 text-slate-700 font-bold" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/register" className="block w-full p-3 rounded-xl bg-primary-600 text-white font-bold text-center" onClick={() => setIsOpen(false)}>Get Started</Link>
                                </div>
                            </>
                        ) : (
                            <>
                                {location.pathname === '/' ? (
                                    <Link to={user.role === 'admin' ? '/admin-dashboard' : '/dashboard'} className="block px-3 py-2 text-slate-700 hover:text-primary-600 font-semibold text-lg" onClick={() => setIsOpen(false)}>
                                        Profile
                                    </Link>
                                ) : (
                                    <Link to="/" className="block px-3 py-2 text-slate-700 hover:text-primary-600 font-semibold text-lg" onClick={() => setIsOpen(false)}>
                                        Home
                                    </Link>
                                )}
                                <div className="pt-4 border-t border-slate-100 space-y-3">
                                    <button onClick={handleLogout} className="w-full p-3 rounded-xl bg-red-50 text-red-600 font-bold text-left flex items-center gap-2">
                                        <LogOut className="w-5 h-5" /> Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
