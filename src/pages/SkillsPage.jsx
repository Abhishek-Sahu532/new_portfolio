import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { skills } from '../data/portfolioData';

const SkillsPage = ({ theme, isDarkMode, setIsHovering, navItems, setCurrentSection }) => (
  <Section 
    id="skills"
    isDarkMode={isDarkMode}
    navItems={navItems}
    setCurrentSection={setCurrentSection}
  >
    <div className="max-w-7xl mx-auto px-6 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <motion.h2
          className={`text-5xl md:text-7xl font-bold ${theme.text} mb-6`}
          style={{ textShadow: isDarkMode ? '0 0 30px rgba(6, 182, 212, 0.3)' : 'none' }}
        >
          Skills & Technologies
        </motion.h2>
        <motion.p
          className={`text-xl ${theme.muted} max-w-3xl mx-auto`}
        >
          The tools and technologies I use to bring ideas to life
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(skills).map(([key, category], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 100, rotateY: 45 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              rotateY: 5,
              boxShadow: isDarkMode ? "0 25px 50px rgba(6, 182, 212, 0.15)" : "0 25px 50px rgba(59, 130, 246, 0.15)"
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl group cursor-pointer`}
          >
            <motion.div
              className="text-center mb-6"
              whileHover={{ scale: 1.2 }} // Removed rotation, only scale
              transition={{ duration: 0.3 }}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-4`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${theme.text} group-hover:${theme.accent} transition-colors`}>
                {category.title}
              </h3>
            </motion.div>
            
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                  whileHover={{ x: 10, scale: 1.05 }}
                  className={`flex items-center gap-3 ${theme.muted} group-hover:${theme.text} transition-all duration-300 cursor-pointer`}
                >
                  <motion.div
                    className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full`}
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

export default SkillsPage;