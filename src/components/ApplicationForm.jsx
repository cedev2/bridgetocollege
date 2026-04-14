import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Mail, Phone, GraduationCap, MapPin, Calendar, Clock, ChevronRight, FileText, Globe, School, CheckCircle } from 'lucide-react';
import { apiFetch } from '../utils/api';

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

const ApplicationForm = ({ user }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        email: user?.email || '',
        phone: '',
        contact_method: 'Email',
        applicant_type: '',
        application_timing: 'Regular decision applicant',
        major_highschool: '',
        gpa: '',
        target_countries: 'United States',
        interested_universities: [],
        package: 'Essential',
        started_application: 'No',
        intended_field: '',
        start_year: '',
        goals: '',
        has_transcripts: 'No'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const currentUnis = [...formData.interested_universities];
            if (checked) currentUnis.push(value);
            else currentUnis.splice(currentUnis.indexOf(value), 1);
            setFormData({ ...formData, interested_universities: currentUnis });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await apiFetch('submit_application.php', {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    target_countries: formData.target_countries,
                    interested_universities: formData.interested_universities.join(', ')
                })
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/dashboard');
            } else {
                setError(data.error || 'Submission failed');
            }
        } catch (err) {
            setError('Could not connect to server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 lg:p-10 w-full bg-slate-50">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-display font-bold mb-3 tracking-tight text-slate-900">🎓 Bridge to College <span className="text-primary-600">Application Form</span></h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">Please fill out this form so we can understand your goals and how best to support you.</p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-primary-950 p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-8">Important Notice</h3>
                            <ul className="space-y-6 text-primary-100/80 text-sm leading-relaxed">
                                <li className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-primary-800 flex items-center justify-center shrink-0">1</div>
                                    <p>You can submit multiple applications for different programs or years.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-primary-800 flex items-center justify-center shrink-0">2</div>
                                    <p>You will not be able to edit your responses after submitting.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center shrink-0">⚠️</div>
                                    <p className="text-white font-medium italic">We will contact you via email or phone within 24–48 hours.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:w-2/3 p-8 lg:p-14">
                        {error && (
                            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Section 1: Contact & Basic Info */}
                            <div className="space-y-6">
                                <h4 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Personal & Contact Details</h4>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Full Name *</label>
                                        <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Email Address *</label>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none" />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Phone Number *</label>
                                        <input type="tel" name="phone" required placeholder="+250..." onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Preferred Contact Method *</label>
                                        <select name="contact_method" required onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none">
                                            <option>Email</option>
                                            <option>WhatsApp</option>
                                            <option>Phone Call</option>
                                            <option>SMS</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Academic Profile */}
                            <div className="space-y-6">
                                <h4 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Academic Background</h4>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Applying as: *</label>
                                        <select name="applicant_type" required onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none">
                                            <option value="">Choose Option</option>
                                            <option value="High school graduate (first-year/freshman) applicant">High school graduate (first-year/freshman)</option>
                                            <option value="University Student (transfer applicant)">University Student (transfer)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Application Timing:</label>
                                        <select name="application_timing" onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none">
                                            <option>Early Action applicant</option>
                                            <option>Early Decision applicant</option>
                                            <option>Regular decision applicant</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Major/High school Major *</label>
                                        <input type="text" name="major_highschool" required placeholder="PCM, HEG, Economics, etc." onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">GPA / Average Grades *</label>
                                        <input type="text" name="gpa" required placeholder="e.g. 75/100, 4.0/4.0" onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Goals */}
                            <div className="space-y-6">
                                <h4 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Future Goals</h4>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Target Countries *</label>
                                        <select name="target_countries" required onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none">
                                            <option>United States</option>
                                            <option>Rwanda</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Intended Field of Study *</label>
                                        <input type="text" name="intended_field" required placeholder="Engineering, Biology, etc." onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none" />
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-slate-700">Universities of Interest (Select all that apply) *</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                                        {universities.map(uni => (
                                            <label key={uni} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-primary-600 transition-all">
                                                <input type="checkbox" value={uni} onChange={handleChange} className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                                                {uni}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Package *</label>
                                        <select name="package" required onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none">
                                            <option>Essential</option>
                                            <option>Comprehensive</option>
                                            <option>Premium</option>
                                            <option>Rwandan</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Intended Start Year *</label>
                                        <select name="start_year" required onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none">
                                            <option value="">Select Year</option>
                                            <option>2026</option>
                                            <option>2027</option>
                                            <option>2028</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: Final Questions */}
                            <div className="space-y-6">
                                <h4 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Final Details</h4>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Started Application? *</label>
                                        <select name="started_application" required onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none">
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Have Transcripts? (Grade 10-12) *</label>
                                        <select name="has_transcripts" required onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none">
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Tell us more about yourself (Optional)</label>
                                    <textarea name="goals" rows="4" onChange={handleChange} className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-600 outline-none resize-none" placeholder="Goals, hobbies, challenges, etc."></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 rounded-2xl bg-primary-600 text-white font-bold text-xl shadow-2xl shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Submit Complete Application <ChevronRight className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationForm;
