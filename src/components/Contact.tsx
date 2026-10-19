import React, { useState } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // 1. Send directly to your email address (yashwant15rangrej@gmail.com)
      const emailPromise = fetch('https://formsubmit.co/ajax/yashwant15rangrej@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || ('New Portfolio Message from ' + formData.name),
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      // 2. Also save to backend database for the Admin Dashboard
      const backendPromise = fetch(API_ENDPOINTS.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).catch(err => console.warn('Backend save skipped:', err));

      const [emailRes] = await Promise.all([emailPromise, backendPromise]);
      const emailData = await emailRes.json().catch(() => ({}));

      if (emailRes.ok || emailData.success === 'true' || emailData.success === true || emailData.message?.includes('Activation')) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(emailData.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error occurred. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ padding: '120px 0 60px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Direct Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Let's build something exceptional together.
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
              Whether you have an upcoming project, architecture questions, or a prospective role, I'm always open to discussing new engineering opportunities.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
              <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', color: 'var(--text-main)', border: '1px solid var(--card-border)' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>Email</div>
                  <a
                    href="mailto:yashwant15rangrej@gmail.com"
                    style={{ color: 'var(--text-main)', fontWeight: 500, fontSize: '0.95rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                  >
                    yashwant15rangrej@gmail.com
                  </a>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', color: 'var(--text-main)', border: '1px solid var(--card-border)' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>Location</div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 500, fontSize: '0.95rem' }}>
                    Bangalore, India • Remote Worldwide
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', marginBottom: '0.75rem', fontWeight: 500 }}>
                Connect on Social Networks:
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a
                  href="https://github.com/Yashwant-Rangrej"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.25rem' }}
                >
                  <GithubIcon size={20} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/yashwant-rangrej-0856993a8/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.25rem' }}
                >
                  <LinkedinIcon size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel"
            style={{ padding: '2.5rem' }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              Send a Direct Message
            </h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.75rem', color: 'var(--text-muted)' }}>
              Fill in your details and I'll get back to your email directly.
            </p>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'var(--text-main)',
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem'
                }}
              >
                <CheckCircle2 size={20} color="#FFFFFF" />
                <span>Thank you! Your message was received. I will reply to you soon.</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '8px',
                  color: '#F87171',
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem'
                }}
              >
                <AlertCircle size={20} />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Yashwant Rangrej"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="yashwant@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Project collaboration, hiring, or inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project, timeline, or idea..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{ resize: 'vertical', minHeight: '110px' }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <footer style={{ marginTop: '5rem', textAlign: 'center', color: 'var(--text-subtle)', fontSize: '0.9rem' }}>
        <p>© {new Date().getFullYear()} Yashwant Rangrej</p>
      </footer>
    </section>
  );
};
