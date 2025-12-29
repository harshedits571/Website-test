
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ResourceItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface TiltCardProps {
  item: ResourceItem;
}

const TiltCard: React.FC<TiltCardProps> = ({ item }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="perspective-2000 h-full"
    >
      <Link to={`/item/${item.id}`} className="block h-full">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative glass-card p-3 h-full rounded-[1.5rem] group cursor-pointer border-white/5 hover:border-white/20 transition-all duration-300"
        >
          <div className="flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
            <div className="relative mb-3 aspect-square overflow-hidden rounded-[1rem]">
              <motion.img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover shadow-lg transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="px-1 flex-1 flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[8px] font-black uppercase tracking-[0.15em] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full truncate">
                  {item.category}
                </span>
              </div>
              <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight line-clamp-1 group-hover:text-violet-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-[10px] md:text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          </div>

          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-[1.5rem]"
            style={{ 
              background: "radial-gradient(circle at center, white, transparent 70%)",
              transform: "translateZ(5px)"
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default TiltCard;
