import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserProfile } from './useUsers';
import { ArrowLeft, User, Mail, Phone, Briefcase, Calendar, MapPin, Hash, Activity } from 'lucide-react';

const UserProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useGetUserProfile(id);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500">
        <User className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700">Profile Not Found</h2>
        <p className="text-sm mt-2">The requested user profile does not exist or you lack permission.</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 font-bold rounded-lg text-sm">
          Go Back
        </button>
      </div>
    );
  }

  const isStaff = profile.profile_type === 'staff';
  const isStudent = profile.profile_type === 'student';

  const getRoleBadgeStyle = (userRole = '') => {
    const norm = userRole.toLowerCase();
    if (norm.includes('admin')) return 'bg-purple-100 text-purple-700 border-purple-200';
    if (norm.includes('teacher')) return 'bg-amber-100 text-amber-700 border-amber-200';
    if (norm.includes('student')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
      {/* Header / Back button */}
      <div className="flex items-center gap-4 border-b border-slate-200/80 pb-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white hover:bg-slate-50 rounded-full border border-slate-200 text-slate-500 transition shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">User Profile</h1>
          <p className="text-xs text-slate-500 font-medium">Viewing details for {profile.full_name || profile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Basic Info */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-extrabold text-indigo-700 mb-4">
              {(profile.full_name || profile.email).charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{profile.full_name || 'N/A'}</h2>
            <p className="text-sm text-slate-500 mt-1">{profile.email}</p>
            <div className="mt-4 flex gap-2 justify-center">
              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${getRoleBadgeStyle(profile.role)}`}>
                {profile.role?.replace('_', ' ')}
              </span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${profile.status === 'active' || profile.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {profile.status}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-2">Contact Info</h3>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-xs text-slate-500 font-medium">Email</p>
                <p className="font-semibold text-slate-800">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Phone</p>
                <p className="font-semibold text-slate-800">{profile.phone || profile.emergency_phone || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Extended Info */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          {isStaff && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-indigo-500" /> Staff Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Employee Code</p>
                  <p className="font-semibold text-slate-800 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-slate-400" /> {profile.employee_code || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Designation</p>
                  <p className="font-semibold text-slate-800">{profile.designation || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Department</p>
                  <p className="font-semibold text-slate-800">{profile.department || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Joining Date</p>
                  <p className="font-semibold text-slate-800 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> 
                    {profile.joining_date ? new Date(profile.joining_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-slate-500 font-medium mb-1">Qualification</p>
                  <p className="font-semibold text-slate-800">{profile.qualification || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          {isStudent && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-emerald-500" /> Academic Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Admission No.</p>
                  <p className="font-semibold text-slate-800 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-slate-400" /> {profile.admission_no || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Roll No.</p>
                  <p className="font-semibold text-slate-800">{profile.roll_no || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Class & Section</p>
                  <p className="font-semibold text-slate-800">{profile.class} - {profile.section}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Admission Date</p>
                  <p className="font-semibold text-slate-800 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> 
                    {profile.admission_date ? new Date(profile.admission_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Gender</p>
                  <p className="font-semibold text-slate-800 capitalize">{profile.gender || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Blood Group</p>
                  <p className="font-semibold text-slate-800 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-red-400" /> {profile.blood_group || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-slate-400" /> Additional Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Account Created</p>
                <p className="font-semibold text-slate-800">
                  {profile.created_at ? new Date(profile.created_at).toLocaleString() : 'N/A'}
                </p>
              </div>
              {isStudent && (profile.city || profile.state) && (
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Location</p>
                  <p className="font-semibold text-slate-800">
                    {[profile.city, profile.state].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
