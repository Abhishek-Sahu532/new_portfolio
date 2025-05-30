import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sectionBackgrounds } from '../data/portfolioData';

const AnimatedBackground = ({ sectionId, isDarkMode, isPreloaded = false }) => {
  const [imageLoaded, setImageLoaded] = useState(isPreloaded);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Subtle scroll effects
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const bgData = sectionBackgrounds[sectionId];
  
  useEffect(() => {
    if (!bgData || isPreloaded) return;
    
    const bgImage = isDarkMode ? bgData.dark : bgData.light;
    
    // Preload the specific image if not already loaded
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      setImageError(true);
      setImageLoaded(true); // Show fallback
    };
    img.src = bgImage;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [bgData, isDarkMode, isPreloaded]);

  if (!bgData) {
    return (
      <div 
        className="absolute inset-0"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #000000 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #ffffff 100%)'
        }}
      />
    );
  }
  
  const bgImage = isDarkMode ? bgData.dark : bgData.light;
  const overlay = isDarkMode ? bgData.overlay.dark : bgData.overlay.light;
  
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut"
      }}
    >
      {/* Immediate fallback gradient - shows instantly */}
      <div
        className="absolute inset-0"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #000000 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #ffffff 100%)'
        }}
      />
      
      {/* Background image layer */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded && !imageError ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundImage: imageLoaded && !imageError ? `url(${bgImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          transform: 'scale(1.02)', // Prevent gaps
          y: backgroundY
        }}
      />
      
      {/* Overlay with gradient - always visible for consistency */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${overlay}, ${overlay}), ${bgData.gradient}`,
          opacity: backgroundOpacity,
        }}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Additional atmospheric effects */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          background: isDarkMode
            ? `
              radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.02) 0%, transparent 60%)
            `
            : `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.01) 0%, transparent 60%)
            `
        }}
      />

      {/* Subtle animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(45deg, transparent 0%, ${isDarkMode ? 'rgba(6, 182, 212, 0.01)' : 'rgba(59, 130, 246, 0.01)'} 50%, transparent 100%)`,
            `linear-gradient(45deg, transparent 0%, ${isDarkMode ? 'rgba(139, 92, 246, 0.01)' : 'rgba(168, 85, 247, 0.01)'} 50%, transparent 100%)`,
            `linear-gradient(45deg, transparent 0%, ${isDarkMode ? 'rgba(6, 182, 212, 0.01)' : 'rgba(59, 130, 246, 0.01)'} 50%, transparent 100%)`
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default AnimatedBackground;