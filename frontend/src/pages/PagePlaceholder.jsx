import React from 'react';

const PagePlaceholder = ({ title }) => (
    <div className="theme-bg-surface theme-text-main" style={{ borderRadius: 20, border: '1px solid var(--sidebar-border)', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, margin: 0 }}>{title}</h2>
        <p className="theme-text-muted" style={{ textAlign: 'center', maxWidth: 450, fontSize: 14, fontWeight: 500, margin: 0 }}>
            This module is currently under development. Data grids and forms for {title.toLowerCase()} will appear here soon.
        </p>
    </div>
);

export default PagePlaceholder;
