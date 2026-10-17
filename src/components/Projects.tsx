import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { motion } from 'framer-motion';
import { ExternalLink, FolderGit2, Star } from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  language?: string;
  stargazers_count?: number;
  forks_count?: number;
}

export const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.projects);
        if (res.ok) {
          const data = await res.json();
          setRepos(data);
        } else {
          console.error('Failed to fetch repos from backend');
        }
      } catch (err) {
        console.error('Network error fetching repos', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section id="projects" className="section" style={{ minHeight: 'auto', padding: '100px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p style={{ maxWidth: '600px', fontSize: '1.1rem', marginTop: '-1.5rem', marginBottom: '2.5rem' }}>
            A curated collection of open-source architectures, mobile applications, and AI integrations.
          </p>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Loading project repositories...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}>
            {repos.map((repo, i) => (
              <motion.div
                key={repo.id || i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between',
                  borderRadius: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ 
                      padding: '0.6rem', 
                      background: 'rgba(255, 255, 255, 0.05)', 
                      borderRadius: '8px', 
                      color: 'var(--text-main)',
                      border: '1px solid var(--card-border)'
                    }}>
                      <FolderGit2 size={24} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', color: 'var(--text-muted)' }}>
                      {repo.stargazers_count !== undefined && repo.stargazers_count > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                          <Star size={15} color="#A1A1AA" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.html_url && (
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          aria-label="GitHub Repository"
                          style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          <GithubIcon size={20} />
                        </a>
                      )}
                      {repo.homepage && (
                        <a 
                          href={repo.homepage} 
                          target="_blank" 
                          rel="noreferrer" 
                          aria-label="Live Demo Link"
                          style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 style={{ 
                    fontSize: '1.35rem', 
                    marginBottom: '0.85rem', 
                    color: 'var(--text-main)',
                    letterSpacing: '-0.01em'
                  }}>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ color: 'var(--text-main)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                    >
                      {repo.name.replace(/[-_]/g, ' ')}
                    </a>
                  </h3>

                  <p style={{ 
                    fontSize: '0.95rem', 
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                    marginBottom: '1.5rem'
                  }}>
                    {repo.description || 'Production-grade repository with clean architectural patterns and documentation.'}
                  </p>
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem', 
                  fontSize: '0.8rem', 
                  fontFamily: 'var(--font-mono)' 
                }}>
                  {repo.language && (
                    <span style={{ 
                      padding: '0.2rem 0.6rem', 
                      background: 'rgba(255, 255, 255, 0.05)', 
                      color: 'var(--text-main)', 
                      border: '1px solid var(--card-border)',
                      borderRadius: '4px',
                      fontWeight: 500 
                    }}>
                      {repo.language}
                    </span>
                  )}
                  {repo.topics?.slice(0, 3).map(topic => (
                    <span key={topic} style={{ 
                      padding: '0.2rem 0.6rem', 
                      background: 'rgba(255, 255, 255, 0.03)', 
                      color: 'var(--text-subtle)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '4px' 
                    }}>
                      #{topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
