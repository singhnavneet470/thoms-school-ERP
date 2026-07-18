import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, AlertCircle, ArrowLeft, ShieldAlert } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError(''); setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) setMessage(data.message || 'Reset link sent to your email.');
            else setError(data.error || 'Something went wrong.');
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg, #f1f5f9, #e2e8f0)', padding: 24, fontFamily: "'Inter', sans-serif" }}>
            <div style={{ width: '100%', maxWidth: 440, background: '#fff', borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '36px 40px', textAlign: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <ShieldAlert className="w-7 h-7 text-white" />
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.3px' }}>Reset Password</h2>
                    <p style={{ color: '#a5b4fc', fontSize: 13.5, fontWeight: 500, marginTop: 8 }}>Enter your email to receive a reset link.</p>
                </div>

                {/* Body */}
                <div style={{ padding: '36px 40px' }}>
                    {message && (
                        <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
                            <CheckCircle2 className="w-4 h-4" style={{ color: '#10b981', flexShrink: 0 }} />
                            <span style={{ color: '#065f46', fontSize: 13.5, fontWeight: 600 }}>{message}</span>
                        </div>
                    )}
                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
                            <AlertCircle className="w-4 h-4" style={{ color: '#ef4444', flexShrink: 0 }} />
                            <span style={{ color: '#dc2626', fontSize: 13.5, fontWeight: 600 }}>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: 13.5, fontWeight: 700, color: '#334155', marginBottom: 8 }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', width: 16, height: 16 }} />
                                <input
                                    id="email" type="email" required value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@domain.com"
                                    style={{
                                        width: '100%', paddingLeft: 44, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
                                        border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, fontWeight: 500,
                                        color: '#0f172a', outline: 'none', background: '#f8fafc', fontFamily: 'inherit',
                                        boxSizing: 'border-box', transition: 'all 0.15s'
                                    }}
                                    onFocus={e => { e.target.style.border = '1.5px solid #6366f1'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                                    onBlur={e => { e.target.style.border = '1.5px solid #e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            style={{
                                width: '100%', padding: '13px', borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                                background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                color: '#fff', fontSize: 14.5, fontWeight: 800, boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
                                transition: 'all 0.2s', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                            }}
                        >
                            {loading ? (
                                <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Sending...</>
                            ) : 'Send Reset Link'}
                        </button>

                        <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#64748b', fontSize: 13.5, fontWeight: 600, textDecoration: 'none' }}>
                            <ArrowLeft className="w-4 h-4" /> Back to login
                        </Link>
                    </form>
                </div>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default ForgotPassword;
