import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// ── DEMO users (no backend needed) ──────────────────────────
const DEMO_USERS = [
    { id: 1, email: 'superadmin@erp.com',  password: 'superadmin123', role: 'super_admin', full_name: 'Super Admin',   accessToken: 'demo-token-superadmin' },
    { id: 2, email: 'admin@erp.com',        password: 'admin123',      role: 'admin',       full_name: 'Admin User',     accessToken: 'demo-token-admin' },
    { id: 3, email: 'teacher@erp.com',      password: 'teacher123',    role: 'teacher',     full_name: 'Demo Teacher',   accessToken: 'demo-token-teacher' },
    { id: 4, email: 'student@erp.com',      password: 'student123',    role: 'student',     full_name: 'Demo Student',   accessToken: 'demo-token-student' },
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            try { setUser(JSON.parse(stored)); } catch {}
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Demo login — no backend call
        const match = DEMO_USERS.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (match) {
            const { password: _, ...userData } = match; // strip password before storing
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true, user: userData };
        }
        return { success: false, error: 'Invalid email or password. Try superadmin@erp.com / superadmin123' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
