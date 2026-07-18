import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, CreditCard, Building, BarChart2, Plus, Save } from 'lucide-react';

const mockIncome = [
  { id:1, date:'2026-07-01', source:'Fee Collection', amount:125000, method:'Cash', note:'June batch' },
  { id:2, date:'2026-07-03', source:'Hostel Fees', amount:48000, method:'Bank Transfer', note:'' },
  { id:3, date:'2026-07-05', source:'Transport Fees', amount:32000, method:'UPI', note:'' },
];
const mockExpense = [
  { id:1, date:'2026-07-02', head:'Electricity', amount:18500, method:'Bank Transfer', note:'June bill' },
  { id:2, date:'2026-07-04', head:'Maintenance', amount:7200, method:'Cash', note:'Plumbing repair' },
  { id:3, date:'2026-07-06', head:'Stationery', amount:4300, method:'Cash', note:'' },
];
const mockPayroll = [
  { id:1, month:'July 2026', staff:'Teaching Staff', count:42, gross:1260000, deductions:126000, net:1134000, status:'Pending' },
  { id:2, month:'June 2026', staff:'Teaching Staff', count:42, gross:1260000, deductions:126000, net:1134000, status:'Paid' },
  { id:3, month:'June 2026', staff:'Non-Teaching Staff', count:18, gross:468000, deductions:46800, net:421200, status:'Paid' },
];
const mockSalary = [
  { id:1, name:'Ramesh Kumar', dept:'Mathematics', basic:55000, hra:11000, da:5500, deduction:7150, net:64350, status:'Paid' },
  { id:2, name:'Priya Sharma', dept:'Science', basic:52000, hra:10400, da:5200, deduction:6760, net:60840, status:'Paid' },
  { id:3, name:'Aman Singh', dept:'English', basic:48000, hra:9600, da:4800, deduction:6240, net:56160, status:'Pending' },
];
const mockBank = [
  { id:1, bank:'State Bank of India', account:'00112233445566', branch:'Main Branch', ifsc:'SBIN0001234', balance:2450000, type:'Current' },
  { id:2, bank:'HDFC Bank', account:'50100123456789', branch:'City Centre', ifsc:'HDFC0000987', balance:875000, type:'Savings' },
];

const statusBadge = (s) => s === 'Paid'
  ? <span className="px-2 py-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded">Paid</span>
  : <span className="px-2 py-0.5 text-xs font-bold text-amber-700 bg-amber-50 rounded">Pending</span>;

const Th = ({c}) => <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left whitespace-nowrap">{c}</th>;
const Td = ({c, cls=''}) => <td className={`px-4 py-3 text-sm text-slate-700 ${cls}`}>{c}</td>;

