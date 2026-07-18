import { useRef, useState } from 'react';

export function TiltCard({ children, className, onClick }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY / height) - 0.5) * -10;
    const rotateY = ((mouseX / width) - 0.5) * 10;

    setRotation({ x: rotateX, y: rotateY });

    setGlowPos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-2xl transition-all duration-300 ease-out cursor-pointer ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none rounded-2xl transition-opacity duration-300 mix-blend-screen"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
