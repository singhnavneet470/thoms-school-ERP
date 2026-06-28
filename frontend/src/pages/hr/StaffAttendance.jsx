import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check, X, Clock, AlertCircle } from 'lucide-react';

const StaffAttendance = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [department, setDepartment] = useState('All');

    const staffData = [
        { id: '101', name: 'Alexander Smith', role: 'Teacher', dept: 'Science' },
        { id: '102', name: 'Maria Garcia', role: 'Librarian', dept: 'Library' },
        { id: '103', name: 'James Johnson', role: 'Bus Staff', dept: 'Transport' },
        { id: '104', name: 'Emily Davis', role: 'Accountant', dept: 'Finance' },
    ];

    const [attendance, setAttendance] = useState({
        '101': 'present',
        '102': 'late',
        '103': 'absent',
        '104': 'present'
    });

    const handleMark = (id, status) => {
        setAttendance(prev => ({ ...prev, [id]: status }));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Staff Attendance</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Mark and view daily attendance for school employees.</p>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="flex flex-col sm:flex-row gap-5 mb-8">
                    <div className="flex-1">
                        <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Select Date</label>
                        <div className="relative group">
                            <CalendarIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input 
                                type="date" 
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="block w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-inner hover:border-slate-300"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Department</label>
                        <select 
                            value={department}
                            onChange={e => setDepartment(e.target.value)}
                            className="block w-full px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white transition-all shadow-sm hover:border-slate-300 cursor-pointer"
                        >
                            <option value="All">All Departments</option>
                            <option value="Science">Science</option>
                            <option value="Library">Library</option>
                            <option value="Transport">Transport</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button className="bg-indigo-600 text-white px-8 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 h-[42px] w-full sm:w-auto">
                            Fetch List
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto border border-slate-200/60 rounded-3xl shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Staff Member</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Department</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">Attendance Status</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Note</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {staffData.filter(s => department === 'All' || s.dept === department).map(staff => (
                                <tr key={staff.id} className="hover:bg-indigo-50/30 transition-all duration-200">
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800">{staff.name}</span>
                                            <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase mt-0.5">{staff.role} (ID: {staff.id})</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-semibold text-slate-600">{staff.dept}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => handleMark(staff.id, 'present')} className={`px-4 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all ${attendance[staff.id] === 'present' ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'}`}>
                                                <Check className="w-3.5 h-3.5" /> Present
                                            </button>
                                            <button onClick={() => handleMark(staff.id, 'late')} className={`px-4 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all ${attendance[staff.id] === 'late' ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-600'}`}>
                                                <Clock className="w-3.5 h-3.5" /> Late
                                            </button>
                                            <button onClick={() => handleMark(staff.id, 'absent')} className={`px-4 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all ${attendance[staff.id] === 'absent' ? 'bg-red-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600'}`}>
                                                <X className="w-3.5 h-3.5" /> Absent
                                            </button>
                                            <button onClick={() => handleMark(staff.id, 'half_day')} className={`px-4 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all ${attendance[staff.id] === 'half_day' ? 'bg-purple-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-purple-50 hover:text-purple-600'}`}>
                                                <AlertCircle className="w-3.5 h-3.5" /> Half Day
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <input type="text" placeholder="Add note..." className="w-full px-4 py-2 text-sm font-medium border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 bg-slate-50 focus:bg-white" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="mt-8 flex justify-end">
                    <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5">
                        Save Attendance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaffAttendance;
