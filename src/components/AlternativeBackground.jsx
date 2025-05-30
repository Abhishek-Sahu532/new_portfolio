import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sectionBackgrounds } from '../data/portfolioData';

const AlternativeBackground = ({ sectionId, isDarkMode }) => {
  const { scrollYProgress } = useScroll();
  
  // Use rotation and subtle movement instead of translateY
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const backgroundBlur = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  const bgData = sectionBackgrounds[sectionId];
  
  if (!bgData) return null;
  
  const bgImage = isDarkMode ? bgData.dark : bgData.light;
  const overlay = isDarkMode ? bgData.overlay.dark : bgData.overlay.light;
  
  return (
    <>
      {/* Static background layer to prevent gaps */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Animated overlay */}
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${overlay}, ${overlay}), ${bgData.gradient}`,
            filter: `blur(${backgroundBlur}px)`,
            rotate: backgroundRotate,
          }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </>
  );
};

export default AlternativeBackground;