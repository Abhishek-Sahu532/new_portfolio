import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin as LocationIcon } from 'lucide-react';
import Section from '../components/Section';
import { experiences } from '../data/portfolioData';

const ExperiencePage = ({ theme, isDarkMode, setIsHovering, navItems, setCurrentSection }) => (
  <Section 
    id="experience"
    isDarkMode={isDarkMode}
    navItems={navItems}
    setCurrentSection={setCurrentSection}
    className="py-20 min-h-screen"
  >
    <div className="max-w-6xl mx-auto px-6 relative z-20">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.h2
          className={`text-5xl md:text-7xl font-bold ${theme.text} mb-6`}
          style={{ textShadow: isDarkMode ? '0 0 30px rgba(6, 182, 212, 0.3)' : 'none' }}
        >
          Experience
        </motion.h2>
        <motion.p
          className={`text-xl ${theme.muted} max-w-3xl mx-auto`}
        >
          My professional journey through various roles and responsibilities
        </motion.p>
      </motion.div>

      {/* Experience Items Container */}
      <div className="space-y-8 pb-32">
        {experiences.map((exp, index) => (
          <motion.div
            key={`experience-${index}-${exp.company}`}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ 
              scale: 1.01, 
              y: -5,
              transition: { duration: 0.2 }
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-6 md:p-8 rounded-2xl ${theme.glow} shadow-xl cursor-pointer group relative overflow-hidden border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}
            style={{
              // Ensure each card has proper spacing and visibility
              marginBottom: index === experiences.length - 1 ? '120px' : '32px',
              minHeight: 'auto'
            }}
          >
            {/* Background gradient on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${exp.gradient.split(' ')[1]}, ${exp.gradient.split(' ')[3]})`
              }}
            />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Left Column - Job Details */}
                <div className="lg:w-1/3 space-y-4">
                  {/* Job Type Badge */}
                  <motion.div
                    className={`inline-flex px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r ${exp.gradient} text-white shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {exp.type}
                  </motion.div>

                  {/* Job Title */}
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-bold ${theme.text} mb-2 group-hover:${theme.accent} transition-colors duration-300 leading-tight`}>
                      {exp.title}
                    </h3>
                    <div className={`${theme.accent} font-bold text-lg md:text-xl mb-3`}>
                      {exp.company}
                    </div>
                  </div>

                  {/* Date and Location */}
                  <div className="space-y-2">
                    <div className={`${theme.muted} text-sm flex items-center gap-2`}>
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{exp.duration}</span>
                    </div>
                    <div className={`${theme.muted} text-sm flex items-center gap-2`}>
                      <LocationIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Responsibilities */}
                <div className="lg:w-2/3">
                  <h4 className={`${theme.text} font-semibold text-lg mb-4`}>
                    Key Responsibilities:
                  </h4>
                  <ul className="space-y-4">
                    {exp.description.map((desc, descIndex) => (
                      <motion.li
                        key={`desc-${index}-${descIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: (index * 0.15) + (descIndex * 0.1),
                          ease: "easeOut"
                        }}
                        className={`${theme.muted} flex items-start gap-4 leading-relaxed group-hover:${theme.text} transition-colors duration-300`}
                      >
                        <motion.div 
                          className={`w-2 h-2 bg-gradient-to-r ${exp.gradient} rounded-full mt-2 flex-shrink-0`}
                          whileHover={{ scale: 1.5 }}
                          transition={{ duration: 0.2 }}
                        />
                        <span className="text-base">{desc}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Hover indicator */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 w-0 group-hover:w-full transition-all duration-500"
            />
          </motion.div>
        ))}
      </div>

      {/* Career Progression Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-16"
      >
        <div className={`inline-flex items-center gap-2 px-6 py-3 ${theme.card} rounded-full ${theme.glow} shadow-lg border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className={`w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full`}
          />
          <span className={`${theme.muted} text-sm font-medium`}>
            Continuously evolving and growing
          </span>
        </div>
      </motion.div>
    </div>
  </Section>
);

export default ExperiencePage;