import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { usePortfolio, type PortfolioData } from '../context/PortfolioContext';
import { Mail, Check, Trash2, Reply, LogOut, Save, LayoutDashboard, Inbox } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
  read: boolean;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data, saveData, loading } = usePortfolio();
  
  const [activeTab, setActiveTab] = useState<'content' | 'inbox'>('content');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const isAdmin = localStorage.getItem('isAdmin');
    if (!token && !isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(API_ENDPOINTS.messages, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const msgs = await res.json();
        setMessages(msgs);
      }
    } catch (err) {
      console.error('Error fetching messages', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'inbox') {
      fetchMessages();
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveData(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleHeroChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const handleAboutChange = (field: 'paragraphs' | 'skills', index: number, value: string) => {
    setFormData(prev => {
      const updated = [...prev.about[field]];
      updated[index] = value;
      return {
        ...prev,
        about: { ...prev.about, [field]: updated }
      };
    });
  };

  const addAboutItem = (field: 'paragraphs' | 'skills') => {
    setFormData(prev => ({
      ...prev,
      about: { ...prev.about, [field]: [...prev.about[field], ''] }
    }));
  };

  const removeAboutItem = (field: 'paragraphs' | 'skills', index: number) => {
    setFormData(prev => ({
      ...prev,
      about: { ...prev.about, [field]: prev.about[field].filter((_, i) => i !== index) }
    }));
  };

  const handleAddRepo = () => {
    setFormData(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        githubRepos: [...prev.projects.githubRepos, '']
      }
    }));
  };

  const handleRepoChange = (index: number, value: string) => {
    setFormData(prev => {
      const updated = [...prev.projects.githubRepos];
      updated[index] = value;
      return {
        ...prev,
        projects: {
          ...prev.projects,
          githubRepos: updated
        }
      };
    });
  };

  const handleRemoveRepo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        githubRepos: prev.projects.githubRepos.filter((_, i) => i !== index)
      }
    }));
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_ENDPOINTS.messages}/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
      }
    } catch (err) {
      console.error('Error marking as read', err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_ENDPOINTS.messages}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
      }
    } catch (err) {
      console.error('Error deleting message', err);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading administrator controls...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', padding: '2rem 1rem 6rem 1rem' }}>
      {/* Top Navbar */}
      <div className="container" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ 
          padding: '1rem 1.75rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LayoutDashboard size={24} color="var(--text-main)" />
            <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>
              Portfolio Administration
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={() => navigate('/')} 
              className="btn-secondary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
            >
              View Live Website
            </button>
            <button 
              onClick={handleLogout} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#F87171',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('content')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: activeTab === 'content' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: activeTab === 'content' ? '#FFFFFF' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.2s ease'
            }}
          >
            <LayoutDashboard size={18} />
            <span>Content Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: activeTab === 'inbox' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: activeTab === 'inbox' ? '#FFFFFF' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
          >
            <Inbox size={18} />
            <span>Messages Inbox</span>
            {unreadCount > 0 && (
              <span style={{
                background: '#FFFFFF',
                color: '#0A0A0A',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.1rem 0.5rem',
                borderRadius: '9999px',
                marginLeft: '0.25rem'
              }}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab 1: Content Editor */}
      {activeTab === 'content' && (
        <div className="container">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {saveSuccess && (
              <div style={{
                padding: '1rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Check size={20} />
                <span>Changes saved successfully to backend storage!</span>
              </div>
            )}

            {/* Hero Section Card */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>Hero Section</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Greeting Text</label>
                  <input 
                    type="text" 
                    value={formData.hero.greeting} 
                    onChange={e => handleHeroChange('greeting', e.target.value)} 
                    className="form-input" 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input 
                    type="text" 
                    value={formData.hero.name} 
                    onChange={e => handleHeroChange('name', e.target.value)} 
                    className="form-input" 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Professional Title / Subheading</label>
                  <input 
                    type="text" 
                    value={formData.hero.title} 
                    onChange={e => handleHeroChange('title', e.target.value)} 
                    className="form-input" 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Resume URL</label>
                  <input 
                    type="text" 
                    value={formData.hero.resumeUrl || ''} 
                    onChange={e => handleHeroChange('resumeUrl', e.target.value)} 
                    className="form-input" 
                  />
                </div>
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <label style={labelStyle}>Hero Description</label>
                <textarea 
                  rows={3} 
                  value={formData.hero.description || ''} 
                  onChange={e => handleHeroChange('description', e.target.value)} 
                  className="form-input" 
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>

            {/* About Section Card */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>About & Skills</h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={labelStyle}>Bio Paragraphs</label>
                {formData.about.paragraphs.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <textarea 
                      rows={2} 
                      value={p} 
                      onChange={e => handleAboutChange('paragraphs', idx, e.target.value)} 
                      className="form-input"
                      style={{ resize: 'vertical' }}
                    />
                    <button 
                      type="button" 
                      onClick={() => removeAboutItem('paragraphs', idx)} 
                      style={removeBtnStyle}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addAboutItem('paragraphs')} 
                  className="btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  + Add Paragraph
                </button>
              </div>

              <div>
                <label style={labelStyle}>Skills & Technologies</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                  {formData.about.skills.map((s, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.4rem' }}>
                      <input 
                        type="text" 
                        value={s} 
                        onChange={e => handleAboutChange('skills', idx, e.target.value)} 
                        className="form-input" 
                      />
                      <button 
                        type="button" 
                        onClick={() => removeAboutItem('skills', idx)} 
                        style={removeBtnStyle}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={() => addAboutItem('skills')} 
                  className="btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  + Add Skill
                </button>
              </div>
            </div>

            {/* GitHub Repos Card */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>Featured GitHub Repositories</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Add repository names (e.g. <code>Yashwant-Rangrej/Portfolio_Backend</code>) to display on the Featured Projects grid.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {formData.projects.githubRepos.map((repo: string, idx: number) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      value={repo} 
                      onChange={e => handleRepoChange(idx, e.target.value)} 
                      placeholder="Username/RepositoryName"
                      className="form-input" 
                    />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveRepo(idx)} 
                      style={removeBtnStyle}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button 
                type="button" 
                onClick={handleAddRepo} 
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                + Add Repository
              </button>
            </div>

            {/* Floating / Sticky Save Button */}
            <div style={{ position: 'sticky', bottom: '2rem', zIndex: 50 }}>
              <button 
                type="submit" 
                className="btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', boxShadow: '0 8px 30px rgba(0,0,0,0.8)' }}
              >
                <Save size={20} />
                <span>Save All Changes to Live Website</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Messages Inbox */}
      {activeTab === 'inbox' && (
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: 0 }}>
              Incoming Inquiries ({messages.length})
            </h2>
            <button 
              onClick={fetchMessages} 
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Refresh
            </button>
          </div>

          {loadingMessages ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading inbox messages...</p>
          ) : messages.length === 0 ? (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Mail size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p style={{ margin: 0, fontSize: '1.1rem' }}>No contact messages found in database.</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-subtle)' }}>When visitors submit the contact form, their inquiries will appear here.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className="glass-panel"
                  style={{ 
                    padding: '1.75rem', 
                    borderLeft: msg.read ? '1px solid var(--card-border)' : '4px solid #FFFFFF',
                    background: msg.read ? 'var(--card-bg)' : 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>{msg.name}</span>
                        {!msg.read && (
                          <span style={{ 
                            fontSize: '0.75rem', 
                            padding: '0.15rem 0.5rem', 
                            background: '#FFFFFF', 
                            color: '#0A0A0A', 
                            borderRadius: '9999px',
                            fontWeight: 700 
                          }}>
                            NEW
                          </span>
                        )}
                      </div>
                      <a href={`mailto:${msg.email}`} style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {msg.email}
                      </a>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>
                      {new Date(msg.created_at).toLocaleString()}
                    </div>
                  </div>

                  {msg.subject && (
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                      Subject: {msg.subject}
                    </div>
                  )}

                  <div style={{ 
                    background: 'rgba(0, 0, 0, 0.4)', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    fontSize: '0.95rem', 
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                    whiteSpace: 'pre-wrap',
                    marginBottom: '1.25rem',
                    border: '1px solid var(--card-border)'
                  }}>
                    {msg.message}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <a 
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                      className="btn-secondary"
                      style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                    >
                      <Reply size={15} />
                      <span>Reply via Email</span>
                    </a>

                    {!msg.read && (
                      <button 
                        onClick={() => handleMarkAsRead(msg.id)}
                        className="btn-secondary"
                        style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', color: '#FFFFFF' }}
                      >
                        <Check size={15} />
                        <span>Mark as Read</span>
                      </button>
                    )}

                    <button 
                      onClick={() => handleDeleteMessage(msg.id)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.4rem', 
                        padding: '0.45rem 1rem', 
                        fontSize: '0.85rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        color: '#F87171',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  marginBottom: '0.4rem',
  color: 'var(--text-muted)',
  fontWeight: 600
};

const removeBtnStyle = {
  padding: '0.5rem 0.75rem',
  background: 'rgba(239, 68, 68, 0.1)',
  color: '#F87171',
  border: '1px solid rgba(239, 68, 68, 0.25)',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
