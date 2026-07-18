import React, { useState, useEffect } from 'react';
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, CalendarCheck, FileText, Bell, 
  Video, Library, Clock, Calendar, BarChart2, User, Settings,
  LogOut, Search, MessageSquare, Menu, X, ChevronRight, Moon, Sun, ChevronDown
} from 'lucide-react';

const teacherMenu = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard' },
  { label: 'Academic', icon: BookOpen, subItems: [
      { label: 'My Classes', path: '/teacher/academic/classes' },
      { label: 'Subjects', path: '/teacher/academic/subjects' },
      { label: 'Class Timetable', path: '/teacher/academic/timetable' },
      { label: 'Lesson Plans', path: '/teacher/academic/lesson-plans' },
      { label: 'Syllabus Progress', path: '/teacher/academic/syllabus' },
      { label: 'Study Materials', path: '/teacher/academic/materials' },
      { label: 'Online Classes', path: '/teacher/academic/online' },
  ] },
  { label: 'Students', icon: Users, subItems: [
      { label: 'Student List', path: '/teacher/students/list' },
      { label: 'Student Profiles', path: '/teacher/students/profiles' },
      { label: 'Attendance', path: '/teacher/students/attendance' },
      { label: 'Leave Requests', path: '/teacher/students/leave' },
      { label: 'Performance', path: '/teacher/students/performance' },
      { label: 'Behavior/Discipline', path: '/teacher/students/behavior' },
      { label: 'Parent Contact', path: '/teacher/students/contact' },
  ] },
  { label: 'Homework & Assignments', icon: FileText, subItems: [
      { label: 'Create Homework', path: '/teacher/homework/create' },
      { label: 'Assign Projects', path: '/teacher/homework/projects' },
      { label: 'Upload Notes', path: '/teacher/homework/notes' },
      { label: 'Assignment Submission', path: '/teacher/homework/submission' },
      { label: 'Grade Assignments', path: '/teacher/homework/grade' },
      { label: 'Homework History', path: '/teacher/homework/history' },
  ] },
  { label: 'Examinations', icon: FileText, subItems: [
      { label: 'Exam Schedule', path: '/teacher/examinations/schedule' },
      { label: 'Enter Marks', path: '/teacher/examinations/marks' },
      { label: 'Grade Students', path: '/teacher/examinations/grade' },
      { label: 'Result Analysis', path: '/teacher/examinations/analysis' },
      { label: 'Report Cards', path: '/teacher/examinations/reports' },
  ] },
  { label: 'Attendance', icon: CalendarCheck, subItems: [
      { label: 'Daily Attendance', path: '/teacher/attendance/daily' },
      { label: 'Monthly Attendance', path: '/teacher/attendance/monthly' },
      { label: 'Reports', path: '/teacher/attendance/reports' },
      { label: 'Late Entry Records', path: '/teacher/attendance/late' },
  ] },
  { label: 'Communication', icon: Bell, subItems: [
      { label: 'Notices', path: '/teacher/communication/notices' },
      { label: 'Messages', path: '/teacher/communication/messages' },
      { label: 'Parent Communication', path: '/teacher/communication/parent' },
      { label: 'Announcements', path: '/teacher/communication/announcements' },
      { label: 'Circulars', path: '/teacher/communication/circulars' },
  ] },
  { label: 'Live Classes', icon: Video, subItems: [
      { label: 'Create Meeting', path: '/teacher/live/create' },
      { label: 'Join Meeting', path: '/teacher/live/join' },
      { label: 'Meeting History', path: '/teacher/live/history' },
      { label: 'Recorded Sessions', path: '/teacher/live/recordings' },
  ] },
  { label: 'Library', icon: Library, subItems: [
      { label: 'Issued Books', path: '/teacher/library/issued' },
      { label: 'Return Books', path: '/teacher/library/return' },
      { label: 'History', path: '/teacher/library/history' },
  ] },
  { label: 'Leave Management', icon: Clock, subItems: [
      { label: 'Apply Leave', path: '/teacher/leave/apply' },
      { label: 'Leave Status', path: '/teacher/leave/status' },
      { label: 'Leave History', path: '/teacher/leave/history' },
  ] },
  { label: 'Calendar', icon: Calendar, subItems: [
      { label: 'Academic Calendar', path: '/teacher/calendar/academic' },
      { label: 'Holidays', path: '/teacher/calendar/holidays' },
      { label: 'School Events', path: '/teacher/calendar/events' },
      { label: 'Exam Dates', path: '/teacher/calendar/exams' },
  ] },
  { label: 'Reports', icon: BarChart2, subItems: [
      { label: 'Attendance Report', path: '/teacher/reports/attendance' },
      { label: 'Marks Report', path: '/teacher/reports/marks' },
      { label: 'Homework Report', path: '/teacher/reports/homework' },
      { label: 'Class Performance', path: '/teacher/reports/performance' },
      { label: 'Student Progress', path: '/teacher/reports/progress' },
  ] },
  { label: 'Profile', icon: User, subItems: [
      { label: 'My Profile', path: '/teacher/profile/view' },
      { label: 'Change Password', path: '/teacher/profile/password' },
      { label: 'Update Photo', path: '/teacher/profile/photo' },
  ] },
  { label: 'Settings', icon: Settings, path: '/teacher/settings' },
];

