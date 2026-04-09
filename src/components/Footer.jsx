import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Instagram, Mail, Phone, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary-950 text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-2xl font-display font-bold tracking-tight">
                                Bridge<span className="text-primary-400">to</span>College
                            </span>
                        </div>
                        <p className="text-primary-200/70 leading-relaxed mb-6">
                            Empowering students to achieve their higher education dreams through personalized guidance and expert support.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/bridge_to_college" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center hover:bg-primary-800 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="mailto:bridgetocollege.rwanda@gmail.com" className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center hover:bg-primary-800 transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href="https://wa.me/250791799081" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center hover:bg-primary-800 transition-colors">
                                <Phone className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-primary-200/70">
                            <li><a href="/#about" className="hover:text-accent-400 transition-colors">About Us</a></li>
                            <li><a href="/#services" className="hover:text-accent-400 transition-colors">Our Services</a></li>
                            <li><Link to="/partners" className="hover:text-accent-400 transition-colors">Our Partners</Link></li>
                            <li><Link to="/pricing" className="hover:text-accent-400 transition-colors">Pricing</Link></li>
                            <li><Link to="/success-stories" className="hover:text-accent-400 transition-colors">Testimonials</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Services</h4>
                        <ul className="space-y-4 text-primary-200/70">
                            <li><a href="/#services" className="hover:text-accent-400 transition-colors text-sm">Rwandan University applications</a></li>
                            <li><a href="/#services" className="hover:text-accent-400 transition-colors text-sm">U.S-based University Applications</a></li>
                            <li><a href="/#services" className="hover:text-accent-400 transition-colors text-sm">Essay Writing Support</a></li>
                            <li><a href="/#services" className="hover:text-accent-400 transition-colors text-sm">Interview Preparation</a></li>
                            <li><a href="/#services" className="hover:text-accent-400 transition-colors text-sm">Scholarship Search</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-primary-200/70">
                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 text-accent-400 shrink-0" />
                                <span className="text-sm">bridgetocollege.rwanda@gmail.com</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 text-accent-400 shrink-0" />
                                <span className="text-sm">+250 791 799 081</span>
                            </li>
                            <li className="mt-8 pt-6 border-t border-primary-900">
                                <a href="https://chat.whatsapp.com/G1nxJraEcMmBb6p9sLPQnJ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent-400 font-bold hover:gap-3 transition-all">
                                    Join WhatsApp Group <ExternalLink className="w-4 h-4" />
                                </a>
                                <p className="text-xs text-primary-400 mt-2">Get college tips & updates</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-primary-900 flex flex-col md:flex-row justify-between items-center gap-4 text-primary-400 text-xs">
                    <p>© 2026 Bridge to College. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
