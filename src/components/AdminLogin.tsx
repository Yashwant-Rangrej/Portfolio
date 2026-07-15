import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple local auth
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)' }}>
      <form onSubmit={handleLogin} style={{ padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', width: '300px' }}>
        <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>Admin Login</h2>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" 
          style={{ 
            padding: '0.75rem', 
            width: '100%', 
            marginBottom: '1rem',
            backgroundColor: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            borderRadius: '4px'
          }}
        />
        <button type="submit" style={{ 
          padding: '0.75rem 1rem', 
          background: 'var(--accent)', 
          color: 'var(--bg-color)', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          width: '100%',
          fontWeight: 600
        }}>
          Login
        </button>
      </form>
    </div>
  );
};
