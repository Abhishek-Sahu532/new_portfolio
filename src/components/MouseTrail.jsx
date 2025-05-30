import React from 'react';
import { motion } from 'framer-motion';

const MouseTrail = ({ isDarkMode, isHovering, mouseXSpring, mouseYSpring, trail }) => (
  <>
    {/* Custom cursor */}
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mouseXSpring,
        top: mouseYSpring,
        x: -12,
        y: -12,
      }}
    >
      <motion.div
        className={`w-6 h-6 rounded-full border-2 ${isDarkMode ? 'border-cyan-400' : 'border-blue-600'}`}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? (isDarkMode ? '#06b6d4' : '#2563eb') : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>

    {/* Trail effect */}
    {trail.map((point, index) => (
      <motion.div
        key={point.id}
        className={`fixed pointer-events-none w-2 h-2 rounded-full ${isDarkMode ? 'bg-cyan-400/30' : 'bg-blue-600/30'} z-40`}
        style={{
          left: point.x - 4,
          top: point.y - 4,
        }}
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: index * 0.05 }}
      />
    ))}
  </>
);

export default MouseTrail;