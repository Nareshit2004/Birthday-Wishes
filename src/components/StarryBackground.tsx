import React, { useEffect, useRef } from 'react';

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create particles: stars and purple dust specks
    const particleCount = Math.min(80, Math.floor((width * height) / 14000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.1, // gently float upward
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      isGold: Math.random() > 0.8,
    }));

    let step = 0;

    const render = () => {
      step++;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity =
          p.opacity * (0.6 + 0.4 * Math.sin(step * p.pulseSpeed));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.isGold) {
          ctx.fillStyle = `rgba(245, 208, 97, ${currentOpacity})`;
          ctx.shadowColor = 'rgba(245, 208, 97, 0.6)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(216, 180, 254, ${currentOpacity})`;
          ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
          ctx.shadowBlur = 6;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep purple atmospheric radial glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-900/20 blur-[130px] rounded-full" />
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-indigo-950/25 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 -right-40 w-[700px] h-[700px] bg-fuchsia-950/20 blur-[140px] rounded-full" />
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
