import React, { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, X, Menu } from 'lucide-react';

// Route mapping for navigation
const pageRoutes = {
  'home': '/',
  'about': '/about',
  'experience': '/experience',
  'projects': '/projects',
  'skills': '/skills',
  'certifications': '/certifications',
  'contact': '/contact'
};

const routePages = {
  '/': 'home',
  '/about': 'about',
  '/experience': 'experience',
  '/projects': 'projects',
  '/skills': 'skills',
  '/certifications': 'certifications',
  '/contact': 'contact'
};

const Navigation = memo(({ 
  theme, 
  isDarkMode, 
  setIsDarkMode, 
  isMenuOpen, 
  setIsMenuOpen, 
  setIsHovering, 
  navItems 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get current page from URL
  const currentPage = routePages[location.pathname] || 'home';

  // Enhanced navigation with URL updates
  const handleNavClick = useCallback((itemId) => {
    const route = pageRoutes[itemId] || '/';
    navigate(route);
    setIsMenuOpen(false);
    
    // Smooth scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [navigate, setIsMenuOpen]);

  const handleThemeToggle = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, setIsDarkMode]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen, setIsMenuOpen]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, [setIsHovering]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, [setIsHovering]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 ${theme.nav} border-b ${isDarkMode ? 'border-gray-800/30' : 'border-gray-200/30'}`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with home navigation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-3xl font-bold ${theme.accent} cursor-pointer select-none`}
            onClick={() => handleNavClick('home')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.span
              animate={{
                textShadow: isDarkMode 
                  ? [
                      '0 0 20px rgba(6, 182, 212, 0.5)',
                      '0 0 30px rgba(139, 92, 246, 0.7)',
                      '0 0 20px rgba(6, 182, 212, 0.5)',
                    ]
                  : [
                      '0 0 15px rgba(59, 130, 246, 0.3)',
                      '0 0 25px rgba(168, 85, 247, 0.5)',
                      '0 0 15px rgba(59, 130, 246, 0.3)',
                    ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              AS
            </motion.span>
          </motion.div>

          {/* Desktop Navigation with URL awareness */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${theme.text} hover:${theme.accent} transition-colors duration-200 relative flex items-center gap-2 px-3 py-2 rounded-lg select-none ${
                  currentPage === item.id ? theme.accent : ''
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="w-4 h-4" />
                </motion.div>
                <span className="font-medium">{item.label}</span>
                
                {/* Active indicator with URL-based detection */}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-lg -z-10"
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      duration: 0.3
                    }}
                  />
                )}
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 rounded-lg -z-10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
            
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeToggle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`p-3 rounded-xl ${theme.card} shadow-lg relative overflow-hidden group select-none`}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-600" />
                )}
              </motion.div>
              
              {/* Hover background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-purple-500/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeToggle}
              className={`p-2 rounded-lg ${theme.card} select-none`}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-600" />
                )}
              </motion.div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMenuToggle}
              className={`${theme.text} select-none`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu with URL-aware navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`lg:hidden mt-4 border-t ${isDarkMode ? 'border-gray-800/50' : 'border-gray-200/50'} pt-4 overflow-hidden`}
            >
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ x: 5, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-lg ${theme.text} hover:${theme.accent} transition-colors duration-200 relative select-none ${
                      currentPage === item.id ? theme.accent : ''
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <span className="font-medium">{item.label}</span>
                    
                    {/* Active indicator for mobile */}
                    {currentPage === item.id && (
                      <motion.div
                        layoutId="activeMobileTab"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          duration: 0.3
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;