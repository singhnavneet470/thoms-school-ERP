import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Edit2, Trash2, User, CheckCircle, X } from 'lucide-react';
import api from '../../api/axios';

const classOptions = [
    'Nursery', 'LKG', 'UKG', 
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 
    'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'
];

const sectionOptions = ['A', 'B', 'C', 'D', 'Science', 'Commerce', 'Arts'];

const StudentDetails = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('');
    const [filterSection, setFilterSection] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [notification, setNotification] = useState(null);

    const [formData, setFormData] = useState({
        email: '', name: '', class: '', section: '', gender: 'Male', phone: '', status: 'Active'
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get('/auth/students');
            const mapped = response.data.map(s => ({
                ...s,
                name: s.full_name || s.email.split('@')[0],
                class: s.class || '',
                section: s.section || '',
                gender: s.gender || 'Male',
                phone: s.phone || '',
                status: s.status || 'Active'
            }));
            setStudents(mapped);
        } catch (err) {
            console.error('Failed to fetch students:', err);
        }
    };

    const handleOpenModal = (student = null) => {
        if (student) {
            setEditingStudent(student);
            setFormData(student);
        } else {
            setEditingStudent(null);
            setFormData({ email: '', name: '', class: 'Class 10', section: 'A', gender: 'Male', phone: '', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingStudent) {
                await api.put(`/admin/users/${editingStudent.id}`, {
                    role: 'student',
                    email: formData.email,
                    full_name: formData.name,
                    class_name: formData.class,
                    section: formData.section,
                    phone: formData.phone,
                    gender: formData.gender,
                    status: formData.status
                });
                setNotification('Student record updated successfully!');
            } else {
                const email = formData.email || (formData.name.toLowerCase().replace(/\s+/g, '') + '@erp.com');
                await api.post('/admin/users', {
                    role: 'student',
                    email: email,
                    password: 'student123',
                    full_name: formData.name,
                    class_name: formData.class,
                    section: formData.section,
                    phone: formData.phone,
                    gender: formData.gender,
                    status: formData.status
                });
                setNotification('New student enrolled successfully!');
            }
            fetchStudents();
            handleCloseModal();
            setTimeout(() => setNotification(null), 3000);
        } catch (err) {
            console.error('Failed to save student:', err);
            setNotification(err.response?.data?.error || 'Failed to save student.');
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student record?')) {
            try {
                await api.delete(`/admin/users/${id}`);
                setNotification('Student record deleted.');
                fetchStudents();
                setTimeout(() => setNotification(null), 3000);
            } catch (err) {
                console.error('Failed to delete student:', err);
            }
        }
    };

    const filteredStudents = students.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            s.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            s.id.toString().includes(searchTerm);
        const matchClass = filterClass ? s.class === filterClass : true;
        const matchSection = filterSection ? s.section === filterSection : true;
        return matchSearch && matchClass && matchSection;
    });

    return (
        <div className="space-y-6 pb-12">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white text-indigo-600 rounded-2xl shadow-sm">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">Student Details</h1>
                        <p className="text-sm text-indigo-600/80 font-medium mt-1">Search, view, and manage student profiles.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleOpenModal()}
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5"
                    >
                        <Plus className="w-4 h-4" /> Add Student
                    </button>
                </div>
            </div>

            {notification && (
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium text-sm">{notification}</span>
                </div>
            )}

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col sm:flex-row gap-5 justify-between items-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="relative w-full sm:w-96 group">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 shadow-inner"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <select 
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        className="px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none bg-white shadow-sm hover:border-slate-300 cursor-pointer flex-1 sm:flex-none"
                    >
                        <option value="">All Classes</option>
                        {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select 
                        value={filterSection}
                        onChange={(e) => setFilterSection(e.target.value)}
                        className="px-4 py-2.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none bg-white shadow-sm hover:border-slate-300 cursor-pointer flex-1 sm:flex-none"
                    >
                        <option value="">All Sections</option>
                        {sectionOptions.map(s => <option key={s} value={s}>Section {s}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-950 border-b border-slate-800 text-white">
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-300">Student Profile</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-300">Class & Section</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-300">Gender</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-300">Contact</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-300">Status</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-right text-slate-300">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {filteredStudents.length > 0 ? filteredStudents.map(student => (
                                <tr key={student.id} className="hover:bg-indigo-50/50 transition-all duration-200 group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-black text-lg shadow-sm border border-indigo-200/50">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-slate-800 group-hover:text-indigo-700 transition-colors">{student.name}</div>
                                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{student.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-1 bg-sky-100 text-sky-700 rounded-lg text-xs font-bold border border-sky-200">{student.class}</span>
                                            <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-200">Sec {student.section}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-600">{student.gender}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-600">📞 {student.phone || 'N/A'}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-xl shadow-sm border ${
                                            student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20' :
                                            'bg-slate-50 text-slate-700 border-slate-200 ring-1 ring-slate-500/20'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                student.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                                            }`}></span>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleOpenModal(student)}
                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(student.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-slate-500 font-medium">
                                        No students match your current filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Edit / Add */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
                            <h3 className="font-extrabold text-slate-800 text-xl tracking-tight">
                                {editingStudent ? 'Edit Student Details' : 'Register New Student'}
                            </h3>
                            <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-xl transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={handleSave} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="block w-full px-5 py-3 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50 focus:bg-white transition-all shadow-inner"
                                            placeholder="e.g. student@school.com"
                                            disabled={!!editingStudent}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="block w-full px-5 py-3 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50 focus:bg-white transition-all shadow-inner"
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Contact Phone</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="block w-full px-5 py-3 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50 focus:bg-white transition-all shadow-inner"
                                            placeholder="e.g. 9876543210"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Academic Class</label>
                                        <select 
                                            required
                                            value={formData.class}
                                            onChange={(e) => setFormData({...formData, class: e.target.value})}
                                            className="block w-full px-5 py-3 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50 focus:bg-white transition-all shadow-inner"
                                        >
                                            <option value="">Select Class</option>
                                            {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Section</label>
                                        <select 
                                            required
                                            value={formData.section}
                                            onChange={(e) => setFormData({...formData, section: e.target.value})}
                                            className="block w-full px-5 py-3 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50 focus:bg-white transition-all shadow-inner"
                                        >
                                            <option value="">Select Section</option>
                                            {sectionOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Gender</label>
                                        <select 
                                            required
                                            value={formData.gender}
                                            onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                            className="block w-full px-5 py-3 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50 focus:bg-white transition-all shadow-inner"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Status</label>
                                        <select 
                                            required
                                            value={formData.status}
                                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                                            className="block w-full px-5 py-3 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50 focus:bg-white transition-all shadow-inner"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                                    <button 
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all"
                                    >
                                        {editingStudent ? 'Save Changes' : 'Register Student'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDetails;
