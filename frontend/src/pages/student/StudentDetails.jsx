import React, { useState } from 'react';
import { Search, Plus, User, FileText, Download, Edit2, Trash2, Filter } from 'lucide-react';

const StudentDetails = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const studentData = [
        { id: '1001', name: 'Alice Walker', class: 'Class 10', section: 'A', gender: 'Female', phone: '+1 234 567 8900', status: 'Active' },
        { id: '1002', name: 'Bob Marley', class: 'Class 8', section: 'B', gender: 'Male', phone: '+1 234 567 8901', status: 'Active' },
        { id: '1003', name: 'Charlie Brown', class: 'Class 5', section: 'A', gender: 'Male', phone: '+1 234 567 8902', status: 'Inactive' },
        { id: '1004', name: 'Diana Prince', class: 'Class 12', section: 'Science', gender: 'Female', phone: '+1 234 567 8903', status: 'Active' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Student Details</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Search, view, and manage student profiles.</p>
                </div>
                <div className="flex gap-2">
                    <button className="inline-flex items-center gap-2 bg-white text-slate-700 px-5 py-2.5 rounded-2xl text-sm font-bold border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                        <Download className="w-4 h-4" /> Export
                    </button>
                    <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5">
                        <Plus className="w-4 h-4" /> Add Student
                    </button>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col sm:flex-row gap-5 justify-between items-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="relative w-full sm:w-96 group">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search by keyword..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 shadow-inner"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <select className="px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none bg-white shadow-sm hover:border-slate-300 cursor-pointer flex-1 sm:flex-none">
                        <option value="">Class</option>
                        <option value="10">Class 10</option>
                        <option value="8">Class 8</option>
                    </select>
                    <select className="px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none bg-white shadow-sm hover:border-slate-300 cursor-pointer flex-1 sm:flex-none">
                        <option value="">Section</option>
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                    </select>
                    <button className="p-2.5 border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Student</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Class & Section</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Gender</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Phone</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {studentData.map(student => (
                                <tr key={student.id} className="hover:bg-indigo-50/30 transition-all duration-200 group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{student.name}</div>
                                                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Adm No: {student.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-bold text-slate-700">{student.class}</div>
                                        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Section {student.section}</div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-600">{student.gender}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-600">{student.phone}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-xl shadow-sm border ${
                                            student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20' :
                                            'bg-slate-50 text-slate-700 border-slate-200 ring-1 ring-slate-500/20'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                student.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                                            }`}></span>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                                                <FileText className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                                <Trash2 className="w-4 h-4" />
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

export default StudentDetails;
