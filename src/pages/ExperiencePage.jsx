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
    className="py-20" // Added padding for better scroll behavior
  >
    <div className="max-w-6xl mx-auto px-6 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
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

      {/* Fixed spacing and scroll behavior */}
      <div className="space-y-12 pb-20"> {/* Added bottom padding and increased spacing */}
        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.duration}`} // Better key for uniqueness
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ 
              once: true, 
              amount: 0.1, // Reduced threshold for better triggering
              margin: "-50px 0px -50px 0px" // Better scroll detection
            }}
            whileHover={{ 
              scale: 1.01, 
              y: -5,
              transition: { duration: 0.2 }
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl cursor-pointer group`}
            style={{
              minHeight: 'auto', // Ensure proper height
              marginBottom: index === experiences.length - 1 ? '100px' : '0' // Extra space for last item
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="lg:w-1/3 lg:min-w-0"> {/* Fixed flex shrinking */}
                <motion.div
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${exp.gradient} text-white mb-4`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {exp.type}
                </motion.div>
                <h3 className={`text-2xl font-bold ${theme.text} mb-2 group-hover:${theme.accent} transition-colors duration-300`}>
                  {exp.title}
                </h3>
                <div className={`${theme.accent} font-semibold text-lg mb-2`}>{exp.company}</div>
                <div className={`${theme.muted} text-sm flex items-center gap-2 mb-2`}>
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>{exp.duration}</span>
                </div>
                <div className={`${theme.muted} text-sm flex items-center gap-2`}>
                  <LocationIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{exp.location}</span>
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <ul className="space-y-4"> {/* Increased spacing */}
                  {exp.description.map((desc, descIndex) => (
                    <motion.li
                      key={`${index}-${descIndex}`}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: descIndex * 0.05,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true, amount: 0.1 }}
                      className={`${theme.muted} flex items-start gap-3 leading-relaxed`}
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
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

export default ExperiencePage;