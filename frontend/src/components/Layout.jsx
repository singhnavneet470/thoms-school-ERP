import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Shield, Settings, Bell, Menu } from 'lucide-react';

const Layout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    if (!user) {
        navigate('/');
        return null;
    }

    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) => `
        inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300
        ${isActive(path) 
            ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100/50' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }
    `;

    const getRoleBadgeColor = (role) => {
        const colors = {
            super_admin: 'bg-red-50 text-red-700 border-red-100',
            admin: 'bg-indigo-50 text-indigo-700 border-indigo-100',
            teacher: 'bg-amber-50 text-amber-700 border-amber-100',
            student: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        };
        return colors[role] || 'bg-slate-50 text-slate-700 border-slate-100';
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Top Navbar */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    
                    {/* Brand / Logo */}
                    <div className="flex items-center gap-8">
                        <Link to={user.role === 'student' ? '/student-dashboard' : user.role === 'teacher' ? '/teacher' : '/dashboard'} className="flex items-center gap-3 group">
                            <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.3)] group-hover:scale-105 transition-transform duration-300">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-black bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-transparent tracking-tight">
                                Thomson ERP
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-1">
                            {/* Admin Links */}
                            {(user.role === 'super_admin' || user.role === 'admin') && (
                                <>
                                    <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                                    </Link>
                                    <Link to="/settings/users" className={navLinkClass('/settings/users')}>
                                        <Users className="w-4 h-4" /> Users
                                    </Link>
                                    <Link to="/settings/roles" className={navLinkClass('/settings/roles')}>
                                        <Shield className="w-4 h-4" /> Permissions
                                    </Link>
                                    <Link to="/settings" className={navLinkClass('/settings')}>
                                        <Settings className="w-4 h-4" /> Settings
                                    </Link>
                                </>
                            )}
                            
                            {/* Teacher Links */}
                            {user.role === 'teacher' && (
                                <>
                                    <Link to="/teacher" className={navLinkClass('/teacher')}>
                                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                                    </Link>
                                    <Link to="/attendance/student" className={navLinkClass('/attendance/student')}>
                                        <Users className="w-4 h-4" /> Student Attendance
                                    </Link>
                                </>
                            )}

                            {/* Student Links */}
                            {user.role === 'student' && (
                                <>
                                    <Link to="/student-dashboard" className={navLinkClass('/student-dashboard')}>
                                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* Right Profile / Controls */}
                    <div className="flex items-center gap-5">
                        <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-slate-200">
                            <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                                {user.email.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-bold text-slate-800 leading-tight">
                                    {user.email.split('@')[0]}
                                </span>
                                <span className={`inline-block border text-[9px] px-1.5 py-0.5 rounded-lg font-bold uppercase tracking-wider mt-0.5 ${getRoleBadgeColor(user.role)}`}>
                                    {user.role.replace('_', ' ')}
                                </span>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button 
                            onClick={() => { logout(); navigate('/'); }}
                            className="w-11 h-11 text-slate-400 hover:text-white hover:bg-red-500 rounded-2xl border border-slate-200 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>

                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
                <Outlet />
            </main>
        </div>
    );
};

// Helper Component to import inside Layout.jsx
const GraduationCap = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

export default Layout;
