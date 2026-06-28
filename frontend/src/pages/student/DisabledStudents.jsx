import React, { useState } from 'react';
import { Search, UserMinus, FileText, Undo2 } from 'lucide-react';

const DisabledStudents = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const disabledData = [
        { id: '1005', name: 'Emily Clark', class: 'Class 9', section: 'C', gender: 'Female', reason: 'Transfer to another city', date: '01-May-2026' },
        { id: '1006', name: 'Frank Wright', class: 'Class 11', section: 'Commerce', gender: 'Male', reason: 'Financial Issues', date: '15-Apr-2026' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-3xl border border-red-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-orange-700 tracking-tight">Disabled Students</h1>
                    <p className="text-sm text-red-600/80 font-medium mt-1">View students who have been disabled or removed from the active roster.</p>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col sm:flex-row gap-5 justify-between items-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="relative w-full sm:w-96 group">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search student by name or ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 shadow-inner"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <select className="px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none bg-white shadow-sm hover:border-slate-300 cursor-pointer flex-1 sm:flex-none">
                        <option value="">Class</option>
                        <option value="10">Class 10</option>
                        <option value="8">Class 8</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Student</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Class & Section</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Disable Reason</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Disable Date</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {disabledData.map(student => (
                                <tr key={student.id} className="hover:bg-red-50/30 transition-all duration-200 group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-100 to-orange-100 text-red-700 flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                                                <UserMinus className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 group-hover:text-red-700 transition-colors">{student.name}</div>
                                                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Adm No: {student.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-bold text-slate-700">{student.class}</div>
                                        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Section {student.section}</div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-red-600">{student.reason}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-600">{student.date}</td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors" title="Enable Student">
                                                <Undo2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors" title="View Details">
                                                <FileText className="w-4 h-4" />
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
    );
};

export default DisabledStudents;
