import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Menu, X, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Moon, Sun, Code2, Database, Globe, Cpu, Award, Briefcase, GraduationCap, User, FolderOpen, Calendar, MapPin as LocationIcon } from 'lucide-react';

// Import components
import LoadingScreen from './components/LoadingScreen';
import MouseTrail from './components/MouseTrail';
import Navigation from './components/Navigation';
import AnimatedBackground from './components/AnimatedBackground';
import Section from './components/Section';

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import CertificationsPage from './pages/CertificationsPage';
import ContactPage from './pages/ContactPage';

// Import data
import { themes, sectionBackgrounds, navItems, experiences, certifications, projects, skills } from './data/portfolioData';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Mouse tracking for tail effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Advanced mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update trail
      const newTrail = [...trail, { x: e.clientX, y: e.clientY, id: Date.now() }];
      if (newTrail.length > 10) newTrail.shift();
      setTrail(newTrail);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, trail]);

  const theme = isDarkMode ? themes.dark : themes.light;

  // Page renderer with enhanced transitions
  const renderPage = () => {
    const pages = {
      home: HomePage,
      about: AboutPage,
      experience: ExperiencePage,
      projects: ProjectsPage,
      skills: SkillsPage,
      certifications: CertificationsPage,
      contact: ContactPage
    };
    
    const PageComponent = pages[currentPage] || HomePage;
    return <PageComponent 
      theme={theme} 
      isDarkMode={isDarkMode} 
      setCurrentPage={setCurrentPage}
      setIsHovering={setIsHovering}
    />;
  };

  const portfolioProps = {
    theme,
    isDarkMode,
    setIsDarkMode,
    currentPage,
    setCurrentPage,
    isMenuOpen,
    setIsMenuOpen,
    isHovering,
    setIsHovering,
    mouseXSpring,
    mouseYSpring,
    trail,
    navItems,
    scrollYProgress,
    setCurrentSection
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ cursor: 'none' }}>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <MouseTrail {...portfolioProps} />
      <Navigation {...portfolioProps} />

      <main className="pt-20" ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Enhanced floating particles effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${isDarkMode ? 'bg-cyan-400/20' : 'bg-blue-400/20'} rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs for ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className={`absolute w-96 h-96 rounded-full blur-3xl ${isDarkMode ? 'bg-cyan-400/10' : 'bg-blue-400/10'}`}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className={`absolute w-96 h-96 rounded-full blur-3xl ${isDarkMode ? 'bg-purple-400/10' : 'bg-purple-400/10'}`}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>
    </div>
  );
};

export default App;