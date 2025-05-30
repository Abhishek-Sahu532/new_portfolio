import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

const Section = ({ 
  children, 
  id, 
  className = '', 
  isDarkMode, 
  navItems, 
  setCurrentSection 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView && navItems && setCurrentSection) {
      const sectionIndex = navItems.findIndex(item => item.id === id);
      setCurrentSection(sectionIndex);
    }
  }, [isInView, id, navItems, setCurrentSection]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 1, ease: "easeOut" }}
      id={id}
      className={`min-h-screen flex items-center justify-center relative z-10 ${className}`}
    >
      <AnimatedBackground 
        sectionId={id} 
        isDarkMode={isDarkMode} 
      />
      {children}
    </motion.section>
  );
};

export default Section;