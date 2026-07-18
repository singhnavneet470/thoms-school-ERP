import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, BookOpen } from 'lucide-react';

const ClassManager = () => {
    const [classes, setClasses] = useState([]);
    const [formData, setFormData] = useState({ id: null, name: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('thoms_classes');
        if (stored) {
            setClasses(JSON.parse(stored));
        } else {
            const initial = [
                { id: 1, name: 'Class 1' }, { id: 2, name: 'Class 2' },
                { id: 3, name: 'Class 3' }, { id: 4, name: 'Class 10' }
            ];
            setClasses(initial);
            localStorage.setItem('thoms_classes', JSON.stringify(initial));
        }
    }, []);

    const saveClasses = (newData) => {
        setClasses(newData);
        localStorage.setItem('thoms_classes', JSON.stringify(newData));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        if (isEditing) {
            saveClasses(classes.map(c => c.id === formData.id ? { ...formData } : c));
        } else {
            saveClasses([...classes, { id: Date.now(), name: formData.name }]);
        }
        setFormData({ id: null, name: '' });
        setIsEditing(false);
    };

    const handleEdit = (item) => {
        setFormData(item);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this class? This may affect students assigned to it.")) {
            saveClasses(classes.filter(c => c.id !== id));
        }
    };

    return (
        <div className="p-8" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            
            {/* Left side: Form */}
            <div className="theme-bg-surface" style={{ width: 350, borderRadius: 20, border: '1px solid var(--sidebar-border)', padding: 24 }}>
                <h2 className="theme-text-main" style={{ fontSize: 18, fontWeight: 800, margin: '0 0 20px 0' }}>{isEditing ? 'Edit Class' : 'Add Class'}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 20 }}>
                        <label className="theme-text-main" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Class Name</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="theme-bg-elevated theme-text-main" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--sidebar-border)', outline: 'none' }} placeholder="e.g. Class 11" />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px 0', borderRadius: 10, fontWeight: 600, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.25)' }}>
                        {isEditing ? 'Update Class' : 'Save Class'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, name: '' }); }} className="theme-text-muted" style={{ width: '100%', padding: '10px 0', marginTop: 10, background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {/* Right side: List */}
            <div className="theme-bg-surface" style={{ flex: 1, borderRadius: 20, border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--sidebar-border)' }}>
                    <h2 className="theme-text-main" style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Class List</h2>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead className="theme-bg-elevated theme-text-muted" style={{ borderBottom: '1px solid var(--sidebar-border)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', fontWeight: 700 }}>Class Name</th>
                                <th style={{ padding: '16px 24px', fontWeight: 700, textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.length === 0 ? (
                                <tr>
                                    <td colSpan="2" style={{ padding: '40px', textAlign: 'center' }}>
                                        <div className="theme-text-muted" style={{ fontSize: 14 }}>No classes created yet.</div>
                                    </td>
                                </tr>
                            ) : classes.map(c => (
                                <tr key={c.id} style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div className="theme-text-main" style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                                            <button onClick={() => handleEdit(c)} className="theme-bg-elevated theme-text-main" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--sidebar-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(c.id)} className="theme-bg-elevated" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--sidebar-border)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
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

export default ClassManager;
