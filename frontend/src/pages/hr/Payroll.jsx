import React, { useState } from 'react';
import { Search, DollarSign, Download, Printer, Filter } from 'lucide-react';

const Payroll = () => {
    const [month, setMonth] = useState('June 2026');
    const [role, setRole] = useState('All');

    const staffData = [
        { id: '101', name: 'Alexander Smith', role: 'Teacher', basicSalary: '$4,500', status: 'Generated' },
        { id: '102', name: 'Maria Garcia', role: 'Librarian', basicSalary: '$3,200', status: 'Generated' },
        { id: '103', name: 'James Johnson', role: 'Bus Staff', basicSalary: '$2,100', status: 'Pending' },
        { id: '104', name: 'Emily Davis', role: 'Accountant', basicSalary: '$3,800', status: 'Paid' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Payroll Management</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Generate, view, and process staff salaries effortlessly.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-indigo-50">
                     <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                         <DollarSign className="w-5 h-5" />
                     </div>
                     <div className="pr-4">
                         <div className="text-xs text-slate-400 font-semibold uppercase">Total Payroll</div>
                         <div className="text-lg font-bold text-slate-800">$13,600</div>
                     </div>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col md:flex-row gap-5 justify-between items-end md:items-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="flex-1">
                        <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Select Month</label>
                        <select 
                            value={month}
                            onChange={e => setMonth(e.target.value)}
                            className="block w-full px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white transition-all cursor-pointer hover:border-slate-300 shadow-sm"
                        >
                            <option value="May 2026">May 2026</option>
                            <option value="June 2026">June 2026</option>
                            <option value="July 2026">July 2026</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Filter By Role</label>
                        <select 
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className="block w-full px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white transition-all cursor-pointer hover:border-slate-300 shadow-sm"
                        >
                            <option value="All">All Roles</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Librarian">Librarian</option>
                            <option value="Bus Staff">Bus Staff</option>
                            <option value="Accountant">Accountant</option>
                        </select>
                    </div>
                </div>
                
                <div className="relative w-full md:w-72 group">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search staff members..." 
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 shadow-inner"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Staff Member</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Role</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Basic Salary</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {staffData.filter(s => role === 'All' || s.role === role).map(staff => (
                                <tr key={staff.id} className="hover:bg-indigo-50/30 transition-all duration-200 group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                                                {staff.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{staff.name}</div>
                                                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">ID: {staff.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl border border-slate-200/60 shadow-sm">{staff.role}</span>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-700">{staff.basicSalary}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-xl shadow-sm border ${
                                            staff.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20' :
                                            staff.status === 'Generated' ? 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-500/20' :
                                            'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/20'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                staff.status === 'Paid' ? 'bg-emerald-500' :
                                                staff.status === 'Generated' ? 'bg-blue-500' :
                                                'bg-amber-500'
                                            }`}></span>
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        {staff.status === 'Pending' ? (
                                            <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5">
                                                Generate
                                            </button>
                                        ) : staff.status === 'Generated' ? (
                                            <div className="flex justify-end items-center gap-2">
                                                <button className="bg-emerald-500 text-white hover:bg-emerald-600 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5">
                                                    Process Pay
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"><Download className="w-4 h-4"/></button>
                                            </div>
                                        ) : (
                                            <button className="flex items-center justify-end w-full gap-2 text-indigo-600 hover:text-indigo-800 text-xs font-bold transition-colors group-hover:translate-x-1 duration-200">
                                                <Printer className="w-4 h-4" /> View Payslip
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

export default Payroll;
