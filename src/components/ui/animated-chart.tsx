import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface AnimatedChartProps {
  data: DataPoint[];
  title?: string;
}

export function AnimatedChart({ data, title }: AnimatedChartProps) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!inView || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = (width - 80) / data.length;
    const padding = 60;

    let animationProgress = 0;
    const animationDuration = 2000;
    const startTime = Date.now();

    function animate() {
      if (!ctx || !canvas) return;

      const elapsed = Date.now() - startTime;
      animationProgress = Math.min(elapsed / animationDuration, 1);

      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padding + (height - padding * 2) * (i / 5);
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();

        // Draw y-axis labels
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        const value = Math.round(maxValue * (1 - i / 5));
        ctx.fillText(value.toString(), 35, y + 4);
      }

      // Draw bars with animation
      data.forEach((item, index) => {
        const x = 50 + index * barWidth + barWidth * 0.2;
        const barHeight = ((height - padding * 2) * item.value / maxValue) * animationProgress;
        const y = height - padding - barHeight;

        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
        gradient.addColorStop(0, item.color);
        gradient.addColorStop(1, item.color + '80');

        // Draw bar with rounded top
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth * 0.6, barHeight, [8, 8, 0, 0]);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = item.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw value on top of bar
        if (animationProgress > 0.8) {
          ctx.fillStyle = '#1f2937';
          ctx.font = 'bold 14px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(item.value.toString(), x + barWidth * 0.3, y - 10);
        }

        // Draw labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(x + barWidth * 0.3, height - padding + 20);
        ctx.rotate(-Math.PI / 6);
        ctx.fillText(item.label, 0, 0);
        ctx.restore();
      });

      if (animationProgress < 1) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  }, [inView, data]);

  return (
    <div ref={ref} className="w-full">
      {title && <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">{title}</h4>}
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: '300px' }}
      />
    </div>
  );
}