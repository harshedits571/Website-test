
import React from 'react';
import { ResourceItem, Category } from '../types';
import TiltCard from '../components/TiltCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, DownloadCloud, Zap, Laptop, Layers } from 'lucide-react';

interface HomeProps {
  items: ResourceItem[];
}

const Home: React.FC<HomeProps> = ({ items }) => {
  const categories = Object.values(Category);
  const featured = items.find(i => i.isFeatured) || items[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div className="pt-24 md:pt-40 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
        {/* Apple Style Hero */}
        <section className="text-center mb-24 md:mb-32 relative">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border-violet-500/20 text-violet-400 text-[10px] font-bold mb-8 uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3" />
              Elite Creative Repository
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter leading-[0.9] text-white">
              ELEVATE YOUR<br />
              <span className="gradient-text italic">PRODUCTION</span>
            </h1>
            <p className="text-base md:text-xl text-gray-500 max-w-xl mx-auto mb-10 font-medium leading-relaxed px-4">
              A meticulously curated selection of scripts, plugins, and software optimized for the pro editing workflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#Software" className="w-full sm:w-auto gradient-btn text-white font-black py-4 px-10 rounded-full text-base shadow-xl">
                Start Browsing
              </a>
              <a href="https://discord.gg/y3qnSA4ZbE" className="w-full sm:w-auto glass-card text-white font-bold py-4 px-8 rounded-full text-base border-white/10 hover:bg-white/5 transition-all">
                The Community
              </a>
            </div>
          </motion.div>
        </section>

        {/* Categories Sections - High Density Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-24"
        >
          {categories.map((cat) => {
            const catItems = items.filter(i => i.category === cat);
            if (catItems.length === 0) return null;

            return (
              <section key={cat} id={cat} className="scroll-mt-32">
                <div className="flex items-center justify-between mb-8 px-2">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <Layers className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                        {cat}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 font-bold uppercase tracking-widest text-[9px] bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {catItems.length} Assets
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {catItems.map(item => (
                    <TiltCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </motion.div>

        {/* Minimal Feature Highlights */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-32 mb-32">
          {[
            { icon: DownloadCloud, title: "Pure Downloads", desc: "No redirects or ad-walls." },
            { icon: Zap, title: "Ultra Stable", desc: "Daily version integrity checks." },
            { icon: Laptop, title: "Pro Workflow", desc: "Verified on Production rigs." },
            { icon: Sparkles, title: "Exclusive", desc: "Hard-to-find community assets." }
          ].map((f, i) => (
            <motion.div 
              key={i}
              className="glass-card p-6 rounded-[1.5rem] border-white/5 flex flex-col items-center text-center group hover:bg-white/5 transition-all"
            >
              <f.icon className="w-8 h-8 text-violet-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2">{f.title}</h3>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Futuristic CTA */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-card p-12 md:p-20 rounded-[2.5rem] overflow-hidden group text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/5 to-transparent" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter">UNLEASH THE<br />CORE POTENTIAL.</h3>
            <p className="text-gray-500 text-sm md:text-xl max-w-xl mx-auto mb-10 font-medium leading-relaxed">
              Don't settle for standard. Join the hub where elite creators source their edge.
            </p>
            <a 
              href="https://discord.gg/y3qnSA4ZbE" 
              className="gradient-btn inline-flex items-center gap-3 text-white font-black py-4 px-12 rounded-full text-base group"
            >
              Get Discord Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
