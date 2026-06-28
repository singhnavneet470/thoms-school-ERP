import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Mail, Phone, MapPin } from 'lucide-react';

const StaffDirectory = () => {
    const [view, setView] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');

    const staffData = [
        { id: '101', name: 'Alexander Smith', role: 'Teacher', department: 'Science', phone: '+1 234-567-8900', email: 'alex@school.com', status: 'Active' },
        { id: '102', name: 'Maria Garcia', role: 'Librarian', department: 'Library', phone: '+1 234-567-8901', email: 'maria@school.com', status: 'Active' },
        { id: '103', name: 'James Johnson', role: 'Bus Staff', department: 'Transport', phone: '+1 234-567-8902', email: 'james@school.com', status: 'On Leave' },
        { id: '104', name: 'Emily Davis', role: 'Accountant', department: 'Finance', phone: '+1 234-567-8903', email: 'emily@school.com', status: 'Active' },
        { id: '105', name: 'Michael Brown', role: 'Fee Collector', department: 'Finance', phone: '+1 234-567-8904', email: 'michael@school.com', status: 'Active' },
        { id: '106', name: 'Sarah Wilson', role: 'Teacher', department: 'Mathematics', phone: '+1 234-567-8905', email: 'sarah@school.com', status: 'Active' },
    ];

    const filteredStaff = staffData.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.role.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Staff Directory</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Manage all school staff members, teachers, and employees.</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5">
                    <Plus className="w-4 h-4" /> Add Staff Member
                </button>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col sm:flex-row gap-5 justify-between items-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="relative w-full sm:w-96 group">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search by name, role, or ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 shadow-inner"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 text-sm font-bold transition-all w-full sm:w-auto justify-center shadow-sm hover:shadow">
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                    <div className="flex bg-slate-100/80 p-1.5 rounded-2xl shadow-inner border border-slate-200/50">
                        <button onClick={() => setView('grid')} className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all duration-200 ${view === 'grid' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>Grid</button>
                        <button onClick={() => setView('list')} className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all duration-200 ${view === 'list' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>List</button>
                    </div>
                </div>
            </div>

            {view === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStaff.map(staff => (
                        <div key={staff.id} className="bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 p-6 group">
                            <div className="flex justify-between items-start mb-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm ring-2 ring-white transform group-hover:scale-105 transition-transform duration-300">
                                        {staff.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{staff.name}</h3>
                                        <span className="inline-block px-2.5 py-1 bg-slate-100 border border-slate-200/60 text-slate-600 text-[10px] uppercase tracking-widest font-bold rounded-lg mt-1.5 shadow-sm">{staff.role}</span>
                                    </div>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-3 mt-5 pt-5 border-t border-slate-100">
                                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium group-hover:text-slate-700 transition-colors">
                                    <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors"><Mail className="w-4 h-4" /></div> {staff.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium group-hover:text-slate-700 transition-colors">
                                    <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors"><Phone className="w-4 h-4" /></div> {staff.phone}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium group-hover:text-slate-700 transition-colors">
                                    <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors"><MapPin className="w-4 h-4" /></div> {staff.department} Dept.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Staff ID</th>
                                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Name</th>
                                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Role</th>
                                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Department</th>
                                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Contact</th>
                                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/80">
                                {filteredStaff.map(staff => (
                                    <tr key={staff.id} className="hover:bg-indigo-50/30 transition-all duration-200 group">
                                        <td className="py-4 px-6 text-sm font-bold text-slate-400">#{staff.id}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ring-2 ring-white">
                                                    {staff.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{staff.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="px-3 py-1 bg-slate-100 border border-slate-200/60 text-slate-600 text-xs rounded-xl font-bold shadow-sm">{staff.role}</span>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-slate-500">{staff.department}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-slate-500">
                                            <div>{staff.phone}</div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm">View Profile</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffDirectory;
