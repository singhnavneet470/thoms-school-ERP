import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Users, GraduationCap, Building2, Banknote, CreditCard, UserPlus, Settings,
    FileText, Bell, Activity, Plus, TrendingUp, BookOpen, CalendarCheck, ArrowUpRight,
    UserCheck, Bus, AlertCircle, HeartHandshake, Database, Shield, Fingerprint, QrCode, Smartphone, Sparkles, Mail, HardDrive
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, gradient, trend, trendUp = true, trendLabel }) => (
    <div className="theme-bg-surface" style={{
        background: '#fff', borderRadius: 18, padding: '20px 22px', border: '1px solid var(--sidebar-border)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'all 0.25s', cursor: 'default',
        display: 'flex', flexDirection: 'column', gap: 14
    }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.09)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: trendUp ? '#10b981' : '#ef4444', background: trendUp ? '#d1fae5' : '#fee2e2', padding: '4px 8px', borderRadius: 99 }}>
                <TrendingUp className="w-3 h-3" />
                {trend}
            </div>
        </div>
        <div>
            <div className="theme-text-main" style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>{value}</div>
            <div className="theme-text-muted" style={{ fontSize: 13, fontWeight: 500, color: '#64748b', marginTop: 2 }}>{title}</div>
        </div>
    </div>
);

