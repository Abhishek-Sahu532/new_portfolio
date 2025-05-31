import React from 'react';
import SmartLoader from './SmartLoader';

const LoadingScreen = ({ onComplete, isDarkMode = true }) => {
  return (
    <SmartLoader 
      onComplete={onComplete}
      isDarkMode={isDarkMode}
    />
  );
};

export default LoadingScreen;