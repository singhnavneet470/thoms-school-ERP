import React, { useState } from 'react';
import { Search, MapPin, Navigation, User, Edit2, Download } from 'lucide-react';

const StudentTransport = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const studentData = [
        { id: 'ST001', name: 'Alice Walker', grade: 'Grade 10', route: 'Downtown Express', point: 'Central Station', status: 'Assigned' },
        { id: 'ST002', name: 'Bob Marley', grade: 'Grade 8', route: 'North Suburbs', point: 'Pine Valley East', status: 'Assigned' },
        { id: 'ST003', name: 'Charlie Brown', grade: 'Grade 5', route: 'Pending', point: 'Pending', status: 'Unassigned' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Student Transport Allocation</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Assign students to routes and pickup points.</p>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col sm:flex-row gap-5 justify-between items-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="relative w-full sm:w-96 group">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search student by name or ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 shadow-inner"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Student</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Grade</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Route Details</th>
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
                                                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{student.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-600">{student.grade}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                                                <Navigation className="w-3.5 h-3.5 text-indigo-500" />
                                                {student.route}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                                                <MapPin className="w-3 h-3 text-slate-400" />
                                                {student.point}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-xl shadow-sm border ${
                                            student.status === 'Assigned' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20' :
                                            'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-500/20'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                student.status === 'Assigned' ? 'bg-emerald-500' : 'bg-red-500'
                                            }`}></span>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        {student.status === 'Unassigned' ? (
                                            <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5">
                                                Assign
                                            </button>
                                        ) : (
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        )}
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

export default StudentTransport;
