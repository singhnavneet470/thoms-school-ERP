import React, { useState } from 'react';
import { Package, ShoppingCart, Users, BarChart2, AlertTriangle, Plus, Save, ArrowUpRight, ArrowDownRight, Tag, Truck } from 'lucide-react';

const mockItems = [
  { id:1, name:'A4 Printing Paper', category:'Stationery', unit:'Ream', stock:45, minStock:20, price:250, supplier:'Ram Stationery' },
  { id:2, name:'Whiteboard Marker', category:'Stationery', unit:'Box', stock:12, minStock:15, price:120, supplier:'Ram Stationery' },
  { id:3, name:'Printer Ink Cartridge', category:'Electronics', unit:'Pcs', stock:8, minStock:5, price:850, supplier:'Tech Solutions' },
  { id:4, name:'Dustbin', category:'Furniture', unit:'Pcs', stock:30, minStock:10, price:180, supplier:'City Traders' },
  { id:5, name:'Science Lab Beaker', category:'Lab Equipment', unit:'Pcs', stock:60, minStock:20, price:95, supplier:'Lab Supplies Co.' },
  { id:6, name:'Sports Ball (Football)', category:'Sports', unit:'Pcs', stock:6, minStock:10, price:750, supplier:'Sports World' },
];
const mockCategories = [
  { id:1, name:'Stationery', items:14, description:'Pens, papers, files and office supplies' },
  { id:2, name:'Electronics', items:7, description:'Computers, printers, and AV equipment' },
  { id:3, name:'Furniture', items:22, description:'Chairs, tables, and almirahs' },
  { id:4, name:'Lab Equipment', items:35, description:'Science lab apparatus and chemicals' },
  { id:5, name:'Sports', items:18, description:'Sports equipment and kits' },
];
const mockIssues = [
  { id:1, item:'A4 Printing Paper', issuedTo:'Ramesh Kumar (Teacher)', qty:5, date:'2026-07-10', returnDate:'—', status:'Issued' },
  { id:2, item:'Whiteboard Marker', issuedTo:'Library Dept', qty:2, date:'2026-07-08', returnDate:'2026-07-15', status:'Returned' },
  { id:3, item:'Science Lab Beaker', issuedTo:'Class 10-A Lab', qty:10, date:'2026-07-12', returnDate:'—', status:'Issued' },
];
const mockPurchases = [
  { id:1, date:'2026-07-05', supplier:'Ram Stationery', item:'A4 Printing Paper', qty:20, unitPrice:250, total:5000, status:'Received' },
  { id:2, date:'2026-07-08', supplier:'Lab Supplies Co.', item:'Science Lab Beaker', qty:30, unitPrice:95, total:2850, status:'Received' },
  { id:3, date:'2026-07-14', supplier:'Sports World', item:'Sports Ball', qty:5, unitPrice:750, total:3750, status:'Pending' },
];
const mockAssets = [
  { id:1, name:'Dell Laptop', category:'Electronics', serial:'DL-20260101', location:'Admin Room', purchaseDate:'2024-01-10', value:65000, status:'Active' },
  { id:2, name:'Epson Projector', category:'Electronics', serial:'EP-20230501', location:'Classroom 5A', purchaseDate:'2023-05-12', value:45000, status:'Active' },
  { id:3, name:'Library Bookshelf', category:'Furniture', serial:'FS-20220301', location:'Library', purchaseDate:'2022-03-01', value:12000, status:'Active' },
];
const mockSuppliers = [
  { id:1, name:'Ram Stationery', contact:'Ramesh Gupta', phone:'9876543210', email:'ram@stationery.com', category:'Stationery', address:'Main Market, City' },
  { id:2, name:'Lab Supplies Co.', contact:'Anita Joshi', phone:'9812345678', email:'info@labsupplies.com', category:'Lab Equipment', address:'Industrial Area, City' },
  { id:3, name:'Sports World', contact:'Mahesh Verma', phone:'9801234567', email:'sales@sportsworld.com', category:'Sports', address:'Sports Complex Road' },
];

const statusBadge = (s) => {
  const map = { Received:'text-emerald-700 bg-emerald-50', Pending:'text-amber-700 bg-amber-50', Issued:'text-blue-700 bg-blue-50', Returned:'text-slate-600 bg-slate-100', Active:'text-emerald-700 bg-emerald-50' };
  return <span className={`px-2 py-0.5 text-xs font-bold rounded ${map[s]||'bg-slate-100 text-slate-600'}`}>{s}</span>;
};

