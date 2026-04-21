import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  phrases, 
  className = "", 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  delay = 2000 
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(typeSpeed);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting 
          ? fullText.substring(0, text.length - 1) 
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? deleteSpeed : typeSpeed);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, phrases, loopNum, typingSpeed, typeSpeed, deleteSpeed, delay]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-1 h-[1em] bg-brand ml-1 animate-pulse" />
    </span>
  );
};

export default Typewriter;
