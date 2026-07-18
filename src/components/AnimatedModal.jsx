import { useState, useEffect } from 'react';

export function AnimatedModal({ isOpen, onClose, children }) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ease-out ${isVisible ? 'bg-[#090909]/90 backdrop-blur-md opacity-100' : 'bg-transparent opacity-0'
      }`}>
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className={`relative w-full max-w-xl transition-all duration-300 ease-out ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}>
        {children}
      </div>
    </div>
  );
}
