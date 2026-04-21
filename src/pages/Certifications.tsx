import React, { useState, useEffect } from 'react';
import { getCertifications, type Certification } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, ExternalLink, Calendar, Building2 } from 'lucide-react';

const Certifications: React.FC = () => {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertifications().then(data => {
      setCerts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const issuers = [...new Set(certs.map(c => c.issuer))];

  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-[50%] bg-brand/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        <header className="text-center flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Verification</span>
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6">Certifications</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Professional credentials and technical certifications that validate my expertise across various domains.
            </p>

            {/* Quick Stats */}
            <div className="flex gap-12 mt-12 justify-center">
                <div className="text-center">
                    <div className="text-3xl font-black gradient-text">{certs.length}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Earned</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-black gradient-text">{issuers.length}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Issuers</div>
                </div>
            </div>
          </motion.div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col gap-6 group overflow-hidden border-brand/5 hover:border-brand/30"
            >
              <div className="flex items-start gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-brand text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Award size={28} />
                  </div>
                  <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-brand uppercase tracking-widest">
                          <Building2 size={12} />
                          {cert.issuer}
                      </div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight group-hover:text-brand transition-colors">
                          {cert.name}
                      </h3>
                  </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg w-fit border border-slate-100 dark:border-slate-700 tracking-wider">
                  <Calendar size={14} className="text-brand" />
                  ISSUED {cert.date.toUpperCase()}
              </div>

              {cert.description && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-medium">
                      {cert.description}
                  </p>
              )}

              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                  {cert.credentialUrl ? (
                      <a 
                          href={cert.credentialUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-brand group-hover:translate-x-1 transition-transform"
                      >
                          Verify Credential
                          <ExternalLink size={14} />
                      </a>
                  ) : (
                      <span className="text-[10px] font-bold text-slate-300 italic flex items-center gap-1.5">
                          <ShieldCheck size={12} />
                          Verification Pending
                      </span>
                  )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
