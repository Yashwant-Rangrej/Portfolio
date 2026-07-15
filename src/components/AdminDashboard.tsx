import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio, type PortfolioData } from '../context/PortfolioContext';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data, saveData, loading } = usePortfolio();
  
  const [formData, setFormData] = useState<PortfolioData>(data);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    if (!loading) {
      setFormData(data);
    }
  }, [data, loading]);

  const handleChange = (section: keyof PortfolioData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: keyof PortfolioData, field: string, index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...(prev[section] as any)[field]];
      newArray[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const addArrayItem = (section: keyof PortfolioData, field: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section] as any)[field], ""]
      }
    }));
  };

  const removeArrayItem = (section: keyof PortfolioData, field: string, index: number) => {
    setFormData(prev => {
      const newArray = [...(prev[section] as any)[field]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const handleSave = () => {
    saveData(formData);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-main)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)' }}>Portfolio Admin Panel</h1>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* HERO SECTION */}
        <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Hero Section</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>
              Greeting:
              <input value={formData.hero.greeting} onChange={(e) => handleChange('hero', 'greeting', e.target.value)} style={inputStyle} />
            </label>
            <label>
              Name:
              <input value={formData.hero.name} onChange={(e) => handleChange('hero', 'name', e.target.value)} style={inputStyle} />
            </label>
            <label>
              Title:
              <input value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} style={inputStyle} />
            </label>
            <label>
              Description:
              <textarea value={formData.hero.description} onChange={(e) => handleChange('hero', 'description', e.target.value)} style={{...inputStyle, minHeight: '100px'}} />
            </label>
            <label>
              Resume URL:
              <input value={formData.hero.resumeUrl} onChange={(e) => handleChange('hero', 'resumeUrl', e.target.value)} style={inputStyle} />
            </label>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>About Section</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Paragraphs</h3>
            {formData.about.paragraphs.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <textarea value={p} onChange={(e) => handleArrayChange('about', 'paragraphs', i, e.target.value)} style={{...inputStyle, flex: 1, minHeight: '60px'}} />
                <button onClick={() => removeArrayItem('about', 'paragraphs', i)} style={removeBtnStyle}>X</button>
              </div>
            ))}
            <button onClick={() => addArrayItem('about', 'paragraphs')} style={addBtnStyle}>+ Add Paragraph</button>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Skills</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {formData.about.skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input value={skill} onChange={(e) => handleArrayChange('about', 'skills', i, e.target.value)} style={{...inputStyle, flex: 1}} />
                  <button onClick={() => removeArrayItem('about', 'skills', i)} style={removeBtnStyle}>X</button>
                </div>
              ))}
            </div>
            <button onClick={() => addArrayItem('about', 'skills')} style={{...addBtnStyle, marginTop: '0.5rem'}}>+ Add Skill</button>
          </div>
        </div>

        {/* PROJECTS SECTION */}
        <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Projects Section</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>List the GitHub repository paths you want to feature (e.g. username/repo-name).</p>
          {formData.projects.githubRepos.map((repo, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input value={repo} onChange={(e) => handleArrayChange('projects', 'githubRepos', i, e.target.value)} style={{...inputStyle, flex: 1}} />
              <button onClick={() => removeArrayItem('projects', 'githubRepos', i)} style={removeBtnStyle}>X</button>
            </div>
          ))}
          <button onClick={() => addArrayItem('projects', 'githubRepos')} style={addBtnStyle}>+ Add Repository</button>
        </div>

      </div>

      <div style={{ position: 'sticky', bottom: '2rem', marginTop: '2rem', textAlign: 'right' }}>
        <button onClick={handleSave} style={{ padding: '1rem 2rem', background: 'var(--accent)', color: 'var(--bg-color)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
          Save All Changes
        </button>
      </div>

    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  backgroundColor: 'var(--bg-color)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-main)',
  borderRadius: '4px',
  marginTop: '0.25rem'
};

const addBtnStyle = {
  padding: '0.5rem 1rem',
  background: 'transparent',
  color: 'var(--accent)',
  border: '1px dashed var(--accent)',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

const removeBtnStyle = {
  padding: '0.5rem',
  background: 'transparent',
  color: '#ff4444',
  border: '1px solid var(--border-color)',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
