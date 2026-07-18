import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Bell, Users, Send, FileText, CheckCircle, Clock } from 'lucide-react';

const CommunicateManager = ({ type }) => {
    // type: 'notice', 'sms', 'email', 'whatsapp', 'circular'
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        target: 'all', // all, class, staff
        class_name: '',
        section: ''
    });
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);

    const typeConfig = {
        notice: { title: 'Notice Board', icon: Bell, placeholder: 'Draft your notice here...', color: 'indigo' },
        sms: { title: 'Send SMS', icon: MessageSquare, placeholder: 'Type SMS message (max 160 chars)...', color: 'blue' },
        email: { title: 'Send Email', icon: Mail, placeholder: 'Compose your email...', color: 'emerald' },
        whatsapp: { title: 'Send WhatsApp', icon: MessageSquare, placeholder: 'Type WhatsApp message...', color: 'green' },
        circular: { title: 'Official Circular', icon: FileText, placeholder: 'Draft official circular...', color: 'purple' },
    };

    const config = typeConfig[type] || typeConfig.notice;

    useEffect(() => {
        // Load messages for this specific type
        const savedMessages = JSON.parse(localStorage.getItem(`thoms_comm_${type}`)) || [];
        setMessages(savedMessages);

        // Load classes for recipient dropdown
        const savedClasses = JSON.parse(localStorage.getItem('thoms_classes')) || [];
        setClasses(savedClasses);

        const savedSections = JSON.parse(localStorage.getItem('thoms_sections')) || [];
        setSections(savedSections);
    }, [type]);

    const handleSend = (e) => {
        e.preventDefault();
        
        const newMessage = {
            id: Date.now(),
            ...formData,
            date: new Date().toISOString(),
            status: 'Sent'
        };

        const updatedMessages = [newMessage, ...messages];
        setMessages(updatedMessages);
        localStorage.setItem(`thoms_comm_${type}`, JSON.stringify(updatedMessages));

        // Reset form
        setFormData({ title: '', content: '', target: 'all', class_name: '', section: '' });
    };

    const getTargetLabel = (msg) => {
        if (msg.target === 'all') return 'All Users';
        if (msg.target === 'staff') return 'All Staff';
        if (msg.target === 'class') {
            return `Class ${msg.class_name} ${msg.section ? `- Sec ${msg.section}` : '(All Sections)'}`;
        }
        return 'Unknown';
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${config.color}-50 text-${config.color}-600 rounded-xl`}>
                        <config.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">{config.title}</h1>
                        <p className="text-sm text-slate-500 font-medium">Compose and broadcast {type} to users.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Composer Section */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
                    <div className="p-5 border-b border-slate-100 bg-slate-50">
                        <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                            <Send className="w-4 h-4 text-slate-500" /> Compose Message
                        </h2>
                    </div>
                    <form onSubmit={handleSend} className="p-6 space-y-5">
                        
                        {type !== 'sms' && type !== 'whatsapp' && (
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject / Title</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    placeholder="Enter subject..."
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message Content</label>
                            <textarea 
                                required 
                                value={formData.content}
                                onChange={e => setFormData({...formData, content: e.target.value})}
                                rows={type === 'sms' ? 4 : 8}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                placeholder={config.placeholder}
                            ></textarea>
                            {type === 'sms' && (
                                <p className="text-xs text-slate-400 mt-1.5 text-right">{formData.content.length} / 160 characters</p>
                            )}
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                            <h3 className="text-sm font-bold text-slate-700">Select Recipients</h3>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input type="radio" name="target" checked={formData.target === 'all'} onChange={() => setFormData({...formData, target: 'all'})} className="text-indigo-600 focus:ring-indigo-500" /> All Users
                                </label>
                                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input type="radio" name="target" checked={formData.target === 'staff'} onChange={() => setFormData({...formData, target: 'staff'})} className="text-indigo-600 focus:ring-indigo-500" /> All Staff
                                </label>
                                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input type="radio" name="target" checked={formData.target === 'class'} onChange={() => setFormData({...formData, target: 'class'})} className="text-indigo-600 focus:ring-indigo-500" /> Specific Class
                                </label>
                            </div>

                            {formData.target === 'class' && (
                                <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-200">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">Class</label>
                                        <select 
                                            required
                                            value={formData.class_name} 
                                            onChange={e => setFormData({...formData, class_name: e.target.value, section: ''})} 
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="">Select Class...</option>
                                            {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">Section (Optional)</label>
                                        <select 
                                            value={formData.section} 
                                            onChange={e => setFormData({...formData, section: e.target.value})} 
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="">All Sections</option>
                                            {sections.filter(s => s.class_name === formData.class_name).map(s => (
                                                <option key={s.id} value={s.name}>{s.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end pt-2">
                            <button 
                                type="submit"
                                className={`flex items-center gap-2 bg-${config.color}-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-${config.color}-700 transition-colors shadow-sm`}
                            >
                                <Send className="w-4 h-4" /> Send Now
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sent History Section */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit flex flex-col max-h-[600px]">
                    <div className="p-5 border-b border-slate-100 bg-slate-50">
                        <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" /> Recent History
                        </h2>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto space-y-3">
                        {messages.length === 0 ? (
                            <div className="text-center p-6 text-slate-400">
                                <config.icon className="w-10 h-10 mx-auto mb-3 opacity-20" />
                                <p className="text-sm font-medium">No messages sent yet.</p>
                            </div>
                        ) : (
                            messages.map(msg => (
                                <div key={msg.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded shadow-sm border border-slate-100">
                                            {getTargetLabel(msg)}
                                        </span>
                                        <span className="text-[10px] font-semibold text-slate-400">
                                            {new Date(msg.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {msg.title && <h4 className="font-bold text-slate-800 text-sm mb-1">{msg.title}</h4>}
                                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                        {msg.content}
                                    </p>
                                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                                        <CheckCircle className="w-3.5 h-3.5" /> Delivered
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunicateManager;
