import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ResourceItem } from '../types';
import { ChevronLeft, Download, Info, CheckCircle2, Sparkles, Wand2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ItemDetailProps {
  items: ResourceItem[];
}

const ItemDetail: React.FC<ItemDetailProps> = ({ items }) => {
  const { id } = useParams<{ id: string }>();
  const item = items.find(i => i.id === id);
  const [insight, setInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Added: Gemini integration to provide AI-powered expert insights for assets
  const generateInsight = async () => {
    if (!item) return;
    setLoadingInsight(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a professional "pro-tip" or secret workflow trick for using ${item.title} in After Effects or Video Production. Focus on speed and efficiency. Keep it under 35 words. Description: ${item.description}`,
        config: {
          systemInstruction: "You are an elite motion graphics artist and technical director who helps other editors maximize their productivity.",
          temperature: 0.8,
        }
      });
      setInsight(response.text || '');
    } catch (error) {
      console.error("Gemini Error:", error);
      setInsight("Maximize your workflow by organizing your project structure before importing assets and utilizing pre-comps for complex effects.");
    } finally {
      setLoadingInsight(false);
    }
  };

  if (!item) {
    return (
      <div className="pt-40 text-center min-h-[70vh]">
        <h2 className="text-4xl font-black text-white mb-4">404: Hub Empty</h2>
        <p className="text-gray-500 mb-8">The asset you're looking for doesn't exist.</p>
        <Link to="/" className="gradient-btn text-white font-bold py-4 px-10 rounded-full inline-block">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-40 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card hover:bg-white/5 transition-all text-sm font-bold text-gray-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
            Back to Directory
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-start">
          {/* Asset Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass-card p-4 rounded-[2.5rem] overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full aspect-square object-cover rounded-[1.8rem] shadow-2xl" />
            </div>
            
            <div className="glass-card p-8 rounded-[2rem] border-white/5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-violet-400" />
                Asset Properties
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Stability</span>
                  <span className="text-green-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Tested</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Support</span>
                  <span className="text-white font-bold">24/7 (Discord)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">License</span>
                  <span className="text-white font-bold">Free Community Use</span>
                </div>
              </div>
            </div>

            {/* AI Insight Box using Gemini API */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 rounded-[2rem] border-violet-500/20 bg-violet-500/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-12 h-12 text-violet-400" />
              </div>
              <h4 className="text-violet-400 font-black text-[10px] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <Wand2 className="w-3 h-3" />
                AI Production Tip
              </h4>
              {insight ? (
                <p className="text-gray-300 text-xs italic leading-relaxed font-medium">"{insight}"</p>
              ) : (
                <button 
                  onClick={generateInsight}
                  disabled={loadingInsight}
                  className="text-white text-xs font-bold hover:text-violet-400 transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-300"
                >
                  {loadingInsight ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-violet-500 rounded-full animate-ping" />
                      Analyzing workflow...
                    </div>
                  ) : "Reveal Pro Secret"}
                </button>
              )}
            </motion.div>
          </motion.div>

          {/* Asset Description & Downloads */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 md:p-16 rounded-[3rem] border-white/5"
          >
            <div className="mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-black tracking-widest uppercase mb-4">
                {item.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                {item.title}
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
                {item.description}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Select Version</h3>
              <div className="grid gap-4">
                {item.versions.map((ver, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    className="glass-card bg-white/5 p-6 rounded-[1.8rem] flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-white/10 transition-all cursor-default border-white/5"
                  >
                    <div className="text-center sm:text-left">
                      <p className="text-white font-bold text-xl mb-1">{ver.name}</p>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{ver.desc || 'Verified Production Build'}</p>
                    </div>
                    <a 
                      href={ver.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full sm:w-auto gradient-btn text-white font-bold py-4 px-10 rounded-2xl flex items-center justify-center gap-2 shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      Get Version
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;