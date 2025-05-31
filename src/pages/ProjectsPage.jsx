import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Zap, Users, TrendingUp } from 'lucide-react';
import Section from '../components/Section';
import { projects } from '../data/portfolioData';

const ProjectsPage = ({ theme, isDarkMode, setIsHovering, navItems, setCurrentSection }) => {
  return (
    <Section 
      id="projects"
      isDarkMode={isDarkMode}
      navItems={navItems}
      setCurrentSection={setCurrentSection}
      className="py-20 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Header Section */}
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
            Featured Projects
          </motion.h2>
          <motion.p
            className={`text-xl ${theme.muted} max-w-3xl mx-auto mb-8 leading-relaxed`}
          >
            A showcase of my most impactful work, where innovation meets functionality. 
            Each project represents a unique challenge solved with modern technologies.
          </motion.p>

          {/* 3D Toggle Button - Coming Soon */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className={`px-8 py-3 ${theme.card} ${theme.muted} rounded-xl font-semibold shadow-lg backdrop-blur-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} cursor-not-allowed opacity-50`}
          >
            🚀 3D View (Coming Soon)
          </motion.div>
        </motion.div>

        {/* Projects Grid - Always Show */}
        <>
          {/* Projects Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -10,
                    rotateY: 2,
                    boxShadow: isDarkMode ? "0 25px 50px rgba(6, 182, 212, 0.15)" : "0 25px 50px rgba(59, 130, 246, 0.15)"
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`${theme.card} rounded-2xl overflow-hidden ${theme.glow} shadow-xl group perspective-1000 cursor-pointer border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden h-48">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500`}
                    />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <div className="flex gap-3">
                        <motion.a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-8">
                    <motion.h3
                      className={`text-2xl font-bold ${theme.text} mb-4 group-hover:${theme.accent} transition-colors duration-300`}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      className={`${theme.muted} mb-6 leading-relaxed`}
                    >
                      {project.description}
                    </motion.p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: (index * 0.2) + (techIndex * 0.1) }}
                          className={`px-3 py-1 text-sm bg-gradient-to-r ${project.gradient} text-white rounded-full font-medium shadow-lg`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Project Link */}
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-2 ${theme.accent} hover:underline font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300`}
                    >
                      Explore Project <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Project Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {[
                { 
                  icon: Code, 
                  title: 'Lines of Code', 
                  value: '50,000+', 
                  desc: 'Written across all projects',
                  color: 'from-blue-500 to-cyan-500'
                },
                { 
                  icon: Users, 
                  title: 'Active Users', 
                  value: '10,000+', 
                  desc: 'Across deployed applications',
                  color: 'from-green-500 to-teal-500'
                },
                { 
                  icon: TrendingUp, 
                  title: 'Performance', 
                  value: '98%', 
                  desc: 'Average Lighthouse score',
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl text-center cursor-pointer border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} group`}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 group-hover:shadow-lg transition-shadow duration-300`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className={`text-3xl font-bold ${theme.text} mb-2 group-hover:${theme.accent} transition-colors duration-300`}>
                    {stat.value}
                  </h3>
                  <h4 className={`${theme.text} font-semibold text-lg mb-2`}>{stat.title}</h4>
                  <p className={`${theme.muted} text-sm`}>{stat.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Technologies Used */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}
            >
              <h3 className={`text-2xl font-bold ${theme.text} mb-6 text-center`}>
                Technologies & Tools Used
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'React.js', 'Node.js', 'Python', 'MongoDB', 'Express.js', 
                  'TypeScript', 'Tailwind CSS', 'Framer Motion', 'AI/ML APIs',
                  'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Vercel'
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-4 py-2 text-sm ${theme.card} ${theme.text} rounded-full font-medium shadow-lg cursor-pointer border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} hover:border-cyan-400 transition-all duration-300`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          
        </>

        {/* Bottom spacing for smooth scroll */}
        <div className="pb-32" />
      </div>
    </Section>
  );
};

export default ProjectsPage;