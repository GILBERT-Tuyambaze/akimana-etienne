import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedStatsProps {
  stats: Array<{
    label: string;
    value: number;
    suffix?: string;
    icon?: string;
  }>;
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCounts((prev) => {
              const newCounts = [...prev];
              newCounts[index] = end;
              return newCounts;
            });
            clearInterval(timer);
          } else {
            setCounts((prev) => {
              const newCounts = [...prev];
              newCounts[index] = Math.floor(start);
              return newCounts;
            });
          }
        }, 16);

        return () => clearInterval(timer);
      });
    }
  }, [inView, stats]);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="text-center"
        >
          {stat.icon && <div className="text-4xl mb-2">{stat.icon}</div>}
          <div className="text-3xl md:text-4xl font-bold text-purple-600">
            {counts[index]}
            {stat.suffix}
          </div>
          <div className="text-sm md:text-base text-gray-600 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}