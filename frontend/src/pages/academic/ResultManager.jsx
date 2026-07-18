import React, { useState, useEffect } from 'react';
import { Search, FileText, CheckCircle, AlertCircle, Eye, Printer, X, Award, Download } from 'lucide-react';

const ResultManager = () => {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [exams, setExams] = useState([]);
    const [marksData, setMarksData] = useState([]);

    // Filters
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        setClasses(JSON.parse(localStorage.getItem('thoms_classes') || '[]'));
        setSections(JSON.parse(localStorage.getItem('thoms_sections') || '[]'));
        setStudents(JSON.parse(localStorage.getItem('thoms_students') || '[]'));
        setExams(JSON.parse(localStorage.getItem('thoms_exams') || '[]'));
        setMarksData(JSON.parse(localStorage.getItem('thoms_marks') || '[]'));
    }, []);

    const filteredSections = sections.filter(s => s.className === selectedClass);

    let displayStudents = students;
    if (selectedClass) displayStudents = displayStudents.filter(s => s.className === selectedClass);
    if (selectedSection) displayStudents = displayStudents.filter(s => s.section === selectedSection);
    if (searchQuery) displayStudents = displayStudents.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNo.toString().includes(searchQuery));

    // Calculate overall data for a student's report card
    const generateReportCard = (student) => {
        // Find all marks for this student
        const studentMarks = marksData.filter(m => m.studentId === student.id);
        
        // Group exams by type
        const resultsByType = {};
        let grandTotal = 0;
        let grandObtained = 0;
        let hasFailedAny = false;

        studentMarks.forEach(mark => {
            const exam = exams.find(e => e.id === mark.examId);
            if (!exam) return;

            if (!resultsByType[exam.examType]) {
                resultsByType[exam.examType] = {
                    exams: [],
                    typeTotal: 0,
                    typeObtained: 0,
                };
            }

            const isFail = mark.obtained < exam.passingMarks;
            if (isFail) hasFailedAny = true;

            resultsByType[exam.examType].exams.push({
                subject: exam.subject,
                totalMarks: exam.totalMarks,
                passingMarks: exam.passingMarks,
                obtained: mark.obtained,
                remarks: mark.remarks,
                isFail
            });

            resultsByType[exam.examType].typeTotal += exam.totalMarks;
            resultsByType[exam.examType].typeObtained += mark.obtained;

            grandTotal += exam.totalMarks;
            grandObtained += mark.obtained;
        });

        const percentage = grandTotal > 0 ? ((grandObtained / grandTotal) * 100).toFixed(2) : 0;
        
        let grade = 'F';
        if (percentage >= 90) grade = 'A+';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B';
        else if (percentage >= 60) grade = 'C';
        else if (percentage >= 50) grade = 'D';
        else if (percentage >= 33) grade = 'E';

        return {
            resultsByType,
            grandTotal,
            grandObtained,
            percentage,
            grade,
            status: hasFailedAny ? 'FAIL' : (grandTotal === 0 ? 'NO DATA' : 'PASS')
        };
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-8 result-manager-container">
            <style>
                {`
                @media print {
                    .sidebar, .top-header, .no-print { display: none !important; }
                    .result-manager-container { padding: 0 !important; }
                    .print-modal { position: static !important; inset: auto !important; background: none !important; backdrop-filter: none !important; }
                    .print-card { box-shadow: none !important; border: 1px solid #e2e8f0 !important; max-width: 100% !important; margin: 0 !important; border-radius: 0 !important; }
                    body { background: white !important; }
                }
                `}
            </style>

            <div className="no-print" style={{ marginBottom: 32 }}>
                <h1 className="theme-text-main" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Student Results</h1>
                <p className="theme-text-muted" style={{ margin: '4px 0 0 0', fontSize: 14 }}>View and print student report cards and academic performance.</p>
            </div>

            {/* Filters */}
            <div className="theme-bg-surface no-print" style={{ padding: '24px', borderRadius: 20, border: '1px solid var(--sidebar-border)', marginBottom: 24, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                    <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Class</label>
                    <select value={selectedClass} onChange={e => { setSelectedClass(e.target.value); setSelectedSection(''); }} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }}>
                        <option value="">All Classes</option>
                        {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>
                
                <div style={{ flex: '1 1 200px' }}>
                    <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Section</label>
                    <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }} disabled={!selectedClass}>
                        <option value="">All Sections</option>
                        {filteredSections.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                </div>

                <div style={{ flex: '2 1 300px' }}>
                    <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Search Student</label>
                    <div style={{ position: 'relative' }}>
                        <Search className="w-5 h-5 theme-text-muted" style={{ position: 'absolute', left: 16, top: 12 }} />
                        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: 12, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="Search by name or roll number..." />
                    </div>
                </div>
            </div>

            {/* Students List */}
            <div className="theme-bg-surface no-print" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--sidebar-border)' }}>
                                <th className="theme-text-muted" style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Roll No</th>
                                <th className="theme-text-muted" style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Student Detail</th>
                                <th className="theme-text-muted" style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Class & Section</th>
                                <th className="theme-text-muted" style={{ padding: '16px 24px', textAlign: 'center', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Marks Entries</th>
                                <th className="theme-text-muted" style={{ padding: '16px 24px', textAlign: 'right', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '40px 24px', textAlign: 'center' }}>
                                        <AlertCircle className="w-12 h-12 theme-text-muted mx-auto" style={{ opacity: 0.3, marginBottom: 12 }} />
                                        <div className="theme-text-main" style={{ fontSize: 16, fontWeight: 600 }}>No Students Found</div>
                                        <div className="theme-text-muted" style={{ fontSize: 14 }}>Try adjusting your filters.</div>
                                    </td>
                                </tr>
                            ) : (
                                displayStudents.map(student => {
                                    const entryCount = marksData.filter(m => m.studentId === student.id).length;
                                    return (
                                        <tr key={student.id} style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
                                            <td className="theme-text-main" style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600 }}>#{student.rollNo}</td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    {student.pic ? (
                                                        <img src={student.pic} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>
                                                            {student.name.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="theme-text-main" style={{ fontSize: 14, fontWeight: 700 }}>{student.name}</div>
                                                        <div className="theme-text-muted" style={{ fontSize: 12 }}>Admission: {student.admissionNo}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="theme-text-main" style={{ padding: '16px 24px', fontSize: 14, fontWeight: 500 }}>
                                                {student.className} <span className="theme-text-muted">&bull; Section {student.section}</span>
                                            </td>
                                            <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                                <span style={{ padding: '4px 10px', borderRadius: '99px', background: entryCount > 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: entryCount > 0 ? '#10b981' : '#ef4444', fontSize: 12, fontWeight: 700 }}>
                                                    {entryCount} Subjects
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                                <button onClick={() => setSelectedStudent(student)} className="theme-bg-elevated theme-text-main" style={{ padding: '8px 16px', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid var(--sidebar-border)', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                                                    <Eye className="w-4 h-4" /> View Result
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Report Card Modal */}
            {selectedStudent && (() => {
                const report = generateReportCard(selectedStudent);
                const isFail = report.status === 'FAIL';
                const hasData = report.grandTotal > 0;

                return (
                    <div className="print-modal fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflowY: 'auto' }}>
                        <div className="print-card theme-bg-surface" style={{ width: '100%', maxWidth: 800, borderRadius: 24, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)', background: 'var(--bg-surface, #ffffff)', border: '1px solid var(--sidebar-border)' }}>
                            
                            {/* Modal Action Header (No Print) */}
                            <div className="no-print" style={{ padding: '20px 24px', borderBottom: '1px solid var(--sidebar-border)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12, background: 'var(--bg-elevated)' }}>
                                <button onClick={handlePrint} style={{ padding: '8px 16px', borderRadius: 8, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13 }}>
                                    <Printer className="w-4 h-4" /> Print Report
                                </button>
                                <button onClick={() => setSelectedStudent(null)} className="theme-bg-elevated theme-text-muted hover:text-red-500" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--sidebar-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Actual Report Card Printable Area */}
                            <div style={{ padding: '40px', background: '#fff', color: '#0f172a' }}>
                                
                                {/* School Header */}
                                <div style={{ textAlign: 'center', marginBottom: 40, borderBottom: '2px solid #e2e8f0', paddingBottom: 24 }}>
                                    <h1 style={{ margin: '0 0 8px 0', fontSize: 28, fontWeight: 900, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px' }}>Thoms School ERP</h1>
                                    <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#64748b' }}>Academic Performance Report</h2>
                                </div>

                                {/* Student Details */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40, background: '#f8fafc', padding: 24, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        {selectedStudent.pic ? (
                                            <img src={selectedStudent.pic} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                        ) : (
                                            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, border: '3px solid #fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                                {selectedStudent.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{selectedStudent.name}</div>
                                            <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>D/O, S/O: {selectedStudent.fatherName}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignContent: 'center' }}>
                                        <div>
                                            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>Roll Number</div>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{selectedStudent.rollNo}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>Class & Section</div>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{selectedStudent.className} - {selectedStudent.section}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>Admission No</div>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{selectedStudent.admissionNo}</div>
                                        </div>
                                    </div>
                                </div>

                                {!hasData ? (
                                    <div style={{ padding: '60px 0', textAlign: 'center' }}>
                                        <div style={{ display: 'inline-flex', padding: 16, background: '#f8fafc', borderRadius: '50%', marginBottom: 16 }}>
                                            <FileText className="w-10 h-10" style={{ color: '#cbd5e1' }} />
                                        </div>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 700, color: '#475569' }}>No Examination Records</h3>
                                        <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>There are no marks entered for this student yet.</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Exam Tables */}
                                        {Object.keys(report.resultsByType).map(examType => {
                                            const typeData = report.resultsByType[examType];
                                            return (
                                                <div key={examType} style={{ marginBottom: 32 }}>
                                                    <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 800, color: '#1e293b', borderBottom: '2px solid #e2e8f0', paddingBottom: 8 }}>{examType} Examinations</h3>
                                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                                        <thead>
                                                            <tr style={{ background: '#f8fafc' }}>
                                                                <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 700, color: '#475569' }}>Subject</th>
                                                                <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, color: '#475569' }}>Max Marks</th>
                                                                <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, color: '#475569' }}>Passing</th>
                                                                <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, color: '#475569' }}>Obtained</th>
                                                                <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, color: '#475569' }}>Status</th>
                                                                <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 700, color: '#475569' }}>Remarks</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {typeData.exams.map((ex, idx) => (
                                                                <tr key={idx}>
                                                                    <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0', fontWeight: 600, color: '#0f172a' }}>{ex.subject}</td>
                                                                    <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>{ex.totalMarks}</td>
                                                                    <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>{ex.passingMarks}</td>
                                                                    <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 800, color: ex.isFail ? '#ef4444' : '#0f172a' }}>{ex.obtained}</td>
                                                                    <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                                                        <span style={{ padding: '4px 8px', borderRadius: 6, background: ex.isFail ? '#fef2f2' : '#ecfdf5', color: ex.isFail ? '#ef4444' : '#10b981', fontWeight: 700, fontSize: 11 }}>
                                                                            {ex.isFail ? 'FAIL' : 'PASS'}
                                                                        </span>
                                                                    </td>
                                                                    <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0', color: '#64748b', fontStyle: 'italic' }}>{ex.remarks || '-'}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>
                                                            <tr style={{ background: '#f1f5f9' }}>
                                                                <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0', fontWeight: 800, color: '#0f172a' }}>Subtotal</td>
                                                                <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 800, color: '#0f172a' }}>{typeData.typeTotal}</td>
                                                                <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0' }}></td>
                                                                <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 800, color: '#0f172a' }}>{typeData.typeObtained}</td>
                                                                <td colSpan="2" style={{ padding: '12px 16px', border: '1px solid #e2e8f0' }}></td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            );
                                        })}

                                        {/* Final Summary Card */}
                                        <div style={{ marginTop: 40, background: isFail ? '#fef2f2' : '#f0fdf4', padding: 24, borderRadius: 16, border: `1px solid ${isFail ? '#fca5a5' : '#86efac'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div>
                                                <div style={{ fontSize: 12, fontWeight: 800, color: isFail ? '#ef4444' : '#10b981', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Final Result</div>
                                                <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>
                                                    {isFail ? 'Needs Improvement' : 'Promoted / Passed'}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: 32, textAlign: 'right' }}>
                                                <div>
                                                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Overall Score</div>
                                                    <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{report.grandObtained} <span style={{ fontSize: 14, color: '#94a3b8' }}>/ {report.grandTotal}</span></div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Percentage</div>
                                                    <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{report.percentage}%</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Grade</div>
                                                    <div style={{ fontSize: 20, fontWeight: 900, color: isFail ? '#ef4444' : '#10b981' }}>{report.grade}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Signatures */}
                                        <div style={{ marginTop: 60, display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ width: 150, borderBottom: '1px solid #cbd5e1', marginBottom: 8 }}></div>
                                                <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Class Teacher</div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ width: 150, borderBottom: '1px solid #cbd5e1', marginBottom: 8 }}></div>
                                                <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Principal</div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ width: 150, borderBottom: '1px solid #cbd5e1', marginBottom: 8 }}></div>
                                                <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Parent Signature</div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
};

export default ResultManager;
