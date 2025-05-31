import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, CheckCircle, BookOpen, Users } from 'lucide-react';
import Section from '../components/Section';
import { certifications } from '../data/portfolioData';

const CertificationsPage = ({ theme, isDarkMode, setIsHovering, navItems, setCurrentSection }) => {
  return (
    <Section 
      id="certifications"
      isDarkMode={isDarkMode}
      navItems={navItems}
      setCurrentSection={setCurrentSection}
      className="py-20 min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-20">
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
            Certifications
          </motion.h2>
          <motion.p
            className={`text-xl ${theme.muted} max-w-3xl mx-auto leading-relaxed`}
          >
            Professional certifications and continuous learning achievements that showcase 
            my commitment to staying current with industry standards and best practices.
          </motion.p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.03, 
                y: -10,
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
                  background: `linear-gradient(135deg, ${cert.color.split(' ')[1]}, ${cert.color.split(' ')[3]})`
                }}
              />

              <div className="relative z-10">
                {/* Certificate Header */}
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-r ${cert.color} group-hover:shadow-lg transition-shadow duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold ${theme.text} mb-2 group-hover:${theme.accent} transition-colors duration-300 leading-tight`}>
                      {cert.title}
                    </h3>
                    <div className={`${theme.accent} font-bold text-lg mb-2`}>{cert.issuer}</div>
                    <div className={`${theme.muted} text-sm flex items-center gap-2`}>
                      <Calendar className="w-4 h-4" />
                      {cert.date}
                    </div>
                  </div>
                </div>
                
                {/* Skills Tags */}
                <div className="mb-6">
                  <h4 className={`${theme.text} font-semibold text-sm mb-3`}>Skills Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (index * 0.2) + (skillIndex * 0.1) }}
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 text-sm bg-gradient-to-r ${cert.color} text-white rounded-full font-medium shadow-lg`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className={`w-4 h-4 ${theme.accent}`} />
                    <span className={`${theme.muted}`}>Completed comprehensive curriculum</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className={`w-4 h-4 ${theme.accent}`} />
                    <span className={`${theme.muted}`}>Hands-on projects and assessments</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className={`w-4 h-4 ${theme.accent}`} />
                    <span className={`${theme.muted}`}>Industry-recognized credential</span>
                  </div>
                </div>

                {/* View Certificate Button */}
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 ${theme.accent} hover:underline font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300`}
                >
                  View Certificate <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Progress indicator */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-0 group-hover:w-full transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>

        {/* Learning Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { 
              number: '4+', 
              label: 'Certifications Earned', 
              desc: 'From recognized institutions',
              color: 'from-blue-500 to-cyan-500',
              icon: Award
            },
            { 
              number: '200+', 
              label: 'Learning Hours', 
              desc: 'Invested in professional development',
              color: 'from-green-500 to-teal-500',
              icon: BookOpen
            },
            { 
              number: '100%', 
              label: 'Completion Rate', 
              desc: 'All courses finished successfully',
              color: 'from-purple-500 to-pink-500',
              icon: CheckCircle
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
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
                {stat.number}
              </h3>
              <h4 className={`${theme.text} font-semibold text-lg mb-2`}>{stat.label}</h4>
              <p className={`${theme.muted} text-sm`}>{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}
        >
          <div className="text-center mb-8">
            <h3 className={`text-2xl font-bold ${theme.text} mb-4`}>
              Continuous Learning Philosophy
            </h3>
            <p className={`${theme.muted} max-w-2xl mx-auto leading-relaxed`}>
              In the rapidly evolving tech landscape, staying current is not just an advantage—it's essential. 
              My commitment to continuous learning ensures I bring the latest best practices and technologies to every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className={`text-lg font-semibold ${theme.text} mb-4 flex items-center gap-2`}>
                <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></span>
                Learning Goals 2025
              </h4>
              <div className="space-y-3">
                {[
                  'Advanced Cloud Architecture (AWS/Azure)',
                  'Machine Learning & AI Integration',
                  'Advanced DevOps & Kubernetes',
                  'System Design & Scalability'
                ].map((goal, index) => (
                  <motion.div
                    key={goal}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.4 + index * 0.05 }}
                    className={`flex items-center gap-3 ${theme.muted} p-2 rounded-lg hover:bg-white/5 transition-colors`}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                    <span className="font-medium">{goal}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className={`text-lg font-semibold ${theme.text} mb-4 flex items-center gap-2`}>
                <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></span>
                Key Learning Areas
              </h4>
              <div className="space-y-3">
                {[
                  'Full-Stack Development',
                  'Database Design & Optimization',
                  'API Development & Integration',
                  'Performance & Security'
                ].map((area, index) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.6 + index * 0.05 }}
                    className={`flex items-center gap-3 ${theme.muted} p-2 rounded-lg hover:bg-white/5 transition-colors`}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                    <span className="font-medium">{area}</span>
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
                Knowledge is power, learning is growth
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom spacing for smooth scroll */}
        <div className="pb-32" />
      </div>
    </Section>
  );
};

export default CertificationsPage;