'use client';

import { motion } from 'framer-motion';

export default function FloatingShapes() {
  const shapes = [
    { color: 'bg-blue-400/10', size: 'w-64 h-64', top: '10%', left: '5%', delay: 0 },
    { color: 'bg-purple-400/10', size: 'w-48 h-48', top: '60%', right: '10%', delay: 2 },
    { color: 'bg-cyan-400/10', size: 'w-56 h-56', bottom: '20%', left: '15%', delay: 4 },
    { color: 'bg-pink-400/10', size: 'w-40 h-40', top: '30%', right: '20%', delay: 1 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.color} ${shape.size} rounded-full blur-3xl`}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10 + shape.delay,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
