import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

const SectionManager = () => {
    const [sections, setSections] = useState([]);
    const [classes, setClasses] = useState([]);
    const [formData, setFormData] = useState({ id: null, className: '', name: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('thoms_sections');
        if (stored) {
            setSections(JSON.parse(stored));
        } else {
            const initial = [
                { id: 1, className: 'Class 10', name: 'A' }, { id: 2, className: 'Class 10', name: 'B' },
                { id: 3, className: 'Class 9', name: 'A' }
            ];
            setSections(initial);
            localStorage.setItem('thoms_sections', JSON.stringify(initial));
        }
        
        // Load classes for the dropdown
        const storedClasses = localStorage.getItem('thoms_classes');
        if (storedClasses) {
            setClasses(JSON.parse(storedClasses));
        }
    }, []);

    const saveSections = (newData) => {
        setSections(newData);
        localStorage.setItem('thoms_sections', JSON.stringify(newData));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.className) return;

        if (isEditing) {
            saveSections(sections.map(s => s.id === formData.id ? { ...formData } : s));
        } else {
            saveSections([...sections, { id: Date.now(), className: formData.className, name: formData.name }]);
        }
        setFormData({ id: null, className: '', name: '' });
        setIsEditing(false);
    };

    const handleEdit = (item) => {
        setFormData(item);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this section? This may affect students assigned to it.")) {
            saveSections(sections.filter(s => s.id !== id));
        }
    };

    return (
        <div className="p-8" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            
            {/* Left side: Form */}
            <div className="theme-bg-surface" style={{ width: 350, borderRadius: 20, border: '1px solid var(--sidebar-border)', padding: 24 }}>
                <h2 className="theme-text-main" style={{ fontSize: 18, fontWeight: 800, margin: '0 0 20px 0' }}>{isEditing ? 'Edit Section' : 'Add Section'}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Select Class</label>
                        <select required value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }}>
                            <option value="">Select Class</option>
                            {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Section Name</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="e.g. A" />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px 0', borderRadius: 10, fontWeight: 600, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.25)' }}>
                        {isEditing ? 'Update Section' : 'Save Section'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, className: '', name: '' }); }} className="theme-text-muted" style={{ width: '100%', padding: '10px 0', marginTop: 10, background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {/* Right side: List */}
            <div className="theme-bg-surface" style={{ flex: 1, borderRadius: 20, border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--sidebar-border)' }}>
                    <h2 className="theme-text-main" style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Section List</h2>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead className="theme-bg-elevated theme-text-muted" style={{ borderBottom: '1px solid var(--sidebar-border)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Class</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Section Name</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700, textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.length === 0 ? (
                                <tr>
                                    <td colSpan="3" style={{ padding: '40px', textAlign: 'center' }}>
                                        <div className="theme-text-muted" style={{ fontSize: 14 }}>No sections created yet.</div>
                                    </td>
                                </tr>
                            ) : sections.map(s => (
                                <tr key={s.id} style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'inline-flex', padding: '4px 10px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                                            {s.className}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div className="theme-text-main" style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                                            <button onClick={() => handleEdit(s)} className="theme-bg-elevated theme-text-main" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--sidebar-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(s.id)} className="theme-bg-elevated" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--sidebar-border)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
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

export default SectionManager;
