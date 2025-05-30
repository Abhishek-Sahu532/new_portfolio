import React from 'react';
import { motion } from 'framer-motion';

const MouseTrail = ({ isDarkMode, isHovering, mouseXSpring, mouseYSpring, trail }) => {
  return (
    <>
      {/* Custom cursor - always fixed to viewport */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mouseXSpring,
          top: mouseYSpring,
          x: -12, // Center the cursor
          y: -12, // Center the cursor
          position: 'fixed' // Ensure it stays fixed to viewport
        }}
      >
        <motion.div
          className={`w-6 h-6 rounded-full border-2 ${isDarkMode ? 'border-cyan-400' : 'border-blue-600'}`}
          animate={{
            scale: isHovering ? 1.8 : 1,
            backgroundColor: isHovering ? (isDarkMode ? '#06b6d4' : '#2563eb') : 'transparent',
            borderWidth: isHovering ? 3 : 2,
          }}
          transition={{ 
            duration: 0.2,
            ease: "easeOut"
          }}
        />
        
        {/* Inner dot for better visibility */}
        <motion.div
          className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
            isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'
          }`}
          animate={{
            scale: isHovering ? 0.5 : 1,
            opacity: isHovering ? 0.8 : 0.6,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Trail effect - fixed positioning */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className={`fixed pointer-events-none w-2 h-2 rounded-full ${
            isDarkMode ? 'bg-cyan-400/20' : 'bg-blue-600/20'
          } z-40`}
          style={{
            left: point.x - 4, // Center the trail point
            top: point.y - 4,  // Center the trail point
            position: 'fixed'  // Fixed to viewport, not affected by scroll
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.05,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Hide default cursor */}
      <style jsx>{`
        * {
          cursor: none !important;
        }
        
        /* Ensure cursor is hidden on all interactive elements */
        button, a, input, textarea, select {
          cursor: none !important;
        }
        
        /* Hide cursor on hover states */
        button:hover, a:hover {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default MouseTrail;