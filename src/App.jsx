import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, LayoutGroup } from 'framer-motion';
import { ChevronDown, Menu, X, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Moon, Sun, Code2, Database, Globe, Cpu, Award, Briefcase, GraduationCap, User, FolderOpen, Calendar, MapPin as LocationIcon } from 'lucide-react';

// Import components
import SmartLoader from './components/SmartLoader';
import MouseTrail from './components/MouseTrail';
import Navigation from './components/Navigation';
import Section from './components/Section';
import PerformanceMonitor from './components/PerformanceMonitor';

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

// Route mapping
const routeMap = {
  '/': 'home',
  '/about': 'about',
  '/experience': 'experience',
  '/projects': 'projects',
  '/skills': 'skills',
  '/certifications': 'certifications',
  '/contact': 'contact'
};

const pageMap = {
  'home': '/',
  'about': '/about',
  'experience': '/experience',
  'projects': '/projects',
  'skills': '/skills',
  'certifications': '/certifications',
  'contact': '/contact'
};

// Main App Content Component
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [showPerfMonitor, setShowPerfMonitor] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Get current page from URL
  const currentPage = routeMap[location.pathname] || 'home';

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 800, restDelta: 0.001 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Memoized theme
  const theme = useMemo(() => isDarkMode ? themes.dark : themes.light, [isDarkMode]);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Critical resource preloading based on current route
  useEffect(() => {
    const preloadForRoute = async () => {
      const bgData = sectionBackgrounds[currentPage];
      if (!bgData) {
        setImagesPreloaded(true);
        return;
      }

      const imagesToPreload = [bgData.dark, bgData.light].filter(Boolean);
      
      const imagePromises = imagesToPreload.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails
          img.src = src;
          img.loading = 'eager';
          img.fetchPriority = 'high';
        });
      });

      try {
        await Promise.all(imagePromises);
      } catch (error) {
        console.warn('Image preloading failed:', error);
      } finally {
        setImagesPreloaded(true);
      }
    };

    preloadForRoute();
  }, [currentPage]);

  // Performance monitor toggle
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        setShowPerfMonitor(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Even faster with routing
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking
  useEffect(() => {
    let frameId;
    let lastUpdate = 0;
    
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastUpdate < 16) return;
      
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        
        setTrail(prevTrail => {
          const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY, id: now }];
          return newTrail.slice(-4);
        });
        
        lastUpdate = now;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [mouseX, mouseY]);

  // Navigation handler using React Router
  const handlePageChange = (newPage) => {
    if (newPage === currentPage) return;
    
    setIsMenuOpen(false);
    const route = pageMap[newPage] || '/';
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get current background data
  const currentBgData = useMemo(() => {
    const bgData = sectionBackgrounds[currentPage];
    if (!bgData) return null;
    
    return {
      image: isDarkMode ? bgData.dark : bgData.light,
      overlay: isDarkMode ? bgData.overlay.dark : bgData.overlay.light,
      gradient: bgData.gradient
    };
  }, [currentPage, isDarkMode]);

  const portfolioProps = {
    theme,
    isDarkMode,
    setIsDarkMode,
    currentPage,
    setCurrentPage: handlePageChange,
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

  // Page transition variants
  const pageVariants = {
    initial: { 
      opacity: 0,
      x: 20
    },
    animate: { 
      opacity: 1,
      x: 0
    },
    exit: { 
      opacity: 0,
      x: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: [0.22, 1, 0.36, 1],
    duration: 0.3
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ cursor: 'none' }}>
      {/* Loading screen only on initial app load */}
      <AnimatePresence>
        {isLoading && (
          <SmartLoader 
            key="loading"
            onComplete={() => setIsLoading(false)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <LayoutGroup>
          {/* Performance Monitor */}
          <PerformanceMonitor 
            isDarkMode={isDarkMode} 
            show={showPerfMonitor} 
          />
          
          <MouseTrail {...portfolioProps} />
          <Navigation {...portfolioProps} />

          {/* Optimized background with route-based loading */}
          <div className="fixed inset-0 z-0" style={{ willChange: 'auto' }}>
            <div 
              className="absolute inset-0"
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #111827 70%, #000000 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #e2e8f0 70%, #cbd5e1 100%)',
                minHeight: '100vh',
                minWidth: '100vw'
              }}
            />
            
            {/* Route-specific background image */}
            {currentBgData && imagesPreloaded && (
              <motion.div
                key={`bg-${location.pathname}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${currentBgData.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '100vh',
                  minWidth: '100vw'
                }}
              />
            )}
            
            {/* Overlay */}
            {currentBgData && (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${currentBgData.overlay}, ${currentBgData.overlay}), ${currentBgData.gradient}`,
                  minHeight: '100vh',
                  minWidth: '100vw'
                }}
              />
            )}
          </div>

          {/* Main content with route-based rendering */}
          <main 
            className="pt-20 relative z-10" 
            ref={containerRef}
            style={{ 
              minHeight: '100vh',
              contain: 'layout style paint'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="relative z-20"
              >
                <Routes>
                  <Route path="/" element={
                    <HomePage 
                      theme={theme} 
                      isDarkMode={isDarkMode} 
                      setCurrentPage={handlePageChange}
                      setIsHovering={setIsHovering}
                      navItems={navItems}
                      setCurrentSection={setCurrentSection}
                    />
                  } />
                  <Route path="/about" element={
                    <AboutPage 
                      theme={theme} 
                      isDarkMode={isDarkMode} 
                      setCurrentPage={handlePageChange}
                      setIsHovering={setIsHovering}
                      navItems={navItems}
                      setCurrentSection={setCurrentSection}
                    />
                  } />
                  <Route path="/experience" element={
                    <ExperiencePage 
                      theme={theme} 
                      isDarkMode={isDarkMode} 
                      setCurrentPage={handlePageChange}
                      setIsHovering={setIsHovering}
                      navItems={navItems}
                      setCurrentSection={setCurrentSection}
                    />
                  } />
                  <Route path="/projects" element={
                    <ProjectsPage 
                      theme={theme} 
                      isDarkMode={isDarkMode} 
                      setCurrentPage={handlePageChange}
                      setIsHovering={setIsHovering}
                      navItems={navItems}
                      setCurrentSection={setCurrentSection}
                    />
                  } />
                  <Route path="/skills" element={
                    <SkillsPage 
                      theme={theme} 
                      isDarkMode={isDarkMode} 
                      setCurrentPage={handlePageChange}
                      setIsHovering={setIsHovering}
                      navItems={navItems}
                      setCurrentSection={setCurrentSection}
                    />
                  } />
                  <Route path="/certifications" element={
                    <CertificationsPage 
                      theme={theme} 
                      isDarkMode={isDarkMode} 
                      setCurrentPage={handlePageChange}
                      setIsHovering={setIsHovering}
                      navItems={navItems}
                      setCurrentSection={setCurrentSection}
                    />
                  } />
                  <Route path="/contact" element={
                    <ContactPage 
                      theme={theme} 
                      isDarkMode={isDarkMode} 
                      setCurrentPage={handlePageChange}
                      setIsHovering={setIsHovering}
                      navItems={navItems}
                      setCurrentSection={setCurrentSection}
                    />
                  } />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Minimal ambient effects */}
          {imagesPreloaded && (
            <div className="fixed inset-0 pointer-events-none z-5">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className={`absolute w-1 h-1 ${isDarkMode ? 'bg-cyan-400/6' : 'bg-blue-400/6'} rounded-full`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </LayoutGroup>
      )}
    </div>
  );
};

// Main App Component with Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;