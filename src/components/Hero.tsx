import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section className="section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '850px' }}
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
            fontSize: 'clamp(3rem, 7vw, 5.5rem)', 
            margin: '0 0 1rem 0', 
            background: 'var(--gradient-hero)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em'
          }}>
            {data.hero.name}
          </h1>

          <h2 style={{ 
            fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)', 
            color: 'var(--text-muted)', 
            marginBottom: '2rem',
            fontWeight: 600,
            lineHeight: 1.2
          }}>
            {data.hero.title}
          </h2>

          <p style={{ 
            maxWidth: '680px', 
            fontSize: '1.2rem', 
            marginBottom: '3rem', 
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
                href={data.hero.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary"
              >
                <FileText size={18} />
                <span>Download Resume</span>
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
