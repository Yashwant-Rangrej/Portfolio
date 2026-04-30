import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Mobile App Development",
  "Flutter",
  "React",
  "TypeScript",
  "Python",
  "TensorFlow",
  "PyTorch"
];

export const About: React.FC = () => {
  return (
    <section id="about" className="section" style={{ minHeight: 'auto', padding: '100px 0' }}>
      <div className="container">
        <div className="flex flex-col gap-8" style={{ md: { flexDirection: 'row' } } as any}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: 1 }}
          >
            <h2 className="section-title">About Me</h2>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              <p>
                Hello! My name is Yashwant and I enjoy creating things that live on the internet, from mobile applications to intelligent systems. My interest in software engineering started back when I was exploring how things work under the hood.
              </p>
              <p>
                Fast-forward to today, I've had the privilege of building diverse projects spanning from cross-platform mobile apps using Flutter and React Native to robust backend systems and cutting-edge AI/ML models.
              </p>
              <p>
                Currently working at the <a href="https://github.com/Bharath-Aadhya-Intelligence" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Bharath Aadhya Intelligence</a> organization on GitHub, focusing on the development of AI-driven solutions and high-impact client-based applications to solve complex, real-world problems through accessible digital experiences.
              </p>
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
