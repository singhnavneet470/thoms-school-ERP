import React, { useState } from 'react';
import { Plus, Trash2, Save, BookOpen, Bus, Home, Beaker, Dumbbell, Music, Globe, Printer } from 'lucide-react';

const classOptions = ['Nursery','KG','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'];

const feeTypes = [
  { id:1, label:'Tuition Fee', icon: BookOpen, color:'indigo', amount:5000 },
  { id:2, label:'Transport Fee', icon: Bus, color:'blue', amount:2000 },
  { id:3, label:'Hostel Fee', icon: Home, color:'purple', amount:8000 },
  { id:4, label:'Lab Fee', icon: Beaker, color:'cyan', amount:500 },
  { id:5, label:'Sports Fee', icon: Dumbbell, color:'emerald', amount:300 },
  { id:6, label:'Music Fee', icon: Music, color:'rose', amount:400 },
  { id:7, label:'Library Fee', icon: BookOpen, color:'amber', amount:200 },
  { id:8, label:'Annual Fee', icon: Globe, color:'teal', amount:3000 },
];

const terms = ['April','May','June','July','August','September','October','November','December','January','February','March'];

const colorMap = {
  indigo:'bg-indigo-50 border-indigo-200 text-indigo-600',
  blue:'bg-blue-50 border-blue-200 text-blue-600',
  purple:'bg-purple-50 border-purple-200 text-purple-600',
  cyan:'bg-cyan-50 border-cyan-200 text-cyan-600',
  emerald:'bg-emerald-50 border-emerald-200 text-emerald-600',
  rose:'bg-rose-50 border-rose-200 text-rose-600',
  amber:'bg-amber-50 border-amber-200 text-amber-600',
  teal:'bg-teal-50 border-teal-200 text-teal-600',
};

const btnMap = {
  indigo:'bg-indigo-500 hover:bg-indigo-600',
  blue:'bg-blue-500 hover:bg-blue-600',
  purple:'bg-purple-500 hover:bg-purple-600',
  cyan:'bg-cyan-500 hover:bg-cyan-600',
  emerald:'bg-emerald-500 hover:bg-emerald-600',
  rose:'bg-rose-500 hover:bg-rose-600',
  amber:'bg-amber-500 hover:bg-amber-600',
  teal:'bg-teal-500 hover:bg-teal-600',
};

export default function FeeStructure() {
  const [selectedClass, setSelectedClass] = useState('Class 5');
  const [cart, setCart] = useState([]);

  const addFee = (fee) => {
    if (cart.find(c => c.id === fee.id)) return;
    setCart(prev => [...prev, { ...fee, term:'April', customAmount: fee.amount }]);
  };

  const removeFee = (id) => setCart(prev => prev.filter(c => c.id !== id));

  const updateAmount = (id, val) => setCart(prev => prev.map(c => c.id === id ? { ...c, customAmount: Number(val) } : c));

  const updateTerm = (id, val) => setCart(prev => prev.map(c => c.id === id ? { ...c, term: val } : c));

  const total = cart.reduce((s, c) => s + c.customAmount, 0);

  return (
    <div className="flex gap-0 h-[calc(100vh-80px)] max-w-full overflow-hidden">

      {/* LEFT: Class Selector */}
      <div className="w-44 bg-white border-r border-slate-200 flex flex-col overflow-y-auto flex-shrink-0">
        <div className="p-3 border-b border-slate-100 bg-slate-50">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Classes</p>
        </div>
        {classOptions.map(cls => (
          <button
            key={cls}
            onClick={() => { setSelectedClass(cls); setCart([]); }}
            className={`w-full text-left px-4 py-3 text-sm font-semibold border-b border-slate-100 transition-colors ${selectedClass === cls ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* CENTER: Fee Type Cards */}
      <div className="flex-1 bg-slate-100 overflow-y-auto p-5">
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-700">Fee Items — {selectedClass}</h2>
          <p className="text-xs text-slate-500 mt-0.5">Click a fee type to add it to the structure</p>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {feeTypes.map(fee => {
            const Icon = fee.icon;
            const inCart = cart.find(c => c.id === fee.id);
            return (
              <button
                key={fee.id}
                onClick={() => addFee(fee)}
                className={`relative p-5 rounded-xl border-2 text-left transition-all shadow-sm ${inCart ? 'opacity-40 cursor-not-allowed border-slate-200 bg-white' : `${colorMap[fee.color]} border cursor-pointer hover:shadow-md hover:scale-[1.02]`}`}
                disabled={!!inCart}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${btnMap[fee.color]} text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-bold text-slate-800 text-sm">{fee.label}</p>
                <p className="text-xs text-slate-500 mt-1">Default: ₹{fee.amount.toLocaleString()}</p>
                {inCart && <span className="absolute top-3 right-3 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Added</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Fee Structure Panel */}
      <div className="w-80 bg-white border-l border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-800">Fee Structure</h3>
          <p className="text-xs text-slate-500 mt-0.5">{selectedClass} — {cart.length} fee head{cart.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
              <Plus className="w-10 h-10 opacity-20 mb-2" />
              <p className="text-sm font-medium">Click fee items on the left to build the structure.</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-slate-800">{item.label}</p>
                <button onClick={() => removeFee(item.id)} className="text-rose-400 hover:text-rose-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={item.customAmount}
                    onChange={e => updateAmount(item.id, e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm font-semibold text-slate-800 outline-none focus:border-indigo-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">From Month</label>
                  <select
                    value={item.term}
                    onChange={e => updateTerm(item.id, e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm font-medium outline-none focus:border-indigo-400"
                  >
                    {terms.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-600">Monthly Total</span>
              <span className="text-xl font-black text-indigo-700">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Annual Total</span>
              <span className="text-sm font-bold text-slate-600">₹{(total * 12).toLocaleString()}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-300 rounded text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm font-bold transition-colors">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
