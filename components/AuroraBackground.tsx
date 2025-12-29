import React, { useEffect, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// Fixed: Separate component for individual orbs to follow Rules of Hooks
const Orb: React.FC<{ orb: any; springX: any; springY: any; i: number }> = ({ orb, springX, springY, i }) => {
  return (
    <motion.div 
      className={`absolute rounded-full blur-[140px] opacity-[0.08] ${orb.color} ${orb.size}`}
      style={{
        left: orb.initialPos.x,
        top: orb.initialPos.y,
        translateX: springX,
        translateY: springY,
      }}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 10 + i * 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const AuroraBackground: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const orbs = useMemo(() => [
    { color: 'bg-violet-600', size: 'w-[800px] h-[800px]', initialPos: { x: '10%', y: '10%' } },
    { color: 'bg-fuchsia-600', size: 'w-[600px] h-[600px]', initialPos: { x: '60%', y: '40%' } },
    { color: 'bg-indigo-600', size: 'w-[700px] h-[700px]', initialPos: { x: '20%', y: '70%' } },
  ], []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none bg-black">
      {orbs.map((orb, i) => (
        <Orb key={i} orb={orb} springX={springX} springY={springY} i={i} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
};

export default AuroraBackground;