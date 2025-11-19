import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SkillBarProps {
  skill: string;
  percentage: number;
  color?: string;
  delay?: number;
}

export function SkillBar({ skill, percentage, color = 'bg-gradient-to-r from-purple-600 to-cyan-600', delay = 0 }: SkillBarProps) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, percentage, delay]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm md:text-base font-semibold text-gray-700">{skill}</span>
        <span className="text-sm md:text-base font-bold text-purple-600">{percentage}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${width}%` : 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full relative`}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </motion.div>
      </div>
    </div>
  );
}