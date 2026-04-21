import React from 'react';
import type { Project } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card overflow-hidden flex flex-col h-full border-brand/5 shadow-sm hover:shadow-xl group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60';
          }}
        />
        <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold text-brand uppercase tracking-widest px-2 py-0.5 rounded bg-brand/5 border border-brand/10">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 group-hover:text-brand transition-colors tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-[var(--text-secondary)] text-sm mb-6 flex-grow leading-relaxed font-medium">
          {project.description}
        </p>

        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, i) => (
              <span 
                key={i} 
                className="text-[10px] font-bold text-[var(--text-muted)] bg-bg p-1.5 px-2.5 rounded-lg border border-border group-hover:border-brand/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-brand/5">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[var(--text-muted)] font-bold text-xs hover:text-brand transition-colors"
            >
              <Github size={16} /> Code
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-brand font-bold text-xs hover:opacity-80 transition-all ml-auto bg-brand/5 px-3 py-1.5 rounded-lg border border-brand/10"
            >
              Demo <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
