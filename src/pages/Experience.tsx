import React from 'react';
import { getExperiences } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = getExperiences();

  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50%] bg-brand/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase mb-4 block">My Journey</span>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6">Experience & Education</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            A chronological look at my professional growth and academic foundations.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-10 relative px-4">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand/40 via-brand/10 to-transparent md:-translate-x-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-center gap-12 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline Icon */}
              <div className="absolute left-6 md:left-1/2 w-12 h-12 bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-800 rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 shadow-lg text-brand">
                {exp.type === 'Education' ? <GraduationCap size={22} /> : <Briefcase size={22} />}
              </div>

              {/* Spacer for MD screens */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card Content */}
              <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                <div className="glass-card p-8 border-brand/5 hover:border-brand/30 transition-all group">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-brand transition-colors tracking-tight">{exp.role}</h3>
                      <p className="text-brand font-bold text-sm">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] px-3 py-1 bg-brand/5 text-brand rounded-full border border-brand/10">
                      {exp.duration}
                    </span>
                  </div>
                  
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 font-medium">
                    {exp.description}
                  </p>

                  {exp.skills && exp.skills.length > 0 && (
                    <div>
                      <span className="text-[10px] font-black text-brand uppercase tracking-widest block mb-3">
                        Key Points & Skills
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map(skill => (
                          <span key={skill} className="px-2.5 py-1 bg-white/50 dark:bg-slate-800/50 border border-brand/20 text-[10px] font-extrabold rounded-lg text-[var(--text-secondary)] tracking-wider uppercase shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
