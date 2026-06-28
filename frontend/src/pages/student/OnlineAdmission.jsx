import React, { useState } from 'react';
import { Search, Plus, CheckCircle, XCircle, Globe, Download, Eye } from 'lucide-react';

const OnlineAdmission = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const admissionData = [
        { id: 'OA-101', name: 'John Doe', class: 'Class 1', phone: '+1 234 567 8900', date: '12-Aug-2026', status: 'Pending' },
        { id: 'OA-102', name: 'Jane Smith', class: 'Class 5', phone: '+1 987 654 3210', date: '11-Aug-2026', status: 'Approved' },
        { id: 'OA-103', name: 'Mike Ross', class: 'Class 8', phone: '+1 555 123 4567', date: '10-Aug-2026', status: 'Rejected' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Online Admission</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Review and approve online student enrollment requests.</p>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col sm:flex-row gap-5 justify-between items-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="relative w-full sm:w-96 group">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search applicant name or ID..." 
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
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Applicant</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Applied For</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Phone</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {admissionData.map(student => (
                                <tr key={student.id} className="hover:bg-indigo-50/30 transition-all duration-200 group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                                                <Globe className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{student.name}</div>
                                                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">ID: {student.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-700">{student.class}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-600">{student.phone}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-600">{student.date}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-xl shadow-sm border ${
                                            student.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20' :
                                            student.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-500/20' :
                                            'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/20'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                student.status === 'Approved' ? 'bg-emerald-500' : 
                                                student.status === 'Rejected' ? 'bg-red-500' : 'bg-amber-500'
                                            }`}></span>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        {student.status === 'Pending' ? (
                                            <div className="flex justify-end gap-2">
                                                <button className="bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white p-2.5 rounded-xl transition-all shadow-sm" title="Approve">
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                                <button className="bg-red-50 text-red-600 hover:bg-red-500 hover:text-white p-2.5 rounded-xl transition-all shadow-sm" title="Reject">
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                                <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold transition-colors">View App</button>
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

export default OnlineAdmission;
