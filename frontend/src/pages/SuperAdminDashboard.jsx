import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, Building2, Banknote, CreditCard, UserPlus, Settings, Bell, Activity, Plus, Clock, Bus, Shield, FileText } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
    <div className="bg-white p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center justify-between group hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
                <p className="text-2xl font-black text-slate-900">{value}</p>
            </div>
        </div>
        <div className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">
            {trend}
        </div>
    </div>
);

const QuickAccessCard = ({ title, icon: Icon, colorClass, onClick, desc }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-start p-5 rounded-3xl border border-slate-100 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colorClass}`}
    >
        <div className="p-3 rounded-xl bg-white/40 mb-4 shadow-sm backdrop-blur-md">
            <Icon className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-slate-900 text-base">{title}</h4>
        <p className="text-xs font-medium opacity-70 mt-1">{desc}</p>
    </button>
);

const SuperAdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-3xl p-8 text-white shadow-xl">
                <div>
                    <h1 className="text-3xl font-black mb-1">Welcome back, {user.email.split('@')[0]} 👋</h1>
                    <p className="text-indigo-200 font-medium text-sm">Here is what's happening at Thomson School today.</p>
                </div>
                <button onClick={() => navigate('/student/admission')} className="bg-white text-indigo-900 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg flex items-center gap-2">
                    <Plus className="w-4 h-4" /> New Admission
                </button>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Students" value="1,245" trend="+12%" icon={GraduationCap} colorClass="bg-indigo-50 text-indigo-600" />
                <StatCard title="Total Staff" value="132" trend="+3%" icon={Building2} colorClass="bg-emerald-50 text-emerald-600" />
                <StatCard title="Active Users" value="89" trend="+5%" icon={Users} colorClass="bg-cyan-50 text-cyan-600" />
                <StatCard title="Revenue (This Month)" value="₹2.4M" trend="+18%" icon={Banknote} colorClass="bg-amber-50 text-amber-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Quick Access & Analytics */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Core ERP Modules Hub */}
                    <div className="bg-white p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-6">
                        <div>
                            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-indigo-600" /> ERP Workspaces
                            </h2>
                            <p className="text-slate-500 text-xs mt-1">Select a module to run administrative operations or configure system parameters.</p>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Academic & Students */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Academic & Students</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <QuickAccessCard 
                                        onClick={() => navigate('/student/details')} 
                                        title="Student Directory" desc="View/Edit Profiles" 
                                        icon={GraduationCap} colorClass="bg-indigo-50 text-indigo-700 hover:bg-indigo-100" 
                                    />
                                    <QuickAccessCard 
                                        onClick={() => navigate('/student/admission')} 
                                        title="Student Admissions" desc="Register New Student" 
                                        icon={UserPlus} colorClass="bg-sky-50 text-sky-700 hover:bg-sky-100" 
                                    />
                                    <QuickAccessCard 
                                        onClick={() => navigate('/attendance/student')} 
                                        title="Attendance Hub" desc="Mark/Review Daily Roll" 
                                        icon={Users} colorClass="bg-teal-50 text-teal-700 hover:bg-teal-100" 
                                    />
                                </div>
                            </div>

                            {/* Operations & Finance */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Operations & Finance</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <QuickAccessCard 
                                        onClick={() => navigate('/fees/collect')} 
                                        title="Collect Fees" desc="POS Terminal & Invoices" 
                                        icon={CreditCard} colorClass="bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                                    />
                                    <QuickAccessCard 
                                        onClick={() => navigate('/academics/class-timetable')} 
                                        title="Timetables" desc="Class Schedules" 
                                        icon={Clock} colorClass="bg-amber-50 text-amber-700 hover:bg-amber-100" 
                                    />
                                    <QuickAccessCard 
                                        onClick={() => navigate('/transport/routes')} 
                                        title="Transport Routes" desc="Buses & Pickup Points" 
                                        icon={Bus} colorClass="bg-rose-50 text-rose-700 hover:bg-rose-100" 
                                    />
                                </div>
                            </div>

                            {/* System Administration */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">System Administration</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <QuickAccessCard 
                                        onClick={() => navigate('/settings/users')} 
                                        title="System Users" desc="Credentials & Passwords" 
                                        icon={Users} colorClass="bg-slate-100 text-slate-700 hover:bg-slate-200" 
                                    />
                                    <QuickAccessCard 
                                        onClick={() => navigate('/settings/roles')} 
                                        title="Roles & Permissions" desc="Access Controls Matrix" 
                                        icon={Shield} colorClass="bg-indigo-50 text-indigo-700 hover:bg-indigo-100" 
                                    />
                                    <QuickAccessCard 
                                        onClick={() => navigate('/settings')} 
                                        title="SMTP Settings" desc="Mail Server Configurations" 
                                        icon={Settings} colorClass="bg-purple-50 text-purple-700 hover:bg-purple-100" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fake Analytics Chart */}
                    <div className="bg-white p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-lg font-black text-slate-900">Fee Collection Overview</h2>
                            <select className="bg-slate-50 border-none text-sm font-bold text-slate-600 py-2 px-4 rounded-xl cursor-pointer outline-none ring-2 ring-transparent focus:ring-indigo-500/20">
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        {/* CSS Bar Chart Simulation */}
                        <div className="h-64 flex items-end justify-between gap-2 px-4">
                            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                                <div key={i} className="w-full relative group flex flex-col items-center">
                                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-bold py-1 px-2 rounded-lg pointer-events-none">
                                        ₹{(height * 1.5).toFixed(1)}k
                                    </div>
                                    <div 
                                        style={{ height: `${height}%` }} 
                                        className="w-full bg-indigo-100 group-hover:bg-indigo-500 rounded-t-xl transition-all duration-500"
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 px-4 text-xs font-bold text-slate-400">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity Timeline */}
                <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden flex flex-col h-full">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-lg font-black text-slate-900">Recent Activity</h2>
                    </div>
                    <div className="p-6 flex-1">
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                            
                            {[
                                { title: "New Fee Collected", desc: "Ramesh collected ₹5,000 for John Doe", time: "2 min ago", color: "bg-emerald-500", icon: Banknote },
                                { title: "Admission Enquiry", desc: "New lead added from Front Office", time: "15 min ago", color: "bg-blue-500", icon: UserPlus },
                                { title: "User Updated", desc: "Admin changed role for teacher@erp.com", time: "1 hour ago", color: "bg-amber-500", icon: Settings },
                                { title: "Syllabus Uploaded", desc: "Physics Chapter 4 notes added", time: "3 hours ago", color: "bg-purple-500", icon: FileText },
                                { title: "Staff Attendance", desc: "Marked 98% present today", time: "5 hours ago", color: "bg-indigo-500", icon: Users },
                            ].map((item, i) => (
                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${item.color} text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                                            <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-100">
                        <button className="w-full py-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                            View All Activity &rarr;
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SuperAdminDashboard;
