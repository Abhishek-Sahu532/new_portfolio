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
    className="py-20 min-h-screen"
  >
    <div className="max-w-7xl mx-auto px-6 relative z-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.h2
          className={`text-5xl md:text-7xl font-bold ${theme.text} mb-6`}
          style={{ textShadow: isDarkMode ? '0 0 30px rgba(6, 182, 212, 0.3)' : 'none' }}
        >
          Skills & Technologies
        </motion.h2>
        <motion.p
          className={`text-xl ${theme.muted} max-w-3xl mx-auto leading-relaxed`}
        >
          The tools and technologies I use to bring ideas to life. From frontend frameworks 
          to backend services, databases, and development tools.
        </motion.p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {Object.entries(skills).map(([key, category], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 80, rotateY: 15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              rotateY: 3,
              boxShadow: isDarkMode ? "0 25px 50px rgba(6, 182, 212, 0.15)" : "0 25px 50px rgba(59, 130, 246, 0.15)"
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl group cursor-pointer border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} relative overflow-hidden`}
          >
            {/* Background gradient on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})`
              }}
            />

            <div className="relative z-10">
              {/* Category Icon & Title */}
              <motion.div
                className="text-center mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-4 group-hover:shadow-lg transition-shadow duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${theme.text} group-hover:${theme.accent} transition-colors duration-300`}>
                  {category.title}
                </h3>
              </motion.div>
              
              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.15) + (skillIndex * 0.05) }}
                    whileHover={{ x: 8, scale: 1.03 }}
                    className={`flex items-center gap-3 ${theme.muted} group-hover:${theme.text} transition-all duration-300 cursor-pointer p-2 rounded-lg hover:bg-white/5`}
                  >
                    <motion.div
                      className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full flex-shrink-0`}
                      whileHover={{ scale: 1.5 }}
                    />
                    <span className="font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skill level indicator */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-0 group-hover:w-full transition-all duration-700"
            />
          </motion.div>
        ))}
      </div>

      {/* Proficiency Levels */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl mb-16 border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}
      >
        <h3 className={`text-2xl font-bold ${theme.text} mb-8 text-center`}>
          Proficiency Levels
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              level: 'Expert',
              skills: ['React.js', 'JavaScript', 'Node.js', 'HTML/CSS'],
              percentage: 90,
              color: 'from-green-500 to-emerald-500',
              description: '3+ years of professional experience'
            },
            {
              level: 'Advanced',
              skills: ['Python', 'MongoDB', 'Express.js', 'TypeScript'],
              percentage: 80,
              color: 'from-blue-500 to-cyan-500',
              description: 'Strong practical knowledge and project experience'
            },
            {
              level: 'Intermediate',
              skills: ['Ruby on Rails', 'PostgreSQL', 'AI/ML', 'Docker'],
              percentage: 70,
              color: 'from-purple-500 to-pink-500',
              description: 'Growing expertise with hands-on projects'
            }
          ].map((level, index) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`p-6 rounded-xl ${theme.card} border ${isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30'} cursor-pointer group`}
            >
              <div className="text-center mb-4">
                <h4 className={`text-xl font-bold ${theme.text} mb-2 group-hover:${theme.accent} transition-colors`}>
                  {level.level}
                </h4>
                <div className="relative">
                  <div className={`w-full h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <motion.div
                      className={`h-full bg-gradient-to-r ${level.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${level.percentage}%` }}
                      transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                    />
                  </div>
                  <span className={`text-sm ${theme.accent} font-semibold mt-1 block`}>
                    {level.percentage}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {level.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 + index * 0.1 + skillIndex * 0.05 }}
                    className={`inline-block px-3 py-1 text-sm bg-gradient-to-r ${level.color} text-white rounded-full font-medium mr-2 mb-2 shadow-lg`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
              
              <p className={`${theme.muted} text-sm text-center leading-relaxed`}>
                {level.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Learning Path */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}
      >
        <h3 className={`text-2xl font-bold ${theme.text} mb-6 text-center`}>
          Continuous Learning Journey
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className={`text-lg font-semibold ${theme.text} mb-4 flex items-center gap-2`}>
              <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></span>
              Currently Exploring
            </h4>
            <div className="space-y-3">
              {[
                'Next.js 14 & App Router',
                'Advanced TypeScript Patterns', 
                'Microservices Architecture',
                'GraphQL & Apollo',
                'WebAssembly (WASM)'
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.05 }}
                  className={`flex items-center gap-3 ${theme.muted} p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer`}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className={`text-lg font-semibold ${theme.text} mb-4 flex items-center gap-2`}>
              <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></span>
              Planned Learning
            </h4>
            <div className="space-y-3">
              {[
                'Rust Programming Language',
                'Kubernetes & DevOps',
                'Advanced AI/ML Integration',
                'Blockchain Development',
                'Mobile Development (React Native)'
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.6 + index * 0.05 }}
                  className={`flex items-center gap-3 ${theme.muted} p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer`}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                  <span className="font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-8 text-center"
        >
          <div className={`inline-flex items-center gap-2 px-6 py-3 ${theme.card} rounded-full border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-lg`}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
            />
            <span className={`${theme.muted} text-sm font-medium`}>
              Always learning, always growing
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom spacing for smooth scroll */}
      <div className="pb-32" />
    </div>
  </Section>
);

export default SkillsPage;