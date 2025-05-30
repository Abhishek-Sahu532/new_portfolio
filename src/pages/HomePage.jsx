import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Section from '../components/Section';

const HomePage = ({ theme, isDarkMode, setCurrentPage, setIsHovering, navItems, setCurrentSection }) => (
  <Section 
    id="home" 
    className="relative overflow-hidden"
    isDarkMode={isDarkMode}
    navItems={navItems}
    setCurrentSection={setCurrentSection}
  >
    <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="mb-12 relative"
      >
        <motion.div
          className="w-40 h-40 mx-auto rounded-full flex items-center justify-center text-5xl font-bold text-white relative overflow-hidden"
          style={{
            background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)',
            boxShadow: '0 0 60px rgba(59, 130, 246, 0.3)'
          }}
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 20px rgba(6, 182, 212, 0.5)',
                '0 0 40px rgba(147, 51, 234, 0.7)',
                '0 0 20px rgba(6, 182, 212, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AS
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className={`text-6xl md:text-8xl font-bold ${theme.text} mb-8`}
        style={{ textShadow: isDarkMode ? '0 0 30px rgba(6, 182, 212, 0.5)' : '0 0 20px rgba(59, 130, 246, 0.3)' }}
      >
        Abhishek Sahu
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mb-8"
      >
        <span className={`text-2xl md:text-4xl ${theme.accent} font-semibold`}>
          Full Stack Engineer
        </span>
        <motion.div
          className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '8rem' }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className={`text-xl ${theme.muted} mb-12 max-w-3xl mx-auto leading-relaxed`}
      >
        Crafting exceptional digital experiences with React, Ruby on Rails, Python, and AI integration. 
        Transforming innovative ideas into scalable, production-ready solutions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="flex flex-col sm:flex-row gap-6 justify-center"
      >
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            boxShadow: isDarkMode ? "0 20px 40px rgba(6, 182, 212, 0.4)" : "0 20px 40px rgba(59, 130, 246, 0.4)" 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage('projects')}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Explore My Work
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage('contact')}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`px-10 py-4 ${theme.card} ${theme.text} rounded-full font-semibold text-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} hover:border-cyan-400 transition-all duration-300`}
        >
          Let's Connect
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`${theme.accent} cursor-pointer`}
          onClick={() => setCurrentPage('about')}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </div>
  </Section>
);

export default HomePage;