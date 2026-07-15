
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NetworkBackground } from './components/NetworkBackground';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { PortfolioProvider } from './context/PortfolioContext';

function PortfolioMain() {
  return (
    <>
      <NetworkBackground />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <div className="noise-overlay" />
      <Router basename="/Portfolio">
        <Routes>
          <Route path="/" element={<PortfolioMain />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
