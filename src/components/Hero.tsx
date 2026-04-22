import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Typewriter from './Typewriter';

const Hero: React.FC = () => {
  const techStack = [
    { name: 'React.js', icon: '⚛️' },
    { name: 'HTML', icon: '🌐' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'JavaScript', icon: '⚡' }
  ];

  const heroPhrases = [
    "Computer Engineer ",
    "Full Stack Professional",
    "Tech Explorer",
    "Cloud Enthusiast"
  ];

  return (
    <section className="relative min-h-[100dvh] lg:min-h-[92vh] flex items-start lg:items-center justify-center pt-32 lg:pt-24 pb-12 overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

          {/* Left: Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-8 border-brand/20 bg-white/50">
              <span className="text-brand font-bold text-xs sm:text-base whitespace-normal sm:whitespace-nowrap">
                👋 Hi, I'm Lucky Shrestha — NEC Certified Computer Engineer
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[5.5rem] font-black mb-8 leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              <span className="gradient-text">
                <Typewriter phrases={heroPhrases} delay={2500} />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Graduated Computer Engineer from Tribhuvan University, IOE.
              NEC Certified professional passionate about building modern web
              applications and scalable cloud solutions. Turning ideas into
              reality, one line of code at a time.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-16">
              <a href="/contact" className="btn btn-primary h-12 px-8">
                Contact Me <ArrowRight size={18} />
              </a>
              <a href="/assets/Updated%20Resume.pdf" download="Lucky_Shrestha_Resume.pdf" className="btn btn-secondary h-12 px-8">
                <Download size={18} /> Download Resume
              </a>
            </div>

            {/* Stats Row */}
            <div className="hero-stats justify-center lg:justify-start">
              <div className="stat-item">
                <span className="stat-value">5+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
              <div className="stat-item">
                <span className="stat-value">1+</span>
                <span className="stat-label">Years Exp.</span>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
              <div className="stat-item">
                <span className="stat-value">5+</span>
                <span className="stat-label">Certifications</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual Card */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-center mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Profile Card */}
              <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] h-80 sm:h-[30rem] rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">

                <img
                  src="/assets/PORTFOLIO.jpeg"
                  alt="Lucky Shrestha"
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>

              </div>

              {/* Scroll Indicator (as seen in screenshot) */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1">
                  <motion.div
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                    animate={{ y: [0, 16, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Scroll</span>
              </div>
            </div>

            {/* Tech Strip */}
            <div className="mt-20 flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:border-brand/40 transition-all cursor-default"
                >
                  <span className="text-base">{tech.icon}</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
