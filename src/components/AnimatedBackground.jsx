import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sectionBackgrounds } from '../data/portfolioData';

const AnimatedBackground = ({ sectionId, isDarkMode }) => {
  // Create local scroll progress with different range to prevent gaps
  const { scrollYProgress } = useScroll();
  
  // Use a subtle scale effect instead of translateY to avoid gaps
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);
  
  const bgData = sectionBackgrounds[sectionId];
  
  if (!bgData) return null;
  
  const bgImage = isDarkMode ? bgData.dark : bgData.light;
  const overlay = isDarkMode ? bgData.overlay.dark : bgData.overlay.light;
  
  return (
    <motion.div
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed', // This prevents gaps on mobile
          scale: backgroundScale,
          opacity: backgroundOpacity,
          // Ensure it covers the entire viewport plus some extra
          top: '-5%',
          left: '-5%',
          right: '-5%',
          bottom: '-5%',
          width: '110%',
          height: '110%',
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${overlay}, ${overlay}), ${bgData.gradient}`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

export default AnimatedBackground;