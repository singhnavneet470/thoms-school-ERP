import React, { useState } from 'react';
import { Search, Plus, Layers, Save, X } from 'lucide-react';

const MultiClassStudent = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const multiData = [
        { id: '1001', name: 'Alice Walker', primaryClass: 'Class 10 - A', additionalClasses: ['Music - Advanced', 'French - Beginner'] },
        { id: '1004', name: 'Diana Prince', primaryClass: 'Class 12 - Science', additionalClasses: ['Sports - Basketball', 'Debate Club'] },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Multi-Class Students</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Assign and manage students enrolled in multiple classes or special sections.</p>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Select Student</label>
                            <select className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer">
                                <option>Select Student...</option>
                                <option>Alice Walker (1001)</option>
                                <option>Bob Marley (1002)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Add to Class/Section</label>
                            <select className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer">
                                <option>Select Additional Class...</option>
                                <option>Music - Advanced</option>
                                <option>French - Beginner</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all">
                            <Plus className="w-4 h-4" /> Add Multi-Class
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden mt-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Student</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Primary Class</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Additional Classes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {multiData.map(student => (
                                <tr key={student.id} className="hover:bg-indigo-50/30 transition-all duration-200 group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                                                <Layers className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{student.name}</div>
                                                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Adm No: {student.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-700">{student.primaryClass}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-wrap gap-2">
                                            {student.additionalClasses.map((cls, idx) => (
                                                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200/60 shadow-sm">
                                                    {cls}
                                                    <button className="text-slate-400 hover:text-red-500 transition-colors ml-1">
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MultiClassStudent;
