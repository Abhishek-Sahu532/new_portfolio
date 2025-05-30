import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import Section from '../components/Section';

const ContactPage = ({ theme, isDarkMode, setIsHovering, navItems, setCurrentSection }) => (
  <Section 
    id="contact"
    isDarkMode={isDarkMode}
    navItems={navItems}
    setCurrentSection={setCurrentSection}
  >
    <div className="max-w-6xl mx-auto px-6 text-center relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-16"
      >
        <motion.h2
          className={`text-5xl md:text-7xl font-bold ${theme.text} mb-6`}
          style={{ textShadow: isDarkMode ? '0 0 30px rgba(6, 182, 212, 0.3)' : 'none' }}
        >
          Let's Create Together
        </motion.h2>
        <motion.p
          className={`text-xl ${theme.muted} max-w-3xl mx-auto leading-relaxed`}
        >
          Ready to turn your vision into reality? Let's collaborate and build something extraordinary together.
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          { 
            icon: Mail, 
            title: 'Email', 
            value: 'asahu532@gmail.com', 
            href: 'mailto:asahu532@gmail.com',
            color: 'from-blue-500 to-cyan-500'
          },
          { 
            icon: Phone, 
            title: 'Phone', 
            value: '+91 7879696075', 
            href: 'tel:+917879696075',
            color: 'from-green-500 to-teal-500'
          },
          { 
            icon: MapPin, 
            title: 'Location', 
            value: 'Bhopal, India', 
            href: '#',
            color: 'from-purple-500 to-pink-500'
          }
        ].map((contact, index) => (
          <motion.a
            key={contact.title}
            href={contact.href}
            initial={{ opacity: 0, y: 100, rotateX: 45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              rotateY: 5,
              boxShadow: isDarkMode ? "0 25px 50px rgba(6, 182, 212, 0.15)" : "0 25px 50px rgba(59, 130, 246, 0.15)"
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl block group cursor-pointer`}
          >
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${contact.color} mb-4 group-hover:shadow-lg transition-shadow`}>
                <contact.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`${theme.text} font-bold text-xl mb-3 group-hover:${theme.accent} transition-colors`}>
                {contact.title}
              </h3>
              <p className={`${theme.muted} group-hover:${theme.text} transition-colors font-medium`}>
                {contact.value}
              </p>
            </motion.div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="flex justify-center gap-8"
      >
        {[
          { 
            icon: Github, 
            href: 'https://github.com/abhishek-sahu532', 
            label: 'GitHub',
            color: 'hover:text-gray-400'
          },
          { 
            icon: Linkedin, 
            href: 'https://linkedin.com/in/abhishek-sahu532', 
            label: 'LinkedIn',
            color: 'hover:text-blue-400'
          }
        ].map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.3, 
              rotate: 10,
              y: -5,
              boxShadow: isDarkMode ? "0 15px 30px rgba(6, 182, 212, 0.3)" : "0 15px 30px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`p-4 ${theme.card} rounded-2xl ${theme.text} ${social.color} transition-all duration-300 ${theme.glow} shadow-lg cursor-pointer`}
          >
            <social.icon className="w-8 h-8" />
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-16"
      >
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: isDarkMode ? "0 20px 40px rgba(6, 182, 212, 0.4)" : "0 20px 40px rgba(59, 130, 246, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="px-12 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 cursor-pointer"
        >
          Start a Conversation
        </motion.button>
      </motion.div>
    </div>
  </Section>
);

export default ContactPage;