import React, { useState } from 'react';
import { Search, DollarSign, Download, Printer } from 'lucide-react';

const TransportFees = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const feeData = [
        { id: 'ST001', name: 'Alice Walker', route: 'Downtown Express', amount: '$50.00', month: 'June 2026', status: 'Paid' },
        { id: 'ST002', name: 'Bob Marley', route: 'North Suburbs', amount: '$75.00', month: 'June 2026', status: 'Pending' },
        { id: 'ST004', name: 'Diana Prince', route: 'South District', amount: '$60.00', month: 'June 2026', status: 'Overdue' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Transport Fees</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Manage and collect transportation fees from students.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-indigo-50">
                     <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                         <DollarSign className="w-5 h-5" />
                     </div>
                     <div className="pr-4">
                         <div className="text-xs text-slate-400 font-bold uppercase">Total Collected</div>
                         <div className="text-lg font-bold text-slate-800">$1,250</div>
                     </div>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col sm:flex-row gap-5 justify-between items-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="relative w-full sm:w-96 group">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search student or ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 shadow-inner"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none bg-white shadow-sm hover:border-slate-300 cursor-pointer">
                        <option>June 2026</option>
                        <option>May 2026</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Student Details</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Route</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Month</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {feeData.map(fee => (
                                <tr key={fee.id} className="hover:bg-indigo-50/30 transition-all duration-200 group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                                                {fee.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{fee.name}</div>
                                                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{fee.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-600">{fee.route}</td>
                                    <td className="py-4 px-6 text-sm font-extrabold text-slate-700">{fee.amount}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-600">{fee.month}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-xl shadow-sm border ${
                                            fee.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20' :
                                            fee.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-500/20' :
                                            'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/20'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                fee.status === 'Paid' ? 'bg-emerald-500' :
                                                fee.status === 'Overdue' ? 'bg-red-500' :
                                                'bg-amber-500'
                                            }`}></span>
                                            {fee.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        {fee.status !== 'Paid' ? (
                                            <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5">
                                                Collect Pay
                                            </button>
                                        ) : (
                                            <button className="flex items-center justify-end w-full gap-2 text-indigo-600 hover:text-indigo-800 text-xs font-bold transition-colors group-hover:translate-x-1 duration-200">
                                                <Printer className="w-4 h-4" /> Receipt
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

export default TransportFees;