const Th = ({c}) => <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left whitespace-nowrap">{c}</th>;
const Td = ({c, cls=''}) => <td className={`px-4 py-3 text-sm text-slate-700 ${cls}`}>{c}</td>;

function FormPanel({ title, fields, onSave }) {
  const [form, setForm] = useState({});
  return (
    <div className="max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-5 border-b border-slate-100 bg-slate-50"><h2 className="font-bold text-slate-800">{title}</h2></div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map(f => (
          <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">{f.label}{f.required && <span className="text-rose-500 ml-0.5">*</span>}</label>
            {f.type === 'select'
              ? <select onChange={e => setForm({...form,[f.name]:e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400">
                  <option value="">Select...</option>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              : f.type === 'textarea'
              ? <textarea rows={3} onChange={e => setForm({...form,[f.name]:e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400 resize-none" />
              : <input type={f.type||'text'} onChange={e => setForm({...form,[f.name]:e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
            }
          </div>
        ))}
      </div>
      <div className="px-6 pb-6">
        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm transition-colors">
          <Save className="w-4 h-4" /> Save
        </button>
      </div>
    </div>
  );
}

export default function InventoryManager({ type }) {

  if (type === 'dashboard') {
    const lowStock = mockItems.filter(i => i.stock <= i.minStock);
    const cards = [
      { label:'Total Items', value: mockItems.length, icon: Package, color:'indigo' },
      { label:'Categories', value: mockCategories.length, icon: Tag, color:'blue' },
      { label:'Active Issues', value: mockIssues.filter(i=>i.status==='Issued').length, icon: ArrowUpRight, color:'amber' },
      { label:'Low Stock Alerts', value: lowStock.length, icon: AlertTriangle, color:'rose' },
    ];
    const colorIcon = { indigo:'bg-indigo-100 text-indigo-600', blue:'bg-blue-100 text-blue-600', amber:'bg-amber-100 text-amber-600', rose:'bg-rose-100 text-rose-600' };
    const colorVal = { indigo:'text-indigo-700', blue:'text-blue-700', amber:'text-amber-700', rose:'text-rose-700' };
    return (
      <div className="space-y-6 max-w-7xl">
        <h1 className="text-xl font-bold text-slate-800">Inventory Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(c => { const Icon = c.icon; return (
            <div key={c.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorIcon[c.color]}`}><Icon className="w-5 h-5"/></div>
              <p className="text-xs font-bold text-slate-400 uppercase">{c.label}</p>
              <p className={`text-3xl font-black mt-1 ${colorVal[c.color]}`}>{c.value}</p>
            </div>
          );})}
        </div>
        {lowStock.length > 0 && (
          <div className="bg-white rounded-xl border border-rose-200 shadow-sm">
            <div className="p-4 border-b border-rose-100 flex items-center gap-2 bg-rose-50">
              <AlertTriangle className="w-4 h-4 text-rose-500"/>
              <h2 className="font-bold text-rose-700">Low Stock Alerts ({lowStock.length} items)</h2>
            </div>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="Item"/><Th c="Category"/><Th c="Current Stock"/><Th c="Min. Stock"/><Th c="Unit"/></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {lowStock.map(i => (
                  <tr key={i.id} className="hover:bg-rose-50/30">
                    <Td c={i.name} cls="font-semibold"/><Td c={i.category}/>
                    <Td c={i.stock} cls="font-bold text-rose-600"/><Td c={i.minStock}/><Td c={i.unit}/>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-100 font-bold text-slate-700">Recent Purchases</div>
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="Date"/><Th c="Item"/><Th c="Supplier"/><Th c="Qty"/><Th c="Total"/><Th c="Status"/></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {mockPurchases.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <Td c={p.date}/><Td c={p.item} cls="font-semibold"/><Td c={p.supplier}/>
                  <Td c={p.qty}/><Td c={`₹${p.total.toLocaleString()}`} cls="font-bold"/>
                  <td className="px-4 py-3">{statusBadge(p.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'items') return (
    <div className="max-w-7xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-800 text-lg">Item List</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold"><Plus className="w-4 h-4"/>Add Item</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="#"/><Th c="Item Name"/><Th c="Category"/><Th c="Unit"/><Th c="Stock"/><Th c="Min Stock"/><Th c="Unit Price"/><Th c="Supplier"/><Th c="Status"/></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {mockItems.map((item,i) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <Td c={i+1} cls="text-slate-400"/><Td c={item.name} cls="font-semibold"/>
                <Td c={item.category}/><Td c={item.unit}/>
                <Td c={item.stock} cls={item.stock <= item.minStock ? 'font-bold text-rose-600' : 'font-bold text-emerald-600'}/>
                <Td c={item.minStock}/><Td c={`₹${item.price}`}/><Td c={item.supplier}/>
                <td className="px-4 py-3">{item.stock <= item.minStock ? statusBadge('Pending') : statusBadge('Active')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (type === 'add-item') return <FormPanel title="Add New Item" fields={[
    {name:'name',label:'Item Name',required:true},{name:'category',label:'Category',type:'select',options:['Stationery','Electronics','Furniture','Lab Equipment','Sports']},
    {name:'unit',label:'Unit',type:'select',options:['Pcs','Box','Ream','Kg','Litre','Set']},{name:'price',label:'Unit Price (₹)',type:'number'},
    {name:'stock',label:'Opening Stock',type:'number'},{name:'minStock',label:'Minimum Stock Level',type:'number'},
    {name:'supplier',label:'Supplier',type:'select',options:mockSuppliers.map(s=>s.name)},{name:'description',label:'Description',type:'textarea',full:true},
  ]} />;

  if (type === 'categories') return (
    <div className="max-w-5xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-800 text-lg">Item Categories</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold"><Plus className="w-4 h-4"/>Add Category</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockCategories.map(cat => (
          <div key={cat.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-3"><Tag className="w-5 h-5"/></div>
            <h3 className="font-bold text-slate-800">{cat.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase">Items</span>
              <span className="text-xl font-black text-indigo-600">{cat.items}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === 'stock') return (
    <div className="max-w-7xl space-y-4">
      <h2 className="font-bold text-slate-800 text-lg">Stock Management</h2>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="Item Name"/><Th c="Category"/><Th c="Unit"/><Th c="Current Stock"/><Th c="Min Stock"/><Th c="Stock Status"/><Th c="Action"/></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {mockItems.map(item => {
              const low = item.stock <= item.minStock;
              return (
                <tr key={item.id} className={`hover:bg-slate-50 ${low ? 'bg-rose-50/20' : ''}`}>
                  <Td c={item.name} cls="font-semibold"/><Td c={item.category}/><Td c={item.unit}/>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${low ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{width:`${Math.min(100,(item.stock/50)*100)}%`}}></div>
                      </div>
                      <span className={`text-sm font-bold ${low ? 'text-rose-600' : 'text-emerald-600'}`}>{item.stock}</span>
                    </div>
                  </td>
                  <Td c={item.minStock}/>
                  <td className="px-4 py-3">{low ? <span className="flex items-center gap-1 text-xs font-bold text-rose-600"><AlertTriangle className="w-3 h-3"/>Low Stock</span> : <span className="text-xs font-bold text-emerald-600">OK</span>}</td>
                  <td className="px-4 py-3"><button className="text-xs font-bold text-indigo-600 hover:underline">Adjust</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (type === 'issue') return <FormPanel title="Issue Item" fields={[
    {name:'item',label:'Select Item',type:'select',options:mockItems.map(i=>i.name),required:true},
    {name:'issueTo',label:'Issue To (Staff/Department)',required:true},
    {name:'qty',label:'Quantity',type:'number',required:true},{name:'date',label:'Issue Date',type:'date'},
    {name:'returnDate',label:'Expected Return Date',type:'date'},{name:'note',label:'Purpose / Note',type:'textarea',full:true},
  ]} />;

  if (type === 'issue-return') return (
    <div className="max-w-7xl space-y-4">
      <h2 className="font-bold text-slate-800 text-lg">Issue / Return Register</h2>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="#"/><Th c="Item"/><Th c="Issued To"/><Th c="Qty"/><Th c="Issue Date"/><Th c="Return Date"/><Th c="Status"/><Th c="Action"/></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {mockIssues.map((r,i) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <Td c={i+1} cls="text-slate-400"/><Td c={r.item} cls="font-semibold"/>
                <Td c={r.issuedTo}/><Td c={r.qty}/><Td c={r.date}/><Td c={r.returnDate}/>
                <td className="px-4 py-3">{statusBadge(r.status)}</td>
                <td className="px-4 py-3">
                  {r.status === 'Issued' && <button className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"><ArrowDownRight className="w-3 h-3"/>Return</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (type === 'purchase') return <FormPanel title="Add Purchase" fields={[
    {name:'date',label:'Purchase Date',type:'date',required:true},{name:'supplier',label:'Supplier',type:'select',options:mockSuppliers.map(s=>s.name),required:true},
    {name:'item',label:'Item',type:'select',options:mockItems.map(i=>i.name),required:true},{name:'qty',label:'Quantity',type:'number',required:true},
    {name:'unitPrice',label:'Unit Price (₹)',type:'number',required:true},{name:'invoice',label:'Invoice / Bill No',type:'text'},
    {name:'paymentMode',label:'Payment Mode',type:'select',options:['Cash','Bank Transfer','Cheque','UPI']},{name:'note',label:'Remarks',type:'textarea',full:true},
  ]} />;

  if (type === 'purchase-list') return (
    <div className="max-w-7xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-800 text-lg">Purchase List</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold"><Plus className="w-4 h-4"/>Add Purchase</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="Date"/><Th c="Item"/><Th c="Supplier"/><Th c="Qty"/><Th c="Unit Price"/><Th c="Total"/><Th c="Status"/></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {mockPurchases.map(p => (
              <tr key={p.id} className="hover:bg-slate-50">
                <Td c={p.date}/><Td c={p.item} cls="font-semibold"/><Td c={p.supplier}/>
                <Td c={p.qty}/><Td c={`₹${p.unitPrice}`}/><Td c={`₹${p.total.toLocaleString()}`} cls="font-bold text-indigo-700"/>
                <td className="px-4 py-3">{statusBadge(p.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (type === 'assets') return (
    <div className="max-w-7xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-800 text-lg">Asset Register</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold"><Plus className="w-4 h-4"/>Add Asset</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="#"/><Th c="Asset Name"/><Th c="Category"/><Th c="Serial No"/><Th c="Location"/><Th c="Purchase Date"/><Th c="Value (₹)"/><Th c="Status"/></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {mockAssets.map((a,i) => (
              <tr key={a.id} className="hover:bg-slate-50">
                <Td c={i+1} cls="text-slate-400"/><Td c={a.name} cls="font-semibold"/>
                <Td c={a.category}/><Td c={a.serial} cls="font-mono text-xs"/><Td c={a.location}/>
                <Td c={a.purchaseDate}/><Td c={`₹${a.value.toLocaleString()}`} cls="font-bold"/>
                <td className="px-4 py-3">{statusBadge(a.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (type === 'stationery') return (
    <div className="max-w-7xl space-y-4">
      <h2 className="font-bold text-slate-800 text-lg">Stationery Store</h2>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="Item"/><Th c="Unit"/><Th c="In Stock"/><Th c="Min Stock"/><Th c="Unit Price"/><Th c="Total Value"/></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {mockItems.filter(i=>i.category==='Stationery').map(item => (
              <tr key={item.id} className="hover:bg-slate-50">
                <Td c={item.name} cls="font-semibold"/><Td c={item.unit}/>
                <Td c={item.stock} cls={item.stock<=item.minStock?'font-bold text-rose-600':'font-bold text-emerald-600'}/>
                <Td c={item.minStock}/><Td c={`₹${item.price}`}/>
                <Td c={`₹${(item.stock*item.price).toLocaleString()}`} cls="font-bold text-indigo-700"/>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (type === 'suppliers') return (
    <div className="max-w-7xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-800 text-lg">Suppliers</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold"><Plus className="w-4 h-4"/>Add Supplier</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockSuppliers.map(s => (
          <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center"><Truck className="w-5 h-5"/></div>
              <div>
                <h3 className="font-bold text-slate-800">{s.name}</h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{s.category}</span>
              </div>
            </div>
            <div className="space-y-1.5 text-sm text-slate-600">
              <p><span className="font-bold text-slate-500">Contact:</span> {s.contact}</p>
              <p><span className="font-bold text-slate-500">Phone:</span> {s.phone}</p>
              <p><span className="font-bold text-slate-500">Email:</span> {s.email}</p>
              <p><span className="font-bold text-slate-500">Address:</span> {s.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return <div className="text-slate-400 p-8 text-center">Page not found.</div>;
}