export default function TeacherLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({'Dashboard':true});

  const toggleMenu = (label) => setExpandedMenus(prev => ({...prev, [label]: !prev[label]}));

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-200 font-sans">
      
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 fixed w-full z-30 flex items-center justify-between px-4 h-16 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight hidden sm:block">Teacher Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search..." className="w-48 lg:w-64 pl-9 pr-4 py-1.5 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-indigo-500 outline-none transition-all" />
          </div>

          <div className="relative">
            <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} className="p-2 rounded-full hover:bg-slate-100 relative text-slate-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">Notifications</h3>
                  <span className="text-xs font-semibold text-indigo-600 cursor-pointer">Mark all read</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                    <p className="text-sm font-semibold text-slate-800">Homework Submission</p>
                    <p className="text-xs text-slate-500 mt-0.5">30 students submitted Science project</p>
                    <p className="text-[10px] text-slate-400 mt-1">5 mins ago</p>
                  </div>
                  <div className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                    <p className="text-sm font-semibold text-slate-800">Leave Request</p>
                    <p className="text-xs text-slate-500 mt-0.5">Aarav Patel requested 2 days leave</p>
                    <p className="text-[10px] text-slate-400 mt-1">1 hour ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                    <p className="text-sm font-semibold text-slate-800">Staff Meeting</p>
                    <p className="text-xs text-slate-500 mt-0.5">Reminder: Monthly staff meeting at 4 PM</p>
                    <p className="text-[10px] text-slate-400 mt-1">3 hours ago</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 text-center bg-slate-50">
                  <Link to="/teacher/communication/notices" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View All Notifications</Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} className="flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">TS</div>
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">Teacher Sharma</p>
                  <p className="text-xs text-slate-500">Class Teacher - 10A</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                </div>
                <div className="border-t border-slate-100 py-1">
                  <Link to="/" className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium">
                    <LogOut className="w-4 h-4" /> Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r border-slate-200 transition-all duration-300 z-20 overflow-y-auto ${sidebarOpen ? 'w-64' : 'w-0 md:w-20'} ${!sidebarOpen && 'md:hover:w-64 group'}`}>
        <div className="py-4 px-3 flex flex-col gap-1">
          {teacherMenu.map((item, idx) => {
            const Icon = item.icon;
            const hasSub = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenus[item.label];
            const isActive = location.pathname === item.path || (hasSub && item.subItems.some(sub => location.pathname === sub.path));

            if (hasSub) {
              return (
                <div key={idx} className="mb-1">
                  <button onClick={() => toggleMenu(item.label)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className={`text-sm whitespace-nowrap ${!sidebarOpen ? 'md:hidden group-hover:block' : 'block'}`}>{item.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${!sidebarOpen ? 'md:hidden group-hover:block' : 'block'}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                    <div className={`py-1 flex flex-col gap-1 pl-11 pr-3 ${!sidebarOpen ? 'md:hidden group-hover:flex' : 'flex'}`}>
                      {item.subItems.map((sub, sIdx) => (
                        <Link key={sIdx} to={sub.path} className={`text-sm px-3 py-2 rounded-lg transition-colors ${location.pathname === sub.path ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link key={idx} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg transition-colors ${isActive ? 'bg-indigo-600 text-white shadow-md font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className={`text-sm whitespace-nowrap ${!sidebarOpen ? 'md:hidden group-hover:block' : 'block'}`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className={`transition-all duration-300 pt-16 min-h-screen flex flex-col ${sidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-20'}`}>
        <div className="flex-1 p-4 md:p-6 overflow-x-hidden w-full">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
