import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
import Section from '../components/Section';
import { certifications } from '../data/portfolioData';

const CertificationsPage = ({ theme, isDarkMode, setIsHovering, navItems, setCurrentSection }) => (
  <Section 
    id="certifications"
    isDarkMode={isDarkMode}
    navItems={navItems}
    setCurrentSection={setCurrentSection}
  >
    <div className="max-w-6xl mx-auto px-6 relative z-20">
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
          Certifications
        </motion.h2>
        <motion.p
          className={`text-xl ${theme.muted} max-w-3xl mx-auto`}
        >
          Professional certifications and continuous learning achievements
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 100, rotateX: 45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ 
              scale: 1.03, 
              y: -10,
              boxShadow: isDarkMode ? "0 25px 50px rgba(6, 182, 212, 0.15)" : "0 25px 50px rgba(59, 130, 246, 0.15)"
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl group cursor-pointer`}
          >
            <div className="flex items-start gap-4 mb-6">
              <motion.div
                className={`p-3 rounded-xl bg-gradient-to-r ${cert.color}`}
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className={`text-2xl font-bold ${theme.text} mb-2 group-hover:${theme.accent} transition-colors`}>
                  {cert.title}
                </h3>
                <div className={`${theme.accent} font-semibold text-lg mb-1`}>{cert.issuer}</div>
                <div className={`${theme.muted} text-sm flex items-center gap-2`}>
                  <Calendar className="w-4 h-4" />
                  {cert.date}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                  className={`px-3 py-1 text-sm bg-gradient-to-r ${cert.color} text-white rounded-full font-medium`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

export default CertificationsPage;