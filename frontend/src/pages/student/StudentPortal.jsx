import React from 'react';
import { 
  User, BookOpen, CalendarCheck, FileText, Bell, CheckSquare, Edit, 
  Download, CreditCard, LayoutDashboard, Search, Plus, Save, Award, Calendar, Bot,
  Clock, CheckCircle, AlertCircle, FileSpreadsheet, MapPin, Phone, Flag, Star
} from 'lucide-react';

// Common UI Components
const Th = ({c}) => <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-left whitespace-nowrap bg-slate-50">{c}</th>;
const Td = ({c, cls=''}) => <td className={`px-4 py-4 text-sm text-slate-700 border-t border-slate-100 ${cls}`}>{c}</td>;

function GenericTable({ title, columns, data }) {
  return (
    <div className="max-w-7xl space-y-4">
      {title && <h2 className="font-bold text-slate-800 text-xl">{title}</h2>}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>{columns.map(c => <Th key={c} c={c} />)}</tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  {Object.values(row).map((val, j) => (
                    <Td key={j} c={val} cls={j===0 ? 'font-semibold text-slate-900' : ''} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl font-bold shadow-sm transition-all border border-indigo-200 hover:border-indigo-600">
            <Download className="w-4 h-4" /> Download PDF
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

function PageHeader({ title, description, icon: Icon, color = 'indigo' }) {
  return (
    <div className={`bg-gradient-to-r from-${color}-600 to-${color}-500 rounded-2xl p-8 text-white shadow-md mb-8`}>
      <div className="flex items-center gap-4 mb-2">
        <div className={`p-3 bg-white/20 rounded-xl backdrop-blur-sm`}><Icon className="w-8 h-8 text-white" /></div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-${color}-100 font-medium mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function StudentPortal({ type }) {
  
  if (type === 'dashboard') {
    const cards = [
      { title: "My Profile", value: "Aarav Patel", icon: User, color: "indigo" },
      { title: "Subjects", value: "6", icon: BookOpen, color: "blue" },
      { title: "Today's Classes", value: "5", icon: Clock, color: "emerald" },
      { title: "Attendance", value: "92%", icon: CheckSquare, color: "teal" },
      { title: "Pending Homework", value: "3", icon: Edit, color: "amber" },
      { title: "Study Materials", value: "12", icon: FileText, color: "purple" },
      { title: "Pending Fees", value: "₹2,500", icon: CreditCard, color: "rose" },
      { title: "Notices", value: "2", icon: Bell, color: "cyan" },
      { title: "Latest Results", value: "A+", icon: Award, color: "emerald" },
      { title: "Upcoming Exams", value: "1", icon: Calendar, color: "rose" }
    ];

    const quickActions = [
      { label: "View Timetable", icon: Calendar },
      { label: "Check Attendance", icon: CheckSquare },
      { label: "Submit Homework", icon: Edit },
      { label: "Download Notes", icon: Download },
      { label: "Pay Fees", icon: CreditCard },
      { label: "Report Card", icon: FileSpreadsheet },
      { label: "View Notices", icon: Bell },
      { label: "Ask AI Tutor", icon: Bot },
    ];

    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-10">
        <PageHeader title="Welcome back, Aarav!" description="Here's an overview of your academic progress." icon={Award} />
        
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-indigo-500"/> Dashboard Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${c.color}-50 text-${c.color}-600 group-hover:scale-110 transition-transform`}><Icon className="w-6 h-6" /></div>
                  <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wide">{c.title}</h3>
                  <p className="text-2xl font-black text-slate-800 mt-1">{c.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2"><Star className="w-5 h-5 text-amber-500"/> Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
            {quickActions.map((qa, i) => {
              const Icon = qa.icon;
              const isAI = qa.label === 'Ask AI Tutor';
              return (
                <button key={i} className={`p-5 rounded-2xl border shadow-sm flex flex-col items-center justify-center text-center transition-all group ${isAI ? 'bg-indigo-600 border-indigo-700 hover:bg-indigo-700 shadow-indigo-200' : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md'}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${isAI ? 'bg-white/20 text-white' : 'bg-slate-50 text-indigo-600 group-hover:bg-indigo-50'}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className={`text-sm font-bold ${isAI ? 'text-white' : 'text-slate-700'}`}>{qa.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- ACADEMIC ---
  if (type === 'subjects') {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        <PageHeader title="My Subjects" description="Curriculum and syllabus for Class 10A" icon={BookOpen} color="blue" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'].map((sub, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4"><BookOpen className="w-7 h-7"/></div>
              <h3 className="text-xl font-bold text-slate-800">{sub}</h3>
              <p className="text-slate-500 mt-2 text-sm">Mr. Sharma • 45 Lessons</p>
              <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between">
                <button className="text-blue-600 font-bold text-sm hover:underline">View Syllabus</button>
                <span className="text-emerald-500 font-bold text-sm">85% Complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'timetable') {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        <PageHeader title="Class Timetable" description="Weekly schedule for Class 10A" icon={Calendar} color="emerald" />
        <GenericTable title="" columns={['Day', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM']} data={[
          { day: 'Monday', t1: 'Maths', t2: 'Physics', t3: 'Chemistry', t4: 'Lunch', t5: 'English' },
          { day: 'Tuesday', t1: 'English', t2: 'Biology', t3: 'Maths', t4: 'Lunch', t5: 'Computer Sci.' },
          { day: 'Wednesday', t1: 'Physics', t2: 'Chemistry', t3: 'Biology', t4: 'Lunch', t5: 'Maths' },
          { day: 'Thursday', t1: 'Computer Sci.', t2: 'Maths', t3: 'English', t4: 'Lunch', t5: 'Physics' },
          { day: 'Friday', t1: 'Chemistry', t2: 'Biology', t3: 'Computer Sci.', t4: 'Lunch', t5: 'Sports' },
          { day: 'Saturday', t1: 'Sports', t2: 'Computer Sci.', t3: 'Physics', t4: 'Lunch', t5: 'Maths' },
        ]} />
      </div>
    );
  }

  if (['materials', 'homework', 'online'].includes(type)) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        <PageHeader title={type === 'materials' ? "Study Materials" : type === 'homework' ? "Homework & Assignments" : "Online Classes"} description={`Access your academic ${type === 'materials' ? 'resources' : type === 'homework' ? 'tasks' : 'meetings'}`} icon={type === 'homework' ? Edit : type === 'online' ? Video : Download} color="purple" />
        <GenericTable title="" columns={['Subject', 'Title', 'Date Posted', 'Action']} data={[
          { s: 'Mathematics', t: 'Algebra Fundamentals Notes', d: '2026-07-18', a: <button className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg text-sm">View / Download</button> },
          { s: 'Physics', t: 'Chapter 4 Assignment', d: '2026-07-17', a: <button className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg text-sm">View / Download</button> },
          { s: 'Chemistry', t: 'Live Doubt Session', d: '2026-07-19 (Tomorrow)', a: <button className="px-4 py-2 bg-rose-50 text-rose-700 font-bold rounded-lg text-sm">Join Class</button> },
        ]} />
      </div>
    );
  }

  // --- EXAMS ---
  if (['schedule', 'results', 'reports'].includes(type)) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        <PageHeader title={type === 'schedule' ? "Exam Schedule" : type === 'results' ? "My Results" : "Report Cards"} description="Track your academic performance and exams" icon={Award} color="rose" />
        <GenericTable title="" columns={type === 'schedule' ? ['Exam Name', 'Subject', 'Date', 'Time'] : ['Exam Name', 'Subject', 'Max Marks', 'Obtained Marks', 'Grade']} data={
          type === 'schedule' ? [
            { e: 'Mid Term 2026', s: 'Mathematics', d: '2026-08-15', t: '09:00 AM - 12:00 PM' },
            { e: 'Mid Term 2026', s: 'Physics', d: '2026-08-17', t: '09:00 AM - 12:00 PM' },
          ] : [
            { e: 'Unit Test 1', s: 'Mathematics', m: '50', o: '45', g: 'A+' },
            { e: 'Unit Test 1', s: 'Physics', m: '50', o: '42', g: 'A' },
          ]
        } />
      </div>
    );
  }

  // --- ATTENDANCE ---
  if (['attendance', 'leave'].includes(type)) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        <PageHeader title={type === 'attendance' ? "My Attendance" : "Leave Application"} description="View your attendance records and apply for leave" icon={CheckSquare} color="teal" />
        {type === 'leave' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm max-w-3xl mb-8 flex gap-4">
            <button className="px-6 py-3 bg-teal-600 text-white font-bold rounded-xl flex items-center gap-2"><Plus className="w-5 h-5"/> Apply for New Leave</button>
          </div>
        )}
        <GenericTable title="Recent Records" columns={['Date', 'Status', 'Remarks']} data={[
          { d: '2026-07-18', s: <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Present</span>, r: 'Regular' },
          { d: '2026-07-17', s: <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">Late</span>, r: 'Arrived at 9:15 AM' },
          { d: '2026-07-16', s: <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold">Absent</span>, r: 'Sick Leave' },
        ]} />
      </div>
    );
  }

  // --- FEES & PAYMENTS ---
  if (['fees', 'pay', 'receipts'].includes(type)) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        <PageHeader title="Fee Management" description="View fee ledger, make online payments, and download receipts" icon={CreditCard} color="indigo" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
            <CreditCard className="absolute -right-4 -bottom-4 w-32 h-32 text-indigo-500/30" />
            <h3 className="text-indigo-100 font-bold mb-1">Total Fee Amount</h3>
            <p className="text-4xl font-black">₹45,000</p>
            <p className="text-sm mt-4 text-indigo-100">For Academic Year 2026-27</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <h3 className="text-slate-500 font-bold mb-1">Total Paid</h3>
            <p className="text-3xl font-black text-emerald-600">₹42,500</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <h3 className="text-slate-500 font-bold mb-1">Pending Balance</h3>
            <p className="text-3xl font-black text-rose-600">₹2,500</p>
            {type !== 'pay' && <button className="mt-4 px-4 py-2 bg-rose-50 text-rose-700 font-bold rounded-lg text-sm hover:bg-rose-100 transition-colors">Pay Now</button>}
          </div>
        </div>

        {type === 'pay' ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
            <div className="p-6 border-b border-slate-100 bg-slate-50 rounded-t-2xl"><h2 className="font-bold text-slate-800 text-lg">Make a Payment</h2></div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-bold text-slate-600 mb-2">Select Month / Installment</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"><option>August Tuition Fee - ₹2,500</option></select>
              </div>
              <div><label className="block text-sm font-bold text-slate-600 mb-2">Payment Method</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500">
                  <option>Credit/Debit Card</option><option>UPI / Netbanking</option>
                </select>
              </div>
              <button className="w-full py-4 mt-4 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700">Proceed to Pay ₹2,500</button>
            </div>
          </div>
        ) : (
          <GenericTable title="Fee Ledger & Receipts" columns={['Installment / Month', 'Amount', 'Due Date', 'Status', 'Action']} data={[
            { m: 'July Tuition Fee', a: '₹2,500', d: '2026-07-10', s: <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Paid</span>, ac: <button className="text-indigo-600 font-bold text-sm">Download Receipt</button> },
            { m: 'August Tuition Fee', a: '₹2,500', d: '2026-08-10', s: <span className="text-rose-600 font-bold flex items-center gap-1"><AlertCircle className="w-4 h-4"/> Pending</span>, ac: <button className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold">Pay Now</button> },
          ]} />
        )}
      </div>
    );
  }

  // --- LIBRARY & COMMUNICATION ---
  if (['library', 'history', 'notices', 'messages', 'circulars'].includes(type)) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        <PageHeader title={['library', 'history'].includes(type) ? "Library Portal" : "Communication Center"} description="Stay updated with school events and resources" icon={Bell} color="cyan" />
        <GenericTable title="Recent Updates" columns={['Date', 'Details', 'Category']} data={[
          { d: '2026-07-18', dt: 'Annual Sports Meet Announcement', c: 'General Notice' },
          { d: '2026-07-15', dt: 'Physics Lab Manual (Issued)', c: 'Library' },
        ]} />
      </div>
    );
  }

  // --- CALENDAR ---
  if (['cal-academic', 'cal-holidays'].includes(type)) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        <PageHeader title={type === 'cal-holidays' ? "School Holidays" : "Academic Calendar"} description="Month-wise view of upcoming school events and holidays" icon={Calendar} color="emerald" />
        
        <div className="flex justify-end mb-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-emerald-500 text-emerald-600 rounded-xl text-sm font-bold shadow-sm hover:bg-emerald-50 transition-colors">
            <Download className="w-5 h-5"/> Download PDF Calendar
          </button>
        </div>

        <VisualCalendar />
      </div>
    );
  }

  // --- PROFILE ---
  if (['profile', 'settings'].includes(type)) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        <PageHeader title="My Profile" description="Manage your personal details and settings" icon={User} color="slate" />
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm max-w-4xl flex flex-col md:flex-row overflow-hidden">
          <div className="bg-slate-50 p-8 flex flex-col items-center justify-center border-r border-slate-200 md:w-1/3">
            <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl font-bold mb-4 shadow-inner">AA</div>
            <h2 className="text-xl font-bold text-slate-800">Aarav Patel</h2>
            <p className="text-slate-500 font-medium">Class 10A | Roll: 101</p>
            <span className="mt-4 px-4 py-1.5 bg-emerald-100 text-emerald-700 font-bold rounded-full text-sm">Active Student</span>
          </div>
          <div className="p-8 md:w-2/3 space-y-6">
            <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Father's Name</p><p className="font-semibold text-slate-700 mt-1">Rajesh Patel</p></div>
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Date of Birth</p><p className="font-semibold text-slate-700 mt-1">15 Aug 2010</p></div>
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1"><Phone className="w-3 h-3"/> Phone Number</p><p className="font-semibold text-slate-700 mt-1">+91 98765 43210</p></div>
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1"><MapPin className="w-3 h-3"/> Address</p><p className="font-semibold text-slate-700 mt-1">123 Horizon St, City</p></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <PageHeader title="Feature Coming Soon" description="We are building something awesome here." icon={CheckSquare} color="slate" />
    </div>
  );
}
