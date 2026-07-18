import React, { useState, useEffect } from 'react';
import { Search, Plus, Calendar, Clock, Edit2, Trash2, X, Save, BookOpen, Users } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TimetableManager = () => {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [teachers, setTeachers] = useState([]);
    
    // Selection state for Class Timetable
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    
    // Selection state for Teacher Timetable
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [teacherSchedule, setTeacherSchedule] = useState({}); // { [day]: { [periodIndex]: { class, section, subject, time } } }
    
    const [activeTab, setActiveTab] = useState('class'); // 'class' | 'teacher'
    
    // Timetable state: { periodId, day, subject, teacher }
    const [timetable, setTimetable] = useState([]);
    // Periods: { id, startTime, endTime }
    const [periods, setPeriods] = useState([]);
    
    // Modal state for assigning a cell
    const [assignModal, setAssignModal] = useState({ isOpen: false, periodId: null, day: null, subject: '', teacher: '' });

    useEffect(() => {
        // Load dependencies from localStorage
        const loadedClasses = JSON.parse(localStorage.getItem('thoms_classes') || '[]');
        const loadedSections = JSON.parse(localStorage.getItem('thoms_sections') || '[]');
        const loadedTeachers = JSON.parse(localStorage.getItem('thoms_teachers') || '[]');
        setClasses(loadedClasses);
        setSections(loadedSections);
        setTeachers(loadedTeachers);
    }, []);

    // Load class timetable
    useEffect(() => {
        if (activeTab === 'class' && selectedClass && selectedSection) {
            const storageKey = `thoms_timetable_${selectedClass}_${selectedSection}`;
            const data = JSON.parse(localStorage.getItem(storageKey) || '{"periods":[], "schedule":[]}');
            
            if (data.periods.length === 0) {
                // Generate default periods if none exist
                const defaultPeriods = [
                    { id: 1, startTime: '08:00 AM', endTime: '08:45 AM', isBreak: false },
                    { id: 2, startTime: '08:45 AM', endTime: '09:30 AM', isBreak: false },
                    { id: 3, startTime: '09:30 AM', endTime: '10:15 AM', isBreak: false },
                    { id: 4, startTime: '10:15 AM', endTime: '11:00 AM', isBreak: false },
                    { id: 5, startTime: '11:00 AM', endTime: '11:30 AM', isBreak: true }, // Recess
                    { id: 6, startTime: '11:30 AM', endTime: '12:15 PM', isBreak: false },
                    { id: 7, startTime: '12:15 PM', endTime: '01:00 PM', isBreak: false },
                    { id: 8, startTime: '01:00 PM', endTime: '01:45 PM', isBreak: false },
                    { id: 9, startTime: '01:45 PM', endTime: '02:30 PM', isBreak: false },
                ];
                setPeriods(defaultPeriods);
                setTimetable([]);
            } else {
                setPeriods(data.periods);
                setTimetable(data.schedule);
            }
        } else if (activeTab === 'class') {
            setPeriods([]);
            setTimetable([]);
        }
    }, [selectedClass, selectedSection, activeTab]);

    // Load teacher timetable
    useEffect(() => {
        if (activeTab === 'teacher' && selectedTeacher) {
            // Reconstruct schedule for teacher across all classes/sections
            let combinedSchedule = {}; // day -> periodIndex -> info
            let unifiedPeriods = [
                { id: 1, startTime: '08:00 AM', endTime: '08:45 AM', isBreak: false },
                { id: 2, startTime: '08:45 AM', endTime: '09:30 AM', isBreak: false },
                { id: 3, startTime: '09:30 AM', endTime: '10:15 AM', isBreak: false },
                { id: 4, startTime: '10:15 AM', endTime: '11:00 AM', isBreak: false },
                { id: 5, startTime: '11:00 AM', endTime: '11:30 AM', isBreak: true }, // Recess
                { id: 6, startTime: '11:30 AM', endTime: '12:15 PM', isBreak: false },
                { id: 7, startTime: '12:15 PM', endTime: '01:00 PM', isBreak: false },
                { id: 8, startTime: '01:00 PM', endTime: '01:45 PM', isBreak: false },
                { id: 9, startTime: '01:45 PM', endTime: '02:30 PM', isBreak: false },
            ]; // Assuming standard periods for teacher view

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('thoms_timetable_')) {
                    const parts = key.split('_');
                    const className = parts[2];
                    const sectionName = parts[3];
                    
                    try {
                        const data = JSON.parse(localStorage.getItem(key));
                        if (data && data.schedule) {
                            // Find periods assigned to this teacher
                            data.schedule.forEach(slot => {
                                if (slot.teacher === selectedTeacher) {
                                    if (!combinedSchedule[slot.day]) combinedSchedule[slot.day] = {};
                                    // Find period index
                                    const pIndex = data.periods.findIndex(p => p.id === slot.periodId);
                                    if (pIndex !== -1) {
                                        combinedSchedule[slot.day][pIndex] = {
                                            className,
                                            sectionName,
                                            subject: slot.subject,
                                            time: `${data.periods[pIndex].startTime} - ${data.periods[pIndex].endTime}`
                                        };
                                    }
                                }
                            });
                        }
                    } catch (e) {
                        console.error("Error parsing timetable for", key);
                    }
                }
            }
            setTeacherSchedule(combinedSchedule);
            setPeriods(unifiedPeriods); // Set base periods for grid rendering
        } else if (activeTab === 'teacher') {
            setTeacherSchedule({});
            setPeriods([]);
        }
    }, [selectedTeacher, activeTab]);

    const saveTimetable = (newPeriods, newSchedule) => {
        const storageKey = `thoms_timetable_${selectedClass}_${selectedSection}`;
        localStorage.setItem(storageKey, JSON.stringify({ periods: newPeriods, schedule: newSchedule }));
        setPeriods(newPeriods);
        setTimetable(newSchedule);
    };

    const handleAddPeriod = () => {
        const newPeriod = {
            id: Date.now(),
            startTime: '12:15 PM',
            endTime: '01:00 PM',
            isBreak: false
        };
        saveTimetable([...periods, newPeriod], timetable);
    };

    const handleCellClick = (periodId, day) => {
        const existing = timetable.find(t => t.periodId === periodId && t.day === day) || { subject: '', teacher: '' };
        setAssignModal({ isOpen: true, periodId, day, subject: existing.subject, teacher: existing.teacher });
    };

    const handleAssignSave = (e) => {
        e.preventDefault();
        const { periodId, day, subject, teacher } = assignModal;
        
        let newSchedule = [...timetable];
        const index = newSchedule.findIndex(t => t.periodId === periodId && t.day === day);
        
        if (subject.trim() === '' && teacher.trim() === '') {
            // Delete if both empty
            if (index > -1) newSchedule.splice(index, 1);
        } else {
            if (index > -1) {
                newSchedule[index] = { periodId, day, subject, teacher };
            } else {
                newSchedule.push({ periodId, day, subject, teacher });
            }
        }
        
        saveTimetable(periods, newSchedule);
        setAssignModal({ isOpen: false, periodId: null, day: null, subject: '', teacher: '' });
    };

    const getCellData = (periodId, day) => {
        return timetable.find(t => t.periodId === periodId && t.day === day);
    };

    const filteredSections = sections.filter(s => s.className === selectedClass);

    return (
        <div className="p-8">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                    <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Timetable Management</h1>
                    <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>Manage class schedules or view teacher timetables.</p>
                </div>
                
                {/* Tabs */}
                <div style={{ display: 'flex', gap: 8, background: 'var(--bg-elevated)', padding: 6, borderRadius: 12, border: '1px solid var(--sidebar-border)' }}>
                    <button 
                        onClick={() => setActiveTab('class')}
                        style={{ 
                            padding: '10px 16px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', border: 'none', fontWeight: 600, fontSize: 14,
                            background: activeTab === 'class' ? 'var(--primary-color, #6366f1)' : 'transparent',
                            color: activeTab === 'class' ? '#fff' : 'var(--text-muted)'
                        }}
                    >
                        <BookOpen className="w-4 h-4" /> Class Timetable
                    </button>
                    <button 
                        onClick={() => setActiveTab('teacher')}
                        style={{ 
                            padding: '10px 16px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', border: 'none', fontWeight: 600, fontSize: 14,
                            background: activeTab === 'teacher' ? 'var(--primary-color, #6366f1)' : 'transparent',
                            color: activeTab === 'teacher' ? '#fff' : 'var(--text-muted)'
                        }}
                    >
                        <Users className="w-4 h-4" /> Teacher Timetable
                    </button>
                </div>
            </div>

            {/* Top Filter Bar */}
            <div className="theme-bg-surface" style={{ padding: '20px 24px', borderRadius: 20, border: '1px solid var(--sidebar-border)', marginBottom: 24, display: 'flex', gap: 24, alignItems: 'center' }}>
                {activeTab === 'class' ? (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                            <div style={{ flex: 1 }}>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select Class</label>
                                <select value={selectedClass} onChange={e => { setSelectedClass(e.target.value); setSelectedSection(''); }} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', fontWeight: 600 }}>
                                    <option value="">-- Choose Class --</option>
                                    {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select Section</label>
                                <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', fontWeight: 600 }} disabled={!selectedClass}>
                                    <option value="">-- Choose Section --</option>
                                    {filteredSections.length === 0 && selectedClass ? (
                                        <option value="" disabled>No sections created for this class</option>
                                    ) : (
                                        filteredSections.map(s => <option key={s.id} value={s.name}>{s.name}</option>)
                                    )}
                                </select>
                            </div>
                        </div>
                        
                        {selectedClass && selectedSection && (
                            <div style={{ paddingLeft: 24, borderLeft: '1px solid var(--sidebar-border)', display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                                <button onClick={handleAddPeriod} style={{ padding: '12px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                                    <Plus className="w-4 h-4" /> Add Period
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{ flex: 1 }}>
                        <label className="theme-text-main" style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select Teacher</label>
                        <select value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)} className="theme-bg-elevated theme-text-main" style={{ width: '100%', maxWidth: 400, padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', fontWeight: 600 }}>
                            <option value="">-- Choose Teacher --</option>
                            {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                        </select>
                    </div>
                )}
            </div>

            {/* Timetable Grid */}
            {(activeTab === 'class' && selectedClass && selectedSection) || (activeTab === 'teacher' && selectedTeacher) ? (
                <div className="theme-bg-surface" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead className="theme-bg-elevated theme-text-main" style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
                                <tr>
                                    <th style={{ padding: '20px', fontWeight: 800, width: 140, borderRight: '1px solid var(--sidebar-border)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <Clock className="w-5 h-5 text-indigo-500" />
                                            <span>Time</span>
                                        </div>
                                    </th>
                                    {DAYS.map(day => (
                                        <th key={day} style={{ padding: '20px', fontWeight: 700, textAlign: 'center', minWidth: 160, borderRight: day !== 'Saturday' ? '1px solid var(--sidebar-border)' : 'none' }}>
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {periods.map((period, pIndex) => (
                                    <tr key={period.id} style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
                                        <td className="theme-bg-elevated" style={{ padding: '16px', borderRight: '1px solid var(--sidebar-border)' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                                    <div className="theme-text-main" style={{ fontWeight: 800, fontSize: 13, color: period.isBreak ? '#f59e0b' : '#6366f1' }}>
                                                        {period.isBreak ? 'Recess / Break' : `Period ${pIndex + 1}`}
                                                    </div>
                                                    {activeTab === 'class' && (
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 11, fontWeight: 600 }} className="theme-text-muted">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={period.isBreak || false} 
                                                                    onChange={(e) => {
                                                                        const newPeriods = [...periods];
                                                                        newPeriods[pIndex].isBreak = e.target.checked;
                                                                        saveTimetable(newPeriods, timetable);
                                                                    }}
                                                                    style={{ accentColor: '#f59e0b', cursor: 'pointer' }}
                                                                />
                                                                Break
                                                            </label>
                                                            <button 
                                                                onClick={() => {
                                                                    if (window.confirm('Are you sure you want to delete this period?')) {
                                                                        const newPeriods = periods.filter(p => p.id !== period.id);
                                                                        const newSchedule = timetable.filter(t => t.periodId !== period.id);
                                                                        saveTimetable(newPeriods, newSchedule);
                                                                    }
                                                                }}
                                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }}
                                                                title="Delete Period"
                                                            >
                                                                <Trash2 className="w-3 h-3 text-red-500 hover:text-red-600" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                                                    <input 
                                                        type="text" 
                                                        value={period.startTime} 
                                                        onChange={(e) => {
                                                            const newPeriods = [...periods];
                                                            newPeriods[pIndex].startTime = e.target.value;
                                                            saveTimetable(newPeriods, timetable);
                                                        }}
                                                        className="theme-text-muted"
                                                        style={{ background: 'transparent', border: 'none', width: 65, fontSize: 12, outline: 'none', fontWeight: 600, padding: 0 }}
                                                    />
                                                    <span className="theme-text-muted" style={{ fontSize: 12 }}>-</span>
                                                    <input 
                                                        type="text" 
                                                        value={period.endTime} 
                                                        onChange={(e) => {
                                                            const newPeriods = [...periods];
                                                            newPeriods[pIndex].endTime = e.target.value;
                                                            saveTimetable(newPeriods, timetable);
                                                        }}
                                                        className="theme-text-muted"
                                                        style={{ background: 'transparent', border: 'none', width: 65, fontSize: 12, outline: 'none', fontWeight: 600, padding: 0 }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        {period.isBreak ? (
                                            <td colSpan={DAYS.length} style={{ padding: '8px', background: 'var(--bg-base)' }}>
                                                <div style={{ height: 70, borderRadius: 12, background: 'rgba(245, 158, 11, 0.05)', border: '1px dashed rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <span style={{ color: '#f59e0b', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', fontSize: 14 }}>Recess / Break Time</span>
                                                </div>
                                            </td>
                                        ) : (
                                            DAYS.map(day => {
                                                const data = getCellData(period.id, day);
                                                return (
                                                    <td key={`${period.id}-${day}`} style={{ padding: '8px', borderRight: day !== 'Saturday' ? '1px solid var(--sidebar-border)' : 'none', verticalAlign: 'top' }}>
                                                        {activeTab === 'class' ? (
                                                            <div 
                                                                onClick={() => handleCellClick(period.id, day)}
                                                                className="theme-bg-base"
                                                                style={{ 
                                                                    height: 70, borderRadius: 12, border: '1px dashed var(--sidebar-border)', 
                                                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                                    cursor: 'pointer', transition: 'all 0.2s', padding: 8
                                                                }}
                                                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)'; }}
                                                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--sidebar-border)'; e.currentTarget.style.background = 'var(--bg-base)'; }}
                                                            >
                                                                {data ? (
                                                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                                                        <div className="theme-text-main" style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{data.subject}</div>
                                                                        <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 600 }}>{data.teacher}</div>
                                                                    </div>
                                                                ) : (
                                                                    <Plus className="w-5 h-5 theme-text-muted" style={{ opacity: 0.5 }} />
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div 
                                                                className="theme-bg-base"
                                                                style={{ 
                                                                    height: 70, borderRadius: 12, border: '1px solid var(--sidebar-border)', 
                                                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                                    padding: 8, background: teacherSchedule[day]?.[pIndex] ? 'rgba(99,102,241,0.05)' : 'var(--bg-base)',
                                                                    borderColor: teacherSchedule[day]?.[pIndex] ? '#6366f1' : 'var(--sidebar-border)'
                                                                }}
                                                            >
                                                                {teacherSchedule[day]?.[pIndex] ? (
                                                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                                                        <div className="theme-text-main" style={{ fontSize: 13, fontWeight: 800, color: '#6366f1', marginBottom: 2 }}>
                                                                            {teacherSchedule[day][pIndex].className} - {teacherSchedule[day][pIndex].sectionName}
                                                                        </div>
                                                                        <div className="theme-text-muted" style={{ fontSize: 11, fontWeight: 600 }}>{teacherSchedule[day][pIndex].subject}</div>
                                                                    </div>
                                                                ) : (
                                                                    <span className="theme-text-muted" style={{ fontSize: 12, opacity: 0.4 }}>Free Slot</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', border: '2px dashed var(--sidebar-border)', borderRadius: 20 }}>
                    <Calendar className="w-16 h-16 theme-text-muted" style={{ opacity: 0.3, marginBottom: 16 }} />
                    <h3 className="theme-text-main" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0' }}>No {activeTab === 'class' ? 'Class' : 'Teacher'} Selected</h3>
                    <p className="theme-text-muted" style={{ fontSize: 14 }}>Please select a {activeTab === 'class' ? 'class and section' : 'teacher'} to view the timetable.</p>
                </div>
            )}

            {/* Assignment Modal */}
            {assignModal.isOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', maxWidth: 450, borderRadius: 24, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)', overflow: 'hidden', background: 'var(--bg-surface, #ffffff)', border: '1px solid var(--sidebar-border)' }} className="fade-in">
                        <div style={{ padding: '28px 32px 24px', borderBottom: '1px solid var(--sidebar-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 className="theme-text-main" style={{ fontSize: 20, fontWeight: 800, margin: '0 0 6px 0' }}>Assign Period</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ padding: '4px 10px', borderRadius: 6, background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontSize: 12, fontWeight: 700 }}>{assignModal.day}</span>
                                    <span className="theme-text-muted" style={{ fontSize: 13, fontWeight: 500 }}>{selectedClass} &bull; Section {selectedSection}</span>
                                </div>
                            </div>
                            <button onClick={() => setAssignModal({ ...assignModal, isOpen: false })} style={{ background: 'var(--bg-elevated, #f1f5f9)', border: 'none', cursor: 'pointer', width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} className="theme-text-muted hover:text-red-500 hover:bg-red-50">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <form onSubmit={handleAssignSave} style={{ padding: '32px' }}>
                            <div style={{ marginBottom: 24 }}>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Subject Name</label>
                                <input type="text" value={assignModal.subject} onChange={e => setAssignModal({...assignModal, subject: e.target.value})} style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', background: 'var(--bg-elevated, #f8fafc)', transition: 'border-color 0.2s', fontSize: 14 }} className="theme-text-main focus:border-indigo-500" placeholder="e.g. Mathematics, Science" />
                            </div>
                            <div style={{ marginBottom: 36 }}>
                                <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Assign Teacher</label>
                                <select value={assignModal.teacher} onChange={e => setAssignModal({...assignModal, teacher: e.target.value})} style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none', background: 'var(--bg-elevated, #f8fafc)', transition: 'border-color 0.2s', fontSize: 14, appearance: 'none' }} className="theme-text-main focus:border-indigo-500">
                                    <option value="">-- No Teacher Assigned --</option>
                                    {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                </select>
                            </div>
                            <button type="submit" style={{ width: '100%', padding: '14px 0', borderRadius: 12, fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 20px -6px rgba(99,102,241,0.5)', transition: 'transform 0.1s' }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <Save className="w-4 h-4" /> Save Assignment
                            </button>
                            <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 20 }}>Leave both fields empty to clear this period.</p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimetableManager;
