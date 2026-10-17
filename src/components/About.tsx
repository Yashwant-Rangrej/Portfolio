import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Code2 } from 'lucide-react';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { paragraphs, skills } = data.about;

  return (
    <section id="about" className="section" style={{ minHeight: 'auto', padding: '100px 0' }}>
      <div className="container">
        <div className="flex flex-col gap-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">About Me</h2>
            <div style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '800px' }}>
              {paragraphs.map((p, i) => (
                <p key={i} style={{ marginBottom: '1.25rem', lineHeight: 1.8 }}>{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel"
            style={{ padding: '2.5rem', maxWidth: '850px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <Code2 size={24} color="var(--accent)" />
              <h3 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--text-main)' }}>
                Core Technologies & Tools
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '12px',
            }}>
              {skills.map((skill, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '8px',
                    fontSize: '0.95rem', 
                    color: 'var(--text-main)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>•</span>
                  <span style={{ fontWeight: 500 }}>{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
