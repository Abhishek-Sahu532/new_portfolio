import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, LayoutGroup } from 'framer-motion';
import { ChevronDown, Menu, X, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Moon, Sun, Code2, Database, Globe, Cpu, Award, Briefcase, GraduationCap, User, FolderOpen, Calendar, MapPin as LocationIcon } from 'lucide-react';

// Import components directly (no lazy loading to avoid loading states)
import LoadingScreen from './components/LoadingScreen';
import MouseTrail from './components/MouseTrail';
import Navigation from './components/Navigation';
import Section from './components/Section';

// Import pages directly
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
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Mouse tracking with scroll compensation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 800 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Track scroll position for mouse trail correction
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized theme to prevent unnecessary re-renders
  const theme = useMemo(() => isDarkMode ? themes.dark : themes.light, [isDarkMode]);

  // Optimized background data
  const currentBgData = useMemo(() => {
    const bgData = sectionBackgrounds[currentPage];
    if (!bgData) return null;
    
    return {
      image: isDarkMode ? bgData.dark : bgData.light,
      overlay: isDarkMode ? bgData.overlay.dark : bgData.overlay.light,
      gradient: bgData.gradient
    };
  }, [currentPage, isDarkMode]);

  // Silent background image preloading
  useEffect(() => {
    const preloadImages = () => {
      // Preload all images silently in background
      Object.entries(sectionBackgrounds).forEach(([pageId, bgData]) => {
        const darkImg = new Image();
        const lightImg = new Image();
        darkImg.src = bgData.dark;
        lightImg.src = bgData.light;
        // Set loading priority for current and next likely pages
        if (pageId === currentPage || pageId === 'home' || pageId === 'about') {
          darkImg.loading = 'eager';
          lightImg.loading = 'eager';
        } else {
          darkImg.loading = 'lazy';
          lightImg.loading = 'lazy';
        }
      });
    };
    
    preloadImages();
  }, [currentPage]);

  // Initialize Lenis
  useEffect(() => {
    let lenis;
    
    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        
        lenis = new Lenis({
          duration: 0.8,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 0.8,
          smoothTouch: false,
          touchMultiplier: 1.5,
          infinite: false,
        });

        const raf = (time) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
        
      } catch (error) {
        console.log('Lenis not available, using native scroll');
      }
    };

    initLenis();
    return () => lenis?.destroy();
  }, []);

  // Only show loading screen on initial app load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fixed mouse tracking with scroll compensation
  useEffect(() => {
    let frameId;
    
    const handleMouseMove = (e) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        // Set mouse position relative to viewport (fixed positioning)
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        
        // Update trail with current scroll position compensation
        setTrail(prevTrail => {
          const newTrail = [...prevTrail, { 
            x: e.clientX, 
            y: e.clientY, // Use clientY (viewport relative) not pageY
            id: Date.now() 
          }];
          return newTrail.slice(-6);
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [mouseX, mouseY]);

  // Instant page transitions - no loading states
  const handlePageChange = (newPage) => {
    if (newPage === currentPage) return;
    
    setIsMenuOpen(false);
    
    // Instant page change - no delays or loading
    setCurrentPage(newPage);
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page components mapping
  const pageComponents = useMemo(() => ({
    home: HomePage,
    about: AboutPage,
    experience: ExperiencePage,
    projects: ProjectsPage,
    skills: SkillsPage,
    certifications: CertificationsPage,
    contact: ContactPage
  }), []);

  // Instant page renderer - no loading fallbacks
  const renderPage = (pageKey) => {
    const PageComponent = pageComponents[pageKey] || HomePage;
    
    return (
      <PageComponent 
        theme={theme} 
        isDarkMode={isDarkMode} 
        setCurrentPage={handlePageChange}
        setIsHovering={setIsHovering}
        navItems={navItems}
        setCurrentSection={setCurrentSection}
      />
    );
  };

  // Ultra-fast transition variants
  const pageVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: { 
      opacity: 1,
      y: 0
    },
    exit: { 
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: [0.22, 1, 0.36, 1],
    duration: 0.3
  };

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
    setCurrentSection,
    scrollY // Pass scroll position for mouse trail correction
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ cursor: 'none' }}>
      {/* Only show loading screen on initial app load */}
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <LayoutGroup>
          <MouseTrail {...portfolioProps} />
          <Navigation {...portfolioProps} />

          {/* Instant background switching */}
          <div className="fixed inset-0 z-0">
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #111827 70%, #000000 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #e2e8f0 70%, #cbd5e1 100%)'
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Background image with instant switching */}
            {currentBgData && (
              <motion.div
                key={`bg-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${currentBgData.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundAttachment: 'fixed'
                }}
              />
            )}
            
            {/* Simple overlay */}
            {currentBgData && (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${currentBgData.overlay}, ${currentBgData.overlay}), ${currentBgData.gradient}`,
                }}
              />
            )}
          </div>

          <main className="pt-20 relative z-10" ref={containerRef}>
            {/* Instant page transitions - no loading states */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="relative z-20"
              >
                {renderPage(currentPage)}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Minimal ambient effects */}
          <div className="fixed inset-0 pointer-events-none z-5">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute w-1 h-1 ${isDarkMode ? 'bg-cyan-400/8' : 'bg-blue-400/8'} rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 0.5, 0],
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

          {/* Simple ambient orbs */}
          <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
            <motion.div
              className={`absolute w-96 h-96 rounded-full blur-3xl ${isDarkMode ? 'bg-cyan-400/4' : 'bg-blue-400/4'}`}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ top: '20%', left: '20%' }}
            />
            <motion.div
              className={`absolute w-96 h-96 rounded-full blur-3xl ${isDarkMode ? 'bg-purple-400/4' : 'bg-purple-400/4'}`}
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ bottom: '20%', right: '20%' }}
            />
          </div>
        </LayoutGroup>
      )}
    </div>
  );
};

export default App;