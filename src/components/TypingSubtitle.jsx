import { useState, useEffect } from 'react';

const TEXTS = [
  "这是伴莺的个人前端研发项目。从原生DOM到全栈大屏，探索前端、持续集成与性能的边界。",
  "This is BYWled's personal front-end matrix. From native DOM to full-stack big screens, exploring the boundaries of front-end, CI/CD, and performance.",
];

export function TypingSubtitle() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentFullText = TEXTS[textIndex];
    let typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentFullText.length) {
      typingSpeed = 3000;
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % TEXTS.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      setDisplayText(currentFullText.substring(0, charIndex + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <p className="text-sm sm:text-lg lg:text-xl text-[#999999] tracking-tight max-w-2xl mx-auto leading-relaxed h-[60px] flex items-center justify-center">
      <span>{displayText}</span>
      <span className="w-1.5 h-5 bg-[#0099ff] ml-1 animate-pulse"></span>
    </p>
  );
}
