import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Section from '../components/Section';
import { projects } from '../data/portfolioData';

const ProjectsPage = ({ theme, isDarkMode, setIsHovering, navItems, setCurrentSection }) => (
  <Section 
    id="projects"
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
          Featured Projects
        </motion.h2>
        <motion.p
          className={`text-xl ${theme.muted} max-w-3xl mx-auto`}
        >
          A showcase of my most impactful work, where innovation meets functionality
        </motion.p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 100, rotateX: 45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ 
              scale: 1.03, 
              y: -10,
              rotateY: 5,
              boxShadow: isDarkMode ? "0 25px 50px rgba(6, 182, 212, 0.15)" : "0 25px 50px rgba(59, 130, 246, 0.15)"
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} rounded-2xl overflow-hidden ${theme.glow} shadow-xl group perspective-1000 cursor-pointer`}
          >
            <div className="relative overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500`}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <ExternalLink className="w-6 h-6" />
                </motion.a>
              </motion.div>
            </div>
            
            <div className="p-8">
              <motion.h3
                className={`text-2xl font-bold ${theme.text} mb-4 group-hover:${theme.accent} transition-colors`}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className={`${theme.muted} mb-6 leading-relaxed`}
              >
                {project.description}
              </motion.p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                    className={`px-3 py-1 text-sm bg-gradient-to-r ${project.gradient} text-white rounded-full font-medium`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

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
    </div>
  </Section>
);

export default ProjectsPage;