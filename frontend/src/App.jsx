import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import TeacherLayout from './pages/teacher/TeacherLayout';
import TeacherPortal from './pages/teacher/TeacherPortal';
import PagePlaceholder from './pages/PagePlaceholder';
import StudentManager from './pages/academic/StudentManager';
import ClassManager from './pages/academic/ClassManager';
import SectionManager from './pages/academic/SectionManager';
import TeacherManager from './pages/academic/TeacherManager';
import TimetableManager from './pages/academic/TimetableManager';
import HomeworkManager from './pages/academic/HomeworkManager';
import ExamManager from './pages/academic/ExamManager';
import MarksManager from './pages/academic/MarksManager';
import ResultManager from './pages/academic/ResultManager';
import CommunicateManager from './pages/communicate/CommunicateManager';
import ReportManager from './pages/reports/ReportManager';
import Users from './pages/Users';
import RolesPermissions from './pages/RolesPermissions';
import GenericSettingsForm from './components/settings/GenericSettingsForm';
import { 
  GeneralSettingsSchema, SessionSettingsSchema, NotificationSettingsSchema, 
  WhatsappSettingsSchema, SMSSettingsSchema, PaymentMethodsSchema, 
  PrintHeaderSchema, ThermalPrintSchema, FrontCMSSchema, BackupRestoreSchema, 
  LanguagesSchema, CurrencySchema, ModulesSchema, SMTPSettingsSchema 
} from './components/settings/SettingsSchemas';
import StaffDirectory from './pages/hr/StaffDirectory';
import StaffAttendance from './pages/hr/StaffAttendance';
import Payroll from './pages/hr/Payroll';
import LeaveRequest from './pages/hr/LeaveRequest';
import HRGenericSetup from './pages/hr/HRGenericSetup';
import BusManager from './pages/transport/BusManager';
import FeeManager from './pages/fees/FeeManager';
import FeeStructure from './pages/fees/FeeStructure';
import AccountsManager from './pages/accounts/AccountsManager';
import InventoryManager from './pages/inventory/InventoryManager';

import StudentDetails from './pages/student/StudentDetails';
import StudentLayout from './pages/student/StudentLayout';
import StudentPortal from './pages/student/StudentPortal';
import StudentAdmission from './pages/student/StudentAdmission';
import OnlineAdmission from './pages/student/OnlineAdmission';
import DisabledStudents from './pages/student/DisabledStudents';
import MultiClassStudent from './pages/student/MultiClassStudent';
import BulkDelete from './pages/student/BulkDelete';

import AnnualCalendar from './pages/calendar/AnnualCalendar';
import StudentAttendance from './pages/attendance/StudentAttendance';

import ClassTimetable from './pages/academic/ClassTimetable';
import TeachersTimetable from './pages/academic/TeachersTimetable';
import AssignClassTeacher from './pages/academic/AssignClassTeacher';
import PromoteStudents from './pages/academic/PromoteStudents';

import CollectFees from './pages/fees/CollectFees';
import SearchDueFees from './pages/fees/SearchDueFees';
import SearchPayment from './pages/fees/SearchPayment';
import FeeSheet from './pages/fees/FeeSheet';

import AdmissionEnquiry from './pages/front-office/AdmissionEnquiry';
import VisitorBook from './pages/front-office/VisitorBook';
import PhoneCallLog from './pages/front-office/PhoneCallLog';

import UploadContent from './pages/download/UploadContent';
import DownloadList from './pages/download/DownloadList';
import { CheckSquare, BookOpen, List, Download, Video } from 'lucide-react';