function AddForm({ fields, title, onSave }) {
  const [form, setForm] = useState({});
  return (
    <div className="max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-5 border-b border-slate-100 bg-slate-50">
        <h2 className="font-bold text-slate-800">{title}</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map(f => (
          <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">{f.label}</label>
            {f.type === 'select'
              ? <select onChange={e=>setForm({...form,[f.name]:e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400">
                  <option value="">Select...</option>
                  {f.options.map(o=><option key={o}>{o}</option>)}
                </select>
              : f.type === 'textarea'
              ? <textarea rows={3} onChange={e=>setForm({...form,[f.name]:e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400 resize-none" />
              : <input type={f.type||'text'} onChange={e=>setForm({...form,[f.name]:e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
            }
          </div>
        ))}
      </div>
      <div className="px-6 pb-6">
        <button onClick={()=>onSave&&onSave(form)} className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm transition-colors">
          <Save className="w-4 h-4" /> Save Record
        </button>
      </div>
    </div>
  );
}

export default function AccountsManager({ type }) {

  if (type === 'dashboard') {
    const cards = [
      { label:'Total Income', value:'₹2,05,000', sub:'This Month', icon:TrendingUp, color:'emerald' },
      { label:'Total Expense', value:'₹29,900', sub:'This Month', icon:TrendingDown, color:'rose' },
      { label:'Net Balance', value:'₹1,75,100', sub:'Profit', icon:BarChart2, color:'indigo' },
      { label:'Bank Balance', value:'₹33,25,000', sub:'All Accounts', icon:Building, color:'blue' },
    ];
    const colorIcon = { emerald:'bg-emerald-100 text-emerald-600', rose:'bg-rose-100 text-rose-600', indigo:'bg-indigo-100 text-indigo-600', blue:'bg-blue-100 text-blue-600' };
    const colorVal = { emerald:'text-emerald-700', rose:'text-rose-700', indigo:'text-indigo-700', blue:'text-blue-700' };
    return (
      <div className="space-y-6 max-w-7xl">
        <h1 className="text-xl font-bold text-slate-800">Accounts Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(c => { const Icon=c.icon; return (
            <div key={c.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorIcon[c.color]}`}><Icon className="w-5 h-5"/></div>
              <p className="text-xs font-bold text-slate-400 uppercase">{c.label}</p>
              <p className={`text-2xl font-black mt-1 ${colorVal[c.color]}`}>{c.value}</p>
              <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
            </div>
          );})}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100 font-bold text-slate-700">Recent Income</div>
            <table className="w-full"><tbody className="divide-y divide-slate-50">
              {mockIncome.map(r=><tr key={r.id} className="hover:bg-slate-50"><Td c={r.date}/><Td c={r.source} cls="font-semibold"/><Td c={`₹${r.amount.toLocaleString()}`} cls="text-emerald-600 font-bold"/><Td c={r.method}/></tr>)}
            </tbody></table>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100 font-bold text-slate-700">Recent Expenses</div>
            <table className="w-full"><tbody className="divide-y divide-slate-50">
              {mockExpense.map(r=><tr key={r.id} className="hover:bg-slate-50"><Td c={r.date}/><Td c={r.head} cls="font-semibold"/><Td c={`₹${r.amount.toLocaleString()}`} cls="text-rose-600 font-bold"/><Td c={r.method}/></tr>)}
            </tbody></table>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'income') return <AddForm title="Add Income" fields={[
    {name:'date',label:'Date',type:'date'},{name:'source',label:'Income Source / Head',type:'text'},
    {name:'amount',label:'Amount (₹)',type:'number'},{name:'method',label:'Payment Method',type:'select',options:['Cash','Bank Transfer','UPI','Cheque']},
    {name:'reference',label:'Reference No',type:'text'},{name:'note',label:'Notes',type:'textarea',full:true},
  ]} />;

  if (type === 'income-list') return (
    <div className="max-w-7xl space-y-4">
      <div className="flex justify-between items-center"><h2 className="font-bold text-slate-800 text-lg">Income List</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold"><Plus className="w-4 h-4"/>Add</button></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full"><thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="Date"/><Th c="Source"/><Th c="Amount"/><Th c="Method"/><Th c="Note"/></tr></thead>
          <tbody className="divide-y divide-slate-100">{mockIncome.map(r=><tr key={r.id} className="hover:bg-slate-50">
            <Td c={r.date}/><Td c={r.source} cls="font-semibold"/><Td c={`₹${r.amount.toLocaleString()}`} cls="text-emerald-600 font-bold"/><Td c={r.method}/><Td c={r.note||'—'}/>
          </tr>)}</tbody></table>
      </div>
    </div>
  );

  if (type === 'expense') return <AddForm title="Add Expense" fields={[
    {name:'date',label:'Date',type:'date'},{name:'head',label:'Expense Head',type:'select',options:['Salary','Electricity','Maintenance','Stationery','Transport','Other']},
    {name:'amount',label:'Amount (₹)',type:'number'},{name:'method',label:'Payment Method',type:'select',options:['Cash','Bank Transfer','UPI','Cheque']},
    {name:'reference',label:'Reference / Bill No',type:'text'},{name:'note',label:'Notes',type:'textarea',full:true},
  ]} />;

  if (type === 'expense-list') return (
    <div className="max-w-7xl space-y-4">
      <div className="flex justify-between items-center"><h2 className="font-bold text-slate-800 text-lg">Expense List</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold"><Plus className="w-4 h-4"/>Add</button></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full"><thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="Date"/><Th c="Head"/><Th c="Amount"/><Th c="Method"/><Th c="Note"/></tr></thead>
          <tbody className="divide-y divide-slate-100">{mockExpense.map(r=><tr key={r.id} className="hover:bg-slate-50">
            <Td c={r.date}/><Td c={r.head} cls="font-semibold"/><Td c={`₹${r.amount.toLocaleString()}`} cls="text-rose-600 font-bold"/><Td c={r.method}/><Td c={r.note||'—'}/>
          </tr>)}</tbody></table>
      </div>
    </div>
  );

  if (type === 'payroll') return <AddForm title="Add Payroll" fields={[
    {name:'month',label:'Month / Year',type:'month'},{name:'staff_type',label:'Staff Type',type:'select',options:['Teaching Staff','Non-Teaching Staff','Contract Staff']},
    {name:'basic',label:'Basic Salary (₹)',type:'number'},{name:'hra',label:'HRA (₹)',type:'number'},
    {name:'da',label:'DA (₹)',type:'number'},{name:'deductions',label:'Deductions (₹)',type:'number'},
    {name:'note',label:'Remarks',type:'textarea',full:true},
  ]} />;

  if (type === 'payroll-list') return (
    <div className="max-w-7xl space-y-4">
      <div className="flex justify-between items-center"><h2 className="font-bold text-slate-800 text-lg">Payroll List</h2></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full"><thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="Month"/><Th c="Staff Type"/><Th c="Count"/><Th c="Gross"/><Th c="Deductions"/><Th c="Net Pay"/><Th c="Status"/></tr></thead>
          <tbody className="divide-y divide-slate-100">{mockPayroll.map(r=><tr key={r.id} className="hover:bg-slate-50">
            <Td c={r.month}/><Td c={r.staff} cls="font-semibold"/><Td c={r.count}/>
            <Td c={`₹${r.gross.toLocaleString()}`}/><Td c={`₹${r.deductions.toLocaleString()}`} cls="text-rose-600"/>
            <Td c={`₹${r.net.toLocaleString()}`} cls="font-bold text-indigo-700"/><td className="px-4 py-3">{statusBadge(r.status)}</td>
          </tr>)}</tbody></table>
      </div>
    </div>
  );

  if (type === 'salary') return (
    <div className="max-w-7xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-800 text-lg">Staff Salary</h2>
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm"><option>July 2026</option><option>June 2026</option></select>
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm"><option>All Departments</option><option>Mathematics</option><option>Science</option></select>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full"><thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="Staff Name"/><Th c="Department"/><Th c="Basic"/><Th c="HRA"/><Th c="DA"/><Th c="Deductions"/><Th c="Net Pay"/><Th c="Status"/></tr></thead>
          <tbody className="divide-y divide-slate-100">{mockSalary.map(r=><tr key={r.id} className="hover:bg-slate-50">
            <Td c={r.name} cls="font-semibold"/><Td c={r.dept}/>
            <Td c={`₹${r.basic.toLocaleString()}`}/><Td c={`₹${r.hra.toLocaleString()}`}/><Td c={`₹${r.da.toLocaleString()}`}/>
            <Td c={`₹${r.deduction.toLocaleString()}`} cls="text-rose-600"/>
            <Td c={`₹${r.net.toLocaleString()}`} cls="font-bold text-indigo-700"/>
            <td className="px-4 py-3">{statusBadge(r.status)}</td>
          </tr>)}</tbody></table>
      </div>
    </div>
  );

  if (type === 'bank') return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-between items-center"><h2 className="font-bold text-slate-800 text-lg">Bank Accounts</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold"><Plus className="w-4 h-4"/>Add Bank</button></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mockBank.map(b=>(
          <div key={b.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Building className="w-5 h-5"/></div>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{b.type}</span>
            </div>
            <h3 className="font-bold text-slate-800 text-base">{b.bank}</h3>
            <p className="text-sm text-slate-500 mt-1">{b.branch}</p>
            <p className="text-sm font-mono text-slate-600 mt-2">{b.account}</p>
            <p className="text-xs text-slate-400">IFSC: {b.ifsc}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Balance</span>
              <span className="text-xl font-black text-emerald-600">₹{b.balance.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === 'balance-sheet') {
    const income = mockIncome.reduce((s,r)=>s+r.amount,0);
    const expense = mockExpense.reduce((s,r)=>s+r.amount,0);
    return (
      <div className="max-w-4xl space-y-5">
        <h2 className="font-bold text-slate-800 text-lg">Balance Sheet — July 2026</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-emerald-50 font-bold text-emerald-700 flex items-center gap-2"><TrendingUp className="w-4 h-4"/>Income</div>
            <table className="w-full"><tbody className="divide-y divide-slate-100">
              {mockIncome.map(r=><tr key={r.id}><Td c={r.source} cls="font-medium"/><Td c={`₹${r.amount.toLocaleString()}`} cls="text-right font-bold text-emerald-600"/></tr>)}
              <tr className="bg-emerald-50 font-bold"><td className="px-4 py-3 text-sm font-black text-slate-800">Total Income</td><td className="px-4 py-3 text-sm text-right font-black text-emerald-700">₹{income.toLocaleString()}</td></tr>
            </tbody></table>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-rose-50 font-bold text-rose-700 flex items-center gap-2"><TrendingDown className="w-4 h-4"/>Expenses</div>
            <table className="w-full"><tbody className="divide-y divide-slate-100">
              {mockExpense.map(r=><tr key={r.id}><Td c={r.head} cls="font-medium"/><Td c={`₹${r.amount.toLocaleString()}`} cls="text-right font-bold text-rose-600"/></tr>)}
              <tr className="bg-rose-50"><td className="px-4 py-3 text-sm font-black text-slate-800">Total Expense</td><td className="px-4 py-3 text-sm text-right font-black text-rose-700">₹{expense.toLocaleString()}</td></tr>
            </tbody></table>
          </div>
        </div>
        <div className="bg-indigo-600 text-white rounded-xl p-6 flex justify-between items-center">
          <div><p className="text-indigo-200 text-sm font-bold uppercase">Net Surplus</p><p className="text-sm text-indigo-200 mt-0.5">Income - Expenses</p></div>
          <p className="text-4xl font-black">₹{(income-expense).toLocaleString()}</p>
        </div>
      </div>
    );
  }

  return <div className="text-slate-400 p-8 text-center">Page not found.</div>;
}
