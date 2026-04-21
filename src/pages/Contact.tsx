import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'luckystha92@gmail.com',
      link: 'mailto:luckystha92@gmail.com',
      sub: 'Available for freelance'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'in/luckyshrestha',
      link: 'https://linkedin.com/in/luckyshrestha',
      sub: 'Let\'s connect professionally'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Kathmandu, Nepal',
      link: '#',
      sub: 'Open to remote work'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl pt-24">
      <div className="mb-16 text-center">
        <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex flex-col gap-4 items-center"
        >
          <span className="text-brand font-black uppercase tracking-[0.3em] text-xs">Get In Touch</span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter">Let's Work Together</h1>
          <p className="text-text-secondary max-w-xl text-lg mt-2">
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative projects.
          </p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Contact info cards */}
        <div className="lg:col-span-2 space-y-6">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-start gap-5 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-brand/40 transition-all hover:shadow-lg hover:-translate-y-1 block"
            >
              <div className="p-3.5 rounded-xl bg-brand/5 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">{item.label}</h3>
                <p className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-brand transition-colors">{item.value}</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">{item.sub}</p>
              </div>
            </motion.a>
          ))}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl bg-grad-primary text-white space-y-4 shadow-xl"
          >
            <MessageSquare className="w-10 h-10 opacity-50" />
            <h3 className="text-xl font-bold">Why collaborate?</h3>
            <p className="text-white/80 leading-relaxed">
              I bring a blend of technical expertise in Full Stack Development and AI/ML, combined with a passion for building scalable, user-centric solutions.
            </p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 p-8 md:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] shadow-xl relative overflow-hidden"
        >
          <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6 relative z-10">
            <input type="hidden" name="access_key" value="9356458b-b1b8-48be-8757-89017e250bad" />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--text-secondary)] ml-1 group-focus-within:text-brand">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="John Doe" 
                  required 
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all text-[var(--text-primary)]" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--text-secondary)] ml-1 ">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="john@example.com" 
                  required 
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all text-[var(--text-primary)]" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[var(--text-secondary)] ml-1 ">Subject</label>
              <input 
                type="text" 
                name="subject" 
                placeholder="How can I help you?" 
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all text-[var(--text-primary)]" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[var(--text-secondary)] ml-1">Your Message</label>
              <textarea 
                name="message" 
                rows={5} 
                placeholder="Tell me about your project details..." 
                required 
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all text-[var(--text-primary)] resize-none"
              ></textarea>
            </div>

            <button type="submit" className="group btn w-full py-5 text-lg bg-brand text-white rounded-xl font-bold shadow-lg shadow-brand/20 hover:shadow-brand/40 transition-all flex items-center justify-center gap-3 overflow-hidden relative">
              <span className="relative z-10">Send Message</span>
              <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <div className="absolute inset-0 bg-grad-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
