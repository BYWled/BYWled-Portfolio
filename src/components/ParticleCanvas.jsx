import { useRef, useEffect, useCallback } from 'react';

// 粒子类
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 1.2 + 0.5;
    this.baseAlpha = 0.3 + Math.random() * 0.2;

    // 鼠标影响相关
    this.mouseInfluence = 0; // 0-1，当前受鼠标影响的程度
    this.targetMouseInfluence = 0;
  }

  update(mouseX, mouseY, isMouseInCanvas) {
    // 基础运动
    this.x += this.vx;
    this.y += this.vy;

    // 边缘反弹
    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

    // 限制在画布内
    this.x = Math.max(0, Math.min(this.canvas.width, this.x));
    this.y = Math.max(0, Math.min(this.canvas.height, this.y));

    // 计算鼠标影响
    if (isMouseInCanvas) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influenceRadius = 200;

      if (dist < influenceRadius) {
        // 在影响范围内，距离越近影响越大
        this.targetMouseInfluence = 1 - (dist / influenceRadius);

        // 轻微的排斥力，避免粒子聚集
        const force = (influenceRadius - dist) / influenceRadius * 0.3;
        const angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force * 0.1;
        this.vy += Math.sin(angle) * force * 0.1;
      } else {
        this.targetMouseInfluence = 0;
      }
    } else {
      this.targetMouseInfluence = 0;
    }

    // 平滑过渡鼠标影响
    this.mouseInfluence += (this.targetMouseInfluence - this.mouseInfluence) * 0.1;

    // 限制速度
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const maxSpeed = 1.5;
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }

    // 微小的摩擦力
    this.vx *= 0.999;
    this.vy *= 0.999;
  }

  draw(ctx) {
    // 根据鼠标影响调整透明度和大小
    const alpha = this.baseAlpha + this.mouseInfluence * 0.4;
    const radius = this.radius + this.mouseInfluence * 0.5;

    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  }
}

export function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isInCanvas: false });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const initParticles = useCallback((canvas) => {
    const particles = [];
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(canvas));
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = particlesRef.current;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = initParticles(canvas);
      particlesRef.current = particles;
    };

    resize();
    window.addEventListener('resize', resize);

    // 鼠标事件处理
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isInCanvas = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInCanvas = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // 动画循环
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY, isInCanvas } = mouseRef.current;

      // 更新和绘制粒子
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY, isInCanvas);
        particles[i].draw(ctx);
      }

      // 绘制连线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            // 基础透明度
            let alpha = (maxDist - dist) / maxDist * 0.1;

            // 如果两个粒子都受鼠标影响，增强连线
            const avgInfluence = (particles[i].mouseInfluence + particles[j].mouseInfluence) / 2;
            alpha += avgInfluence * 0.15;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5 + avgInfluence * 0.5;
            ctx.stroke();
          }
        }
      }

      // 绘制鼠标与附近粒子的连线
      if (isInCanvas) {
        for (let i = 0; i < particles.length; i++) {
          if (particles[i].mouseInfluence > 0.1) {
            const alpha = particles[i].mouseInfluence * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(0, 153, 255, ${alpha})`;
            ctx.lineWidth = particles[i].mouseInfluence * 1.5;
            ctx.stroke();
          }
        }

        // 外层大范围光晕（柔和扩散）
        const outerGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
        outerGlow.addColorStop(0, 'rgba(0, 153, 255, 0.06)');
        outerGlow.addColorStop(0.3, 'rgba(0, 153, 255, 0.03)');
        outerGlow.addColorStop(0.7, 'rgba(0, 100, 200, 0.01)');
        outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 300, 0, Math.PI * 2);
        ctx.fill();

        // 中层光晕（核心发光）
        const midGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
        midGlow.addColorStop(0, 'rgba(0, 153, 255, 0.12)');
        midGlow.addColorStop(0.5, 'rgba(0, 153, 255, 0.04)');
        midGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = midGlow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 120, 0, Math.PI * 2);
        ctx.fill();

        // 内层高亮核心
        const coreGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 40);
        coreGlow.addColorStop(0, 'rgba(120, 200, 255, 0.15)');
        coreGlow.addColorStop(0.6, 'rgba(0, 153, 255, 0.05)');
        coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ pointerEvents: 'auto' }}
    />
  );
}
