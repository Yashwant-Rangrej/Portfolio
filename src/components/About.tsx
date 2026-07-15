import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { paragraphs, skills } = data.about;

  return (
    <section id="about" className="section" style={{ minHeight: 'auto', padding: '100px 0' }}>
      <div className="container">
        <div className="flex flex-col gap-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: 1 }}
          >
            <h2 className="section-title">About Me</h2>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: 1 }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '2rem' }}>Technologies I've been working with:</h3>
            <ul style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(140px, 200px))',
              gap: '10px',
              listStyle: 'none',
              padding: 0
            }}>
              {skills.map((skill, i) => (
                <li key={i} style={{ position: 'relative', paddingLeft: '20px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
