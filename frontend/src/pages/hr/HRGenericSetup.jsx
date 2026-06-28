import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const HRGenericSetup = ({ title, description, columns, initialData }) => {
    const [data, setData] = useState(initialData || []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">{title}</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">{description}</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5">
                    <Plus className="w-4 h-4" /> Add {title}
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                {columns.map((col, i) => (
                                    <th key={i} className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                        {col}
                                    </th>
                                ))}
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {data.map((row, i) => (
                                <tr key={i} className="hover:bg-indigo-50/30 transition-all duration-200 group">
                                    {Object.values(row).map((val, j) => (
                                        <td key={j} className="py-4 px-6 text-sm font-bold text-slate-700 group-hover:text-indigo-900 transition-colors">
                                            {val}
                                        </td>
                                    ))}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2">
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
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="py-12 text-center text-sm font-medium text-slate-400">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                                <Plus className="w-6 h-6" />
                                            </div>
                                            No data available yet.
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HRGenericSetup;
