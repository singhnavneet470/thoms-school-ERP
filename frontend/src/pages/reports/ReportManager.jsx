import React, { useState, useEffect } from 'react';
import { BarChart2, Users, Calendar, DollarSign, BookOpen, Download, Filter, Printer } from 'lucide-react';

const ReportManager = ({ type }) => {
    // type: 'student', 'attendance', 'fee', 'exam', 'staff'
    const [data, setData] = useState([]);
    
    const config = {
        student: { title: 'Student Report', icon: Users, color: 'blue', desc: 'Demographic and enrollment statistics.' },
        attendance: { title: 'Attendance Report', icon: Calendar, color: 'emerald', desc: 'Daily and monthly attendance trends.' },
        fee: { title: 'Fee Collection Report', icon: DollarSign, color: 'indigo', desc: 'Revenue, dues, and payment collections.' },
        exam: { title: 'Examination Report', icon: BookOpen, color: 'purple', desc: 'Academic performance and grade analysis.' },
        staff: { title: 'Staff Report', icon: Users, color: 'amber', desc: 'Employee distribution and payroll overview.' }
    }[type] || { title: 'Report', icon: BarChart2, color: 'slate', desc: 'View analytics.' };

    useEffect(() => {
        // Mocking report data based on type for demonstration
        if (type === 'student') {
            const students = JSON.parse(localStorage.getItem('thoms_students')) || [];
            setData(students.length ? students : [
                { id: 1, name: 'John Doe', class: '10', section: 'A', gender: 'Male', status: 'Active' },
                { id: 2, name: 'Jane Smith', class: '9', section: 'B', gender: 'Female', status: 'Active' }
            ]);
        } else if (type === 'fee') {
            setData([
                { id: 1, date: '2026-06-01', amount: '$5,000', method: 'Razorpay', status: 'Paid', student: 'John Doe' },
                { id: 2, date: '2026-06-05', amount: '$4,200', method: 'Cash', status: 'Paid', student: 'Alice Johnson' },
                { id: 3, date: '2026-06-10', amount: '$3,000', method: 'Bank Transfer', status: 'Pending', student: 'Bob Williams' }
            ]);
        } else if (type === 'exam') {
            setData([
                { id: 1, student: 'John Doe', subject: 'Mathematics', marks: '85/100', grade: 'A', status: 'Pass' },
                { id: 2, student: 'Jane Smith', subject: 'Science', marks: '92/100', grade: 'A+', status: 'Pass' },
                { id: 3, student: 'Alice Johnson', subject: 'History', marks: '45/100', grade: 'C', status: 'Pass' }
            ]);
        } else {
            setData([
                { id: 1, metric: 'Total Records', value: '150', trend: '+5%' },
                { id: 2, metric: 'Active Entries', value: '142', trend: '+2%' },
                { id: 3, metric: 'Pending Review', value: '8', trend: '-1%' }
            ]);
        }
    }, [type]);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
                <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${config.color}-50 text-${config.color}-600 rounded-xl`}>
                        <config.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">{config.title}</h1>
                        <p className="text-sm text-slate-500 font-medium">{config.desc}</p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-xl border border-slate-200 transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-xl border border-slate-200 transition-colors">
                        <Printer className="w-4 h-4" /> Print
                    </button>
                    <button className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-${config.color}-600 hover:bg-${config.color}-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors`}>
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-sm font-bold text-slate-500 mb-1">Total Records</p>
                    <h3 className="text-3xl font-black text-slate-800">{data.length * 14}</h3>
                    <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded-md">
                        +12% this month
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-sm font-bold text-slate-500 mb-1">Active / Verified</p>
                    <h3 className="text-3xl font-black text-slate-800">{data.length * 12}</h3>
                    <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded-md">
                        98% completion
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-sm font-bold text-slate-500 mb-1">Requires Attention</p>
                    <h3 className="text-3xl font-black text-slate-800">{data.length * 2}</h3>
                    <div className="mt-2 text-xs font-bold text-rose-600 bg-rose-50 inline-block px-2 py-1 rounded-md">
                        Action needed
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                {data.length > 0 && Object.keys(data[0]).map(key => (
                                    <th key={key} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        {key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    {Object.values(row).map((val, vIdx) => (
                                        <td key={vIdx} className="px-6 py-4 text-sm font-semibold text-slate-700">
                                            {String(val)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {data.length === 0 && (
                    <div className="p-12 text-center text-slate-400">
                        <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p className="font-medium">No data available for this report.</p>
                    </div>
                )}
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-sm font-medium text-slate-500">
                    <div>Showing {data.length} records</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">Previous</button>
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportManager;
