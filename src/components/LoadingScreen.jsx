import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.5 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
  >
    <div className="relative">
      {/* Morphing shapes background */}
      <motion.div
        className="absolute inset-0 w-96 h-96"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
            style={{
              top: `${50 + 30 * Math.cos((i * Math.PI * 2) / 6)}%`,
              left: `${50 + 30 * Math.sin((i * Math.PI * 2) / 6)}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Text animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center relative z-10"
      >
        <motion.h1
          className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-4"
          animate={{
            backgroundPosition: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          Abhishek Sahu
        </motion.h1>
        
        <motion.div
          className="flex justify-center space-x-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {['Full', 'Stack', 'Engineer'].map((word, index) => (
            <motion.span
              key={word}
              className="text-lg text-gray-300"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

export default LoadingScreen;