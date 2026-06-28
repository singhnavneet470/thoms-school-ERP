import React from 'react';
import { Save, User, Camera } from 'lucide-react';

const StudentAdmission = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Student Admission</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Register a new student with complete academic and personal details.</p>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    {/* Basic Info */}
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">1</span>
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">First Name *</label>
                                <input type="text" className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all placeholder:text-slate-400" placeholder="First Name" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Last Name *</label>
                                <input type="text" className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all placeholder:text-slate-400" placeholder="Last Name" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Gender *</label>
                                <select className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer">
                                    <option>Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Date of Birth *</label>
                                <input type="date" className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Category</label>
                                <select className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer">
                                    <option>General</option>
                                    <option>OBC</option>
                                    <option>SC/ST</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Religion</label>
                                <input type="text" className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all placeholder:text-slate-400" />
                            </div>
                        </div>
                    </div>

                    {/* Academic Info */}
                    <div className="pt-6 border-t border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">2</span>
                            Academic Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Class *</label>
                                <select className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer">
                                    <option>Select Class</option>
                                    <option>Class 1</option>
                                    <option>Class 2</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Section *</label>
                                <select className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer">
                                    <option>Select Section</option>
                                    <option>A</option>
                                    <option>B</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Admission No *</label>
                                <input type="text" className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all placeholder:text-slate-400" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Admission Date</label>
                                <input type="date" className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Parent Info */}
                    <div className="pt-6 border-t border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">3</span>
                            Parent / Guardian Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Father Name</label>
                                <input type="text" className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all placeholder:text-slate-400" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Father Phone</label>
                                <input type="text" className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all placeholder:text-slate-400" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Father Occupation</label>
                                <input type="text" className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all placeholder:text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-slate-100">
                        <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all">
                            <Save className="w-4 h-4" /> Save Admission
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentAdmission;
