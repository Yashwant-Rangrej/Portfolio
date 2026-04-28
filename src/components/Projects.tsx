import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
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
  topics: string[];
  language: string;
}

export const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repoPaths = [
          'Yashwant-Rangrej/RAG-Based-Question-Answering-System',
          'Yashwant-Rangrej/GTTC_MAGADI_MAIN_WEBSITE',
          'Bharath-Aadhya-Intelligence/Exam-Aura-Backend',
          'Bharath-Aadhya-Intelligence/GTTC_Magadi_Website'
        ];

        const fetchedRepos = await Promise.all(
          repoPaths.map(async (path) => {
            try {
              const res = await fetch(`https://api.github.com/repos/${path}`);
              if (res.ok) return await res.json();
              return null;
            } catch (e) {
              console.error(`Failed to fetch ${path}`, e);
              return null;
            }
          })
        );

        const validRepos = fetchedRepos.filter((repo): repo is Repo => repo !== null);
        
        // Fill up to 6 with latest repos from Yashwant-Rangrej
        try {
          const res = await fetch('https://api.github.com/users/Yashwant-Rangrej/repos?sort=updated&per_page=10');
          if (res.ok) {
            const data = await res.json();
            const additional = data.filter((repo: any) => 
              !repoPaths.includes(repo.full_name) && 
              repo.name !== 'Yashwant-Rangrej' &&
              !validRepos.some(v => v.id === repo.id)
            );
            validRepos.push(...additional.slice(0, 6 - validRepos.length));
          }
        } catch (e) {
          console.error('Failed to fetch additional repos', e);
        }

        setRepos(validRepos);
      } catch (err) {
        console.error('Failed to fetch repos', err);
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
          <h2 className="section-title">Some Things I've Built</h2>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading projects...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {repos.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '2rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.2s ease',
                  minWidth: 0,
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                  <Folder size={40} color="var(--accent)" />
                  <div className="flex gap-4">
                    {repo.html_url && (
                      <a href={repo.html_url} target="_blank" rel="noreferrer" aria-label="GitHub Link">
                        <GithubIcon size={20} />
                      </a>
                    )}
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noreferrer" aria-label="External Link">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 style={{ 
                  fontSize: '1.25rem', 
                  marginBottom: '1rem', 
                  color: 'var(--text-main)',
                  overflowWrap: 'anywhere',
                  wordBreak: 'break-word'
                }}>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                </h3>

                <p style={{ fontSize: '0.9rem', flexGrow: 1 }}>
                  {repo.description || 'No description provided.'}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
                  {repo.language && <span>{repo.language}</span>}
                  {repo.topics?.slice(0, 3).map(topic => (
                    <span key={topic}>{topic}</span>
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
