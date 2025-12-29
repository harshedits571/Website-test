
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Disc as Discord, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchTerm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            pointer-events-auto
            glass-card rounded-[2rem] px-4 md:px-8 py-3 flex items-center justify-between gap-4
            transition-all duration-500 ease-apple
            ${isScrolled ? 'mx-auto max-w-2xl' : 'w-full'}
          `}
        >
          <Link to="/" className="text-xl font-black text-white flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs group-hover:rotate-12 transition-transform">HE</span>
            <span className="hidden sm:inline">Harsh<span className="text-violet-400">Edits</span></span>
          </Link>
          
          <div className="hidden md:flex flex-1 max-w-sm relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search assets..."
              className="w-full bg-white/5 border border-white/5 rounded-full py-2 px-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-1 mr-4">
              {['Software', 'Plugins', 'Scripts'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {item}
                </a>
              ))}
            </nav>

            <Link 
              to="/admin" 
              className={`p-2 rounded-full hover:bg-white/10 transition-colors ${location.pathname === '/admin' ? 'text-violet-400' : 'text-gray-400'}`}
              title="Admin Dashboard"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

            <a 
              href="https://discord.gg/y3qnSA4ZbE" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:flex items-center gap-2 gradient-btn text-white font-bold py-2 px-5 rounded-full text-xs"
            >
              <Discord className="w-4 h-4" />
              Join
            </a>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-auto absolute top-24 left-4 right-4 glass-card p-6 rounded-3xl md:hidden"
          >
            <div className="flex flex-col gap-4 text-center">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-white focus:outline-none"
              />
              <div className="h-px bg-white/5 my-2" />
              {['Software', 'Plugins', 'Scripts'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-gray-300 hover:text-white"
                >
                  {item}
                </a>
              ))}
              <a href="https://discord.gg/y3qnSA4ZbE" className="gradient-btn py-4 rounded-2xl font-bold">Discord Community</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
