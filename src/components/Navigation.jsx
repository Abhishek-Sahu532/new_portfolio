import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, X, Menu } from 'lucide-react';

const Navigation = ({ 
  theme, 
  isDarkMode, 
  setIsDarkMode, 
  currentPage, 
  setCurrentPage, 
  isMenuOpen, 
  setIsMenuOpen, 
  setIsHovering, 
  navItems 
}) => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className={`fixed top-0 left-0 right-0 z-40 ${theme.nav} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
  >
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`text-3xl font-bold ${theme.accent} cursor-pointer`}
          onClick={() => setCurrentPage('home')}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          AS
        </motion.div>

        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(item.id)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`${theme.text} hover:${theme.accent} transition-all duration-300 relative flex items-center gap-2 px-3 py-2 rounded-lg ${
                currentPage === item.id ? theme.accent : ''
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {currentPage === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-lg -z-10"
                />
              )}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`p-3 rounded-full ${theme.card} ${theme.glow} shadow-lg`}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
          </motion.button>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${theme.card}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={theme.text}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden mt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} pt-4`}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 10 }}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full text-left py-3 ${theme.text} hover:${theme.accent} transition-colors ${
                  currentPage === item.id ? theme.accent : ''
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.nav>
);

export default Navigation;