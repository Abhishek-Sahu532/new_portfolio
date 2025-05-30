import { User, Briefcase, FolderOpen, Code2, Award, Mail, Globe, Database, Cpu } from 'lucide-react';

// Enhanced theme colors
export const themes = {
  dark: {
    bg: 'from-gray-900 via-slate-900 to-black',
    text: 'text-gray-100',
    accent: 'text-cyan-400',
    secondary: 'text-purple-400',
    muted: 'text-gray-400',
    card: 'bg-gray-800/30 backdrop-blur-xl border-gray-700/50',
    nav: 'bg-gray-900/80 backdrop-blur-xl border-gray-800/50',
    glow: 'shadow-cyan-500/20',
    highlight: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20'
  },
  light: {
    bg: 'from-slate-50 via-blue-50 to-white',
    text: 'text-gray-900',
    accent: 'text-blue-600',
    secondary: 'text-purple-600',
    muted: 'text-gray-600',
    card: 'bg-white/70 backdrop-blur-xl border-gray-200/50',
    nav: 'bg-white/80 backdrop-blur-xl border-gray-200/50',
    glow: 'shadow-blue-500/20',
    highlight: 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
  }
};

// Advanced section backgrounds with smooth transitions
export const sectionBackgrounds = {
  home: {
    dark: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    light: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    overlay: { dark: 'rgba(17, 24, 39, 0.8)', light: 'rgba(248, 250, 252, 0.8)' },
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
  },
  about: {
    dark: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    light: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    overlay: { dark: 'rgba(30, 41, 59, 0.85)', light: 'rgba(239, 246, 255, 0.8)' },
    gradient: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
  },
  experience: {
    dark: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    light: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    overlay: { dark: 'rgba(17, 24, 39, 0.85)', light: 'rgba(248, 250, 252, 0.8)' },
    gradient: 'linear-gradient(60deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
  },
  projects: {
    dark: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    light: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    overlay: { dark: 'rgba(15, 23, 42, 0.8)', light: 'rgba(241, 245, 249, 0.8)' },
    gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
  },
  skills: {
    dark: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    light: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    overlay: { dark: 'rgba(0, 0, 0, 0.75)', light: 'rgba(255, 255, 255, 0.8)' },
    gradient: 'linear-gradient(45deg, rgba(245, 101, 101, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
  },
  certifications: {
    dark: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    light: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    overlay: { dark: 'rgba(30, 41, 59, 0.8)', light: 'rgba(248, 250, 252, 0.8)' },
    gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
  },
  contact: {
    dark: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    light: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333',
    overlay: { dark: 'rgba(17, 24, 39, 0.85)', light: 'rgba(239, 246, 255, 0.8)' },
    gradient: 'linear-gradient(45deg, rgba(6, 182, 212, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
  }
};

// Navigation items
export const navItems = [
  { id: 'home', label: 'Home', icon: User },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail }
];

// Experience data
export const experiences = [
  {
    title: 'Full Stack Engineer',
    company: 'Hunkaar Labs',
    location: 'Bhopal',
    duration: '01/2025 – Present',
    type: 'Full Time',
    description: [
      'Developed robust full-stack applications leveraging React, Node.js, Ruby',
      'Implemented responsive design principles and modern UI frameworks',
      'Architected and maintained RESTful APIs for seamless integration',
      'Collaborated with cross-functional teams to translate business requirements'
    ],
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'MERN Full Stack Developer',
    company: 'Worldsoft IT Solution Pvt. Ltd',
    location: 'Bhopal',
    duration: '01/2022 – 01/2025',
    type: 'Full Time',
    description: [
      'Developed and managed databases using Node.js and both SQL and NoSQL technologies',
      'Designed and built app solutions with JavaScript, React.js, CSS, and HTML',
      'Maintained complex technology infrastructure, ensuring high availability',
      'Implemented automated build and deployment pipelines'
    ],
    gradient: 'from-green-500 to-teal-500'
  },
  {
    title: 'Trainee Software Developer',
    company: 'Worldsoft IT Solution Pvt. Ltd',
    location: 'Bhopal',
    duration: '08/2021 – 12/2021',
    type: 'Training',
    description: [
      'Coordinated project tasks across multiple departments',
      'Handled scripting tasks for debugging and automation',
      'Partnered with team members to learn best practices',
      'Fostered continuous improvement in software design'
    ],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'MIS Executive',
    company: 'Ramani Ice-cream Co. Ltd',
    location: 'Bhopal',
    duration: '01/2019 – 07/2021',
    type: 'Full Time',
    description: [
      'Developed comprehensive management information systems',
      'Generated insightful reports with pivot tables and visualizations',
      'Drove strategic business decisions and optimized performance metrics',
      'Maintained data integrity and system reliability'
    ],
    gradient: 'from-orange-500 to-red-500'
  }
];

// Certifications data
export const certifications = [
  {
    title: 'Full-Stack Web Development',
    issuer: 'AlmaBetter',
    date: '2022',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Front-End Web Development',
    issuer: 'Devsnest',
    date: '2021',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Back-End Web Development',
    issuer: 'Devsnest',
    date: '2021',
    skills: ['Node.js', 'Express', 'Database Design', 'API Development'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Responsive Web Design',
    issuer: 'Freecodecamp',
    date: '2021',
    skills: ['CSS Grid', 'Flexbox', 'Mobile First', 'Bootstrap'],
    color: 'from-orange-500 to-red-500'
  }
];

// Projects data
export const projects = [
  {
    title: 'Kikker - AI Resume Enhancement',
    description: 'AI-powered browser extension for real-time resume optimization and ATS score analysis',
    tech: ['React', 'Python', 'AI/ML', 'Browser Extension'],
    url: 'https://getkikker.com/',
    gradient: 'from-cyan-500 via-blue-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
  },
  {
    title: 'Auction Hub India',
    description: 'Comprehensive auction platform with real-time bidding and payment processing',
    tech: ['React', 'Node.js', 'Python', 'MongoDB'],
    url: 'https://auctionhubindia.com/',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
  },
  {
    title: 'VidStream',
    description: 'Video streaming platform with user interactions and viewing history',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    url: 'https://vid-stream-client.vercel.app/',
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
  }
];

// Skills data
export const skills = {
  frontend: {
    title: 'Frontend',
    icon: Globe,
    skills: ['React.js', 'Redux', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind', 'Stimulus.js'],
    color: 'from-blue-500 to-cyan-500'
  },
  backend: {
    title: 'Backend',
    icon: Database,
    skills: ['Node.js', 'Express.js', 'Ruby on Rails', 'Python', 'REST API'],
    color: 'from-green-500 to-teal-500'
  },
  database: {
    title: 'Database',
    icon: Cpu,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    color: 'from-purple-500 to-pink-500'
  },
  tools: {
    title: 'Tools',
    icon: Code2,
    skills: ['Git', 'Docker', 'VS Code', 'Postman', 'Webpack'],
    color: 'from-orange-500 to-red-500'
  }
};