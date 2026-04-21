import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60%] bg-gradient-to-b from-brand/5 to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        {/* Centered Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Who I Am</span>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6">About Me</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            A passionate engineer crafting digital experiences with modern technologies.
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left: Image */}
          <motion.div 
            className="w-full lg:w-[45%]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand/5 rounded-[3rem] blur-2xl group-hover:bg-brand/10 transition-all duration-500" />
              <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl skew-y-1 group-hover:skew-y-0 transition-all duration-700">
                <img 
                  src="/assets/PORTFOLIO.jpeg" 
                  alt="Lucky Shrestha" 
                  className="w-full object-cover aspect-[4/5]"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div 
            className="w-full lg:w-[55%] space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Passionate about building <br />
              <span className="gradient-text underline decoration-brand/20 underline-offset-8">meaningful software</span>
            </h3>
            
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              <p>
                I'm a graduated Computer Engineer from Tribhuvan University, 
                Institute of Engineering, and a Nepal Engineering Council (NEC) 
                certified professional with a deep passion for full-stack web 
                development, cloud technologies, and creating impactful digital 
                solutions.
              </p>
              <p>
                I specialize in building sleek, responsive interfaces and scalable 
                applications using modern stacks. My focus is on turning complex 
                problems into simple, beautiful, and efficient software that delivers real 
                value to users.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-6 glass-card border-brand/10 hover:border-brand/30 transition-all">
                <div className="text-3xl font-bold text-brand mb-1">5+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strategic Projects</div>
              </div>
              <div className="p-6 glass-card border-brand/10 hover:border-brand/30 transition-all">
                <div className="text-3xl font-bold text-brand mb-1">1+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
