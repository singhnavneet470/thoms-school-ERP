import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, UserPlus, Upload, Save, ArrowLeft, Users } from 'lucide-react';

const TeacherManager = ({ defaultView = 'list' }) => {
    const [view, setView] = useState(defaultView); // 'list', 'add', 'edit'
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [formData, setFormData] = useState(getInitialForm());

    useEffect(() => {
        const stored = localStorage.getItem('thoms_teachers');
        if (stored) {
            setTeachers(JSON.parse(stored));
        } else {
            // Dummy Data
            const initial = [
                { id: 1, employeeId: 'EMP-T-001', name: 'Ravi Kumar', qualification: 'M.Sc, B.Ed', designation: 'Senior Science Teacher', contact: '9876543220', email: 'ravi@example.com', joiningDate: '2023-04-01', profilePic: 'https://ui-avatars.com/api/?name=Ravi+Kumar&background=3b82f6&color=fff' },
                { id: 2, employeeId: 'EMP-T-002', name: 'Priya Sharma', qualification: 'M.A, B.Ed', designation: 'English Teacher', contact: '9876543221', email: 'priya@example.com', joiningDate: '2024-06-15', profilePic: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=ec4899&color=fff' }
            ];
            setTeachers(initial);
            localStorage.setItem('thoms_teachers', JSON.stringify(initial));
        }
    }, []);

    useEffect(() => {
        setView(defaultView);
    }, [defaultView]);

    function getInitialForm() {
        return {
            id: null, employeeId: '', name: '', qualification: '', designation: '', 
            contact: '', email: '', joiningDate: new Date().toISOString().split('T')[0], profilePic: ''
        };
    }

    const saveTeachers = (newData) => {
        setTeachers(newData);
        localStorage.setItem('thoms_teachers', JSON.stringify(newData));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let updated;
        if (formData.id) {
            updated = teachers.map(t => t.id === formData.id ? { ...formData } : t);
        } else {
            const newTeacher = { 
                ...formData, 
                id: Date.now(),
                profilePic: formData.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
            };
            updated = [newTeacher, ...teachers];
        }
        saveTeachers(updated);
        setView('list');
        setFormData(getInitialForm());
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this teacher record?")) {
            saveTeachers(teachers.filter(t => t.id !== id));
        }
    };

    const handleEdit = (teacher) => {
        setFormData(teacher);
        setView('edit');
    };

    const filteredTeachers = teachers.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (view === 'add' || view === 'edit') {
        return (
            <div className="p-8">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                    <button onClick={() => { setView('list'); setFormData(getInitialForm()); }} className="theme-bg-elevated theme-text-main" style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--sidebar-border)', cursor: 'pointer' }}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{view === 'edit' ? 'Edit Teacher' : 'Add New Teacher'}</h1>
                        <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>Enter teacher details, qualifications, and contact information.</p>
                    </div>
                </div>

                <form onSubmit={handleFormSubmit} className="theme-bg-surface" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', padding: 32, maxWidth: 900 }}>
                    <div style={{ display: 'flex', gap: 32 }}>
                        {/* Profile Pic Upload */}
                        <div style={{ width: 160, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 140, height: 140, borderRadius: 20, border: '2px dashed var(--sidebar-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--bg-elevated)', position: 'relative' }}>
                                {formData.profilePic ? (
                                    <img src={formData.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94a3b8' }}>
                                        <Upload className="w-8 h-8 mb-2" />
                                        <span style={{ fontSize: 12, fontWeight: 600 }}>Upload Photo</span>
                                    </div>
                                )}
                            </div>
                            <p className="theme-text-muted" style={{ fontSize: 11, textAlign: 'center' }}>JPG, PNG. Max 2MB. (Currently auto-generated)</p>
                        </div>

                        {/* Form Fields */}
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            
                            <div style={{ gridColumn: '1 / -1' }}>
                                <h3 className="theme-text-main" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px 0', paddingBottom: 8, borderBottom: '1px solid var(--sidebar-border)' }}>Professional Details</h3>
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Employee ID *</label>
                                <input required type="text" value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="e.g. EMP-T-001" />
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Date of Joining</label>
                                <input type="date" value={formData.joiningDate} onChange={e => setFormData({...formData, joiningDate: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none', colorScheme: 'var(--color-scheme)' }} />
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Designation *</label>
                                <input required type="text" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="e.g. Mathematics Teacher" />
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Qualifications *</label>
                                <input required type="text" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="e.g. M.Sc, B.Ed" />
                            </div>

                            <div style={{ gridColumn: '1 / -1', marginTop: 16 }}>
                                <h3 className="theme-text-main" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px 0', paddingBottom: 8, borderBottom: '1px solid var(--sidebar-border)' }}>Personal Details</h3>
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Full Name *</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="Teacher's Full Name" />
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email Address *</label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="teacher@school.com" />
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Contact Number *</label>
                                <input required type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="Phone Number" />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--sidebar-border)' }}>
                        <button type="button" onClick={() => { setView('list'); setFormData(getInitialForm()); }} className="theme-bg-elevated theme-text-main" style={{ padding: '10px 20px', borderRadius: 10, fontWeight: 600, border: '1px solid var(--sidebar-border)', cursor: 'pointer' }}>
                            Cancel
                        </button>
                        <button type="submit" style={{ padding: '10px 24px', borderRadius: 10, fontWeight: 600, background: '#6366f1', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.25)' }}>
                            <Save className="w-4 h-4" />
                            {view === 'edit' ? 'Update Teacher' : 'Save Teacher'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Teacher Directory</h1>
                    <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>Manage all teaching staff, roles, and contact information.</p>
                </div>
                <button onClick={() => setView('add')} style={{ padding: '10px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                    <UserPlus className="w-4 h-4" /> Add Teacher
                </button>
            </div>

            <div className="theme-bg-surface" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--sidebar-border)', display: 'flex', gap: 16 }}>
                    <div className="theme-bg-elevated" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', flex: 1 }}>
                        <Search className="w-4 h-4 theme-text-muted" />
                        <input 
                            type="text" 
                            placeholder="Search by teacher name, ID or designation..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="theme-text-main"
                            style={{ background: 'transparent', border: 'none', padding: '12px 0', width: '100%', outline: 'none', fontSize: 14 }}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead className="theme-bg-elevated theme-text-muted" style={{ borderBottom: '1px solid var(--sidebar-border)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Teacher Info</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Employee ID</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Designation</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Qualifications</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Contact</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeachers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '40px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                                            <Users className="w-12 h-12 theme-text-muted" style={{ opacity: 0.5 }} />
                                            <div className="theme-text-main" style={{ fontSize: 16, fontWeight: 600 }}>No teachers found</div>
                                            <div className="theme-text-muted" style={{ fontSize: 14 }}>Try adjusting your search or add a new teacher.</div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredTeachers.map(teacher => (
                                <tr key={teacher.id} style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <img src={teacher.profilePic} alt={teacher.name} style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
                                            <div>
                                                <div className="theme-text-main" style={{ fontSize: 14, fontWeight: 700 }}>{teacher.name}</div>
                                                <div className="theme-text-muted" style={{ fontSize: 12, fontWeight: 500, marginTop: 2 }}>{teacher.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div className="theme-text-main" style={{ fontSize: 13, fontWeight: 600 }}>{teacher.employeeId}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'inline-flex', padding: '4px 10px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                                            {teacher.designation}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div className="theme-text-main" style={{ fontSize: 13, fontWeight: 600 }}>{teacher.qualification}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div className="theme-text-main" style={{ fontSize: 13, fontWeight: 500 }}>{teacher.contact}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                                            <button onClick={() => handleEdit(teacher)} className="theme-bg-elevated theme-text-main" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--sidebar-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#6366f1'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--sidebar-border)'; e.currentTarget.style.color = ''; }}>
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(teacher.id)} className="theme-bg-elevated" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--sidebar-border)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherManager;
