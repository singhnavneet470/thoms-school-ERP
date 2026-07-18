import React, { useState } from 'react';
import { DollarSign, Search, FileText, CheckCircle, Plus, Printer, Building, School, FileSpreadsheet, FileDown } from 'lucide-react';

const allStudents = [
    { id: 1, admNo: '18005', name: 'Glen Stark', father: 'James Stark', dob: '09/10/2015', mobile: '9658471234', class: 'Class 5', section: 'B', monthlyFee: 5000, paidMonths: ['April', 'May', 'June'] },
    { id: 2, admNo: '18010', name: 'Kriti Singh', father: 'Manish Singh', dob: '06/17/2015', mobile: '49456454', class: 'Class 5', section: 'B', monthlyFee: 5000, paidMonths: ['April', 'May'] },
    { id: 3, admNo: '18020', name: 'Jhony Taylor', father: 'Paul', dob: '06/04/2014', mobile: '87978567', class: 'Class 5', section: 'A', monthlyFee: 5000, paidMonths: [] },
    { id: 4, admNo: '18029', name: 'Rahul Sinha', father: 'G S Sinha', dob: '02/10/2010', mobile: '8527413690', class: 'Class 5', section: 'B', monthlyFee: 5000, paidMonths: ['April', 'May', 'June', 'July'] },
    { id: 5, admNo: '18088', name: 'Andrew Donna', father: 'Kenneth Donna', dob: '06/17/2010', mobile: '906767785', class: 'Class 6', section: 'A', monthlyFee: 5500, paidMonths: ['April'] },
    { id: 6, admNo: '911664', name: 'Henry Brown', father: '', dob: '07/04/2018', mobile: '9897919622', class: 'Class 6', section: 'B', monthlyFee: 5500, paidMonths: ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'] },
    { id: 7, admNo: '922259', name: 'Sophia Miller', father: '', dob: '10/15/2017', mobile: '9843514351', class: 'Class 7', section: 'A', monthlyFee: 6000, paidMonths: ['April', 'May', 'June'] },
];

const classes = ['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const sections = ['A', 'B', 'C', 'D'];
const months = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];
const feeStructures = [
    { id: 1, class: 'Class 10', term: 'Term 1', amount: 5000, type: 'Tuition Fee' },
    { id: 2, class: 'Class 10', term: 'Term 1', amount: 2000, type: 'Transport Fee' },
    { id: 3, class: 'Class 10', term: 'Term 1', amount: 500, type: 'Library Fee' },
];

const FeeManager = ({ type }) => {
    const [filterClass, setFilterClass] = useState('');
    const [filterSection, setFilterSection] = useState('');
    const [keyword, setKeyword] = useState('');
    const [searched, setSearched] = useState(false);
    const [results, setResults] = useState([]);
    const [collectingFor, setCollectingFor] = useState(null);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    const handleSearch = () => {
        const filtered = allStudents.filter(s =>
            (!filterClass || s.class === filterClass) &&
            (!filterSection || s.section === filterSection) &&
            (!keyword || s.name.toLowerCase().includes(keyword.toLowerCase()) || s.admNo.includes(keyword) || s.mobile.includes(keyword))
        );
        setResults(filtered);
        setSearched(true);
        setCollectingFor(null);
    };

    const toggleMonth = (m) => {
        setSelectedMonths(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
    };

    if (type === 'invoice') {
        return (
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-slate-200 mt-6 print:m-0 print:shadow-none print:border-none">
                <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                            <School className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">THOMS SCHOOL</h1>
                            <p className="text-sm font-medium text-slate-500">Excellence in Education</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-4xl font-black text-indigo-100 tracking-widest uppercase">INVOICE</h2>
                        <p className="text-sm font-bold text-slate-600 mt-2">Receipt #: INV-2026-001</p>
                        <p className="text-sm font-semibold text-slate-500">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-12 mb-10">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</p>
                        <h3 className="text-xl font-bold text-slate-800">John Doe</h3>
                        <p className="text-sm font-semibold text-slate-600 mt-1">Class: 10 - Section: A</p>
                        <p className="text-sm font-semibold text-slate-600">Roll No: 101</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Payment Status</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold">
                            <CheckCircle className="w-5 h-5" /> PAID IN FULL
                        </div>
                    </div>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden mb-8">
                    <table className="w-full text-left">
                        <thead className="bg-slate-100 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Fee Description</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {feeStructures.map(fee => (
                                <tr key={fee.id} className="bg-white">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-700">{fee.type}</p>
                                        <p className="text-xs text-slate-500">{fee.term}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-bold text-slate-700">₹{fee.amount.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mb-12">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-sm font-bold text-slate-600"><span>Subtotal</span><span>₹7,500</span></div>
                        <div className="flex justify-between text-sm font-bold text-slate-600"><span>Late Fine</span><span>₹0</span></div>
                        <div className="pt-3 border-t-2 border-slate-200 flex justify-between text-lg font-black text-indigo-600"><span>Total Paid</span><span>₹7,500</span></div>
                    </div>
                </div>
                <div className="border-t border-slate-100 pt-8 text-center flex flex-col items-center">
                    <p className="text-sm font-bold text-slate-500 mb-6">Thank you for your timely payment!</p>
                    <button onClick={() => window.print()} className="print:hidden flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-md">
                        <Printer className="w-5 h-5" /> Print Invoice
                    </button>
                </div>
            </div>
        );
    }

    if (type === 'collect') {
        if (collectingFor) {
            return (
                <div className="max-w-5xl mx-auto space-y-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => { setCollectingFor(null); setSelectedMonths([]); }} className="text-sm text-indigo-600 font-bold hover:underline">← Back to Student List</button>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">{collectingFor.name}</h2>
                                <p className="text-sm text-slate-500">{collectingFor.class} - Sec {collectingFor.section} &nbsp;|&nbsp; Adm No: {collectingFor.admNo} &nbsp;|&nbsp; Mobile: {collectingFor.mobile}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase">Monthly Fee</p>
                                <p className="text-xl font-bold text-slate-800">₹{collectingFor.monthlyFee.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Select</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Month</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Amount</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-right">Receipt</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {months.map(month => {
                                        const isPaid = collectingFor.paidMonths.includes(month);
                                        const isSel = selectedMonths.includes(month);
                                        return (
                                            <tr key={month} className={`transition-colors ${isSel ? 'bg-indigo-50/40' : 'hover:bg-slate-50'}`}>
                                                <td className="px-4 py-2.5">
                                                    <input type="checkbox" checked={isSel} disabled={isPaid} onChange={() => toggleMonth(month)} className="w-4 h-4 text-indigo-600 rounded border-slate-300 disabled:opacity-40" />
                                                </td>
                                                <td className="px-4 py-2.5 text-sm font-semibold text-slate-700">{month}</td>
                                                <td className="px-4 py-2.5 text-sm text-slate-600">₹{isPaid ? 0 : collectingFor.monthlyFee.toLocaleString()}</td>
                                                <td className="px-4 py-2.5">
                                                    {isPaid
                                                        ? <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded"><CheckCircle className="w-3 h-3" />Paid</span>
                                                        : <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded">Unpaid</span>
                                                    }
                                                </td>
                                                <td className="px-4 py-2.5 text-right">
                                                    {isPaid ? <button className="text-xs font-bold text-indigo-600 hover:underline">View</button> : <span className="text-slate-300 text-xs">—</span>}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-end justify-between gap-4">
                            <div className="flex gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Payment Mode</label>
                                    <select className="px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-medium outline-none">
                                        <option>Cash</option><option>Cheque</option><option>Bank Transfer</option><option>UPI</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Fine / Discount</label>
                                    <input type="number" placeholder="₹0" className="px-3 py-1.5 w-24 bg-white border border-slate-200 rounded text-sm outline-none" />
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-400">Total ({selectedMonths.length} month{selectedMonths.length !== 1 ? 's' : ''})</p>
                                    <p className="text-xl font-bold text-slate-800">₹{(selectedMonths.length * collectingFor.monthlyFee).toLocaleString()}</p>
                                </div>
                                <button disabled={selectedMonths.length === 0} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded font-bold text-sm transition-colors">
                                    Submit Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-7xl mx-auto space-y-4">
                {/* Select Criteria */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <h2 className="text-base font-bold text-slate-700 mb-4">Select Criteria</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Class <span className="text-rose-500">*</span></label>
                            <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm font-medium outline-none focus:border-indigo-400">
                                <option value="">Select Class</option>
                                {classes.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Section</label>
                            <select value={filterSection} onChange={e => setFilterSection(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm font-medium outline-none focus:border-indigo-400">
                                <option value="">All Sections</option>
                                {sections.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Search By Keyword</label>
                            <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Name, Roll Number, Enroll No, Mobile..." className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm outline-none focus:border-indigo-400" />
                        </div>
                        <div>
                            <button onClick={handleSearch} className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold text-sm transition-colors">
                                <Search className="w-4 h-4" /> Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Student List */}
                {searched && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-base font-bold text-slate-700">Student List</h2>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
                                    <input type="text" placeholder="Search" onChange={e => setKeyword(e.target.value)} className="pl-8 pr-3 py-1.5 border border-slate-200 rounded text-xs outline-none w-36" />
                                </div>
                                <button title="Export Excel" className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-500"><FileSpreadsheet className="w-4 h-4" /></button>
                                <button title="Export CSV" className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-500"><FileDown className="w-4 h-4" /></button>
                                <button title="Print" className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-500"><Printer className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        {['Class','Section','Admission No','Student Name','Father Name','Date of Birth','Mobile No.','Action'].map(h => (
                                            <th key={h} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {results.length === 0 ? (
                                        <tr><td colSpan="8" className="px-4 py-10 text-center text-slate-400 text-sm">No students found matching the criteria.</td></tr>
                                    ) : results.map(student => (
                                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 text-sm text-slate-700">{student.class}</td>
                                            <td className="px-4 py-3 text-sm text-slate-700">{student.section}</td>
                                            <td className="px-4 py-3 text-sm text-slate-700">{student.admNo}</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-indigo-600">{student.name}</td>
                                            <td className="px-4 py-3 text-sm text-slate-600">{student.father || '—'}</td>
                                            <td className="px-4 py-3 text-sm text-slate-600">{student.dob}</td>
                                            <td className="px-4 py-3 text-sm text-slate-600">{student.mobile}</td>
                                            <td className="px-4 py-3">
                                                <button onClick={() => { setCollectingFor(student); setSelectedMonths([]); }} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded transition-colors whitespace-nowrap">
                                                    Collect Fees
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-3 border-t border-slate-100 text-xs text-slate-500 bg-slate-50">
                            Showing {results.length} student{results.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Default: 'master' - Fee Structure
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Building className="w-6 h-6" /></div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Fee Structure Master</h1>
                        <p className="text-sm text-slate-500 font-medium">Design class-wise fee structures and rules.</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors">
                    <Plus className="w-4 h-4" /> Add Fee Head
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 h-fit">
                    <h2 className="font-bold text-slate-800 mb-4 px-2">Classes</h2>
                    <div className="space-y-1">
                        {classes.map(c => (
                            <button key={c} onClick={() => setSelectedClass(c)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${selectedClass === c || (!selectedClass && c === classes[0]) ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>{c}</button>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h2 className="text-lg font-bold text-slate-800">Fee Structure: {selectedClass || classes[0]}</h2>
                    </div>
                    <div className="p-6">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Fee Head</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Term / Period</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Amount</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {feeStructures.map(fee => (
                                    <tr key={fee.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-700">{fee.type}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-500">{fee.term}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-800">₹{fee.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-indigo-600 hover:text-indigo-900 text-xs font-bold mr-3">Edit</button>
                                            <button className="text-rose-600 hover:text-rose-900 text-xs font-bold">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeeManager;
