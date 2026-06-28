import React, { useState } from 'react';
import { Search, Trash2, AlertTriangle } from 'lucide-react';

const BulkDelete = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selected, setSelected] = useState([]);

    const studentData = [
        { id: '1007', name: 'Gary Oldman', class: 'Class 10', section: 'A' },
        { id: '1008', name: 'Helen Mirren', class: 'Class 10', section: 'A' },
        { id: '1009', name: 'Ian McKellen', class: 'Class 10', section: 'B' },
    ];

    const toggleSelect = (id) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleAll = () => {
        if (selected.length === studentData.length) {
            setSelected([]);
        } else {
            setSelected(studentData.map(s => s.id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-rose-50 to-red-50 p-6 rounded-3xl border border-rose-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-red-700 tracking-tight">Bulk Delete Students</h1>
                    <p className="text-sm text-rose-600/80 font-medium mt-1">Permanently remove multiple student records simultaneously.</p>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col sm:flex-row gap-5 justify-between items-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="relative w-full sm:w-96 group">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search student by name or ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 shadow-inner"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <select className="px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none bg-white shadow-sm hover:border-slate-300 cursor-pointer flex-1 sm:flex-none">
                        <option value="">Select Class</option>
                        <option value="10">Class 10</option>
                    </select>
                    <select className="px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none bg-white shadow-sm hover:border-slate-300 cursor-pointer flex-1 sm:flex-none">
                        <option value="">Select Section</option>
                        <option value="A">Section A</option>
                    </select>
                </div>
            </div>

            {selected.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-red-700 font-bold">
                        <AlertTriangle className="w-5 h-5" />
                        <span>{selected.length} student(s) selected for deletion.</span>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:-translate-y-0.5 transition-all">
                        <Trash2 className="w-4 h-4" /> Delete Selected
                    </button>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                <th className="py-4 px-6 w-12 text-center">
                                    <input 
                                        type="checkbox" 
                                        checked={selected.length === studentData.length && studentData.length > 0} 
                                        onChange={toggleAll}
                                        className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-600 cursor-pointer"
                                    />
                                </th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Student</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Class</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Section</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {studentData.map(student => (
                                <tr key={student.id} className={`transition-all duration-200 group ${selected.includes(student.id) ? 'bg-red-50/50' : 'hover:bg-rose-50/30'}`}>
                                    <td className="py-4 px-6 text-center">
                                        <input 
                                            type="checkbox" 
                                            checked={selected.includes(student.id)} 
                                            onChange={() => toggleSelect(student.id)}
                                            className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-600 cursor-pointer"
                                        />
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <div className="text-sm font-bold text-slate-800">{student.name}</div>
                                            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Adm No: {student.id}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-700">{student.class}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-700">Section {student.section}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BulkDelete;
