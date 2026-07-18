import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff, ShieldAlert, GraduationCap, Users, Banknote } from 'lucide-react';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await login(email, password);
            if (res.success) {
                if (res.user?.role === 'student') navigate('/student-dashboard');
                else navigate('/dashboard');
            } else {
                setError(res.error || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const features = [
        { icon: GraduationCap, label: 'Student Management', desc: 'Admissions, attendance & results' },
        { icon: Users, label: 'HR & Staff', desc: 'Payroll, leaves & directories' },
        { icon: Banknote, label: 'Fee Collection', desc: 'Online & offline payments' },
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Inter', sans-serif" }}>

            {/* Left Panel */}
            <div style={{
                flex: 1, background: 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 64px',
                position: 'relative', overflow: 'hidden'
            }} className="hidden lg:flex">
                {/* Decorative circles */}
                <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(99,102,241,0.08)' }} />
                <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(139,92,246,0.06)' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 25px rgba(99,102,241,0.4)' }}>
                            <ShieldAlert className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div style={{ color: '#f8fafc', fontWeight: 900, fontSize: 20, letterSpacing: '-0.3px' }}>Thoms ERP</div>
                            <div style={{ color: '#6366f1', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>School Management</div>
                        </div>
                    </div>

                    <h1 style={{ fontSize: 40, fontWeight: 900, color: '#f8fafc', lineHeight: 1.15, letterSpacing: '-1px', margin: 0 }}>
                        Manage Your<br />
                        <span style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            School Smarter
                        </span>
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: 15, fontWeight: 500, marginTop: 16, lineHeight: 1.7, maxWidth: 360 }}>
                        A complete ERP solution for modern schools — from admissions to alumni.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 48 }}>
                        {features.map(({ icon: Icon, label, desc }) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)' }}>
                                <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon className="w-5 h-5" style={{ color: '#818cf8' }} />
                                </div>
                                <div>
                                    <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13.5 }}>{label}</div>
                                    <div style={{ color: '#64748b', fontSize: 12, fontWeight: 500, marginTop: 1 }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div style={{ width: '100%', maxWidth: 520, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 56px' }}>

                {/* Mobile logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }} className="flex lg:hidden">
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldAlert className="w-4 h-4 text-white" />
                    </div>
                    <span style={{ fontWeight: 900, fontSize: 17, color: '#0f172a' }}>Thoms ERP</span>
                </div>

                <div style={{ marginBottom: 36 }}>
                    <h2 style={{ fontSize: 30, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px', margin: 0 }}>Sign in</h2>
                    <p style={{ color: '#64748b', fontSize: 14.5, fontWeight: 500, marginTop: 8 }}>Access your ERP dashboard</p>
                </div>

                {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                        <AlertCircle className="w-4 h-4" style={{ color: '#ef4444', flexShrink: 0 }} />
                        <span style={{ color: '#dc2626', fontSize: 13.5, fontWeight: 600 }}>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: 13.5, fontWeight: 700, color: '#334155', marginBottom: 8 }}>Email or User ID</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', width: 16, height: 16 }} />
                            <input
                                id="email" type="text" required value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="user@school.com or User ID"
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

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <label style={{ fontSize: 13.5, fontWeight: 700, color: '#334155' }}>Password</label>
                            <Link to="/forgot-password" style={{ fontSize: 13, fontWeight: 600, color: '#6366f1', textDecoration: 'none' }}>Forgot password?</Link>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', width: 16, height: 16 }} />
                            <input
                                id="password" type={showPass ? 'text' : 'password'} required value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%', paddingLeft: 44, paddingRight: 46, paddingTop: 12, paddingBottom: 12,
                                    border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, fontWeight: 500,
                                    color: '#0f172a', outline: 'none', background: '#f8fafc', fontFamily: 'inherit',
                                    boxSizing: 'border-box', transition: 'all 0.15s'
                                }}
                                onFocus={e => { e.target.style.border = '1.5px solid #6366f1'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                                onBlur={e => { e.target.style.border = '1.5px solid #e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)}
                                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
                                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        style={{
                            width: '100%', padding: '13px', borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                            background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            color: '#fff', fontSize: 14.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            boxShadow: '0 4px 15px rgba(99,102,241,0.4)', transition: 'all 0.2s', fontFamily: 'inherit', marginTop: 4
                        }}
                        onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow = '0 8px 25px rgba(99,102,241,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 15px rgba(99,102,241,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        {loading ? (
                            <>
                                <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                                Signing in...
                            </>
                        ) : (
                            <>Sign In <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                <p style={{ color: '#94a3b8', fontSize: 12.5, textAlign: 'center', marginTop: 32, fontWeight: 500 }}>
                    © 2025 Thoms School ERP · Secure Login
                </p>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default Login;
