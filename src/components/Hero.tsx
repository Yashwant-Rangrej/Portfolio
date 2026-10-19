import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();

  // Resolve correct public path with Vite base URL (/Portfolio/)
  const getResumeUrl = () => {
    const base = import.meta.env.BASE_URL || '/';
    const rawUrl = data.hero.resumeUrl || 'Yashwant_Rangrej_Resume.pdf';
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
      return rawUrl;
    }
    const cleanUrl = rawUrl.startsWith('/') ? rawUrl.slice(1) : rawUrl;
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    return `${cleanBase}${cleanUrl}`;
  };

  const techBadges = [
    'Python',
    'FastAPI',
    'PyTorch',
    'FAISS',
    'LLMs / RAG',
    'Flutter',
    'React',
    'Docker'
  ];

  return (
    <section className="section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div className="container">
        <div className="hero-layout">

          {/* Left Column: Core Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            {data.hero.greeting && (
              <h4 style={{
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}>
                {data.hero.greeting}
              </h4>
            )}

            <h1 style={{
              fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)',
              margin: '0 0 1rem 0',
              background: 'var(--gradient-hero)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em',
              lineHeight: 1.1
            }}>
              {data.hero.name}
            </h1>

            <h2 style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              color: 'var(--text-muted)',
              marginBottom: '1.75rem',
              fontWeight: 600,
              lineHeight: 1.2
            }}>
              {data.hero.title}
            </h2>

            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2.5rem',
              lineHeight: 1.7,
              color: 'var(--text-muted)'
            }}>
              {data.hero.description || "Passionate about crafting intelligent agents, cross-platform mobile apps, and robust high-performance backend microservices."}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <a href="#projects" className="btn-primary">
                <span>View Featured Work</span>
                <ArrowRight size={18} />
              </a>

              {data.hero.resumeUrl && (
                <a
                  href={getResumeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <FileText size={18} />
                  <span>View Resume</span>
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: Glassmorphic Code Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-terminal-wrapper"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{
                background: 'rgba(15, 15, 20, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}
            >
              {/* Terminal Window Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.85rem 1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'rgba(255, 95, 86, 0.75)' }} />
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'rgba(255, 189, 46, 0.75)' }} />
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'rgba(39, 201, 63, 0.75)' }} />
                </div>
              </div>

              {/* Terminal Code Body */}
              <div style={{
                padding: '1.35rem 1.45rem',
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                fontSize: '0.84rem',
                lineHeight: 1.65,
                color: '#E4E4E7',
                overflowX: 'auto'
              }}>
                <div style={{ color: '#71717A', marginBottom: '0.5rem' }}># Core Engineering Matrix</div>
                <div>
                  <span style={{ color: '#60A5FA' }}>engineer</span>{' = {'}
                </div>
                <div style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#A1A1AA' }}>"name"</span>: <span style={{ color: '#34D399' }}>"Yashwant Rangrej"</span>,
                </div>
                <div style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#A1A1AA' }}>"role"</span>: <span style={{ color: '#34D399' }}>"AI/ML & Mobile Developer"</span>,
                </div>
                <div style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#A1A1AA' }}>"organization"</span>: <span style={{ color: '#FBBF24' }}>"Abhyudyaya Techno Solutions"</span>,
                </div>
                <div style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#A1A1AA' }}>"focus"</span>: [
                  <div style={{ paddingLeft: '1.25rem', color: '#93C5FD' }}>"RAG & Vector Search (FAISS)",</div>
                  <div style={{ paddingLeft: '1.25rem', color: '#93C5FD' }}>"Offline-First Mobile Apps",</div>
                  <div style={{ paddingLeft: '1.25rem', color: '#93C5FD' }}>"Scalable FastAPI Backends"</div>
                  <span>],</span>
                </div>
                <div style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#A1A1AA' }}>"status"</span>: <span style={{ color: '#34D399' }}>"Building high-impact software"</span>
                </div>
                <div>{'}'}</div>
              </div>

              {/* Terminal Footer with Quick Tech Chips */}
              <div style={{
                padding: '0.9rem 1.45rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginRight: '0.35rem' }}>
                  <Sparkles size={13} style={{ color: '#FBBF24' }} />
                  <span>Stack:</span>
                </div>
                {techBadges.filter(Boolean).map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-main)',
                      fontFamily: 'Consolas, Monaco, monospace'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
