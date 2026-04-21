import React, { useState, useEffect } from 'react';
import { getProjects, type Project } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

const Categories = ['All', 'Web', 'Cloud', 'Mobile', 'AI/ML', 'Other'] as const;

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof Categories[number]>('All');
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getProjects().then(data => {
      setAllProjects(data);
      setLoading(false);
    });
  }, []);
  
  const filteredProjects = activeTab === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeTab);

  if (loading) {
    return (
      <div className="container mx-auto px-6 lg:px-12 py-32 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      <header className="mb-16">
        <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex flex-col gap-4 text-center items-center"
        >
          <span className="text-brand font-black uppercase tracking-[0.3em] text-xs">Portfolio</span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter">My Projects</h1>
          <p className="text-text-secondary max-w-xl text-lg mt-2">
            A comprehensive showcase of my work, ranging from complex full-stack applications to scalable cloud architectures.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-12 bg-bg-card/50 p-1.5 rounded-2xl border border-border w-fit mx-auto backdrop-blur-md">
          {Categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === cat 
                  ? 'bg-grad-primary text-white shadow-lg scale-105' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-glass'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <motion.div 
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-bg-card/30 rounded-3xl border-2 border-dashed border-border"
        >
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold text-text-primary">No projects found in this category</h3>
          <p className="text-text-muted mt-2">I'm currently working on more projects. Stay tuned!</p>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
