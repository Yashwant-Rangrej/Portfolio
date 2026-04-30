import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h4 style={{ color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
            Hello, I'm
          </h4>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', margin: '0 0 1rem 0', color: 'var(--text-main)' }}>
            Yashwant Rangrej.
          </h1>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            I build AI & Mobile Applications.
          </h2>
          <p style={{ maxWidth: '600px', fontSize: '1.25rem', marginBottom: '3rem' }}>
            Currently working at the <strong>Bharath Aadhya Intelligence</strong> organization on GitHub, focusing on the development of AI-driven solutions and high-impact client-based applications to solve complex, real-world problems through accessible digital experiences.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a 
              href="#projects"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--bg-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--accent)';
              }}
            >
              View My Work
            </a>
            <a 
              href="/Yashwant_Rangrej_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                border: '1px solid var(--accent)',
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-color)',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--bg-color)';
              }}
            >
              Get My Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
