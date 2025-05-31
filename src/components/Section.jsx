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
    margin: "-20% 0px -20% 0px"
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
      className={`relative ${className}`}
      style={{ 
        minHeight: '100vh',
        width: '100%',
        paddingTop: '80px', // Account for fixed header
        paddingBottom: '40px'
      }}
    >
      <div 
        className="flex items-start justify-center w-full h-full"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <div className="relative z-20 w-full">
          {children}
        </div>
      </div>
    </section>
  );
});

Section.displayName = 'Section';

export default Section;