function App() {
  const { loading } = useContext(AuthContext);
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
      <div style={{ width: 40, height: 40, border: '3px solid #334155', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<SuperAdminDashboard />} />
      </Route>

      <Route element={<StudentLayout />}>
        <Route path="/student/dashboard" element={<StudentPortal type="dashboard" />} />
        <Route path="/student/academic/subjects" element={<StudentPortal type="subjects" />} />
        <Route path="/student/academic/timetable" element={<StudentPortal type="timetable" />} />
        <Route path="/student/academic/materials" element={<StudentPortal type="materials" />} />
        <Route path="/student/academic/homework" element={<StudentPortal type="homework" />} />
        <Route path="/student/academic/online" element={<StudentPortal type="online" />} />
        <Route path="/student/exams/schedule" element={<StudentPortal type="schedule" />} />
        <Route path="/student/exams/results" element={<StudentPortal type="results" />} />
        <Route path="/student/exams/reports" element={<StudentPortal type="reports" />} />
        <Route path="/student/attendance/view" element={<StudentPortal type="attendance" />} />
        <Route path="/student/attendance/leave" element={<StudentPortal type="leave" />} />
        <Route path="/student/fees/ledger" element={<StudentPortal type="fees" />} />
        <Route path="/student/fees/pay" element={<StudentPortal type="pay" />} />
        <Route path="/student/fees/receipts" element={<StudentPortal type="receipts" />} />
        <Route path="/student/library/issued" element={<StudentPortal type="library" />} />
        <Route path="/student/library/history" element={<StudentPortal type="history" />} />
        <Route path="/student/communication/notices" element={<StudentPortal type="notices" />} />
        <Route path="/student/communication/messages" element={<StudentPortal type="messages" />} />
        <Route path="/student/communication/circulars" element={<StudentPortal type="circulars" />} />
        <Route path="/student/calendar/academic" element={<StudentPortal type="cal-academic" />} />
        <Route path="/student/calendar/holidays" element={<StudentPortal type="cal-holidays" />} />
        <Route path="/student/profile/view" element={<StudentPortal type="profile" />} />
        <Route path="/student/profile/settings" element={<StudentPortal type="settings" />} />
      </Route>

      <Route element={<TeacherLayout />}>
        <Route path="/teacher/dashboard" element={<TeacherPortal type="dashboard" />} />
        <Route path="/teacher/academic/classes" element={<TeacherPortal type="academic-classes" />} />
        <Route path="/teacher/academic/subjects" element={<TeacherPortal type="academic-subjects" />} />
        <Route path="/teacher/academic/timetable" element={<TeacherPortal type="academic-timetable" />} />
        <Route path="/teacher/academic/lesson-plans" element={<TeacherPortal type="academic-lesson" />} />
        <Route path="/teacher/academic/syllabus" element={<TeacherPortal type="academic-progress" />} />
        <Route path="/teacher/academic/materials" element={<TeacherPortal type="academic-materials" />} />
        <Route path="/teacher/academic/online" element={<TeacherPortal type="academic-online" />} />
        <Route path="/teacher/students/list" element={<TeacherPortal type="student-list" />} />
        <Route path="/teacher/students/profiles" element={<TeacherPortal type="student-profiles" />} />
        <Route path="/teacher/students/attendance" element={<TeacherPortal type="student-attendance" />} />
        <Route path="/teacher/students/leave" element={<TeacherPortal type="student-leave" />} />
        <Route path="/teacher/students/performance" element={<TeacherPortal type="student-performance" />} />
        <Route path="/teacher/students/behavior" element={<TeacherPortal type="student-behavior" />} />
        <Route path="/teacher/students/contact" element={<TeacherPortal type="student-contact" />} />
        <Route path="/teacher/homework/create" element={<TeacherPortal type="hw-create" />} />
        <Route path="/teacher/homework/projects" element={<TeacherPortal type="hw-projects" />} />
        <Route path="/teacher/homework/notes" element={<TeacherPortal type="hw-notes" />} />
        <Route path="/teacher/homework/submission" element={<TeacherPortal type="hw-submit" />} />
        <Route path="/teacher/homework/grade" element={<TeacherPortal type="hw-grade" />} />
        <Route path="/teacher/homework/history" element={<TeacherPortal type="hw-history" />} />
        <Route path="/teacher/examinations/schedule" element={<TeacherPortal type="exam-schedule" />} />
        <Route path="/teacher/examinations/marks" element={<TeacherPortal type="exam-marks" />} />
        <Route path="/teacher/examinations/grade" element={<TeacherPortal type="exam-grade" />} />
        <Route path="/teacher/examinations/analysis" element={<TeacherPortal type="exam-analysis" />} />
        <Route path="/teacher/examinations/reports" element={<TeacherPortal type="exam-report" />} />
        <Route path="/teacher/attendance/daily" element={<TeacherPortal type="att-daily" />} />
        <Route path="/teacher/attendance/monthly" element={<TeacherPortal type="att-monthly" />} />
        <Route path="/teacher/attendance/reports" element={<TeacherPortal type="att-reports" />} />
        <Route path="/teacher/attendance/late" element={<TeacherPortal type="att-late" />} />
        <Route path="/teacher/communication/notices" element={<TeacherPortal type="comm-notices" />} />
        <Route path="/teacher/communication/messages" element={<TeacherPortal type="comm-messages" />} />
        <Route path="/teacher/communication/parent" element={<TeacherPortal type="comm-parent" />} />
        <Route path="/teacher/communication/announcements" element={<TeacherPortal type="comm-announce" />} />
        <Route path="/teacher/communication/circulars" element={<TeacherPortal type="comm-circular" />} />
        <Route path="/teacher/live/create" element={<TeacherPortal type="live-create" />} />
        <Route path="/teacher/live/join" element={<TeacherPortal type="live-join" />} />
        <Route path="/teacher/live/history" element={<TeacherPortal type="live-history" />} />
        <Route path="/teacher/live/recordings" element={<TeacherPortal type="live-record" />} />
        <Route path="/teacher/library/issued" element={<TeacherPortal type="lib-issue" />} />
        <Route path="/teacher/library/return" element={<TeacherPortal type="lib-return" />} />
        <Route path="/teacher/library/history" element={<TeacherPortal type="lib-history" />} />
        <Route path="/teacher/leave/apply" element={<TeacherPortal type="leave-apply" />} />
        <Route path="/teacher/leave/status" element={<TeacherPortal type="leave-status" />} />
        <Route path="/teacher/leave/history" element={<TeacherPortal type="leave-history" />} />
        <Route path="/teacher/calendar/academic" element={<TeacherPortal type="cal-academic" />} />
        <Route path="/teacher/calendar/holidays" element={<TeacherPortal type="cal-holidays" />} />
        <Route path="/teacher/calendar/events" element={<TeacherPortal type="cal-events" />} />
        <Route path="/teacher/calendar/exams" element={<TeacherPortal type="cal-exams" />} />
        <Route path="/teacher/reports/attendance" element={<TeacherPortal type="rep-att" />} />
        <Route path="/teacher/reports/marks" element={<TeacherPortal type="rep-marks" />} />
        <Route path="/teacher/reports/homework" element={<TeacherPortal type="rep-hw" />} />
        <Route path="/teacher/reports/performance" element={<TeacherPortal type="rep-perf" />} />
        <Route path="/teacher/reports/progress" element={<TeacherPortal type="rep-prog" />} />
        <Route path="/teacher/profile/view" element={<TeacherPortal type="prof-my" />} />
        <Route path="/teacher/profile/password" element={<TeacherPortal type="prof-pass" />} />
        <Route path="/teacher/profile/photo" element={<TeacherPortal type="prof-photo" />} />
        <Route path="/teacher/settings" element={<TeacherPortal type="settings" />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="/settings" element={<Settings />} />
        
        {/* Student Information Routes */}
        <Route path="/student/details" element={<StudentDetails />} />
        <Route path="/student/admission" element={<StudentAdmission />} />
        <Route path="/student/online-admission" element={<OnlineAdmission />} />
        <Route path="/student/disabled" element={<DisabledStudents />} />
        <Route path="/student/multi-class" element={<MultiClassStudent />} />
        <Route path="/student/bulk-delete" element={<BulkDelete />} />
        <Route path="/student/categories" element={<HRGenericSetup title="Student Categories" description="Manage different student categories." columns={["Category Name", "Description"]} data={[{name: "General", desc: "General Category"}]} />} />
        <Route path="/student/house" element={<HRGenericSetup title="Student House" description="Manage student houses and groupings." columns={["House Name", "Description"]} data={[{name: "Red House", desc: "Alpha Team"}]} />} />
        <Route path="/student/disable-reason" element={<HRGenericSetup title="Disable Reasons" description="Manage reasons for disabling students." columns={["Reason"]} data={[{reason: "Transferred to another school"}]} />} />
        
        {/* Human Resource Routes */}
        <Route path="/hr/staff-directory" element={<StaffDirectory />} />
        <Route path="/hr/staff-attendance" element={<StaffAttendance />} />
        <Route path="/hr/payroll" element={<Payroll />} />
        <Route path="/hr/approve-leave-request" element={<LeaveRequest type="approve" />} />
        <Route path="/hr/apply-leave" element={<LeaveRequest type="apply" />} />
        <Route path="/hr/leave-type" element={
            <HRGenericSetup title="Leave Type" description="Manage different types of leaves." columns={['Name']} initialData={[{ name: 'Sick Leave' }, { name: 'Casual Leave' }, { name: 'Maternity Leave' }]} />
        } />
        <Route path="/hr/teachers-rating" element={
            <HRGenericSetup title="Teachers Rating" description="View and manage performance ratings." columns={['Teacher Name', 'Rating', 'Comments']} initialData={[{ name: 'Alexander Smith', rating: '5 Stars', comment: 'Excellent teaching methods' }]} />
        } />
        <Route path="/hr/department" element={
            <HRGenericSetup title="Department" description="Manage organizational departments." columns={['Name']} initialData={[{ name: 'Science' }, { name: 'Library' }, { name: 'Transport' }, { name: 'Finance' }]} />
        } />
        <Route path="/hr/designation" element={
            <HRGenericSetup title="Designation" description="Manage staff designations." columns={['Name']} initialData={[{ name: 'Teacher' }, { name: 'Librarian' }, { name: 'Bus Staff' }, { name: 'Accountant' }]} />
        } />
        <Route path="/hr/disabled-staff" element={
            <HRGenericSetup title="Disabled Staff" description="View staff members who are no longer active." columns={['Name', 'Role', 'Reason']} initialData={[{ name: 'John Doe', role: 'Teacher', reason: 'Resigned' }]} />
        } />

        {/* Fees Collection Routes */}
        <Route path="/fees/collect" element={<CollectFees />} />
        <Route path="/fees/sheet" element={<FeeSheet />} />
        <Route path="/fees/offline-bank" element={<HRGenericSetup title="Offline Bank Payments" description="Reconcile and manage bank transfers or offline payments." columns={["Reference No", "Amount", "Status"]} data={[{name: "REF-1002", amount: "5000", status: "Pending"}]} />} />
        <Route path="/fees/search-payment" element={<SearchPayment />} />
        <Route path="/fees/search-due" element={<SearchDueFees />} />
        <Route path="/fees/master" element={<HRGenericSetup title="Fees Master" description="Master configuration for school fees." columns={["Fee Group", "Fee Type", "Amount"]} data={[{group: "Tuition", type: "Monthly", amount: "2500"}]} />} />
        <Route path="/fees/quick" element={<CollectFees />} />
        <Route path="/fees/group" element={<HRGenericSetup title="Fees Group" description="Group multiple fee types together." columns={["Name", "Description"]} data={[{name: "Class 10 Fees", description: "All fees for Class 10"}]} />} />
        <Route path="/fees/type" element={<HRGenericSetup title="Fees Type" description="Define specific types of fees." columns={["Name", "Code"]} data={[{name: "Transport Fee", code: "TRP"}]} />} />
        <Route path="/fees/discount" element={<HRGenericSetup title="Fees Discount" description="Manage discount structures for students." columns={["Name", "Discount Code", "Amount"]} data={[{name: "Sibling Discount", code: "SIB10", amount: "10%"}]} />} />
        <Route path="/fees/carry-forward" element={<HRGenericSetup title="Fees Carry Forward" description="Carry forward pending dues from previous sessions." columns={["Session", "Action"]} data={[{session: "2025-2026", action: "Completed"}]} />} />
        <Route path="/fees/reminder" element={<HRGenericSetup title="Fees Reminder" description="Configure automatic reminders for fee payments." columns={["Reminder Type", "Days Before/After", "Status"]} data={[{type: "Before Due Date", days: "5 Days", status: "Active"}]} />} />

        {/* Academics Routes */}
        <Route path="/academics/class-timetable" element={<ClassTimetable />} />
        <Route path="/academics/teachers-timetable" element={<TeachersTimetable />} />
        <Route path="/academics/assign-teacher" element={<AssignClassTeacher />} />
        <Route path="/academics/promote" element={<PromoteStudents />} />
        <Route path="/academics/subject-group" element={<HRGenericSetup title="Subject Group" description="Group related subjects for a specific curriculum." columns={["Name", "Sections", "Subjects"]} data={[{name: "Science Stream", sections: "A, B", subjects: "Physics, Chemistry, Math"}]} />} />
        <Route path="/academics/subjects" element={<HRGenericSetup title="Subjects" description="Manage all academic subjects." columns={["Subject Name", "Subject Code", "Subject Type"]} data={[{name: "Mathematics", code: "MAT-101", type: "Theory"}]} />} />
        <Route path="/academics/class" element={<HRGenericSetup title="Classes" description="Manage academic classes/grades." columns={["Class", "Sections"]} data={[{class: "Class 10", sections: "A, B, C"}]} />} />
        <Route path="/academics/sections" element={<HRGenericSetup title="Sections" description="Manage sections for classes." columns={["Section Name"]} data={[{name: "Section A"}, {name: "Section B"}]} />} />

        {/* Front Office Routes */}
        <Route path="/front-office/admission-enquiry" element={<AdmissionEnquiry />} />
        <Route path="/front-office/visitor-book" element={<VisitorBook />} />
        <Route path="/front-office/phone-call-log" element={<PhoneCallLog />} />
        <Route path="/front-office/postal-dispatch" element={<HRGenericSetup title="Postal Dispatch" description="Track outgoing physical mail and parcels." columns={["To Title", "Reference No", "Address", "Date"]} data={[{name: "Board of Education", ref: "DISP-101", address: "City Center", date: "2026-06-28"}]} />} />
        <Route path="/front-office/postal-receive" element={<HRGenericSetup title="Postal Receive" description="Log incoming mail and parcels." columns={["From Title", "Reference No", "Address", "Date"]} data={[{name: "Stationery Supplier", ref: "REC-202", address: "Industrial Area", date: "2026-06-27"}]} />} />
        <Route path="/front-office/complain" element={<HRGenericSetup title="Complaints" description="Register and track complaints." columns={["Complain Type", "Source", "Name", "Date"]} data={[{type: "Maintenance", source: "Parent", name: "Ramesh Singh", date: "2026-06-25"}]} />} />
        <Route path="/front-office/setup" element={<HRGenericSetup title="Setup Front Office" description="Manage front office reference data (Complain Types, Sources, etc)." columns={["Setup Category", "Name"]} data={[{category: "Complain Type", name: "Academic"}, {category: "Source", name: "Website"}]} />} />

        {/* Alumni Routes */}
        <Route path="/alumni/manage" element={<HRGenericSetup title="Manage Alumni" description="Manage past students and alumni records." columns={["Name", "Batch", "Occupation"]} data={[{name: "John Doe", batch: "2015", occupation: "Software Engineer"}]} />} />
        <Route path="/alumni/events" element={<HRGenericSetup title="Alumni Events" description="Plan and manage alumni events." columns={["Event Name", "Date", "Location"]} data={[{name: "Annual Meetup 2026", date: "2026-12-15", location: "Main Auditorium"}]} />} />

        {/* Annual Calendar Routes */}
        <Route path="/calendar/annual" element={<AnnualCalendar />} />
        <Route path="/calendar/holiday-type" element={<HRGenericSetup title="Holiday Type" description="Manage different types of holidays and off-days." columns={["Holiday Name", "Description"]} data={[{name: "National Holiday", desc: "Government declared holidays"}, {name: "School Holiday", desc: "Internal school holidays"}]} />} />

        {/* Attendance Routes */}
        <Route path="/attendance/student" element={<StudentAttendance />} />
        <Route path="/attendance/approve-leave" element={<HRGenericSetup title="Approve Leave" description="Approve or reject student leave requests." columns={["Student Name", "Class", "Duration", "Status"]} data={[{name: "Alice Walker", class: "10 A", duration: "2 Days", status: "Pending"}]} />} />
        <Route path="/attendance/by-date" element={<HRGenericSetup title="Attendance By Date" description="View attendance records filtered by date." columns={["Date", "Total Present", "Total Absent"]} data={[{date: "2026-06-28", present: "450", absent: "32"}]} />} />

        {/* Communicate Routes */}
        <Route path="/communicate/notice-board" element={<CommunicateManager type="notice" />} />
        <Route path="/communicate/email" element={<CommunicateManager type="email" />} />
        <Route path="/communicate/sms" element={<CommunicateManager type="sms" />} />
        <Route path="/communicate/whatsapp" element={<CommunicateManager type="whatsapp" />} />
        <Route path="/communicate/circular" element={<CommunicateManager type="circular" />} />
        <Route path="/communicate/send-email" element={<Navigate to="/communicate/email" replace />} />
        <Route path="/communicate/send-sms" element={<Navigate to="/communicate/sms" replace />} />
        
        <Route path="/communicate/log" element={<HRGenericSetup title="Communication Log" description="View logs of all sent emails and SMS." columns={["Type", "Sent To", "Date", "Status"]} data={[{type: "Email", sent: "Class 10", date: "2026-06-28", status: "Delivered"}]} />} />
        <Route path="/communicate/schedule-log" element={<HRGenericSetup title="Scheduled Log" description="View scheduled communications." columns={["Type", "Scheduled Date", "Status"]} data={[{type: "SMS", date: "2026-07-01", status: "Pending"}]} />} />
        <Route path="/communicate/login-credentials" element={<HRGenericSetup title="Send Login Credentials" description="Send portal login details to users." columns={["User Role", "Date Sent", "Count"]} data={[{role: "Students", date: "2026-06-01", count: "150"}]} />} />
        <Route path="/communicate/email-template" element={<HRGenericSetup title="Email Templates" description="Manage email templates for quick sending." columns={["Template Name", "Subject"]} data={[{name: "Welcome Email", subject: "Welcome to Thomson School"}]} />} />
        <Route path="/communicate/sms-template" element={<HRGenericSetup title="SMS Templates" description="Manage SMS templates." columns={["Template Name", "Message Preview"]} data={[{name: "Fee Reminder", preview: "Dear Parent, this is a reminder..."}]} />} />

        {/* Download Center Routes */}
        <Route path="/download/upload" element={<UploadContent />} />
        <Route path="/download/share-list" element={<DownloadList title="Content Share List" description="View and manage files shared with students and staff." icon={List} />} />
        <Route path="/download/video-tutorial" element={<DownloadList title="Video Tutorials" description="Access video resources for learning and training." icon={Video} />} />
        <Route path="/download/content-type" element={<HRGenericSetup title="Content Type Setup" description="Define types of downloadable content." columns={["Content Type Name", "Description"]} data={[{name: "Assignment", desc: "Homework and assignments"}, {name: "Study Material", desc: "Class notes and reference books"}]} />} />

        {/* Examinations Routes */}
        <Route path="/examinations/group" element={<HRGenericSetup title="Exam Group" description="Manage examination groups (e.g. Mid-Term, Final)." columns={["Group Name", "Description"]} data={[{name: "Mid Terms 2026", desc: "First semester exams"}]} />} />
        <Route path="/examinations/schedule" element={<HRGenericSetup title="Exam Schedule" description="Manage timetables for examinations." columns={["Exam Group", "Subject", "Date", "Time"]} data={[{group: "Mid Terms 2026", subject: "Mathematics", date: "2026-08-10", time: "10:00 AM"}]} />} />
        <Route path="/examinations/result" element={<HRGenericSetup title="Exam Result" description="Publish and view examination results." columns={["Exam Group", "Class", "Published On"]} data={[{group: "Mid Terms 2026", class: "Class 10", date: "2026-08-25"}]} />} />



        {/* System Settings Routes */}
        <Route path="/settings/general" element={<GenericSettingsForm {...GeneralSettingsSchema} />} />
        <Route path="/settings/session" element={<GenericSettingsForm {...SessionSettingsSchema} />} />
        <Route path="/settings/notification" element={<GenericSettingsForm {...NotificationSettingsSchema} />} />
        <Route path="/settings/whatsapp" element={<GenericSettingsForm {...WhatsappSettingsSchema} />} />
        <Route path="/settings/sms" element={<GenericSettingsForm {...SMSSettingsSchema} />} />
        <Route path="/settings/payment-methods" element={<GenericSettingsForm {...PaymentMethodsSchema} />} />
        <Route path="/settings/print-header" element={<GenericSettingsForm {...PrintHeaderSchema} />} />
        <Route path="/settings/thermal-print" element={<GenericSettingsForm {...ThermalPrintSchema} />} />
        <Route path="/settings/front-cms" element={<GenericSettingsForm {...FrontCMSSchema} />} />
        <Route path="/settings/roles" element={<RolesPermissions />} />
        <Route path="/settings/permissions" element={<RolesPermissions />} />
        <Route path="/settings/backup" element={<GenericSettingsForm {...BackupRestoreSchema} />} />
        <Route path="/settings/smtp" element={<GenericSettingsForm {...SMTPSettingsSchema} />} />
        <Route path="/settings/languages" element={<GenericSettingsForm {...LanguagesSchema} />} />
        <Route path="/settings/currency" element={<GenericSettingsForm {...CurrencySchema} />} />
        <Route path="/settings/addons" element={<HRGenericSetup title="System Addons" description="Manage third-party plugins and modules." columns={["Addon Name", "Version", "Status"]} data={[{name: "Advanced Reporting", version: "1.2.0", status: "Active"}]} />} />
        <Route path="/settings/users" element={<Users />} />
        <Route path="/settings/modules" element={<GenericSettingsForm {...ModulesSchema} />} />
        <Route path="/settings/custom-fields" element={<HRGenericSetup title="Custom Fields" description="Add custom fields to entities." columns={["Entity", "Field Name", "Type"]} data={[{entity: "Student", name: "Blood Group", type: "Dropdown"}]} />} />


        {/* Academic Menu */}
        <Route path="/academic/students" element={<StudentManager defaultView="list" />} />
        <Route path="/academic/admission" element={<StudentManager defaultView="add" />} />
        <Route path="/academic/teachers" element={<TeacherManager defaultView="list" />} />
        <Route path="/academic/staff" element={<PagePlaceholder title="Staff" />} />
        <Route path="/academic/class" element={<ClassManager />} />
        <Route path="/academic/section" element={<SectionManager />} />
        <Route path="/academic/timetable" element={<TimetableManager />} />
        <Route path="/academic/homework" element={<HomeworkManager />} />

        {/* Attendance Menu */}
        <Route path="/attendance/teacher" element={<PagePlaceholder title="Teacher Attendance" />} />
        <Route path="/attendance/staff" element={<PagePlaceholder title="Staff Attendance" />} />
        <Route path="/attendance/leave" element={<PagePlaceholder title="Leave Management" />} />

        {/* Reports Menu */}
        <Route path="/reports/student" element={<ReportManager type="student" />} />
        <Route path="/reports/attendance" element={<ReportManager type="attendance" />} />
        <Route path="/reports/fee" element={<ReportManager type="fee" />} />
        <Route path="/reports/exam" element={<ReportManager type="exam" />} />
        <Route path="/reports/staff" element={<ReportManager type="staff" />} />

        {/* Examination Menu */}
        <Route path="/exam/exams" element={<ExamManager />} />
        <Route path="/exam/marks" element={<MarksManager />} />
        <Route path="/exam/grade" element={<PagePlaceholder title="Grade" />} />
        <Route path="/exam/result" element={<ResultManager />} />
        <Route path="/exam/promotion" element={<PagePlaceholder title="Promotion" />} />

        {/* Fees Collection Menu */}
        <Route path="/fees/collect" element={<FeeManager type="collect" />} />
        <Route path="/fees/offline-bank" element={<FeeManager type="collect" />} />
        <Route path="/fees/search" element={<FeeManager type="collect" />} />
        <Route path="/fees/due" element={<FeeManager type="collect" />} />
        <Route path="/fees/master" element={<FeeStructure />} />
        <Route path="/fees/quick" element={<FeeManager type="collect" />} />
        <Route path="/fees/group" element={<HRGenericSetup title="Fees Group" description="Manage fee groups for different categories." columns={["Group Name", "Description", "Status"]} data={[{name: "Monthly Fees", desc: "Regular monthly tuition", status: "Active"}, {name: "Annual Fees", desc: "Yearly charges", status: "Active"}]} />} />
        <Route path="/fees/type" element={<HRGenericSetup title="Fees Type" description="Configure different types of fees collected." columns={["Fee Type", "Code", "Amount", "Status"]} data={[{type: "Tuition Fee", code: "TF", amount: "₹5,000", status: "Active"}, {type: "Transport Fee", code: "TRF", amount: "₹2,000", status: "Active"}, {type: "Library Fee", code: "LF", amount: "₹500", status: "Active"}]} />} />
        <Route path="/fees/discount" element={<HRGenericSetup title="Fees Discount" description="Manage fee discounts and waivers." columns={["Discount Name", "Type", "Value"]} data={[{name: "Sibling Discount", type: "Percentage", value: "10%"}, {name: "Staff Child Discount", type: "Percentage", value: "25%"}]} />} />
        <Route path="/fees/carry-forward" element={<PagePlaceholder title="Fees Carry Forward" />} />
        <Route path="/fees/reminder" element={<PagePlaceholder title="Fees Reminder" />} />

        {/* Transport Menu */}
        <Route path="/transport/bus" element={<BusManager type="bus" />} />
        <Route path="/transport/routes" element={<BusManager type="routes" />} />
        <Route path="/transport/driver" element={<BusManager type="driver" />} />
        <Route path="/transport/vehicle" element={<BusManager type="vehicle" />} />
        <Route path="/transport/gps" element={<BusManager type="gps" />} />
        <Route path="/transport/settings" element={<BusManager type="settings" />} />

        {/* Hostel Menu */}
        <Route path="/hostel/rooms" element={<PagePlaceholder title="Rooms" />} />
        <Route path="/hostel/allocation" element={<PagePlaceholder title="Allocation" />} />
        <Route path="/hostel/warden" element={<PagePlaceholder title="Warden" />} />

        {/* Library Menu */}
        <Route path="/library/books" element={<PagePlaceholder title="Books" />} />
        <Route path="/library/issue" element={<PagePlaceholder title="Issue" />} />
        <Route path="/library/return" element={<PagePlaceholder title="Return" />} />
        <Route path="/library/fine" element={<PagePlaceholder title="Library Fine" />} />

        {/* Inventory Menu */}
        <Route path="/inventory/dashboard" element={<InventoryManager type="dashboard" />} />
        <Route path="/inventory/items" element={<InventoryManager type="items" />} />
        <Route path="/inventory/add-item" element={<InventoryManager type="add-item" />} />
        <Route path="/inventory/categories" element={<InventoryManager type="categories" />} />
        <Route path="/inventory/stock" element={<InventoryManager type="stock" />} />
        <Route path="/inventory/issue" element={<InventoryManager type="issue" />} />
        <Route path="/inventory/issue-return" element={<InventoryManager type="issue-return" />} />
        <Route path="/inventory/purchase" element={<InventoryManager type="purchase" />} />
        <Route path="/inventory/purchase-list" element={<InventoryManager type="purchase-list" />} />
        <Route path="/inventory/assets" element={<InventoryManager type="assets" />} />
        <Route path="/inventory/stationery" element={<InventoryManager type="stationery" />} />
        <Route path="/inventory/suppliers" element={<InventoryManager type="suppliers" />} />

        {/* Accounts Menu */}
        <Route path="/accounts/dashboard" element={<AccountsManager type="dashboard" />} />
        <Route path="/accounts/income" element={<AccountsManager type="income" />} />
        <Route path="/accounts/income-list" element={<AccountsManager type="income-list" />} />
        <Route path="/accounts/expense" element={<AccountsManager type="expense" />} />
        <Route path="/accounts/expense-list" element={<AccountsManager type="expense-list" />} />
        <Route path="/accounts/payroll" element={<AccountsManager type="payroll" />} />
        <Route path="/accounts/payroll-list" element={<AccountsManager type="payroll-list" />} />
        <Route path="/accounts/salary" element={<AccountsManager type="salary" />} />
        <Route path="/accounts/bank" element={<AccountsManager type="bank" />} />
        <Route path="/accounts/balance-sheet" element={<AccountsManager type="balance-sheet" />} />

        {/* HR Menu */}
        <Route path="/hr/employees" element={<PagePlaceholder title="Employees" />} />
        <Route path="/hr/departments" element={<PagePlaceholder title="Departments" />} />
        <Route path="/hr/designation" element={<PagePlaceholder title="Designation" />} />

        {/* Communication Menu */}
        <Route path="/communicate/sms" element={<PagePlaceholder title="SMS" />} />
        <Route path="/communicate/email" element={<PagePlaceholder title="Email" />} />
        <Route path="/communicate/whatsapp" element={<PagePlaceholder title="WhatsApp" />} />
        <Route path="/communicate/circular" element={<PagePlaceholder title="Circular" />} />

        {/* Reports Menu */}
        <Route path="/reports/student" element={<PagePlaceholder title="Student Report" />} />
        <Route path="/reports/attendance" element={<PagePlaceholder title="Attendance Report" />} />
        <Route path="/reports/fee" element={<PagePlaceholder title="Fee Report" />} />
        <Route path="/reports/exam" element={<PagePlaceholder title="Exam Report" />} />
        <Route path="/reports/staff" element={<PagePlaceholder title="Staff Report" />} />

        {/* Website Menu */}
        <Route path="/website/slider" element={<PagePlaceholder title="Website Slider" />} />
        <Route path="/website/news" element={<PagePlaceholder title="News" />} />
        <Route path="/website/gallery" element={<PagePlaceholder title="Gallery" />} />
        <Route path="/website/events" element={<PagePlaceholder title="Events" />} />
        <Route path="/website/pages" element={<PagePlaceholder title="Pages" />} />

        {/* Settings Menu */}
        <Route path="/settings/permissions" element={<PagePlaceholder title="Permissions" />} />
        <Route path="/settings/smtp" element={<PagePlaceholder title="SMTP Configuration" />} />
        <Route path="/settings/payment" element={<PagePlaceholder title="Payment Gateway" />} />

      </Route>
    </Routes>
  );
}

export default App;
