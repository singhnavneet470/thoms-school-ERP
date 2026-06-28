import React, { useState } from 'react';
import { Search, Plus, Map, Car, Link2, Trash2 } from 'lucide-react';

const AssignVehicle = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const assignData = [
        { id: '1', route: 'Downtown Express', vehicle: 'DL-01-AB-1234', capacity: 45 },
        { id: '2', route: 'North Suburbs', vehicle: 'DL-01-XY-5678', capacity: 50 },
        { id: '3', route: 'South District', vehicle: 'DL-01-ZZ-9999', capacity: 20 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Assign Vehicle</h1>
                    <p className="text-sm text-indigo-600/80 font-medium mt-1">Link vehicles to their respective transport routes.</p>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Select Route</label>
                            <select className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer">
                                <option>Select Route</option>
                                <option>Downtown Express</option>
                                <option>North Suburbs</option>
                                <option>South District</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Select Vehicle</label>
                            <select className="block w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all cursor-pointer">
                                <option>Select Vehicle</option>
                                <option>DL-01-AB-1234 (45 Seats)</option>
                                <option>DL-01-XY-5678 (50 Seats)</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all">
                            <Link2 className="w-4 h-4" /> Assign Vehicle
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden mt-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/80">
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Route</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Assigned Vehicle</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Capacity</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {assignData.map(item => (
                                <tr key={item.id} className="hover:bg-indigo-50/30 transition-all duration-200 group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                                <Map className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-800">{item.route}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                                <Car className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-800">{item.vehicle}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl shadow-sm border border-slate-200/60">
                                            {item.capacity} Seats
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
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

export default AssignVehicle;
