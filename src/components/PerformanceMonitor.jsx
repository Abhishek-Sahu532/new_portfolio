import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PerformanceMonitor = ({ isDarkMode = true, show = false }) => {
  const [metrics, setMetrics] = useState({
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    fcp: 0
  });

  useEffect(() => {
    if (!show) return;

    // Web Vitals measurement
    const measureWebVitals = () => {
      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: Math.round(lastEntry.startTime) }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: Math.round(entry.startTime) }));
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          setMetrics(prev => ({ ...prev, cls: Math.round(clsValue * 1000) / 1000 }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Navigation timing for TTFB
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.requestStart;
          setMetrics(prev => ({ ...prev, ttfb: Math.round(ttfb) }));
        }

        return () => {
          lcpObserver.disconnect();
          fcpObserver.disconnect();
          clsObserver.disconnect();
        };
      }
    };

    measureWebVitals();
  }, [show]);

  if (!show) return null;

  const getScoreColor = (metric, value) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fcp: { good: 1800, poor: 3000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return isDarkMode ? 'text-gray-400' : 'text-gray-600';

    if (value <= threshold.good) return 'text-green-400';
    if (value <= threshold.poor) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatValue = (metric, value) => {
    if (metric === 'cls') return value.toFixed(3);
    if (metric === 'fid') return `${value}ms`;
    return `${value}ms`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed top-4 left-4 z-50 ${
        isDarkMode 
          ? 'bg-gray-900/90 border-gray-700' 
          : 'bg-white/90 border-gray-300'
      } backdrop-blur-sm border rounded-lg p-3 shadow-lg font-mono text-xs`}
    >
      <div className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Core Web Vitals
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center gap-4">
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>LCP:</span>
          <span className={getScoreColor('lcp', metrics.lcp)}>
            {formatValue('lcp', metrics.lcp)}
          </span>
        </div>
        
        <div className="flex justify-between items-center gap-4">
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>FCP:</span>
          <span className={getScoreColor('fcp', metrics.fcp)}>
            {formatValue('fcp', metrics.fcp)}
          </span>
        </div>
        
        <div className="flex justify-between items-center gap-4">
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>CLS:</span>
          <span className={getScoreColor('cls', metrics.cls)}>
            {formatValue('cls', metrics.cls)}
          </span>
        </div>
        
        <div className="flex justify-between items-center gap-4">
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>TTFB:</span>
          <span className={getScoreColor('ttfb', metrics.ttfb)}>
            {formatValue('ttfb', metrics.ttfb)}
          </span>
        </div>
      </div>

      <div className={`mt-2 pt-2 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-300'
      } text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        🟢 Good • 🟡 Needs Improvement • 🔴 Poor
      </div>
    </motion.div>
  );
};

export default PerformanceMonitor;