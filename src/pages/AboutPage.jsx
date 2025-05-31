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
    className="py-20 min-h-screen"
  >
    <div className="max-w-7xl mx-auto px-6 relative z-20">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Column - Main Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={`text-5xl md:text-7xl font-bold ${theme.text} mb-8`}
            style={{ textShadow: isDarkMode ? '0 0 30px rgba(6, 182, 212, 0.3)' : 'none' }}
          >
            About Me
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mb-10"
          >
            <p className={`text-xl ${theme.muted} leading-relaxed`}>
              Passionate Full Stack Developer with 3+ years of experience creating impactful digital solutions. 
              Currently crafting innovative applications at Hunkaar Labs, where I blend creativity with technical expertise.
            </p>
            
            <p className={`text-lg ${theme.muted} leading-relaxed`}>
              My journey spans across modern web technologies, AI integration, and scalable architecture design. 
              I thrive on transforming complex challenges into elegant, user-centered solutions.
            </p>

            <p className={`text-lg ${theme.muted} leading-relaxed`}>
              When I'm not coding, I'm exploring new technologies, contributing to open-source projects, 
              and sharing knowledge with the developer community. I believe in continuous learning and 
              staying ahead of industry trends.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6 mb-12"
          >
            {[
              { number: '3+', label: 'Years Experience', color: 'from-cyan-500 to-blue-500' },
              { number: '15+', label: 'Projects Completed', color: 'from-purple-500 to-pink-500' },
              { number: '10+', label: 'Technologies Mastered', color: 'from-green-500 to-teal-500' },
              { number: '100%', label: 'Client Satisfaction', color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`${theme.card} p-6 rounded-2xl text-center ${theme.glow} shadow-lg cursor-pointer border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} group`}
              >
                <motion.div
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.number}
                </motion.div>
                <div className={`${theme.muted} text-sm font-medium`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className={`text-2xl font-bold ${theme.text} mb-6`}>Core Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {[
                'React.js', 'Node.js', 'Python', 'Ruby on Rails', 
                'TypeScript', 'MongoDB', 'PostgreSQL', 'AI/ML Integration'
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className={`px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-medium shadow-lg cursor-pointer`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Education Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl cursor-pointer border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} group`}
          >
            <h3 className={`text-2xl font-bold ${theme.text} mb-6 flex items-center gap-3 group-hover:${theme.accent} transition-colors duration-300`}>
              <GraduationCap className={`w-6 h-6 ${theme.accent}`} />
              Education
            </h3>
            <div className="space-y-6">
              {[
                {
                  degree: 'Master of Computer Applications',
                  school: 'SAM College Of Engineering & Technology',
                  year: '2016 - 2018',
                  location: 'Bhopal',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  degree: 'Bachelor of Computer Applications',
                  school: 'Govt. Hamidia Arts And Commerce College',
                  year: '2012 - 2015',
                  location: 'Bhopal',
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="relative pl-6 border-l-4 border-gradient-to-b from-cyan-400 to-purple-500"
                  style={{
                    borderImage: `linear-gradient(to bottom, ${edu.color.split(' ')[1]}, ${edu.color.split(' ')[3]}) 1`
                  }}
                >
                  <div className={`${theme.text} font-semibold text-lg leading-tight`}>{edu.degree}</div>
                  <div className={`${theme.muted} font-medium mt-1`}>{edu.school}</div>
                  <div className={`${theme.accent} text-sm mt-2 flex items-center gap-4 flex-wrap`}>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {edu.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <LocationIcon className="w-3 h-3" />
                      {edu.location}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Current Role Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl cursor-pointer border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} group`}
          >
            <h3 className={`text-2xl font-bold ${theme.text} mb-6 flex items-center gap-3 group-hover:${theme.accent} transition-colors duration-300`}>
              <Briefcase className={`w-6 h-6 ${theme.accent}`} />
              Current Role
            </h3>
            <div className="pl-6 border-l-4 border-gradient-to-b from-cyan-400 to-purple-500">
              <div className={`${theme.text} font-bold text-xl mb-1`}>Full Stack Engineer</div>
              <div className={`${theme.muted} font-semibold text-lg mb-3`}>Hunkaar Labs</div>
              <div className={`${theme.accent} text-sm mb-4 flex items-center gap-4 flex-wrap`}>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Jan 2025 - Present
                </span>
                <span className="flex items-center gap-1">
                  <LocationIcon className="w-3 h-3" />
                  Bhopal
                </span>
              </div>
              <div className={`${theme.muted} text-sm leading-relaxed`}>
                Building robust full-stack applications and leading innovative projects with modern technologies. 
                Focused on creating scalable solutions that drive business growth and enhance user experiences.
              </div>
            </div>
          </motion.div>

          {/* Values Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl cursor-pointer border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} group`}
          >
            <h3 className={`text-2xl font-bold ${theme.text} mb-6 group-hover:${theme.accent} transition-colors duration-300`}>
              My Values
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Innovation', desc: 'Always exploring new technologies and approaches' },
                { title: 'Quality', desc: 'Writing clean, maintainable, and efficient code' },
                { title: 'Collaboration', desc: 'Building strong relationships with teams and clients' },
                { title: 'Growth', desc: 'Continuous learning and skill development' }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className={`${theme.text} font-semibold text-sm`}>{value.title}</div>
                    <div className={`${theme.muted} text-xs leading-relaxed`}>{value.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom spacing for smooth scroll */}
      <div className="pb-32" />
    </div>
  </Section>
);

export default AboutPage;