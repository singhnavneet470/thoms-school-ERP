import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Users, GraduationCap, Building2, Banknote } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
        <div className={`p-4 rounded-xl ${colorClass}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    </div>
);

const SuperAdminDashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Overview Dashboard</h1>
                <p className="text-slate-500">Welcome back, {user.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Students" value="1,245" icon={GraduationCap} colorClass="bg-indigo-50 text-indigo-600" />
                <StatCard title="Total Staff" value="132" icon={Building2} colorClass="bg-emerald-50 text-emerald-600" />
                <StatCard title="Active Users" value="89" icon={Users} colorClass="bg-cyan-50 text-cyan-600" />
                <StatCard title="Revenue (This Month)" value="$45,200" icon={Banknote} colorClass="bg-amber-50 text-amber-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[400px] flex items-center justify-center">
                    <p className="text-slate-400">Analytics Chart Placeholder</p>
                </div>
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h2 className="font-semibold text-slate-900 mb-4">Recent Activity</h2>
                    <p className="text-sm text-slate-400">Activity Log Placeholder</p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
