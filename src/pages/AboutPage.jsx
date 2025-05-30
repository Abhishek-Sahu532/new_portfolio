import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, MapPin as LocationIcon } from 'lucide-react';
import Section from '../components/Section';

const AboutPage = ({ theme, isDarkMode, setIsHovering, navItems, setCurrentSection }) => (
  <Section 
    id="about"
    isDarkMode={isDarkMode}
    navItems={navItems}
    setCurrentSection={setCurrentSection}
  >
    <div className="max-w-7xl mx-auto px-6 relative z-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <motion.h2
            className={`text-5xl md:text-7xl font-bold ${theme.text} mb-8`}
            style={{ textShadow: isDarkMode ? '0 0 30px rgba(6, 182, 212, 0.3)' : 'none' }}
          >
            About Me
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-xl ${theme.muted} mb-8 leading-relaxed`}
          >
            Passionate Full Stack Developer with 3+ years of experience creating impactful digital solutions. 
            Currently crafting innovative applications at Hunkaar Labs, where I blend creativity with technical expertise.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-lg ${theme.muted} mb-10 leading-relaxed`}
          >
            My journey spans across modern web technologies, AI integration, and scalable architecture design. 
            I thrive on transforming complex challenges into elegant, user-centered solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: '3+', label: 'Years Experience', color: 'from-cyan-500 to-blue-500' },
              { number: '15+', label: 'Projects Completed', color: 'from-purple-500 to-pink-500' },
              { number: '10+', label: 'Technologies Mastered', color: 'from-green-500 to-teal-500' },
              { number: '100%', label: 'Client Satisfaction', color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`${theme.card} p-6 rounded-2xl text-center ${theme.glow} shadow-lg cursor-pointer`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.number}
                </motion.div>
                <div className={`${theme.muted} text-sm`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="space-y-8"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-lg cursor-pointer`}
          >
            <h3 className={`text-2xl font-bold ${theme.text} mb-6 flex items-center gap-3`}>
              <GraduationCap className={`w-6 h-6 ${theme.accent}`} />
              Education
            </h3>
            <div className="space-y-6">
              {[
                {
                  degree: 'Master of Computer Applications',
                  school: 'SAM College Of Engineering & Technology',
                  year: '2016 - 2018',
                  location: 'Bhopal'
                },
                {
                  degree: 'Bachelor of Computer Applications',
                  school: 'Govt. Hamidia Arts And Commerce College',
                  year: '2012 - 2015',
                  location: 'Bhopal'
                }
              ].map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-l-4 border-gradient-to-b from-cyan-400 to-purple-500 pl-6"
                >
                  <div className={`${theme.text} font-semibold text-lg`}>{edu.degree}</div>
                  <div className={`${theme.muted} font-medium`}>{edu.school}</div>
                  <div className={`${theme.accent} text-sm mt-1 flex items-center gap-2`}>
                    <Calendar className="w-3 h-3" />
                    {edu.year}
                    <LocationIcon className="w-3 h-3 ml-2" />
                    {edu.location}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-lg cursor-pointer`}
          >
            <h3 className={`text-2xl font-bold ${theme.text} mb-6 flex items-center gap-3`}>
              <Briefcase className={`w-6 h-6 ${theme.accent}`} />
              Current Role
            </h3>
            <div className="border-l-4 border-gradient-to-b from-cyan-400 to-purple-500 pl-6">
              <div className={`${theme.text} font-semibold text-xl`}>Full Stack Engineer</div>
              <div className={`${theme.muted} font-medium text-lg`}>Hunkaar Labs</div>
              <div className={`${theme.accent} text-sm mt-2 flex items-center gap-2`}>
                <Calendar className="w-3 h-3" />
                Jan 2025 - Present
                <LocationIcon className="w-3 h-3 ml-2" />
                Bhopal
              </div>
              <div className={`${theme.muted} text-sm mt-3 leading-relaxed`}>
                Building robust full-stack applications and leading innovative projects with modern technologies.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </Section>
);

export default AboutPage;