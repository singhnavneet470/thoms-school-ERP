import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Plus } from 'lucide-react';

const LeaveRequest = ({ type = 'approve' }) => {
    // type can be 'approve' (for HR to approve) or 'apply' (for staff to apply)
    const [view, setView] = useState('list'); // list or form

    const leaveData = [
        { id: '1', name: 'Alexander Smith', role: 'Teacher', type: 'Sick Leave', from: '2026-06-29', to: '2026-06-30', status: 'Pending', days: 2 },
        { id: '2', name: 'Maria Garcia', role: 'Librarian', type: 'Casual Leave', from: '2026-07-05', to: '2026-07-07', status: 'Approved', days: 3 },
        { id: '3', name: 'James Johnson', role: 'Bus Staff', type: 'Emergency', from: '2026-06-25', to: '2026-06-25', status: 'Rejected', days: 1 },
    ];

    if (view === 'form' || type === 'apply') {
        return (
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Apply for Leave</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Submit a new leave request for approval.</p>
                </div>

                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setView('list'); }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Leave Type</label>
                                <select className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer">
                                    <option>Sick Leave</option>
                                    <option>Casual Leave</option>
                                    <option>Maternity Leave</option>
                                    <option>Emergency Leave</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Leave Date (From - To)</label>
                                <div className="flex gap-2 items-center">
                                    <input type="date" className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer" />
                                    <span className="text-slate-400 font-bold">-</span>
                                    <input type="date" className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer" />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Reason</label>
                                <textarea rows="4" className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all placeholder:text-slate-400" placeholder="Provide a brief reason for your leave..."></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Attach Document (Optional)</label>
                                <input type="file" className="block w-full text-sm font-medium text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                            {type === 'approve' && (
                                <button type="button" onClick={() => setView('list')} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-all">
                                    Cancel
                                </button>
                            )}
                            <button type="submit" className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all">
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Approve Leave Requests</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Manage and approve staff leave applications.</p>
                </div>
                <button onClick={() => setView('form')} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5">
                    <Plus className="w-4 h-4" /> Add Leave Request
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Staff Member</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Leave Type</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {leaveData.map(req => (
                                <tr key={req.id} className="hover:bg-indigo-50/30 transition-all duration-200">
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-bold text-slate-800">{req.name}</div>
                                        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{req.role}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/60 shadow-sm">{req.type}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-bold text-slate-700">{req.from} to {req.to}</div>
                                        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{req.days} Day(s)</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`flex items-center gap-1.5 w-fit px-3 py-1 text-xs font-bold rounded-xl shadow-sm border ${
                                            req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20' :
                                            req.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-500/20' :
                                            'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/20'
                                        }`}>
                                            {req.status === 'Approved' ? <CheckCircle className="w-3.5 h-3.5" /> : 
                                             req.status === 'Rejected' ? <XCircle className="w-3.5 h-3.5" /> : 
                                             <Clock className="w-3.5 h-3.5" />}
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        {req.status === 'Pending' ? (
                                            <div className="flex justify-end gap-2">
                                                <button className="bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white p-2.5 rounded-xl transition-all shadow-sm" title="Approve">
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                                <button className="bg-red-50 text-red-600 hover:bg-red-500 hover:text-white p-2.5 rounded-xl transition-all shadow-sm" title="Reject">
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold transition-colors">View Details</button>
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

export default LeaveRequest;
