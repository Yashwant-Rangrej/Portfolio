import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="section" style={{ minHeight: '80vh', textAlign: 'center', justifyContent: 'center' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <h4 style={{ color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
            What's Next?
          </h4>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            Get In Touch
          </h2>
          <p style={{ marginBottom: '3rem', fontSize: '1.1rem' }}>
            I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '4rem' }}>
            <a href="https://github.com/Yashwant-Rangrej" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={32} />
            </a>
            <a href="https://www.linkedin.com/in/yashwant-rangrej-0856993a8/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={32} />
            </a>
            <a href="mailto:yashwant15rangrej@gmail.com" aria-label="Email">
              <Mail size={32} />
            </a>
          </div>

          <a 
            href="mailto:yashwant15rangrej@gmail.com"
            style={{
              display: 'inline-block',
              padding: '1.25rem 2.5rem',
              border: '1px solid var(--accent)',
              borderRadius: '4px',
              color: 'var(--accent)',
              fontSize: '1rem',
              fontWeight: 500,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(226, 232, 240, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Say Hello
          </a>
        </motion.div>
      </div>
      
      <footer style={{ marginTop: 'auto', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>© {new Date().getFullYear()} Yashwant Rangrej</p>
      </footer>
    </section>
  );
};
