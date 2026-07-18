import React, { useState } from 'react';
import { 
  Users, BookOpen, CalendarCheck, FileText, Bell, CheckSquare, Edit, 
  Download, Video, LayoutDashboard, Search, Plus, Save, Upload, Star,
  Award, Flag, Calendar
} from 'lucide-react';

// Common UI Components
const Th = ({c}) => <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left whitespace-nowrap">{c}</th>;
const Td = ({c, cls=''}) => <td className={`px-4 py-3 text-sm text-slate-700 ${cls}`}>{c}</td>;

function GenericTable({ title, columns, data, onAdd }) {
  return (
    <div className="max-w-7xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-800 text-lg">{title}</h2>
        {onAdd && <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold"><Plus className="w-4 h-4"/>Add New</button>}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>{columns.map(c => <Th key={c} c={c} />)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50">
                {Object.values(row).map((val, j) => (
                  <Td key={j} c={val} cls={j===0 ? 'font-semibold' : ''} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Visual Calendar Grid
function VisualCalendar() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({length: 31}, (_, i) => i + 1); // Mock August 31 days
  const startOffset = 6; // Starts on Saturday for Aug 2026

  // Event Data Map for August
  const eventMap = {
    15: [{ title: 'Independence Day', type: 'holiday', icon: Flag, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' }],
    18: [{ title: 'Maths Olympiad', type: 'exam', icon: Award, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' }],
    25: [{ title: 'Science Fair', type: 'event', icon: Star, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200' }],
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-slate-100 bg-slate-50/50 gap-4">
        <h3 className="font-black text-2xl text-slate-800 flex items-center gap-3">
          <Calendar className="w-6 h-6 text-indigo-500" />
          August 2026
        </h3>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all">
            <Upload className="w-4 h-4" /> Upload PDF
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl text-slate-700 font-bold shadow-sm transition-all">&larr; Prev</button>
            <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl text-slate-700 font-bold shadow-sm transition-all">Next &rarr;</button>
          </div>
        </div>
      </div>
      <div className="p-6 overflow-x-auto custom-scrollbar">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-7 gap-3 mb-2">
            {days.map((d, i) => (
              <div key={d} className={`text-center text-xs font-black uppercase tracking-wider ${i === 0 ? 'text-rose-500' : 'text-slate-500'}`}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-3">
            {Array.from({length: startOffset}).map((_, i) => <div key={`empty-${i}`} className="min-h-[120px] rounded-2xl bg-slate-50 border border-slate-100/50 opacity-40" />)}
            {dates.map(date => {
              const isToday = date === 18;
              const isSunday = (date + startOffset - 1) % 7 === 0;
              const events = eventMap[date] || [];
              
              return (
                <div key={date} className={`min-h-[120px] rounded-2xl border p-2 flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                  isToday ? 'border-indigo-500 bg-indigo-50/30' : 
                  isSunday ? 'border-rose-100 bg-rose-50/30' : 
                  'border-slate-200 bg-white hover:border-indigo-300'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-black w-8 h-8 flex items-center justify-center rounded-full ${
                      isToday ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 
                      isSunday ? 'text-rose-500 bg-rose-100' :
                      'text-slate-700 bg-slate-100 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                    }`}>{date}</span>
                    {events.length > 0 && <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1 mr-1 animate-pulse" />}
                  </div>
                  
                  <div className="flex-1 space-y-2 overflow-y-auto mt-1 custom-scrollbar">
                    {events.map((evt, idx) => (
                      <div key={idx} className={`text-[11px] font-bold ${evt.bg} ${evt.color} ${evt.border} border px-2 py-1.5 rounded-lg leading-tight flex items-start gap-1.5 shadow-sm`}>
                        <evt.icon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="break-words">{evt.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericForm({ title, fields }) {
  return (
    <div className="max-w-3xl bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-5 border-b border-slate-100 bg-slate-50">
        <h2 className="font-bold text-slate-800">{title}</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map(f => (
          <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">{f.label}</label>
            {f.type === 'select'
              ? <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400">
                  <option>Select...</option>
                  {f.options?.map(o => <option key={o}>{o}</option>)}
                </select>
              : f.type === 'textarea'
              ? <textarea rows={4} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400 resize-none" />
              : <input type={f.type||'text'} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
            }
          </div>
        ))}
      </div>
      <div className="px-6 pb-6 flex gap-3">
        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm transition-colors">
          <Save className="w-4 h-4" /> Save Details
        </button>
        <button className="flex items-center gap-2 px-6 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-bold text-sm transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

function GenericCards({ title, items }) {
  return (
    <div className="space-y-4 max-w-7xl">
      <h2 className="font-bold text-slate-800 text-lg">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800">{item.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-400">{item.meta1}</span>
              <span className="text-indigo-600">{item.meta2}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function TeacherPortal({ type }) {
  
  if (type === 'dashboard') {
    const cards = [
      { title: "Total Students", value: "145", icon: Users, color: "indigo" },
      { title: "My Classes", value: "4", icon: BookOpen, color: "blue" },
      { title: "Subjects", value: "3", icon: BookOpen, color: "purple" },
      { title: "Today's Classes", value: "5", icon: CalendarCheck, color: "emerald" },
      { title: "Today's Attendance", value: "92%", icon: CheckSquare, color: "teal" },
      { title: "Pending Homework", value: "12", icon: Edit, color: "amber" },
      { title: "Assignments to Review", value: "28", icon: FileText, color: "rose" },
      { title: "New Notices", value: "2", icon: Bell, color: "cyan" },
      { title: "Upcoming Exams", value: "1", icon: CalendarCheck, color: "rose" }
    ];

    const quickActions = [
      { label: "Take Attendance", icon: CheckSquare },
      { label: "Add Homework", icon: Edit },
      { label: "Upload Study Material", icon: Download },
      { label: "Enter Marks", icon: FileText },
      { label: "Send Notice", icon: Bell },
      { label: "Start Live Class", icon: Video },
    ];

    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-md">
          <h1 className="text-2xl font-bold">Welcome back, Mr. Sharma!</h1>
          <p className="mt-1 text-indigo-100">Here's an overview of your academic day.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-${c.color}-50 text-${c.color}-600`}><Icon className="w-5 h-5" /></div>
                  <h3 className="text-slate-500 text-xs font-bold uppercase">{c.title}</h3>
                  <p className="text-2xl font-black text-slate-800 mt-1">{c.value}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((qa, i) => {
              const Icon = qa.icon;
              return (
                <button key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-indigo-400 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-full bg-slate-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-50"><Icon className="w-6 h-6" /></div>
                  <span className="text-sm font-bold text-slate-700">{qa.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- ACADEMIC ---
  if (['academic-classes', 'academic-subjects', 'academic-materials'].includes(type)) {
    return <GenericCards title={
      type === 'academic-classes' ? 'My Classes' : type === 'academic-subjects' ? 'My Subjects' : 'Study Materials'
    } items={[
      { title: 'Mathematics - Class 10A', desc: 'Advanced Algebra & Geometry', meta1: '45 Students', meta2: 'Mon, Wed, Fri' },
      { title: 'Physics - Class 9B', desc: 'Fundamentals of Physics', meta1: '40 Students', meta2: 'Tue, Thu' },
      { title: 'Science - Class 8A', desc: 'General Science curriculum', meta1: '42 Students', meta2: 'Daily' },
    ]} />;
  }
  
  if (type === 'academic-timetable') {
    return (
      <div className="max-w-7xl space-y-4">
        <GenericTable title="Weekly Class Timetable" columns={['Day', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM']} data={[
          { day: 'Monday', t1: 'Maths (10A)', t2: 'Free', t3: 'Physics (9B)', t4: 'Lunch', t5: 'Science (8A)' },
          { day: 'Tuesday', t1: 'Science (8A)', t2: 'Physics (9B)', t3: 'Free', t4: 'Lunch', t5: 'Maths (10A)' },
          { day: 'Wednesday', t1: 'Free', t2: 'Maths (10A)', t3: 'Science (8A)', t4: 'Lunch', t5: 'Physics (9B)' },
          { day: 'Thursday', t1: 'Physics (9B)', t2: 'Science (8A)', t3: 'Maths (10A)', t4: 'Lunch', t5: 'Free' },
          { day: 'Friday', t1: 'Maths (10A)', t2: 'Free', t3: 'Science (8A)', t4: 'Lunch', t5: 'Physics (9B)' },
          { day: 'Saturday', t1: 'Science (8A)', t2: 'Physics (9B)', t3: 'Maths (10A)', t4: 'Lunch', t5: 'Sports / Extra' },
        ]} />
      </div>
    );
  }

  if (['academic-lesson', 'academic-progress', 'academic-online'].includes(type)) {
    return <GenericForm title={type === 'academic-lesson' ? 'Create Lesson Plan' : type === 'academic-online' ? 'Schedule Online Class' : 'Update Syllabus Progress'} fields={[
      { name: 'class', label: 'Select Class', type: 'select', options: ['Class 10A', 'Class 9B', 'Class 8A'] },
      { name: 'subject', label: 'Select Subject', type: 'select', options: ['Mathematics', 'Physics', 'Science'] },
      { name: 'topic', label: 'Topic / Chapter', full: true },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'time', label: 'Time', type: 'time' },
      { name: 'desc', label: 'Description / Notes', type: 'textarea', full: true },
    ]} />;
  }

  // --- STUDENTS ---
  if (['student-list', 'student-profiles', 'student-contact'].includes(type)) {
    return <GenericTable title="Student List" columns={['Roll No', 'Student Name', 'Class', 'Guardian', 'Contact', 'Action']} data={[
      { r: '101', n: 'Aarav Patel', c: '10A', g: 'Rajesh Patel', m: '9876543210', a: 'View Profile' },
      { r: '102', n: 'Sneha Sharma', c: '10A', g: 'Vijay Sharma', m: '9876543211', a: 'View Profile' },
      { r: '103', n: 'Rohan Gupta', c: '9B', g: 'Amit Gupta', m: '9876543212', a: 'View Profile' },
    ]} />;
  }

  if (['student-behavior', 'student-performance'].includes(type)) {
    return <GenericForm title="Add Student Note / Performance Record" fields={[
      { name: 'student', label: 'Select Student', type: 'select', options: ['Aarav Patel', 'Sneha Sharma', 'Rohan Gupta'] },
      { name: 'type', label: 'Record Type', type: 'select', options: ['Behavior Note', 'Academic Performance', 'Extra-curricular'] },
      { name: 'rating', label: 'Rating (1-5)', type: 'number' },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'desc', label: 'Detailed Note', type: 'textarea', full: true },
    ]} />;
  }

  // --- HOMEWORK & ASSIGNMENTS ---
  if (['hw-create', 'hw-projects', 'hw-notes'].includes(type)) {
    return <GenericForm title="Create Homework / Project" fields={[
      { name: 'class', label: 'Select Class', type: 'select', options: ['Class 10A', 'Class 9B', 'Class 8A'] },
      { name: 'subject', label: 'Select Subject', type: 'select', options: ['Mathematics', 'Physics', 'Science'] },
      { name: 'title', label: 'Homework Title', full: true },
      { name: 'date', label: 'Submission Date', type: 'date' },
      { name: 'file', label: 'Attach File (Optional)', type: 'file' },
      { name: 'desc', label: 'Instructions', type: 'textarea', full: true },
    ]} />;
  }

  if (['hw-submit', 'hw-grade', 'hw-history'].includes(type)) {
    return <GenericTable title="Homework Submissions" columns={['Student', 'Class', 'Homework Title', 'Submission Date', 'Status', 'Action']} data={[
      { s: 'Aarav Patel', c: '10A', h: 'Algebra Chapter 4', d: '2026-07-18', st: 'Submitted', a: 'Grade' },
      { s: 'Sneha Sharma', c: '10A', h: 'Algebra Chapter 4', d: '2026-07-18', st: 'Pending', a: 'Send Reminder' },
      { s: 'Rohan Gupta', c: '9B', h: 'Laws of Motion', d: '2026-07-17', st: 'Graded', a: 'View' },
    ]} />;
  }

  // --- EXAMINATIONS ---
  if (['exam-schedule', 'exam-analysis', 'exam-report'].includes(type)) {
    return <GenericTable title="Examination Schedule" columns={['Exam Name', 'Class', 'Subject', 'Date', 'Start Time', 'End Time']} data={[
      { e: 'Mid Term 2026', c: '10A', s: 'Mathematics', d: '2026-08-15', st: '09:00 AM', et: '12:00 PM' },
      { e: 'Mid Term 2026', c: '9B', s: 'Physics', d: '2026-08-16', st: '09:00 AM', et: '11:00 AM' },
      { e: 'Unit Test 2', c: '8A', s: 'Science', d: '2026-07-25', st: '10:00 AM', et: '11:30 AM' },
    ]} />;
  }
  
  if (['exam-marks', 'exam-grade'].includes(type)) {
    return (
      <div className="max-w-5xl space-y-4">
        <h2 className="font-bold text-slate-800 text-lg">Enter Marks</h2>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
           <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg"><option>Class 10A</option></select>
           <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg"><option>Mathematics</option></select>
           <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg"><option>Mid Term Exam</option></select>
           <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold">Search</button>
        </div>
        <GenericTable title="" columns={['Roll No', 'Student Name', 'Max Marks', 'Marks Obtained', 'Remarks']} data={[
          { r: '101', n: 'Aarav Patel', m: '100', mo: '85', rm: 'Good' },
          { r: '102', n: 'Sneha Sharma', m: '100', mo: '92', rm: 'Excellent' },
        ]} />
      </div>
    );
  }

  // --- ATTENDANCE ---
  if (['att-daily', 'att-monthly', 'att-reports', 'att-late', 'student-attendance'].includes(type)) {
    return (
      <div className="max-w-5xl space-y-4">
        <h2 className="font-bold text-slate-800 text-lg">Take Daily Attendance</h2>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
           <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg"><option>Class 10A</option></select>
           <input type="date" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg" />
           <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold">Fetch List</button>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200"><tr><Th c="Roll No"/><Th c="Student"/><Th c="Present"/><Th c="Absent"/><Th c="Late"/><Th c="Half Day"/></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {['Aarav Patel', 'Sneha Sharma', 'Rohan Gupta'].map((s,i) => (
                <tr key={i}>
                  <Td c={101+i} /><Td c={s} cls="font-semibold"/>
                  <Td c={<input type="radio" name={`att-${i}`} defaultChecked className="w-4 h-4 accent-emerald-500" />} />
                  <Td c={<input type="radio" name={`att-${i}`} className="w-4 h-4 accent-rose-500" />} />
                  <Td c={<input type="radio" name={`att-${i}`} className="w-4 h-4 accent-amber-500" />} />
                  <Td c={<input type="radio" name={`att-${i}`} className="w-4 h-4 accent-blue-500" />} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end"><button className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold">Save Attendance</button></div>
      </div>
    );
  }

  // --- COMMUNICATION ---
  if (['comm-notices', 'comm-messages', 'comm-parent', 'comm-announce', 'comm-circular'].includes(type)) {
    return <GenericForm title="Send Communication" fields={[
      { name: 'to', label: 'Send To', type: 'select', options: ['All Students', 'Specific Class', 'Parents', 'Staff'] },
      { name: 'subject', label: 'Message Subject', full: true },
      { name: 'msg', label: 'Message Body', type: 'textarea', full: true },
      { name: 'file', label: 'Attachment', type: 'file', full: true },
    ]} />;
  }

  // --- LEAVE & LIBRARY ---
  if (['leave-apply', 'student-leave'].includes(type)) {
    return <GenericForm title="Apply for Leave" fields={[
      { name: 'type', label: 'Leave Type', type: 'select', options: ['Casual Leave', 'Sick Leave', 'Emergency'] },
      { name: 'date', label: 'From Date', type: 'date' },
      { name: 'todate', label: 'To Date', type: 'date' },
      { name: 'file', label: 'Document/Proof', type: 'file' },
      { name: 'reason', label: 'Reason for Leave', type: 'textarea', full: true },
    ]} />;
  }
  
  if (['lib-issue', 'lib-return', 'lib-history', 'leave-status', 'leave-history'].includes(type)) {
    return <GenericTable title="Records History" columns={['Date', 'Record Type', 'Description', 'Status']} data={[
      { d: '2026-07-15', t: 'Leave Request', desc: 'Sick Leave (2 days)', s: 'Approved' },
      { d: '2026-07-10', t: 'Library Book', desc: 'Physics Vol 2 (Issued)', s: 'Active' },
    ]} />;
  }

  // --- LIVE CLASSES & CALENDAR & REPORTS ---
  if (['live-create', 'live-join', 'live-history', 'live-record'].includes(type)) {
    return <GenericTable title="Live Classes Schedule" columns={['Class', 'Subject', 'Topic', 'Date & Time', 'Host', 'Action']} data={[
      { c: '10A', s: 'Mathematics', t: 'Revision', d: 'Today, 10:00 AM', h: 'Self', a: 'Start Meeting' },
      { c: '9B', s: 'Physics', t: 'Doubt Session', d: 'Tomorrow, 11:30 AM', h: 'Self', a: 'Copy Link' },
    ]} />;
  }

  if (['cal-academic', 'cal-holidays', 'cal-events', 'cal-exams'].includes(type)) {
    return (
      <div className="max-w-7xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h2 className="font-bold text-slate-800 text-lg">Manage {type === 'cal-holidays' ? 'Holidays' : 'Academic Calendar'}</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors">
              <Plus className="w-4 h-4"/> Add Event Details
            </button>
            <label className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700 transition-colors cursor-pointer">
              <Upload className="w-4 h-4"/> Upload PDF Calendar
              <input type="file" className="hidden" accept=".pdf" />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
          <h3 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Quick Add: Date & Month Wise Event</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Month</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400">
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Date</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Event Name</label>
              <input type="text" placeholder="e.g. Science Fair" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-slate-800 text-white font-bold rounded-lg text-sm hover:bg-slate-900 transition-colors">Save Event</button>
            </div>
          </div>
        </div>

        <VisualCalendar />
      </div>
    );
  }

  if (['rep-att', 'rep-marks', 'rep-hw', 'rep-perf', 'rep-prog'].includes(type)) {
    return (
      <div className="max-w-5xl space-y-4">
        <h2 className="font-bold text-slate-800 text-lg">Generate Report</h2>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
           <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg"><option>Class 10A</option></select>
           <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg"><option>Performance Report</option><option>Attendance Report</option></select>
           <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold">Generate PDF</button>
        </div>
      </div>
    );
  }

  // --- PROFILE & SETTINGS ---
  if (['prof-my', 'prof-pass', 'prof-photo', 'settings'].includes(type)) {
    return <GenericForm title="Profile & Settings" fields={[
      { name: 'name', label: 'Full Name' },
      { name: 'email', label: 'Email Address' },
      { name: 'phone', label: 'Phone Number' },
      { name: 'pass', label: 'New Password', type: 'password' },
      { name: 'bio', label: 'Short Bio', type: 'textarea', full: true },
    ]} />;
  }

  // Fallback
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mb-4">
        <CheckSquare className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">Module Under Construction</h2>
      <p className="text-slate-500 text-sm mt-2">This feature is being updated for the new Teacher Portal.</p>
    </div>
  );
}
