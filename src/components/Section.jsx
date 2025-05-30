import React, { useRef, useEffect, memo } from 'react';
import { motion, useInView } from 'framer-motion';

const Section = memo(({ 
  children, 
  id, 
  className = '', 
  isDarkMode, 
  navItems, 
  setCurrentSection 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.1,
    margin: "-10% 0px -10% 0px"
  });

  useEffect(() => {
    if (isInView && navItems && setCurrentSection) {
      const sectionIndex = navItems.findIndex(item => item.id === id);
      if (sectionIndex !== -1) {
        setCurrentSection(sectionIndex);
      }
    }
  }, [isInView, id, navItems, setCurrentSection]);

  return (
    <section
      ref={ref}
      id={id}
      className={`min-h-screen flex items-center justify-center relative ${className}`}
      style={{ 
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <div className="relative z-20 w-full">
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';

export default Section;