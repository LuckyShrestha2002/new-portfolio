import React from 'react';
import { Mail, Instagram, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const socials = [
    { icon: <Instagram size={20} />, link: 'https://www.instagram.com/luckyshrestha.05', color: 'hover:text-pink-500' },
    { icon: <Github size={20} />, link: 'https://github.com/LuckyShrestha2002', color: 'hover:text-gray-800 dark:hover:text-white' },
    { icon: <Linkedin size={20} />, link: 'https://www.linkedin.com/in/luckyshrestha', color: 'hover:text-blue-600' },
  ];

  return (
    <footer className="mt-20 border-t border-border bg-bg-card/30 py-12">
      <div className="container mx-auto px-6 flex flex-col items-center gap-8">
        <div className="flex items-center gap-2 text-text-secondary bg-bg-card border border-border px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
          <Mail size={18} className="text-brand" />
          <a href="mailto:luckystha92@gmail.com" className="text-sm font-semibold hover:text-brand transition-colors">
            luckystha92@gmail.com
          </a>
        </div>

        <div className="flex gap-4">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 flex items-center justify-center rounded-full bg-bg-card border border-border text-text-muted transition-all duration-300 hover:scale-110 hover:shadow-glow ${social.color}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="text-center">
          <p className="text-text-muted text-sm flex items-center justify-center gap-1">
            © {new Date().getFullYear()} <span className="font-bold text-text-primary">Copyright. All rights reserved.</span>
          </p>
          <div className="mt-2 h-1 w-20 bg-grad-primary mx-auto rounded-full opacity-50"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
