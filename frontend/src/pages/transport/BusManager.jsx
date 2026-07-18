import React, { useState, useEffect } from 'react';
import { Bus, Map, Users, Settings as SettingsIcon, Navigation, DollarSign, Plus, CheckCircle, Shield } from 'lucide-react';

const BusManager = ({ type }) => {
    // type: 'bus', 'routes', 'driver', 'vehicle', 'gps', 'settings'
    const [data, setData] = useState([]);
    
    // Payment Settings State
    const [paymentConfig, setPaymentConfig] = useState({
        mode: 'route', // 'route' or 'km'
        baseFee: 500,
        perKmRate: 15,
        taxPercent: 5
    });

    const config = {
        bus: { title: 'Bus Management', icon: Bus, color: 'blue', desc: 'Manage bus fleet and active status.' },
        routes: { title: 'Transport Routes', icon: Map, color: 'emerald', desc: 'Configure pickup points and route paths.' },
        driver: { title: 'Driver Management', icon: Users, color: 'indigo', desc: 'Manage driver profiles and licenses.' },
        vehicle: { title: 'Vehicle Details', icon: Shield, color: 'purple', desc: 'Insurance, PUC, and registration tracking.' },
        gps: { title: 'GPS Tracking', icon: Navigation, color: 'rose', desc: 'Live location tracking of school buses.' },
        settings: { title: 'Payment & Fee Settings', icon: DollarSign, color: 'amber', desc: 'Configure route-wise or KM-wise transport fees.' }
    }[type] || { title: 'Transport', icon: Bus, color: 'slate', desc: 'Manage transport system.' };

    useEffect(() => {
        // Load mock data based on type
        if (type === 'bus' || type === 'vehicle') {
            setData([
                { id: 1, number: 'UP32 AB 1234', capacity: 45, type: 'AC', status: 'Active', nextService: '2026-08-15' },
                { id: 2, number: 'UP32 XY 9876', capacity: 30, type: 'Non-AC', status: 'Maintenance', nextService: '2026-07-20' },
                { id: 3, number: 'DL1C Z 4567', capacity: 50, type: 'AC', status: 'Active', nextService: '2026-09-01' }
            ]);
        } else if (type === 'routes') {
            setData([
                { id: 1, routeName: 'City Center Express', startPoint: 'Main Campus', endPoint: 'Clock Tower', distance: '12 km', stations: 5 },
                { id: 2, routeName: 'North Suburb Route', startPoint: 'Main Campus', endPoint: 'Green Park', distance: '25 km', stations: 8 }
            ]);
        } else if (type === 'driver') {
            setData([
                { id: 1, name: 'Ramesh Singh', license: 'DL-987654321', phone: '+91 9876543210', assignedBus: 'UP32 AB 1234', experience: '8 Years' },
                { id: 2, name: 'Suresh Kumar', license: 'UP-123456789', phone: '+91 9123456789', assignedBus: 'UP32 XY 9876', experience: '5 Years' }
            ]);
        } else if (type === 'settings') {
            const saved = JSON.parse(localStorage.getItem('thoms_transport_fees'));
            if (saved) setPaymentConfig(saved);
        }
    }, [type]);

    const handleSaveSettings = (e) => {
        e.preventDefault();
        localStorage.setItem('thoms_transport_fees', JSON.stringify(paymentConfig));
        alert('Transport payment settings saved successfully!');
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${config.color}-50 text-${config.color}-600 rounded-xl`}>
                        <config.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">{config.title}</h1>
                        <p className="text-sm text-slate-500 font-medium">{config.desc}</p>
                    </div>
                </div>
                {type !== 'gps' && type !== 'settings' && (
                    <button className={`flex items-center gap-2 px-4 py-2 bg-${config.color}-600 hover:bg-${config.color}-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors`}>
                        <Plus className="w-4 h-4" /> Add New
                    </button>
                )}
            </div>

            {type === 'settings' ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-w-3xl">
                    <div className="p-6 border-b border-slate-100 bg-slate-50">
                        <h2 className="text-lg font-bold text-slate-800">Transport Fee Configuration</h2>
                        <p className="text-sm text-slate-500 mt-1">Choose how transport fees are calculated for students.</p>
                    </div>
                    <form onSubmit={handleSaveSettings} className="p-6 space-y-8">
                        
                        {/* Payment Mode Selection */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-slate-700">Fee Calculation Mode</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentConfig.mode === 'route' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-200'}`}>
                                    <input type="radio" name="fee_mode" value="route" checked={paymentConfig.mode === 'route'} onChange={() => setPaymentConfig({...paymentConfig, mode: 'route'})} className="sr-only" />
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-slate-800">Route-wise Payment</span>
                                        {paymentConfig.mode === 'route' && <CheckCircle className="w-5 h-5 text-amber-500" />}
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">Fixed flat fee charged based on the specific route or pickup point.</p>
                                </label>

                                <label className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentConfig.mode === 'km' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-200'}`}>
                                    <input type="radio" name="fee_mode" value="km" checked={paymentConfig.mode === 'km'} onChange={() => setPaymentConfig({...paymentConfig, mode: 'km'})} className="sr-only" />
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-slate-800">KM-wise Payment</span>
                                        {paymentConfig.mode === 'km' && <CheckCircle className="w-5 h-5 text-amber-500" />}
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">Dynamic fee calculated based on total kilometers from school to pickup point.</p>
                                </label>
                            </div>
                        </div>

                        {/* Pricing Configuration */}
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5">
                            <h3 className="font-semibold text-slate-700 border-b border-slate-200 pb-2">Pricing Structure</h3>
                            
                            {paymentConfig.mode === 'route' ? (
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Default Base Route Fee (Monthly)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-slate-500 font-bold">$</span>
                                        </div>
                                        <input type="number" value={paymentConfig.baseFee} onChange={e => setPaymentConfig({...paymentConfig, baseFee: e.target.value})} className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1.5">You can override this fee on individual routes.</p>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Per Kilometer Rate (Monthly)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-slate-500 font-bold">$</span>
                                        </div>
                                        <input type="number" value={paymentConfig.perKmRate} onChange={e => setPaymentConfig({...paymentConfig, perKmRate: e.target.value})} className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1.5">E.g. 10km distance * $15/km = $150/month</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tax Percentage (%)</label>
                                <input type="number" value={paymentConfig.taxPercent} onChange={e => setPaymentConfig({...paymentConfig, taxPercent: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-sm transition-colors">
                                Save Fee Settings
                            </button>
                        </div>
                    </form>
                </div>
            ) : type === 'gps' ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px] relative">
                    {/* Simulated Map Background */}
                    <div className="absolute inset-0 bg-slate-100 opacity-50" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full flex-1">
                        <div className="w-24 h-24 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center shadow-inner mb-4 animate-pulse">
                            <Navigation className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2">Live GPS Tracking Active</h2>
                        <p className="text-slate-500 font-medium text-center max-w-md">
                            Connect your GPS API (e.g. Google Maps or Mapbox) here to view live bus locations, speed, and real-time ETAs for students.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    {data.length > 0 && Object.keys(data[0]).filter(k => k !== 'id').map(key => (
                                        <th key={key} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </th>
                                    ))}
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((row) => (
                                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                                        {Object.entries(row).filter(([k]) => k !== 'id').map(([k, v], vIdx) => (
                                            <td key={vIdx} className="px-6 py-4 text-sm font-semibold text-slate-700">
                                                {v === 'Active' ? (
                                                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">{v}</span>
                                                ) : v === 'Maintenance' ? (
                                                    <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs">{v}</span>
                                                ) : (
                                                    String(v)
                                                )}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-indigo-600 hover:text-indigo-900 text-xs font-bold mr-3">Edit</button>
                                            <button className="text-rose-600 hover:text-rose-900 text-xs font-bold">Delete</button>
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

export default BusManager;