const QuickCard = ({ title, desc, icon: Icon, color, bg, onClick }) => (
    <button onClick={onClick} className="theme-bg-elevated theme-text-main" style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
        background: bg, borderRadius: 16, border: '1px solid var(--sidebar-border)', cursor: 'pointer',
        textAlign: 'left', transition: 'all 0.2s', width: '100%'
    }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
        <div style={{ width: 42, height: 42, borderRadius: 12, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
            <div className="theme-text-main" style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{title}</div>
            <div className="theme-text-muted" style={{ fontSize: 12, fontWeight: 500, color: '#64748b', marginTop: 1 }}>{desc}</div>
        </div>
        <ArrowUpRight className="w-4 h-4 ml-auto" style={{ color: '#cbd5e1' }} />
    </button>
);

const SuperAdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return null;

    const stats = [
        { title: 'Total Students', value: '1,245', trend: '+12%', icon: GraduationCap, gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
        { title: 'Total Staff', value: '132', trend: '+3%', icon: Building2, gradient: 'linear-gradient(135deg, #10b981, #059669)' },
        { title: 'Active Users', value: '89', trend: '+5%', icon: Users, gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)' },
        { title: 'Monthly Revenue', value: '₹2.4M', trend: '+18%', icon: Banknote, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    ];

    const quickActions = [
        { title: 'Add Student', desc: 'New admission', icon: UserPlus, color: 'linear-gradient(135deg, #6366f1, #8b5cf6)', bg: '#f5f3ff', onClick: () => navigate('/student/admission') },
        { title: 'Add Teacher', desc: 'Staff onboarding', icon: Users, color: 'linear-gradient(135deg, #10b981, #059669)', bg: '#f0fdf4', onClick: () => navigate('/hr/staff-directory') },
        { title: 'Collect Fee', desc: 'POS Terminal', icon: CreditCard, color: 'linear-gradient(135deg, #f59e0b, #d97706)', bg: '#fffbeb', onClick: () => navigate('/fees/collect') },
        { title: 'Add Book', desc: 'Library management', icon: BookOpen, color: 'linear-gradient(135deg, #0ea5e9, #0284c7)', bg: '#f0f9ff', onClick: () => navigate('/library') },
        { title: 'Add Bus', desc: 'Transport routes', icon: Bus, color: 'linear-gradient(135deg, #a855f7, #9333ea)', bg: '#faf5ff', onClick: () => navigate('/transport/routes') },
        { title: 'Attendance', desc: 'Mark registers', icon: CalendarCheck, color: 'linear-gradient(135deg, #ef4444, #dc2626)', bg: '#fef2f2', onClick: () => navigate('/attendance/student') },
        { title: 'Create Exam', desc: 'Schedule tests', icon: FileText, color: 'linear-gradient(135deg, #14b8a6, #0d9488)', bg: '#f0fdfa', onClick: () => navigate('/examinations/group') },
        { title: 'Send Notice', desc: 'Publish alerts', icon: Bell, color: 'linear-gradient(135deg, #f97316, #ea580c)', bg: '#fff7ed', onClick: () => navigate('/communicate/notice-board') },
    ];

    const recentActivity = [
        { title: 'Fee Collected', desc: 'Ramesh collected ₹5,000 for John Doe', time: '2 min ago', color: '#10b981', icon: Banknote },
        { title: 'New Admission', desc: 'New student enquiry via Front Office', time: '15 min ago', color: '#6366f1', icon: UserPlus },
        { title: 'User Updated', desc: 'Admin changed role for teacher@erp.com', time: '1 hr ago', color: '#f59e0b', icon: Settings },
        { title: 'Syllabus Uploaded', desc: 'Physics Chapter 4 notes uploaded', time: '3 hrs ago', color: '#a855f7', icon: FileText },
        { title: 'Staff Attendance', desc: '98% staff marked present today', time: '5 hrs ago', color: '#0ea5e9', icon: CalendarCheck },
    ];

    const barData = [40, 70, 45, 90, 65, 85, 100];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontFamily: "'Inter', sans-serif" }} className="fade-in">

            {/* Hero Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1e40af 100%)',
                borderRadius: 24, padding: '32px 36px', color: '#fff',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
                boxShadow: '0 20px 60px rgba(99,102,241,0.25)', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                <div style={{ position: 'absolute', bottom: -40, right: 100, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                        Welcome back 👋
                    </div>
                    <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>
                        {user.email.split('@')[0]}
                    </h1>
                    <p style={{ color: '#c7d2fe', fontSize: 14, fontWeight: 500, marginTop: 6 }}>
                        Here's what's happening at Thomson School today.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/student/admission')}
                    style={{
                        background: '#fff', color: '#3730a3', padding: '12px 24px', borderRadius: 14,
                        fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', gap: 8, boxShadow: '0 4px 15px rgba(0,0,0,0.15)', zIndex: 1,
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)'; }}
                >
                    <Plus className="w-4 h-4" /> New Admission
                </button>
            </div>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                {stats.map((s, i) => <StatCard key={i} {...s} />)}
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">

                {/* Left: Quick Actions + Chart */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Quick Actions */}
                    <div className="theme-bg-surface" style={{ background: '#fff', borderRadius: 20, padding: '24px', border: '1px solid var(--sidebar-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                            <Shield className="w-5 h-5" style={{ color: '#6366f1' }} />
                            <h2 className="theme-text-main" style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quick Access</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
                            {quickActions.map((a, i) => <QuickCard key={i} {...a} />)}
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="theme-bg-surface" style={{ background: '#fff', borderRadius: 20, padding: '24px', border: '1px solid var(--sidebar-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                            <h2 className="theme-text-main" style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: 0 }}>Fee Collection Overview</h2>
                            <select className="theme-bg-elevated theme-text-main" style={{ background: '#f8fafc', border: '1px solid var(--sidebar-border)', borderRadius: 10, padding: '6px 12px', fontSize: 13, fontWeight: 600, color: '#475569', outline: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 180, padding: '0 4px' }}>
                            {barData.map((h, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                                    onMouseEnter={e => e.currentTarget.querySelector('.bar').style.background = 'linear-gradient(180deg, #6366f1, #8b5cf6)'}
                                    onMouseLeave={e => e.currentTarget.querySelector('.bar').style.background = '#e0e7ff'}
                                >
                                    <div className="bar" style={{ width: '100%', height: `${h}%`, borderRadius: '8px 8px 0 0', background: '#e0e7ff', transition: 'background 0.2s' }} />
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>{days[i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Recent Activity */}
                <div className="theme-bg-surface" style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--sidebar-border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--sidebar-border)' }}>
                        <h2 className="theme-text-main" style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: 0 }}>Recent Activity</h2>
                    </div>
                    <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {recentActivity.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div className="theme-text-main" style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>{item.title}</div>
                                        <div className="theme-text-muted" style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginTop: 2 }}>{item.desc}</div>
                                        <div className="theme-text-muted" style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginTop: 4 }}>{item.time}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="theme-bg-elevated" style={{ padding: '14px 24px', borderTop: '1px solid var(--sidebar-border)', background: '#fafafa' }}>
                        <button style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}>
                            View All Activity →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
