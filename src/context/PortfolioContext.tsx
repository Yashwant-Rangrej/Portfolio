import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PortfolioData {
  hero: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    resumeUrl: string;
  };
  about: {
    paragraphs: string[];
    skills: string[];
  };
  projects: {
    githubRepos: string[];
  };
}

const defaultData: PortfolioData = {
  hero: {
    greeting: "Hello, I'm",
    name: "Yashwant Rangrej.",
    title: "I build AI & Mobile Applications.",
    description: "Currently working as an AI/ML Intern at Abhyudyaya Techno Solutions, focusing on the development of AI-driven solutions and high-impact client-based applications to solve complex, real-world problems through accessible digital experiences.",
    resumeUrl: "/Yashwant_Rangrej_Resume.pdf"
  },
  about: {
    paragraphs: [
      "Hello! My name is Yashwant and I enjoy creating things that live on the internet, from mobile applications to intelligent systems. My interest in software engineering started back when I was exploring how things work under the hood.",
      "Fast-forward to today, I've had the privilege of building diverse projects spanning from cross-platform mobile apps using Flutter and React Native to robust backend systems and cutting-edge AI/ML models.",
      "Currently working as an AI/ML Intern at Abhyudyaya Techno Solutions, focusing on the development of AI-driven solutions and high-impact client-based applications to solve complex, real-world problems through accessible digital experiences.",
      "Additionally, I am working at the Bharath Aadhya Intelligence organization on GitHub, contributing to AI-driven solutions and impactful applications."
    ],
    skills: [
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
    ]
  },
  projects: {
    githubRepos: [
      "Yashwant-Rangrej/RAG-Based-Question-Answering-System",
      "Yashwant-Rangrej/GTTC_MAGADI_MAIN_WEBSITE",
      "Yashwant-Rangrej/Exam_Aura",
      "Bharath-Aadhya-Intelligence/School_Management_Frontend"
    ]
  }
};

interface PortfolioContextType {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  saveData: (newData: PortfolioData) => Promise<void>;
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/portfolio-data');
        if (res.ok) {
          const dbData = await res.json();
          // Merge to ensure we always have all fields even if db is partially empty
          setData({ ...defaultData, ...dbData });
        } else {
          console.warn("Backend not found or data missing. Using defaults.");
        }
      } catch (err) {
        console.error("Failed to connect to backend. Using defaults.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const saveData = async (newData: PortfolioData) => {
    try {
      const res = await fetch('http://localhost:3001/api/portfolio-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        setData(newData);
        alert('Saved successfully!');
      } else {
        alert('Error saving data');
      }
    } catch (err) {
      console.error(err);
      alert('Network error saving data');
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, setData, saveData, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within PortfolioProvider");
  return context;
};
