import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder, Torus } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Zap, Code, Database, Globe } from 'lucide-react';
import * as THREE from 'three';

// 3D Project Card Component
const ProjectCard3D = ({ project, position, isActive, onClick, isDarkMode }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      
      // Subtle rotation when active
      if (isActive) {
        meshRef.current.rotation.y += 0.01;
      }
      
      // Hover effects
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const cardColor = useMemo(() => {
    const colors = {
      'Kikker - AI Resume Enhancement': '#06b6d4',
      'Auction Hub India': '#10b981',
      'VidStream': '#8b5cf6'
    };
    return colors[project.title] || '#3b82f6';
  }, [project.title]);

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main card */}
      <Box args={[2, 1.2, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={cardColor}
          transparent
          opacity={isActive ? 0.9 : 0.7}
          roughness={0.1}
          metalness={0.8}
        />
      </Box>
      
      {/* Project title */}
      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.12}
        color={isDarkMode ? '#ffffff' : '#000000'}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {project.title}
      </Text>
      
      {/* Tech stack indicators */}
      {project.tech.slice(0, 3).map((tech, index) => (
        <Sphere key={tech} args={[0.05]} position={[-0.6 + index * 0.3, -0.2, 0.06]}>
          <meshStandardMaterial 
            color={getTechColor(tech)}
            emissive={getTechColor(tech)}
            emissiveIntensity={0.2}
          />
        </Sphere>
      ))}
      
      {/* Hover glow effect */}
      {hovered && (
        <Torus args={[1.2, 0.02, 8, 32]} position={[0, 0, -0.05]}>
          <meshStandardMaterial 
            color={cardColor}
            emissive={cardColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </Torus>
      )}
    </group>
  );
};

// Tech stack color mapping
const getTechColor = (tech) => {
  const techColors = {
    'React': '#61dafb',
    'Node.js': '#339933',
    'Python': '#3776ab',
    'AI/ML': '#ff6b6b',
    'MongoDB': '#47a248',
    'Express': '#000000',
    'TypeScript': '#3178c6',
    'Next.js': '#000000'
  };
  return techColors[tech] || '#8b5cf6';
};

// Floating particles background
const FloatingParticles = ({ count = 50, isDarkMode }) => {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ]);
    }
    return temp;
  }, [count]);

  return (
    <group>
      {points.map((point, index) => (
        <Sphere key={index} args={[0.02]} position={point}>
          <meshStandardMaterial 
            color={isDarkMode ? '#06b6d4' : '#3b82f6'}
            emissive={isDarkMode ? '#06b6d4' : '#3b82f6'}
            emissiveIntensity={0.1}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
};

// Main 3D Scene
const Project3DScene = ({ projects, activeProject, setActiveProject, isDarkMode }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
        
        {/* Background particles */}
        <FloatingParticles isDarkMode={isDarkMode} />
        
        {/* Project cards */}
        {projects.map((project, index) => (
          <ProjectCard3D
            key={project.title}
            project={project}
            position={[(index - 1) * 3, 0, 0]}
            isActive={activeProject === index}
            onClick={() => setActiveProject(index)}
            isDarkMode={isDarkMode}
          />
        ))}
        
        {/* Interactive controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          maxDistance={8}
          minDistance={3}
        />
      </Suspense>
    </Canvas>
  );
};

// Main Component
const Project3DVisualization = ({ projects, theme, isDarkMode, setIsHovering }) => {
  const [activeProject, setActiveProject] = useState(0);
  const [view3D, setView3D] = useState(false);

  const currentProject = projects[activeProject];

  return (
    <div className="relative">
      {/* Toggle 3D View Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setView3D(!view3D)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`mb-8 px-6 py-3 ${theme.card} ${theme.accent} rounded-xl font-semibold shadow-lg backdrop-blur-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        {view3D ? '← Back to Grid' : '🚀 View in 3D'}
      </motion.button>

      {view3D ? (
        <div className="space-y-8">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`h-96 rounded-2xl overflow-hidden ${theme.card} ${theme.glow} shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <Project3DScene 
              projects={projects}
              activeProject={activeProject}
              setActiveProject={setActiveProject}
              isDarkMode={isDarkMode}
            />
          </motion.div>

          {/* Project Controls */}
          <div className="flex justify-center space-x-4">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeProject === index
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg'
                    : isDarkMode
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Active Project Details */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`${theme.card} p-8 rounded-2xl ${theme.glow} shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Project Info */}
              <div className="md:col-span-2">
                <h3 className={`text-2xl font-bold ${theme.text} mb-4`}>
                  {currentProject.title}
                </h3>
                <p className={`${theme.muted} mb-6 leading-relaxed`}>
                  {currentProject.description}
                </p>
                
                {/* Tech Stack */}
                <div className="space-y-2">
                  <h4 className={`${theme.text} font-semibold`}>Technology Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tech.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`px-3 py-1 text-sm bg-gradient-to-r ${currentProject.gradient} text-white rounded-full font-medium`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4">
                <motion.a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${currentProject.gradient} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`flex items-center justify-center gap-2 px-6 py-3 ${theme.card} ${theme.text} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-xl font-semibold hover:border-cyan-400 transition-all duration-300`}
                >
                  <Github className="w-5 h-5" />
                  Source Code
                </motion.button>

                {/* Project Stats */}
                <div className={`mt-4 p-4 ${theme.card} rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className={`text-lg font-bold ${theme.accent}`}>2024</div>
                      <div className={`text-xs ${theme.muted}`}>Year</div>
                    </div>
                    <div>
                      <div className={`text-lg font-bold ${theme.accent}`}>Live</div>
                      <div className={`text-xs ${theme.muted}`}>Status</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <p className={`text-sm ${theme.muted}`}>
              🎮 Click and drag to rotate • Scroll to zoom • Click cards to explore
            </p>
          </motion.div>
        </div>
      ) : (
        // Regular grid view (your existing projects layout)
        <div className="text-center">
          <p className={`${theme.muted} text-lg`}>
            Regular project grid view here...
          </p>
        </div>
      )}
    </div>
  );
};

export default Project3DVisualization;