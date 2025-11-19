import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface LineChartAnimatedProps {
  data: number[];
  labels: string[];
  color?: string;
  title?: string;
}

export function LineChartAnimated({ 
  data, 
  labels, 
  color = '#8b5cf6',
  title 
}: LineChartAnimatedProps) {
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
    const padding = 50;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;

    let animationProgress = 0;
    const animationDuration = 2500;
    const startTime = Date.now();

    // Moving dot animation
    let dotPosition = 0;

    function animate() {
      if (!ctx || !canvas) return;

      const elapsed = Date.now() - startTime;
      animationProgress = Math.min(elapsed / animationDuration, 1);

      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padding + (height - padding * 2) * (i / 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
      }

      // Calculate points
      const points: { x: number; y: number }[] = [];
      const segmentWidth = (width - padding - 20) / (data.length - 1);

      data.forEach((value, index) => {
        const x = padding + index * segmentWidth;
        const normalizedValue = (value - minValue) / range;
        const y = height - padding - normalizedValue * (height - padding * 2);
        points.push({ x, y });
      });

      // Draw animated line
      const visiblePoints = Math.floor(points.length * animationProgress);
      
      if (visiblePoints > 1) {
        // Draw gradient area under line
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, color + '40');
        gradient.addColorStop(1, color + '00');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(points[0].x, height - padding);
        for (let i = 0; i < visiblePoints; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineTo(points[visiblePoints - 1].x, height - padding);
        ctx.closePath();
        ctx.fill();

        // Draw line
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < visiblePoints; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        // Draw points
        points.slice(0, visiblePoints).forEach((point, index) => {
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });

        // Animated moving dot
        if (animationProgress === 1) {
          dotPosition = (dotPosition + 0.02) % 1;
          const currentIndex = Math.floor(dotPosition * (points.length - 1));
          const nextIndex = Math.min(currentIndex + 1, points.length - 1);
          const t = (dotPosition * (points.length - 1)) % 1;

          const x = points[currentIndex].x + (points[nextIndex].x - points[currentIndex].x) * t;
          const y = points[currentIndex].y + (points[nextIndex].y - points[currentIndex].y) * t;

          // Glowing dot
          ctx.shadowColor = color;
          ctx.shadowBlur = 20;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Pulse ring
          ctx.strokeStyle = color + '60';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw labels
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      labels.forEach((label, index) => {
        if (index % Math.ceil(labels.length / 6) === 0) {
          const x = padding + index * segmentWidth;
          ctx.fillText(label, x, height - 20);
        }
      });

      // Draw y-axis values
      ctx.textAlign = 'right';
      for (let i = 0; i <= 5; i++) {
        const value = maxValue - (range * i / 5);
        const y = padding + (height - padding * 2) * (i / 5);
        ctx.fillText(Math.round(value).toString(), padding - 10, y + 4);
      }

      if (animationProgress < 1 || dotPosition > 0) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  }, [inView, data, labels, color]);

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