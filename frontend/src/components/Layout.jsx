import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, GraduationCap, Users, CalendarCheck, Banknote, Bus,
    BookOpen, Building, FileText, BookOpenCheck, Calculator, BarChart2,
    Settings, LogOut, Search, Bell, MessageSquare, Menu, X, ChevronRight,
    ShieldAlert, User, Moon, Sun, Archive, Globe, ChevronDown
} from 'lucide-react';

const sidebarItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Academic', icon: GraduationCap, subItems: [
        { label: 'Students', path: '/academic/students' },
        { label: 'Admission', path: '/academic/admission' },
        { label: 'Teachers', path: '/academic/teachers' },
        { label: 'Staff', path: '/academic/staff' },
        { label: 'Class', path: '/academic/class' },
        { label: 'Section', path: '/academic/section' },
        { label: 'Timetable', path: '/academic/timetable' },
        { label: 'Homework', path: '/academic/homework' },
    ] },
    { label: 'Attendance', icon: CalendarCheck, subItems: [
        { label: 'Student Attendance', path: '/attendance/student' },
        { label: 'Teacher Attendance', path: '/attendance/teacher' },
        { label: 'Staff Attendance', path: '/attendance/staff' },
        { label: 'Leave Management', path: '/attendance/leave' },
    ] },
    { label: 'Examination', icon: BookOpenCheck, subItems: [
        { label: 'Exams', path: '/exam/exams' },
        { label: 'Marks', path: '/exam/marks' },
        { label: 'Grade', path: '/exam/grade' },
        { label: 'Result', path: '/exam/result' },
        { label: 'Promotion', path: '/exam/promotion' },
    ] },
    { label: 'Fees', icon: Banknote, subItems: [
        { label: 'Collect Fees', path: '/fees/collect' },
        { label: 'Offline Bank Payments', path: '/fees/offline-bank' },
        { label: 'Search Fees Payment', path: '/fees/search' },
        { label: 'Search Due Fees', path: '/fees/due' },
        { label: 'Fees Master', path: '/fees/master' },
        { label: 'Quick Fees', path: '/fees/quick' },
        { label: 'Fees Group', path: '/fees/group' },
        { label: 'Fees Type', path: '/fees/type' },
        { label: 'Fees Discount', path: '/fees/discount' },
        { label: 'Fees Carry Forward', path: '/fees/carry-forward' },
        { label: 'Fees Reminder', path: '/fees/reminder' },
    ] },
    { label: 'Transport', icon: Bus, subItems: [
        { label: 'Bus', path: '/transport/bus' },
        { label: 'Routes', path: '/transport/routes' },
        { label: 'Driver', path: '/transport/driver' },
        { label: 'Vehicle', path: '/transport/vehicle' },
        { label: 'GPS Tracking', path: '/transport/gps' },
        { label: 'Payment Settings', path: '/transport/settings' },
    ] },
    { label: 'Hostel', icon: Building, subItems: [
        { label: 'Rooms', path: '/hostel/rooms' },
        { label: 'Allocation', path: '/hostel/allocation' },
        { label: 'Warden', path: '/hostel/warden' },
    ] },
    { label: 'Library', icon: BookOpen, subItems: [
        { label: 'Books', path: '/library/books' },
        { label: 'Issue', path: '/library/issue' },
        { label: 'Return', path: '/library/return' },
        { label: 'Fine', path: '/library/fine' },
    ] },
    { label: 'Inventory', icon: Archive, subItems: [
        { label: 'Dashboard', path: '/inventory/dashboard' },
        { label: 'Item List', path: '/inventory/items' },
        { label: 'Add Item', path: '/inventory/add-item' },
        { label: 'Item Category', path: '/inventory/categories' },
        { label: 'Stock Management', path: '/inventory/stock' },
        { label: 'Issue Item', path: '/inventory/issue' },
        { label: 'Issue Return', path: '/inventory/issue-return' },
        { label: 'Add Purchase', path: '/inventory/purchase' },
        { label: 'Purchase List', path: '/inventory/purchase-list' },
        { label: 'Assets', path: '/inventory/assets' },
        { label: 'Stationery', path: '/inventory/stationery' },
        { label: 'Suppliers', path: '/inventory/suppliers' },
    ] },
    { label: 'Accounts', icon: Calculator, subItems: [
        { label: 'Dashboard', path: '/accounts/dashboard' },
        { label: 'Add Income', path: '/accounts/income' },
        { label: 'Income List', path: '/accounts/income-list' },
        { label: 'Add Expense', path: '/accounts/expense' },
        { label: 'Expense List', path: '/accounts/expense-list' },
        { label: 'Add Payroll', path: '/accounts/payroll' },
        { label: 'Payroll List', path: '/accounts/payroll-list' },
        { label: 'Staff Salary', path: '/accounts/salary' },
        { label: 'Bank Accounts', path: '/accounts/bank' },
        { label: 'Balance Sheet', path: '/accounts/balance-sheet' },
    ] },
    { label: 'HR', icon: Users, subItems: [
        { label: 'Employees', path: '/hr/staff-directory' },
        { label: 'Departments', path: '/hr/department' },
        { label: 'Designation', path: '/hr/designation' },
    ] },
    { label: 'Communication', icon: MessageSquare, subItems: [
        { label: 'Notice Board', path: '/communicate/notice-board' },
        { label: 'SMS', path: '/communicate/sms' },
        { label: 'Email', path: '/communicate/email' },
        { label: 'WhatsApp', path: '/communicate/whatsapp' },
        { label: 'Circular', path: '/communicate/circular' },
    ] },
    { label: 'Reports', icon: BarChart2, subItems: [
        { label: 'Student Report', path: '/reports/student' },
        { label: 'Attendance Report', path: '/reports/attendance' },
        { label: 'Fee Report', path: '/reports/fee' },
        { label: 'Exam Report', path: '/reports/exam' },
        { label: 'Staff Report', path: '/reports/staff' },
    ] },

    { label: 'Settings', icon: Settings, subItems: [
        { label: 'School Settings', path: '/settings/general' },
        { label: 'Session', path: '/settings/session' },
        { label: 'Roles', path: '/settings/roles' },
        { label: 'Permissions', path: '/settings/permissions' },
        { label: 'Backup', path: '/settings/backup' },
        { label: 'SMTP', path: '/settings/smtp' },
        { label: 'Payment Gateway', path: '/settings/payment' },
    ] },
];

