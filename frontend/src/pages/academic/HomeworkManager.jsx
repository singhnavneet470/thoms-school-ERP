import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Calendar, FileText, ArrowLeft, Save, BookOpen, Clock } from 'lucide-react';

const HomeworkManager = () => {
    const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [homeworkList, setHomeworkList] = useState([]);
    
    // Filters
    const [classFilter, setClassFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    
    const [formData, setFormData] = useState({
        id: null,
        className: '',
        sectionName: '',
        subject: '',
        teacher: '',
        homeworkDate: new Date().toISOString().split('T')[0],
        submissionDate: '',
        description: ''
    });

    useEffect(() => {
        setClasses(JSON.parse(localStorage.getItem('thoms_classes') || '[]'));
        setSections(JSON.parse(localStorage.getItem('thoms_sections') || '[]'));
        setTeachers(JSON.parse(localStorage.getItem('thoms_teachers') || '[]'));
        
        const storedHW = localStorage.getItem('thoms_homework');
        if (storedHW) {
            setHomeworkList(JSON.parse(storedHW));
        } else {
            const defaultHW = [
                {
                    id: 1,
                    className: 'Class 10',
                    sectionName: 'A',
                    subject: 'Mathematics',
                    teacher: 'John Doe',
                    homeworkDate: new Date().toISOString().split('T')[0],
                    submissionDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    description: 'Complete exercise 5.2 from chapter Polynomials. Show all working steps clearly.'
                }
            ];
            setHomeworkList(defaultHW);
            localStorage.setItem('thoms_homework', JSON.stringify(defaultHW));
        }
    }, []);

    const saveHomework = (newData) => {
        setHomeworkList(newData);
        localStorage.setItem('thoms_homework', JSON.stringify(newData));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let updated;
        if (formData.id) {
            updated = homeworkList.map(h => h.id === formData.id ? { ...formData } : h);
        } else {
            updated = [{ ...formData, id: Date.now() }, ...homeworkList];
        }
        saveHomework(updated);
        setView('list');
        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this homework?')) {
            saveHomework(homeworkList.filter(h => h.id !== id));
        }
    };

    const handleEdit = (hw) => {
        setFormData(hw);
        setView('edit');
    };

    const resetForm = () => {
        setFormData({
            id: null,
            className: '',
            sectionName: '',
            subject: '',
            teacher: '',
            homeworkDate: new Date().toISOString().split('T')[0],
            submissionDate: '',
            description: ''
        });
    };

    const filteredSections = sections.filter(s => s.className === formData.className);
    
    const displayHomework = homeworkList.filter(h => {
        const matchesClass = classFilter ? h.className === classFilter : true;
        const matchesDate = dateFilter ? h.homeworkDate === dateFilter : true;
        return matchesClass && matchesDate;
    });

    if (view === 'add' || view === 'edit') {
        return (
            <div className="p-8">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                    <button onClick={() => { setView('list'); resetForm(); }} className="theme-bg-elevated theme-text-main" style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--sidebar-border)', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{view === 'edit' ? 'Edit Homework' : 'Assign New Homework'}</h1>
                        <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>Create daily assignments for a specific class and section.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="theme-bg-surface" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', padding: 32, maxWidth: 800 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Select Class *</label>
                            <select required value={formData.className} onChange={e => setFormData({...formData, className: e.target.value, sectionName: ''})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }}>
                                <option value="">-- Choose Class --</option>
                                {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Select Section *</label>
                            <select required value={formData.sectionName} onChange={e => setFormData({...formData, sectionName: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }} disabled={!formData.className}>
                                <option value="">-- Choose Section --</option>
                                {filteredSections.length === 0 && formData.className ? (
                                    <option value="" disabled>No sections available</option>
                                ) : (
                                    filteredSections.map(s => <option key={s.id} value={s.name}>{s.name}</option>)
                                )}
                            </select>
                        </div>
                        
                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Subject Name *</label>
                            <input required type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="e.g. Mathematics" />
                        </div>
                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Assigning Teacher *</label>
                            <select required value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }}>
                                <option value="">-- Choose Teacher --</option>
                                {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Homework Date *</label>
                            <input required type="date" value={formData.homeworkDate} onChange={e => setFormData({...formData, homeworkDate: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', colorScheme: 'dark' }} />
                        </div>
                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Submission Date *</label>
                            <input required type="date" value={formData.submissionDate} onChange={e => setFormData({...formData, submissionDate: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', colorScheme: 'dark' }} />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Homework Description *</label>
                            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', minHeight: 120, resize: 'vertical' }} placeholder="Detail the homework instructions here..." />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--sidebar-border)' }}>
                        <button type="button" onClick={() => { setView('list'); resetForm(); }} className="theme-bg-elevated theme-text-main" style={{ padding: '12px 24px', borderRadius: 12, fontWeight: 600, border: '1px solid var(--sidebar-border)', cursor: 'pointer' }}>
                            Cancel
                        </button>
                        <button type="submit" style={{ padding: '12px 28px', borderRadius: 12, fontWeight: 600, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.25)' }}>
                            <Save className="w-4 h-4" /> {view === 'edit' ? 'Update Homework' : 'Assign Homework'}
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
                    <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Homework Management</h1>
                    <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>Track and manage daily homework assignments.</p>
                </div>
                <button onClick={() => setView('add')} style={{ padding: '12px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                    <Plus className="w-4 h-4" /> Assign Homework
                </button>
            </div>

            {/* Filters */}
            <div className="theme-bg-surface" style={{ padding: '20px 24px', borderRadius: 20, border: '1px solid var(--sidebar-border)', marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <label className="theme-text-muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>Filter by Class</label>
                    <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }}>
                        <option value="">All Classes</option>
                        {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label className="theme-text-muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>Filter by Date</label>
                    <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', colorScheme: 'dark' }} />
                </div>
                <div style={{ paddingTop: 22 }}>
                    <button onClick={() => { setClassFilter(''); setDateFilter(''); }} className="theme-bg-elevated theme-text-main" style={{ padding: '12px 20px', borderRadius: 12, fontWeight: 600, border: '1px solid var(--sidebar-border)', cursor: 'pointer' }}>
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Homework Grid */}
            {displayHomework.length === 0 ? (
                <div className="theme-bg-surface" style={{ padding: '60px 0', borderRadius: 20, border: '1px dashed var(--sidebar-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText className="w-16 h-16 theme-text-muted" style={{ opacity: 0.3, marginBottom: 16 }} />
                    <h3 className="theme-text-main" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0' }}>No Homework Found</h3>
                    <p className="theme-text-muted" style={{ fontSize: 14 }}>Adjust your filters or assign new homework.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
                    {displayHomework.map(hw => (
                        <div key={hw.id} className="theme-bg-surface" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--sidebar-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ display: 'inline-flex', padding: '4px 10px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: 6, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
                                        {hw.className} - {hw.sectionName}
                                    </div>
                                    <h3 className="theme-text-main" style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px 0' }}>{hw.subject}</h3>
                                    <p className="theme-text-muted" style={{ fontSize: 13, margin: 0, fontWeight: 500 }}>By {hw.teacher}</p>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={() => handleEdit(hw)} className="theme-bg-elevated theme-text-main" style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--sidebar-border)', cursor: 'pointer' }}>
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(hw.id)} className="theme-bg-elevated" style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--sidebar-border)', cursor: 'pointer', color: '#ef4444' }}>
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div style={{ padding: '20px 24px', flex: 1 }}>
                                <p className="theme-text-main" style={{ fontSize: 14, lineHeight: 1.6, margin: 0, opacity: 0.9 }}>
                                    {hw.description}
                                </p>
                            </div>
                            <div className="theme-bg-elevated" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--sidebar-border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f59e0b', fontSize: 12, fontWeight: 600 }}>
                                    <Calendar className="w-4 h-4" /> Date: {hw.homeworkDate}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontSize: 12, fontWeight: 600 }}>
                                    <Clock className="w-4 h-4" /> Due: {hw.submissionDate}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeworkManager;
