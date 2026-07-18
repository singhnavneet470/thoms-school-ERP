import React, { useState, useEffect } from 'react';
import { Search, Save, CheckCircle, AlertCircle } from 'lucide-react';

const MarksManager = () => {
    const [exams, setExams] = useState([]);
    const [sections, setSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [marksData, setMarksData] = useState([]); // Master list of marks

    // Selections
    const [selectedExamId, setSelectedExamId] = useState('');
    const [selectedSection, setSelectedSection] = useState('');

    // Local table state mapping studentId -> { obtained, remarks }
    const [currentMarks, setCurrentMarks] = useState({});

    useEffect(() => {
        setExams(JSON.parse(localStorage.getItem('thoms_exams') || '[]'));
        setSections(JSON.parse(localStorage.getItem('thoms_sections') || '[]'));
        setStudents(JSON.parse(localStorage.getItem('thoms_students') || '[]'));
        setMarksData(JSON.parse(localStorage.getItem('thoms_marks') || '[]'));
    }, []);

    // Derived selected exam details
    const activeExam = exams.find(e => e.id.toString() === selectedExamId);
    
    // Sections for the selected exam's class
    const availableSections = activeExam ? sections.filter(s => s.className === activeExam.className) : [];

    // Students for the selected class and section
    const activeStudents = (activeExam && selectedSection) 
        ? students.filter(st => st.className === activeExam.className && st.section === selectedSection) 
        : [];

    // Load marks when selection changes
    useEffect(() => {
        if (activeExam && selectedSection) {
            const initialMap = {};
            activeStudents.forEach(st => {
                // Find existing marks for this exam + student
                const existing = marksData.find(m => m.examId === activeExam.id && m.studentId === st.id);
                if (existing) {
                    initialMap[st.id] = { obtained: existing.obtained, remarks: existing.remarks || '' };
                } else {
                    initialMap[st.id] = { obtained: '', remarks: '' };
                }
            });
            setCurrentMarks(initialMap);
        }
    }, [selectedExamId, selectedSection]); // Don't include marksData/students to prevent loop, relies on them being stable

    const handleMarkChange = (studentId, field, value) => {
        setCurrentMarks(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [field]: value
            }
        }));
    };

    const handleSaveMarks = () => {
        if (!activeExam) return;

        let newMarksData = [...marksData];

        // Process all students in current view
        Object.keys(currentMarks).forEach(stId => {
            const sId = parseInt(stId);
            const { obtained, remarks } = currentMarks[stId];
            
            // Only save if obtained marks is provided
            if (obtained !== '') {
                const markEntry = {
                    id: `${activeExam.id}_${sId}`, // Unique ID for exam+student
                    examId: activeExam.id,
                    studentId: sId,
                    obtained: parseInt(obtained) || 0,
                    remarks: remarks
                };

                // Remove existing if any, then push new
                newMarksData = newMarksData.filter(m => !(m.examId === activeExam.id && m.studentId === sId));
                newMarksData.push(markEntry);
            }
        });

        setMarksData(newMarksData);
        localStorage.setItem('thoms_marks', JSON.stringify(newMarksData));
        alert('Marks saved successfully!');
    };

    return (
        <div className="p-8">
            <div style={{ marginBottom: 32 }}>
                <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Enter Marks</h1>
                <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>Record student marks for Half Yearly, Annual, or Unit Tests.</p>
            </div>

            <div className="theme-bg-surface" style={{ padding: '24px', borderRadius: 20, border: '1px solid var(--sidebar-border)', marginBottom: 24, display: 'flex', gap: 20 }}>
                <div style={{ flex: 1 }}>
                    <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>1. Select Examination</label>
                    <select value={selectedExamId} onChange={e => { setSelectedExamId(e.target.value); setSelectedSection(''); }} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }}>
                        <option value="">-- Choose Exam --</option>
                        {exams.map(e => <option key={e.id} value={e.id}>{e.className} &bull; {e.examName} ({e.subject})</option>)}
                    </select>
                </div>
                
                <div style={{ flex: 1 }}>
                    <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>2. Select Section</label>
                    <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }} disabled={!selectedExamId}>
                        <option value="">-- Choose Section --</option>
                        {availableSections.length === 0 && selectedExamId ? (
                            <option value="" disabled>No sections available for {activeExam?.className}</option>
                        ) : (
                            availableSections.map(s => <option key={s.id} value={s.name}>{s.name}</option>)
                        )}
                    </select>
                </div>
            </div>

            {!activeExam || !selectedSection ? (
                <div className="theme-bg-surface" style={{ padding: '60px 0', borderRadius: 20, border: '1px dashed var(--sidebar-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle className="w-16 h-16 theme-text-muted" style={{ opacity: 0.3, marginBottom: 16 }} />
                    <h3 className="theme-text-main" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0' }}>Select Exam & Section</h3>
                    <p className="theme-text-muted" style={{ fontSize: 14 }}>Choose an exam and section to start entering marks.</p>
                </div>
            ) : activeStudents.length === 0 ? (
                <div className="theme-bg-surface" style={{ padding: '60px 0', borderRadius: 20, border: '1px dashed var(--sidebar-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertCircle className="w-16 h-16 theme-text-muted" style={{ opacity: 0.3, marginBottom: 16 }} />
                    <h3 className="theme-text-main" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0' }}>No Students Found</h3>
                    <p className="theme-text-muted" style={{ fontSize: 14 }}>There are no students enrolled in {activeExam.className} Section {selectedSection}.</p>
                </div>
            ) : (
                <div className="theme-bg-surface fade-in" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--sidebar-border)', background: 'var(--bg-elevated, rgba(0,0,0,0.02))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 className="theme-text-main" style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{activeExam.examName} - {activeExam.subject}</h3>
                            <p className="theme-text-muted" style={{ fontSize: 13, margin: '4px 0 0 0', fontWeight: 500 }}>Max Marks: {activeExam.totalMarks} | Passing: {activeExam.passingMarks}</p>
                        </div>
                        <button onClick={handleSaveMarks} style={{ padding: '10px 20px', borderRadius: 10, background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
                            <Save className="w-4 h-4" /> Save All Marks
                        </button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--sidebar-border)' }}>
                                    <th className="theme-text-muted" style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Roll No</th>
                                    <th className="theme-text-muted" style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Student Name</th>
                                    <th className="theme-text-muted" style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', width: '20%' }}>Marks Obtained</th>
                                    <th className="theme-text-muted" style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', width: '35%' }}>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeStudents.map(student => {
                                    const marks = currentMarks[student.id] || { obtained: '', remarks: '' };
                                    const isFail = marks.obtained !== '' && parseInt(marks.obtained) < activeExam.passingMarks;

                                    return (
                                        <tr key={student.id} style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
                                            <td className="theme-text-main" style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600 }}>{student.rollNo}</td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    {student.pic ? (
                                                        <img src={student.pic} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>
                                                            {student.name.charAt(0)}
                                                        </div>
                                                    )}
                                                    <span className="theme-text-main" style={{ fontSize: 14, fontWeight: 600 }}>{student.name}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <input 
                                                    type="number" 
                                                    max={activeExam.totalMarks}
                                                    min="0"
                                                    value={marks.obtained} 
                                                    onChange={e => handleMarkChange(student.id, 'obtained', e.target.value)} 
                                                    className={`theme-bg-elevated theme-text-main ${isFail ? 'focus:border-red-500' : 'focus:border-indigo-500'}`}
                                                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: `1px solid ${isFail ? '#ef4444' : 'var(--sidebar-border)'}`, outline: 'none', color: isFail ? '#ef4444' : 'inherit', fontWeight: isFail ? 700 : 'normal' }} 
                                                    placeholder={`/ ${activeExam.totalMarks}`}
                                                />
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <input 
                                                    type="text" 
                                                    value={marks.remarks} 
                                                    onChange={e => handleMarkChange(student.id, 'remarks', e.target.value)} 
                                                    className="theme-bg-elevated theme-text-main focus:border-indigo-500"
                                                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--sidebar-border)', outline: 'none' }} 
                                                    placeholder={isFail ? "Needs improvement" : "Good performance"}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarksManager;
