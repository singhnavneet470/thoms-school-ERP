import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import TeacherDashboard from './pages/TeacherDashboard';
import Users from './pages/Users';
import RolesPermissions from './pages/RolesPermissions';
import StudentDetails from './pages/student/StudentDetails';
import StudentDashboard from './pages/StudentDashboard';
import StudentAdmission from './pages/student/StudentAdmission';
import StudentAttendance from './pages/attendance/StudentAttendance';
import ClassTimetable from './pages/academic/ClassTimetable';
import CollectFees from './pages/fees/CollectFees';
import TransportRoutes from './pages/transport/Routes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/unauthorized" element={<div className="min-h-screen flex items-center justify-center font-bold text-slate-800">Unauthorized Access</div>} />
      
      <Route element={<Layout />}>
        {/* Dashboards */}
        <Route path="/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard activeTab="home" />} />
        <Route path="/teacher" element={<TeacherDashboard />} />

        {/* Student Management */}
        <Route path="/student/details" element={<StudentDetails />} />
        <Route path="/student/admission" element={<StudentAdmission />} />
        
        {/* Attendance */}
        <Route path="/attendance/student" element={<StudentAttendance />} />

        {/* Fees */}
        <Route path="/fees/collect" element={<CollectFees />} />

        {/* Academics */}
        <Route path="/academics/class-timetable" element={<ClassTimetable />} />

        {/* Transport */}
        <Route path="/transport/routes" element={<TransportRoutes />} />

        {/* System Settings */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/roles" element={<RolesPermissions />} />
        <Route path="/settings/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
