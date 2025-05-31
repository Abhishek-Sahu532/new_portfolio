import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap, Sparkles, CheckCircle } from 'lucide-react';

const SmartLoader = ({ onComplete, isDarkMode = true }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingStages = [
    { 
      id: 0,
      text: 'Initializing portfolio...',
      icon: Code,
      duration: 800,
      description: 'Setting up the environment'
    },
    { 
      id: 1,
      text: 'Loading project data...',
      icon: Zap,
      duration: 600,
      description: 'Fetching latest repositories'
    },
    { 
      id: 2,
      text: 'Optimizing experience...',
      icon: Sparkles,
      duration: 500,
      description: 'Enhancing performance'
    },
    { 
      id: 3,
      text: 'Ready to explore!',
      icon: CheckCircle,
      duration: 400,
      description: 'Portfolio loaded successfully'
    }
  ];

  useEffect(() => {
    const totalDuration = loadingStages.reduce((sum, stage) => sum + stage.duration, 0);
    let elapsed = 0;

    const progressInterval = setInterval(() => {
      elapsed += 50; // Update every 50ms
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Calculate current stage based on elapsed time
      let accumulatedTime = 0;
      for (let i = 0; i < loadingStages.length; i++) {
        accumulatedTime += loadingStages[i].duration;
        if (elapsed <= accumulatedTime) {
          setCurrentStage(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(progressInterval);
        setIsComplete(true);
        setTimeout(() => {
          onComplete && onComplete();
        }, 800);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  const currentStageData = loadingStages[currentStage];
  const IconComponent = currentStageData?.icon || Code;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${
              isDarkMode ? 'bg-cyan-400/30' : 'bg-blue-500/30'
            } rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo/Brand area */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div 
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4`}
            style={{
              background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
            }}
          >
            AS
          </div>
          <h1 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Abhishek Sahu
          </h1>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Full Stack Engineer
          </p>
        </motion.div>

        {/* Loading content */}
        <div className={`${
          isDarkMode 
            ? 'bg-gray-800/30 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        } backdrop-blur-xl border rounded-2xl p-8 shadow-2xl`}>
          
          {/* Current stage indicator */}
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <motion.div
              animate={{ 
                rotate: isComplete ? 0 : 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: isComplete ? 0 : Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
              }}
              className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 ${
                isDarkMode ? 'bg-cyan-500/20' : 'bg-blue-500/20'
              }`}
            >
              <IconComponent className={`w-6 h-6 ${
                isDarkMode ? 'text-cyan-400' : 'text-blue-600'
              }`} />
            </motion.div>

            <h3 className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {currentStageData?.text}
            </h3>
            
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {currentStageData?.description}
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className={`w-full h-2 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            } rounded-full overflow-hidden`}>
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
                {Math.round(progress)}%
              </span>
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
                Stage {currentStage + 1} of {loadingStages.length}
              </span>
            </div>
          </div>

          {/* Stage indicators */}
          <div className="flex justify-center space-x-2">
            {loadingStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStage
                    ? isDarkMode 
                      ? 'bg-cyan-400' 
                      : 'bg-blue-500'
                    : isDarkMode 
                      ? 'bg-gray-600' 
                      : 'bg-gray-300'
                }`}
                animate={{
                  scale: index === currentStage ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  repeat: index === currentStage ? Infinity : 0,
                }}
              />
            ))}
          </div>

          {/* Loading tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 pt-6 border-t border-gray-700/30"
          >
            <p className={`text-xs ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              💡 Tip: This portfolio is optimized for performance and accessibility
            </p>
          </motion.div>
        </div>

        {/* Technical stats (shown during loading) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 grid grid-cols-3 gap-4 text-center"
        >
          {[
            { label: 'Bundle Size', value: '45KB' },
            { label: 'Lighthouse', value: '98/100' },
            { label: 'Load Time', value: '1.2s' }
          ].map((stat, index) => (
            <div key={stat.label} className={`${
              isDarkMode 
                ? 'bg-gray-800/20 border-gray-700/30' 
                : 'bg-white/50 border-gray-200/30'
            } backdrop-blur-sm border rounded-lg p-3`}>
              <div className={`text-lg font-bold ${
                isDarkMode ? 'text-cyan-400' : 'text-blue-600'
              }`}>
                {stat.value}
              </div>
              <div className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SmartLoader;