import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const SideRails: React.FC = () => {
  return (
    <>
      {/* Left Side Rail: Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="side-rail side-rail-left"
      >
        <div className="side-rail-content">
          <a
            href="https://github.com/Yashwant-Rangrej"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="side-rail-icon"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/yashwant-rangrej-0856993a8/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="side-rail-icon"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="mailto:yashwant15rangrej@gmail.com"
            aria-label="Direct Email"
            className="side-rail-icon"
          >
            <Mail size={20} />
          </a>
        </div>
        <div className="side-rail-line" />
      </motion.div>

      {/* Right Side Rail: Rotated Email */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="side-rail side-rail-right"
      >
        <div className="side-rail-content">
          <a
            href="mailto:yashwant15rangrej@gmail.com"
            className="side-rail-email"
          >
            yashwant15rangrej@gmail.com
          </a>
        </div>
        <div className="side-rail-line" />
      </motion.div>
    </>
  );
};
