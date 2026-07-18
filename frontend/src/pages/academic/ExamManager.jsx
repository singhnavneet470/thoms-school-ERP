import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, BookOpen, CheckCircle, ArrowLeft, Save, Calendar, FileText } from 'lucide-react';

const ExamManager = () => {
    const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
    const [classes, setClasses] = useState([]);
    const [exams, setExams] = useState([]);
    
    // Filters
    const [classFilter, setClassFilter] = useState('');

    const defaultExamTypes = ['Half Yearly', 'Annual', 'Unit Test', 'Class Test'];

    const [formData, setFormData] = useState({
        id: null,
        examName: '',
        examType: 'Half Yearly',
        className: '',
        subject: '',
        totalMarks: 100,
        passingMarks: 33,
        examDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        setClasses(JSON.parse(localStorage.getItem('thoms_classes') || '[]'));
        
        const storedExams = localStorage.getItem('thoms_exams');
        if (storedExams) {
            setExams(JSON.parse(storedExams));
        } else {
            const defaultExams = [
                {
                    id: 1,
                    examName: 'Half Yearly Examination',
                    examType: 'Half Yearly',
                    className: 'Class 10',
                    subject: 'Mathematics',
                    totalMarks: 100,
                    passingMarks: 33,
                    examDate: new Date().toISOString().split('T')[0]
                }
            ];
            setExams(defaultExams);
            localStorage.setItem('thoms_exams', JSON.stringify(defaultExams));
        }
    }, []);

    const saveExams = (newData) => {
        setExams(newData);
        localStorage.setItem('thoms_exams', JSON.stringify(newData));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let updated;
        if (formData.id) {
            updated = exams.map(e => e.id === formData.id ? { ...formData } : e);
        } else {
            updated = [{ ...formData, id: Date.now() }, ...exams];
        }
        saveExams(updated);
        setView('list');
        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this exam? Related marks may be affected.')) {
            saveExams(exams.filter(e => e.id !== id));
        }
    };

    const handleEdit = (exam) => {
        setFormData(exam);
        setView('edit');
    };

    const resetForm = () => {
        setFormData({
            id: null,
            examName: '',
            examType: 'Half Yearly',
            className: '',
            subject: '',
            totalMarks: 100,
            passingMarks: 33,
            examDate: new Date().toISOString().split('T')[0]
        });
    };

    const displayExams = classFilter ? exams.filter(e => e.className === classFilter) : exams;

    if (view === 'add' || view === 'edit') {
        return (
            <div className="p-8">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                    <button onClick={() => { setView('list'); resetForm(); }} className="theme-bg-elevated theme-text-main" style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--sidebar-border)', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{view === 'edit' ? 'Edit Exam' : 'Create New Exam'}</h1>
                        <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>Set up examination parameters for a specific class and subject.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="theme-bg-surface" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', padding: 32, maxWidth: 800 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Exam Title *</label>
                            <input required type="text" value={formData.examName} onChange={e => setFormData({...formData, examName: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="e.g. Mid-Term Math Exam" />
                        </div>
                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Exam Type *</label>
                            <select required value={formData.examType} onChange={e => setFormData({...formData, examType: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }}>
                                {defaultExamTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        
                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Target Class *</label>
                            <select required value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }}>
                                <option value="">-- Choose Class --</option>
                                {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Subject Name *</label>
                            <input required type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="e.g. Mathematics" />
                        </div>

                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Total Marks *</label>
                            <input required type="number" min="1" value={formData.totalMarks} onChange={e => setFormData({...formData, totalMarks: parseInt(e.target.value) || 0})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }} />
                        </div>
                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Passing Marks *</label>
                            <input required type="number" min="1" value={formData.passingMarks} onChange={e => setFormData({...formData, passingMarks: parseInt(e.target.value) || 0})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }} />
                        </div>

                        <div>
                            <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Exam Date *</label>
                            <input required type="date" value={formData.examDate} onChange={e => setFormData({...formData, examDate: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', colorScheme: 'dark' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--sidebar-border)' }}>
                        <button type="button" onClick={() => { setView('list'); resetForm(); }} className="theme-bg-elevated theme-text-main" style={{ padding: '12px 24px', borderRadius: 12, fontWeight: 600, border: '1px solid var(--sidebar-border)', cursor: 'pointer' }}>
                            Cancel
                        </button>
                        <button type="submit" style={{ padding: '12px 28px', borderRadius: 12, fontWeight: 600, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.25)' }}>
                            <Save className="w-4 h-4" /> {view === 'edit' ? 'Update Exam' : 'Create Exam'}
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
                    <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Examination Setup</h1>
                    <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>Create and manage exams class-wise (Half Yearly, Annual, Unit Tests).</p>
                </div>
                <button onClick={() => setView('add')} style={{ padding: '12px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                    <Plus className="w-4 h-4" /> Create New Exam
                </button>
            </div>

            {/* Filter */}
            <div className="theme-bg-surface" style={{ padding: '20px 24px', borderRadius: 20, border: '1px solid var(--sidebar-border)', marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <label className="theme-text-muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>Filter by Class</label>
                    <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }}>
                        <option value="">All Classes</option>
                        {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Exams List */}
            {displayExams.length === 0 ? (
                <div className="theme-bg-surface" style={{ padding: '60px 0', borderRadius: 20, border: '1px dashed var(--sidebar-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText className="w-16 h-16 theme-text-muted" style={{ opacity: 0.3, marginBottom: 16 }} />
                    <h3 className="theme-text-main" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0' }}>No Exams Configured</h3>
                    <p className="theme-text-muted" style={{ fontSize: 14 }}>Create tests or examinations to enter marks later.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                    {displayExams.map(exam => (
                        <div key={exam.id} className="theme-bg-surface" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid var(--sidebar-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ display: 'inline-flex', padding: '4px 10px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: 6, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
                                        {exam.className} &bull; {exam.examType}
                                    </div>
                                    <h3 className="theme-text-main" style={{ fontSize: 16, fontWeight: 800, margin: '0 0 4px 0' }}>{exam.examName}</h3>
                                    <p className="theme-text-muted" style={{ fontSize: 13, margin: 0, fontWeight: 500 }}>{exam.subject}</p>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={() => handleEdit(exam)} className="theme-bg-elevated theme-text-main" style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--sidebar-border)', cursor: 'pointer' }}>
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(exam.id)} className="theme-bg-elevated" style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--sidebar-border)', cursor: 'pointer', color: '#ef4444' }}>
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="theme-bg-elevated" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f59e0b', fontSize: 12, fontWeight: 600 }}>
                                    <Calendar className="w-4 h-4" /> {exam.examDate}
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: '#10b981' }}>
                                    Marks: {exam.passingMarks} / {exam.totalMarks}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExamManager;
