import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, UserPlus, Upload, X, Save, ArrowLeft, GraduationCap } from 'lucide-react';

const StudentManager = ({ defaultView = 'list' }) => {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [view, setView] = useState(defaultView); // 'list', 'add', 'edit'
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [classFilter, setClassFilter] = useState('');
    
    // Form State
    const [formData, setFormData] = useState(getInitialForm());

    useEffect(() => {
        const stored = localStorage.getItem('thoms_students');
        if (stored) {
            setStudents(JSON.parse(stored));
        } else {
            // Dummy Data
            const initial = [
                { id: 1, admissionNo: 'ADM-2026-001', rollNo: '101', name: 'Aarav Sharma', class: 'Class 10', section: 'A', fatherName: 'Rajesh Sharma', motherName: 'Priya Sharma', contact: '9876543210', email: 'aarav@example.com', admissionYear: '2026', profilePic: 'https://ui-avatars.com/api/?name=Aarav+Sharma&background=6366f1&color=fff' },
                { id: 2, admissionNo: 'ADM-2026-002', rollNo: '102', name: 'Diya Patel', class: 'Class 10', section: 'B', fatherName: 'Sanjay Patel', motherName: 'Meera Patel', contact: '9876543211', email: 'diya@example.com', admissionYear: '2026', profilePic: 'https://ui-avatars.com/api/?name=Diya+Patel&background=10b981&color=fff' }
            ];
            setStudents(initial);
            localStorage.setItem('thoms_students', JSON.stringify(initial));
        }
        
        // Load Classes
        const storedClasses = localStorage.getItem('thoms_classes');
        if (storedClasses) {
            setClasses(JSON.parse(storedClasses));
        } else {
            const defaultClasses = [{ id: 1, name: 'Class 10' }];
            setClasses(defaultClasses);
            localStorage.setItem('thoms_classes', JSON.stringify(defaultClasses));
        }
        
        // Load Sections
        const storedSections = localStorage.getItem('thoms_sections');
        if (storedSections) {
            setSections(JSON.parse(storedSections));
        } else {
            const defaultSections = [{ id: 1, className: 'Class 10', name: 'A' }];
            setSections(defaultSections);
            localStorage.setItem('thoms_sections', JSON.stringify(defaultSections));
        }
    }, []);

    // Ensure view resets when defaultView prop changes (e.g. from nav)
    useEffect(() => {
        setView(defaultView);
    }, [defaultView]);

    function getInitialForm() {
        return {
            id: null, admissionNo: '', rollNo: '', name: '', class: '', section: '',
            fatherName: '', motherName: '', contact: '', email: '', admissionYear: new Date().getFullYear().toString(), profilePic: ''
        };
    }

    const saveStudents = (newData) => {
        setStudents(newData);
        localStorage.setItem('thoms_students', JSON.stringify(newData));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let updated;
        if (formData.id) {
            updated = students.map(s => s.id === formData.id ? { ...formData } : s);
        } else {
            const newStudent = { 
                ...formData, 
                id: Date.now(),
                profilePic: formData.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
            };
            updated = [newStudent, ...students];
        }
        saveStudents(updated);
        setView('list');
        setFormData(getInitialForm());
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            saveStudents(students.filter(s => s.id !== id));
        }
    };

    const handleEdit = (student) => {
        setFormData(student);
        setView('edit');
    };

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = classFilter ? s.class === classFilter : true;
        return matchesSearch && matchesClass;
    });

    if (view === 'add' || view === 'edit') {
        return (
            <div className="p-8">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                    <button onClick={() => { setView('list'); setFormData(getInitialForm()); }} className="theme-bg-elevated theme-text-main" style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--sidebar-border)', cursor: 'pointer' }}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{view === 'edit' ? 'Edit Student' : 'New Admission'}</h1>
                        <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>Enter student details, class assignments, and parental information.</p>
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
                            <p className="theme-text-muted" style={{ fontSize: 11, textAlign: 'center' }}>JPG, PNG. Max 2MB. (Currently auto-generated for demo)</p>
                        </div>

                        {/* Form Fields */}
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            
                            <div style={{ gridColumn: '1 / -1' }}>
                                <h3 className="theme-text-main" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px 0', paddingBottom: 8, borderBottom: '1px solid var(--sidebar-border)' }}>Academic Details</h3>
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Class *</label>
                                <select required value={formData.class} onChange={e => setFormData({...formData, class: e.target.value, section: ''})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }}>
                                    <option value="">Select Class</option>
                                    {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Section *</label>
                                <select required value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} disabled={!formData.class}>
                                    <option value="">Select Section</option>
                                    {sections.filter(s => s.className === formData.class).map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Admission Number *</label>
                                <input required type="text" value={formData.admissionNo} onChange={e => setFormData({...formData, admissionNo: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="e.g. ADM-001" />
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Roll Number</label>
                                <input type="text" value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="Roll No" />
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Year of Admission</label>
                                <input type="text" value={formData.admissionYear} onChange={e => setFormData({...formData, admissionYear: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="YYYY" />
                            </div>

                            <div style={{ gridColumn: '1 / -1', marginTop: 16 }}>
                                <h3 className="theme-text-main" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px 0', paddingBottom: 8, borderBottom: '1px solid var(--sidebar-border)' }}>Student Details</h3>
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Full Name *</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="Student Name" />
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Student Email</label>
                                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="student@example.com" />
                            </div>

                            <div style={{ gridColumn: '1 / -1', marginTop: 16 }}>
                                <h3 className="theme-text-main" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px 0', paddingBottom: 8, borderBottom: '1px solid var(--sidebar-border)' }}>Parent / Guardian Details</h3>
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Father's Name</label>
                                <input type="text" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="Father's Name" />
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Mother's Name</label>
                                <input type="text" value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="Mother's Name" />
                            </div>
                            <div>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Parent Contact No.</label>
                                <input type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="Phone Number" />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--sidebar-border)' }}>
                        <button type="button" onClick={() => { setView('list'); setFormData(getInitialForm()); }} className="theme-bg-elevated theme-text-main" style={{ padding: '10px 20px', borderRadius: 10, fontWeight: 600, border: '1px solid var(--sidebar-border)', cursor: 'pointer' }}>
                            Cancel
                        </button>
                        <button type="submit" style={{ padding: '10px 24px', borderRadius: 10, fontWeight: 600, background: '#6366f1', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.25)' }}>
                            <Save className="w-4 h-4" />
                            {view === 'edit' ? 'Update Student' : 'Save Admission'}
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
                    <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Student Directory</h1>
                    <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>Manage enrolled students across all classes and sections.</p>
                </div>
                <button onClick={() => setView('add')} style={{ padding: '10px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                    <UserPlus className="w-4 h-4" /> New Admission
                </button>
            </div>

            <div className="theme-bg-surface" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--sidebar-border)', display: 'flex', gap: 16 }}>
                    <div className="theme-bg-elevated" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', flex: 1 }}>
                        <Search className="w-4 h-4 theme-text-muted" />
                        <input 
                            type="text" 
                            placeholder="Search by student name or admission no..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="theme-text-main"
                            style={{ background: 'transparent', border: 'none', padding: '12px 0', width: '100%', outline: 'none', fontSize: 14 }}
                        />
                    </div>
                    <select 
                        value={classFilter}
                        onChange={(e) => setClassFilter(e.target.value)}
                        className="theme-bg-elevated theme-text-main" 
                        style={{ padding: '0 20px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                        <option value="">All Classes</option>
                        {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead className="theme-bg-elevated theme-text-muted" style={{ borderBottom: '1px solid var(--sidebar-border)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Student Info</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Admission No</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Class & Sec</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Parents</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Contact</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '40px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                                            <GraduationCap className="w-12 h-12 theme-text-muted" style={{ opacity: 0.5 }} />
                                            <div className="theme-text-main" style={{ fontSize: 16, fontWeight: 600 }}>No students found</div>
                                            <div className="theme-text-muted" style={{ fontSize: 14 }}>Try adjusting your search or add a new admission.</div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredStudents.map(student => (
                                <tr key={student.id} style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <img src={student.profilePic} alt={student.name} style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
                                            <div>
                                                <div className="theme-text-main" style={{ fontSize: 14, fontWeight: 700 }}>{student.name}</div>
                                                <div className="theme-text-muted" style={{ fontSize: 12, fontWeight: 500, marginTop: 2 }}>{student.email || 'No email provided'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div className="theme-text-main" style={{ fontSize: 13, fontWeight: 600 }}>{student.admissionNo}</div>
                                        <div className="theme-text-muted" style={{ fontSize: 12, marginTop: 2 }}>Roll: {student.rollNo || '-'}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'inline-flex', padding: '4px 10px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                                            {student.class} - {student.section}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div className="theme-text-main" style={{ fontSize: 13, fontWeight: 600 }}>{student.fatherName || '-'}</div>
                                        <div className="theme-text-muted" style={{ fontSize: 12, marginTop: 2 }}>{student.motherName || '-'}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div className="theme-text-main" style={{ fontSize: 13, fontWeight: 500 }}>{student.contact || '-'}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                                            <button onClick={() => handleEdit(student)} className="theme-bg-elevated theme-text-main" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--sidebar-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#6366f1'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--sidebar-border)'; e.currentTarget.style.color = ''; }}>
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(student.id)} className="theme-bg-elevated" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--sidebar-border)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'} onMouseLeave={e => e.currentTarget.style.background = ''}>
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

export default StudentManager;