function Layout() {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [expandedGroup, setExpandedGroup] = useState('Academics & Operations');
    const [expandedMenus, setExpandedMenus] = useState({'Dashboard':true});

    const toggleMenu = (label) => setExpandedMenus(prev => ({...prev, [label]: !prev[label]}));

    if (!user) return <Navigate to="/" replace />;

    const isActive = (path) => location.pathname === path ||
        (path !== '/dashboard' && location.pathname.startsWith(path));

    const roleBg = {
        super_admin: '#6366f1', admin: '#3b82f6', teacher: '#f59e0b',
        student: '#10b981', fee_collector: '#14b8a6', bus_staff: '#eab308', accountant: '#06b6d4'
    };
    const accent = roleBg[user.role] || '#6366f1';

    return (
        <div className="theme-bg-base theme-text-main" style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: "'Inter',sans-serif", background: '#f1f5f9' }}>

            {/* ── TOP NAVBAR ── */}
            <header className="theme-bg-surface" style={{
                height: 60, background: '#fff', borderBottom: '1px solid var(--sidebar-border)',
                display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16,
                position: 'sticky', top: 0, zIndex: 50, flexShrink: 0
            }}>
                {/* Hamburger */}
                <button onClick={() => setSidebarOpen(v => !v)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 6, borderRadius: 8, display: 'flex' }}>
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Logo */}
                <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', marginRight: 8 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldAlert className="w-4 h-4 text-white" />
                    </div>
                    <span className="theme-text-main" style={{ fontWeight: 900, fontSize: 16, color: '#0f172a', letterSpacing: '-0.3px' }}>Thoms ERP</span>
                </Link>

                {/* Search */}
                <div style={{ flex: 1, maxWidth: 420, position: 'relative' }} className="hidden md:block">
                    <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', width: 15, height: 15 }} />
                    <input type="text" placeholder="Search students, staff, fees..."
                        className="theme-bg-base theme-text-main"
                        style={{
                            width: '100%', paddingLeft: 36, paddingRight: 16, paddingTop: 8, paddingBottom: 8,
                            background: '#f8fafc', border: '1.5px solid var(--sidebar-border)', borderRadius: 10,
                            fontSize: 13.5, color: '#334155', outline: 'none', fontFamily: 'inherit',
                            boxSizing: 'border-box'
                        }}
                        onFocus={e => { e.target.style.border = '1.5px solid #6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                        onBlur={e => { e.target.style.border = '1.5px solid #e2e8f0'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>

                <div style={{ flex: 1 }} />

                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                  <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} className="theme-bg-base theme-text-main" style={{ position: 'relative', background: '#f8fafc', border: '1.5px solid var(--sidebar-border)', borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                      <Bell className="w-4 h-4" />
                      <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, background: '#ef4444', borderRadius: '50%', border: '1.5px solid #fff' }} />
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 font-sans">
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 text-sm m-0">System Alerts</h3>
                        <span className="text-xs font-semibold text-indigo-600 cursor-pointer">Mark all read</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        <div className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                          <p className="text-sm font-semibold text-slate-800 m-0">New Admission</p>
                          <p className="text-xs text-slate-500 mt-0.5 m-0">Application #1042 needs review</p>
                          <p className="text-[10px] text-slate-400 mt-1 m-0">15 mins ago</p>
                        </div>
                        <div className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                          <p className="text-sm font-semibold text-slate-800 m-0">Server Backup</p>
                          <p className="text-xs text-slate-500 mt-0.5 m-0">Daily database backup completed</p>
                          <p className="text-[10px] text-slate-400 mt-1 m-0">4 hours ago</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                          <p className="text-sm font-semibold text-slate-800 m-0">Fee Collection</p>
                          <p className="text-xs text-slate-500 mt-0.5 m-0">₹45,000 collected today</p>
                          <p className="text-[10px] text-slate-400 mt-1 m-0">8 hours ago</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-slate-100 text-center bg-slate-50">
                        <span className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer">View All Alerts</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Messages */}
                <button className="theme-bg-base theme-text-main" style={{ position: 'relative', background: '#f8fafc', border: '1.5px solid var(--sidebar-border)', borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                    <MessageSquare className="w-4 h-4" />
                    <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, background: '#6366f1', borderRadius: '50%', border: '1.5px solid #fff' }} />
                </button>

                {/* Profile dropdown */}
                <div style={{ position: 'relative' }}>
                    <button onClick={() => { setProfileOpen(v => !v); setNotifOpen(false); }} className="theme-bg-base theme-text-main"
                        style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f8fafc', border: '1.5px solid var(--sidebar-border)', borderRadius: 10, padding: '6px 10px', cursor: 'pointer' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg,${accent},#8b5cf6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff' }}>
                            {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="hidden md:block" style={{ textAlign: 'left' }}>
                            <div className="theme-text-main" style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{user.email.split('@')[0]}</div>
                            <div style={{ fontSize: 10.5, fontWeight: 600, color: '#6366f1', textTransform: 'capitalize' }}>{user.role?.replace('_', ' ')}</div>
                        </div>
                    </button>

                    {profileOpen && (
                        <div className="theme-bg-elevated theme-text-main" style={{
                            position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: '#fff',
                            border: '1px solid var(--sidebar-border)', borderRadius: 14, boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                            minWidth: 180, zIndex: 100, overflow: 'hidden'
                        }}>
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--sidebar-border)' }}>
                                <div className="theme-text-main" style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>{user.email}</div>
                                <div style={{ fontSize: 11.5, color: '#64748b', fontWeight: 500, marginTop: 2, textTransform: 'capitalize' }}>{user.role?.replace('_', ' ')}</div>
                            </div>
                            <Link to="/settings/change-password"
                                onClick={() => setProfileOpen(false)}
                                className="theme-text-main"
                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', color: '#334155', fontSize: 13.5, fontWeight: 600, textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <User className="w-4 h-4" style={{ color: '#6366f1' }} /> Profile &amp; Password
                            </Link>
                            <button onClick={() => { logout(); }}
                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', color: '#ef4444', fontSize: 13.5, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', width: '100%', fontFamily: 'inherit', borderTop: '1px solid #f1f5f9' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* ── BODY (Sidebar + Content) ── */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* ── SIDEBAR ── */}
                <aside className={`fixed md:relative z-30 h-full transition-all duration-300 ${sidebarOpen ? 'translate-x-0 w-[220px]' : '-translate-x-full md:translate-x-0 w-[64px]'}`} style={{
                    background: '#0f172a',
                    borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column',
                    overflow: 'hidden', flexShrink: 0
                }}>
                    <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '10px 8px' }} className="sidebar-scrollbar">
                        {sidebarItems.map(({ label, icon: Icon, path, subItems }) => {
                            if (subItems) {
                                const isExpanded = expandedMenus[label];
                                const hasActiveChild = subItems.some(sub => isActive(sub.path));
                                return (
                                    <div key={label}>
                                        <button onClick={() => { setSidebarOpen(true); toggleMenu(label); }}
                                            title={!sidebarOpen ? label : ''}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 11, width: '100%',
                                                padding: sidebarOpen ? '10px 12px' : '10px 0',
                                                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                                                borderRadius: 10, marginBottom: 3, textDecoration: 'none', border: 'none', cursor: 'pointer',
                                                color: hasActiveChild ? '#fff' : '#64748b', fontWeight: hasActiveChild ? 700 : 500,
                                                fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden',
                                                background: hasActiveChild ? 'rgba(99,102,241,0.1)' : 'transparent',
                                                transition: 'all 0.15s'
                                            }}
                                            onMouseEnter={e => { if (!hasActiveChild) { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#f1f5f9'; } }}
                                            onMouseLeave={e => { if (!hasActiveChild) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; } }}
                                        >
                                            <Icon className="w-4 h-4" style={{ flexShrink: 0, color: hasActiveChild ? '#6366f1' : '#475569' }} />
                                            {sidebarOpen && <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>}
                                            {sidebarOpen && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} style={{ color: '#64748b' }} />}
                                        </button>
                                        {sidebarOpen && isExpanded && (
                                            <div style={{ paddingLeft: 28, marginBottom: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                {subItems.map(sub => {
                                                    const subActive = isActive(sub.path);
                                                    return (
                                                        <Link key={sub.path} to={sub.path} style={{
                                                            fontSize: 12.5, color: subActive ? '#fff' : '#94a3b8', textDecoration: 'none',
                                                            padding: '6px 10px', borderRadius: 6, background: subActive ? '#1e293b' : 'transparent',
                                                            fontWeight: subActive ? 600 : 400
                                                        }}
                                                        onMouseEnter={e => { if (!subActive) { e.target.style.color = '#f8fafc'; e.target.style.background = '#1e293b50'; } }}
                                                        onMouseLeave={e => { if (!subActive) { e.target.style.color = '#94a3b8'; e.target.style.background = 'transparent'; } }}
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            const active = isActive(path);
                            return (
                                <Link key={path} to={path}
                                    title={!sidebarOpen ? label : ''}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 11,
                                        padding: sidebarOpen ? '10px 12px' : '10px 0',
                                        justifyContent: sidebarOpen ? 'flex-start' : 'center',
                                        borderRadius: 10, marginBottom: 3, textDecoration: 'none',
                                        color: active ? '#fff' : '#64748b', fontWeight: active ? 700 : 500,
                                        fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden',
                                        background: active ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'transparent',
                                        boxShadow: active ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
                                        transition: 'all 0.15s'
                                    }}
                                    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#f1f5f9'; } }}
                                    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; } }}
                                >
                                    <Icon className="w-4 h-4" style={{ flexShrink: 0, color: active ? '#fff' : '#475569' }} />
                                    {sidebarOpen && <span>{label}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    {sidebarOpen && (
                        <div style={{ padding: '12px 8px', borderTop: '1px solid #1e293b' }}>
                            <div style={{ background: '#1e293b', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg,${accent},#8b5cf6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                                    {user.email.charAt(0).toUpperCase()}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email.split('@')[0]}</div>
                                    <div style={{ color: '#64748b', fontSize: 10.5, fontWeight: 600, textTransform: 'capitalize', marginTop: 1 }}>{user.role?.replace('_', ' ')}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </aside>

                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div className="md:hidden fixed inset-0 z-20"
                        style={{ background: 'rgba(15,23,42,0.5)' }}
                        onClick={() => setSidebarOpen(false)} />
                )}

                {/* ── MAIN CONTENT ── */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '16px', WebkitOverflowScrolling: 'touch' }} className="md:p-6 w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
