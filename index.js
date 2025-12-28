import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ChevronUp, Download, Monitor, Shield, Zap, Layers, Box, PenTool, Command, Grid, ExternalLink, Menu, User, Lock, ArrowRight, Heart, Trash2, Plus, CheckCircle, LogOut } from 'lucide-react';

/**
 * HARSH EDITS RESOURCE HUB - REACT REWRITE
 * * Features:
 * - Single file architecture
 * - Dynamic data rendering with LocalStorage Persistence
 * - Admin Mode: Add/Delete items directly
 * - State-driven navigation (SPA feel)
 * - Custom CSS animations and Glassmorphism
 */

// --- DATA CONSTANTS (Initial Data) ---

const INITIAL_SOFTWARE_DATA = [
  { id: 'after-effects', title: 'After Effects', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg', desc: 'Motion graphics and visual effects', versions: [
      { year: '2025', desc: 'Latest Version', url: '#' }, { year: '2024', desc: 'Stable Release', url: '#' }
  ]},
  { id: 'premiere-pro', title: 'Premiere Pro', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg', desc: 'Professional video editing', versions: [
      { year: '2025', desc: 'Latest Version', url: '#' }, { year: '2024', desc: 'Stable Version', url: '#' }
  ]},
  { id: 'photoshop', title: 'Photoshop', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg', desc: 'Image editing and graphic design', versions: [
      { year: '2025', desc: 'Latest Release', url: '#' }
  ]},
];

const INITIAL_PLUGINS_DATA = [
  { id: 'Mocha Pro', title: 'Mocha Pro', desc: 'Planar motion tracking & rotoscoping.', img: 'https://placehold.co/100x100/2a1b3d/ffffff?text=Mocha', versions: [{ name: '2025', url: '#' }] },
  { id: 'sapphire', title: 'Sapphire Suite', desc: 'Essential VFX plugins & effects.', img: 'https://placehold.co/100x100/1e3a8a/ffffff?text=Sapphire', versions: [{ name: '2026', url: '#' }] },
  { id: 'bcc', title: 'BCC Suite', desc: 'Comprehensive visual effects package.', img: 'https://placehold.co/100x100/b91c1c/ffffff?text=BCC', versions: [{ name: '2026', url: '#' }] },
  { id: 'magic-bullet', title: 'Magic Bullet', desc: 'Color correction & finishing tools.', img: 'https://placehold.co/100x100/c2410c/ffffff?text=MB', versions: [{ name: 'v16', url: '#' }] },
  { id: 'deep-glow', title: 'Deep Glow', desc: 'Physically accurate, beautiful glows.', img: 'https://placehold.co/100x100/3b82f6/ffffff?text=Glow', versions: [{ name: 'v2', url: '#' }] },
  { id: 'element-3d', title: 'Element 3D', desc: 'Fast 3D render engine for AE.', img: 'https://placehold.co/100x100/4c1d95/ffffff?text=E3D', versions: [{ name: 'v2.2', url: '#' }] },
  { id: 'saber', title: 'Saber', desc: 'High-energy beams and light effects.', img: 'https://placehold.co/100x100/ef4444/ffffff?text=Saber', versions: [{ name: 'v1.0', url: '#' }] },
];

const INITIAL_SCRIPTS_DATA = [
  { id: 'motion-bro', title: 'Motion Bro', desc: 'Popular extension for presets.', img: 'https://placehold.co/100x100/831843/ffffff?text=Bro', versions: [{ name: 'v4', url: '#' }] },
  { id: 'flow', title: 'Flow', desc: 'Easy animation curve control.', img: 'https://placehold.co/100x100/0f766e/ffffff?text=Flow', versions: [{ name: 'v1.5', url: '#' }] },
  { id: 'geolayers', title: 'GEOlayers 3', desc: 'Map animation & data viz.', img: 'https://placehold.co/100x100/1e40af/ffffff?text=GEO', versions: [{ name: 'v1.14', url: '#' }] },
  { id: 'atomx', title: 'AtomX', desc: 'Extension for motion graphics packs.', img: 'https://placehold.co/100x100/5b21b6/ffffff?text=AtomX', versions: [{ name: 'v3.9', url: '#' }] },
];

const INITIAL_ASSETS_DATA = [
  { id: 'malice', title: 'Malice Ultimate Pack', desc: 'Light leaks, dust, grain.', url: '#' },
  { id: 'sfx', title: 'Sound FX Library', desc: 'Whooshes, impacts, risers.', url: '#' },
  { id: 'luts', title: 'LUTs Collection', desc: 'Cinematic color grading.', url: '#' },
];

const INITIAL_UTILITIES_DATA = [
  { id: 'topaz', title: 'Topaz AI Suite', desc: 'AI image/video enhancement.', img: 'https://placehold.co/100x100/d97706/ffffff?text=Topaz', versions: [{ name: 'v3.1', url: '#' }] },
  { id: 'filmora', title: 'Filmora 14', desc: 'AI-powered simple editing.', img: 'https://placehold.co/100x100/0891b2/ffffff?text=Filmora', versions: [{ name: 'v14', url: '#' }] },
  { id: 'idm', title: 'IDM (Cracked)', desc: 'Internet Download Manager.', img: 'https://placehold.co/100x100/15803d/ffffff?text=IDM', versions: [{ name: 'v6.41', url: '#' }] },
];

const ATOMX_PACKS = [
  { title: '8000+ Graphics Pack V8', url: '#' },
  { title: '1500+ Transitions', url: '#' },
  { title: 'Ransom Letters', url: '#' },
  { title: 'Text Presets', url: '#' },
];

const PLUGINS_LIST = [
  'Aescripts Character Builder v1.2.5', 'Aescripts Bend and Weld v2.0.1', 'Auto Lip-Sync v1.11', 
  'AutoSway v1.6', 'Blooming Flowers', 'Crate\'s Camera Script', 'CircusFX v1.90', 
  'Datamosh v2.0', 'Discotext v1.2', 'Dope v2.5', 'Face 3D v1.0', 'FoxFX Kit', 
  'Glitchyff 100 VFX', 'HandyCam v1.2', 'Lockdown 2.3.1', 'Newton 3 v3.4', 
];

// --- HELPER COMPONENTS ---

const GlassCard = ({ children, className = '', onClick, hoverEffect = true }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!hoverEffect || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const rotateY = ((x - centerX) / centerX) * 5; 
    const rotateX = ((centerY - y) / centerY) * 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`glass-card relative overflow-hidden rounded-xl bg-gray-900/40 border border-white/10 backdrop-blur-md transition-all duration-200 ${hoverEffect ? 'hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const GradientBtn = ({ children, onClick, className = '', fullWidth = false, type = "button" }) => {
  const btnRef = useRef(null);

  const createParticles = (e) => {
    const btn = btnRef.current;
    if(!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('span');
      particle.classList.add('particle');
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      const destX = (Math.random() - 0.5) * 60;
      const destY = (Math.random() - 0.5) * 60;
      particle.style.setProperty('--tx', `${destX}px`);
      particle.style.setProperty('--ty', `${destY}px`);
      
      btn.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      onMouseEnter={createParticles}
      className={`gradient-btn relative overflow-hidden font-bold text-white rounded-full py-2 px-6 shadow-lg transform transition-transform hover:scale-105 active:scale-95 ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  // --- STATE MANAGEMENT WITH LOCAL STORAGE ---
  const [plugins, setPlugins] = useState(() => JSON.parse(localStorage.getItem('plugins')) || INITIAL_PLUGINS_DATA);
  const [scripts, setScripts] = useState(() => JSON.parse(localStorage.getItem('scripts')) || INITIAL_SCRIPTS_DATA);
  const [assets, setAssets] = useState(() => JSON.parse(localStorage.getItem('assets')) || INITIAL_ASSETS_DATA);
  const [utilities, setUtilities] = useState(() => JSON.parse(localStorage.getItem('utilities')) || INITIAL_UTILITIES_DATA);
  const [software, setSoftware] = useState(() => JSON.parse(localStorage.getItem('software')) || INITIAL_SOFTWARE_DATA);

  // Sync with Local Storage
  useEffect(() => localStorage.setItem('plugins', JSON.stringify(plugins)), [plugins]);
  useEffect(() => localStorage.setItem('scripts', JSON.stringify(scripts)), [scripts]);
  useEffect(() => localStorage.setItem('assets', JSON.stringify(assets)), [assets]);
  useEffect(() => localStorage.setItem('utilities', JSON.stringify(utilities)), [utilities]);
  useEffect(() => localStorage.setItem('software', JSON.stringify(software)), [software]);

  // UI State
  const [currentView, setCurrentView] = useState('main');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [os, setOs] = useState('windows');
  
  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [newItem, setNewItem] = useState({
      category: 'plugins',
      title: '',
      desc: '',
      img: '',
      url: '',
      versionName: 'Latest'
  });

  const mouseFollowerRef = useRef(null);

  // --- MOUSE FOLLOWER EFFECT ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (mouseFollowerRef.current) {
        mouseFollowerRef.current.style.left = `${e.clientX}px`;
        mouseFollowerRef.current.style.top = `${e.clientY}px`;
        mouseFollowerRef.current.style.opacity = 1;
      }
    };
    const handleMouseLeave = () => {
        if(mouseFollowerRef.current) mouseFollowerRef.current.style.opacity = 0;
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // --- SCROLL ANIMATION ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentView, plugins, scripts, assets]);

  // --- ADMIN ACTIONS ---
  
  const handleLogin = () => {
      if(adminPassword === '1234') { // Simple simulation password
          setIsAdmin(true);
          setShowAdminLogin(false);
          setCurrentView('admin-dashboard');
      } else {
          alert('Incorrect Password! Try "1234"');
      }
  };

  const handleLogout = () => {
      setIsAdmin(false);
      setCurrentView('main');
  };

  const handleDeleteItem = (e, category, id) => {
      e.stopPropagation();
      if(!window.confirm("Are you sure you want to delete this item?")) return;
      
      if(category === 'plugins') setPlugins(prev => prev.filter(i => i.id !== id));
      if(category === 'scripts') setScripts(prev => prev.filter(i => i.id !== id));
      if(category === 'assets') setAssets(prev => prev.filter(i => i.id !== id));
      if(category === 'utilities') setUtilities(prev => prev.filter(i => i.id !== id));
      if(category === 'software') setSoftware(prev => prev.filter(i => i.id !== id));
  };

  const handleAddItem = (e) => {
      e.preventDefault();
      const id = newItem.title.toLowerCase().replace(/\s+/g, '-');
      const itemToAdd = {
          id: id,
          title: newItem.title,
          desc: newItem.desc,
          img: newItem.img || 'https://placehold.co/100x100/555/fff?text=No+Img',
          url: newItem.url,
          versions: newItem.category !== 'assets' ? [{ name: newItem.versionName, url: newItem.url }] : undefined
      };

      if(newItem.category === 'plugins') setPlugins([...plugins, itemToAdd]);
      if(newItem.category === 'scripts') setScripts([...scripts, itemToAdd]);
      if(newItem.category === 'assets') setAssets([...assets, { ...itemToAdd, url: newItem.url }]);
      if(newItem.category === 'utilities') setUtilities([...utilities, itemToAdd]);
      
      alert(`Successfully added ${newItem.title} to ${newItem.category}!`);
      setNewItem({ category: 'plugins', title: '', desc: '', img: '', url: '', versionName: 'Latest' }); // Reset form
  };

  // --- RENDER HELPERS ---

  const renderDeleteBtn = (category, id) => isAdmin && (
      <button 
        onClick={(e) => handleDeleteItem(e, category, id)}
        className="absolute top-2 right-2 z-20 p-2 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
        title="Delete Item"
      >
          <Trash2 size={14} />
      </button>
  );

  const filterItems = (items) => {
    if (!searchQuery) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filteredSoftware = useMemo(() => filterItems(software), [searchQuery, software]);
  const filteredPlugins = useMemo(() => filterItems(plugins), [searchQuery, plugins]);
  const filteredScripts = useMemo(() => filterItems(scripts), [searchQuery, scripts]);
  const filteredUtilities = useMemo(() => filterItems(utilities), [searchQuery, utilities]);
  const filteredAssets = useMemo(() => filterItems(assets), [searchQuery, assets]);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* --- INJECTED STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        
        :root { --glow-1: #3b82f6; --glow-2: #8b5cf6; --glow-3: #ec4899; }
        body { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #09090b; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #6d28d9, #be185d); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #7c3aed; }

        #mouse-follower {
            position: fixed; width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%);
            border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%);
            z-index: 0; transition: opacity 0.3s ease; mix-blend-mode: screen;
        }

        .gradient-text {
            background: linear-gradient(to right, #c084fc, #f472b6, #60a5fa);
            -webkit-background-clip: text; background-clip: text; color: transparent;
            background-size: 200% auto; animation: flow 5s linear infinite;
        }
        @keyframes flow { to { background-position: 200% center; } }

        .glass-card::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(300px circle at var(--x, 0) var(--y, 0), rgba(139, 92, 246, 0.2), transparent 40%);
            opacity: 0; transition: opacity 0.3s; pointer-events: none;
        }
        .glass-card:hover::before { opacity: 1; }

        .gradient-btn {
            background-image: linear-gradient(to right, #7c3aed, #9333ea, #db2777);
            background-size: 200% auto; transition: 0.4s;
        }
        .gradient-btn:hover { background-position: right center; box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
        
        .particle {
            position: absolute; background: white; border-radius: 50%; pointer-events: none;
            animation: fly 0.8s ease-out forwards;
        }
        @keyframes fly { to { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }

        .animate-on-scroll {
            opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
        .page-enter { animation: slideIn 0.4s ease-out forwards; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* --- BACKGROUND ELEMENTS --- */}
      <div id="mouse-follower" ref={mouseFollowerRef}></div>
      <div className="fixed top-10 left-10 w-96 h-96 bg-purple-600 rounded-full blur-[80px] opacity-20 -z-10 animate-pulse"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-blue-600 rounded-full blur-[80px] opacity-20 -z-10"></div>

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass-card !rounded-full px-6 py-3 flex justify-between items-center gap-4 bg-gray-900/60 backdrop-blur-xl">
            <div className="text-2xl font-black tracking-tighter text-white cursor-pointer select-none" onClick={() => setCurrentView('main')}>
              Harsh<span className="gradient-text">Edits</span>
            </div>
            
            <div className="hidden md:flex flex-1 max-w-md mx-4 relative group">
              <input type="text" placeholder="Search resources..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-purple-400 transition-colors" />
            </div>

            <nav className="hidden lg:flex space-x-6 text-sm font-medium text-gray-300">
              <button onClick={() => { setCurrentView('main'); setTimeout(() => document.getElementById('software')?.scrollIntoView({behavior: 'smooth'}), 100)}} className="hover:text-white transition-colors">Software</button>
              <button onClick={() => { setCurrentView('main'); setTimeout(() => document.getElementById('plugins')?.scrollIntoView({behavior: 'smooth'}), 100)}} className="hover:text-white transition-colors">Plugins</button>
              <button onClick={() => { setCurrentView('main'); setTimeout(() => document.getElementById('scripts')?.scrollIntoView({behavior: 'smooth'}), 100)}} className="hover:text-white transition-colors">Scripts</button>
            </nav>

            <div className="flex items-center gap-3">
               {isAdmin ? (
                   <button onClick={() => setCurrentView('admin-dashboard')} className="gradient-btn text-xs py-2 px-4 rounded-full flex items-center gap-2">
                       <Shield size={14} /> Dashboard
                   </button>
               ) : (
                   <button onClick={() => setShowAdminLogin(true)} className="p-2 text-gray-400 hover:text-white transition-colors" title="Admin Login">
                       <Lock size={18} />
                   </button>
               )}
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="pt-32 pb-12 min-h-screen">
        
        {/* VIEW: MAIN LANDING */}
        {currentView === 'main' && (
          <main className="page-enter container mx-auto px-4 md:px-6">
            
            {!searchQuery && (
              <section className="text-center py-12 md:py-20 animate-on-scroll">
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white leading-tight">
                  The Ultimate<br /><span className="gradient-text">Editing Resource Hub</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                  Exclusive access to all the software, plugins, scripts, and assets you need. 
                </p>
                {isAdmin && <div className="inline-block bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-bold border border-green-500/50 mb-8">Admin Mode Active</div>}
              </section>
            )}

            {/* SOFTWARE SECTION */}
            {(filteredSoftware.length > 0) && (
            <section id="software" className="mb-20 animate-on-scroll">
              <div className="flex items-center gap-4 mb-8">
                  <div className="h-8 w-1 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-3xl font-bold text-white">Adobe Software</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSoftware.map(item => (
                  <GlassCard key={item.id} onClick={() => { setSelectedItem({...item, type: 'software'}); setCurrentView('software-detail'); }} className="p-6 flex items-center gap-5 group relative">
                    {renderDeleteBtn('software', item.id)}
                    <img src={item.icon} alt={item.title} className="w-16 h-16 object-contain drop-shadow-lg" />
                    <div>
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>
            )}

            {/* PLUGINS SECTION */}
            {(filteredPlugins.length > 0) && (
            <section id="plugins" className="mb-20 animate-on-scroll">
              <div className="flex items-center gap-4 mb-8">
                  <div className="h-8 w-1 bg-purple-500 rounded-full"></div>
                  <h3 className="text-3xl font-bold text-white">Plugins</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPlugins.map(item => (
                  <GlassCard key={item.id} onClick={() => { setSelectedItem({...item, type: 'plugins'}); setCurrentView('item-detail'); }} className="p-5 flex items-start gap-4 group relative">
                    {renderDeleteBtn('plugins', item.id)}
                    <img src={item.img} alt={item.title} className="w-14 h-14 rounded-lg object-cover border border-white/10" />
                    <div>
                      <h5 className="text-lg font-bold text-white mb-1">{item.title}</h5>
                      <p className="text-xs text-gray-400 leading-snug">{item.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>
            )}

            {/* SCRIPTS SECTION */}
            {(filteredScripts.length > 0) && (
            <section id="scripts" className="mb-20 animate-on-scroll">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-8 w-1 bg-teal-500 rounded-full"></div>
                  <h3 className="text-3xl font-bold text-white">Scripts & Extensions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredScripts.map(item => (
                  <GlassCard key={item.id} onClick={() => { setSelectedItem({...item, type: 'scripts'}); setCurrentView('item-detail'); }} className="p-5 flex items-start gap-4 group relative">
                    {renderDeleteBtn('scripts', item.id)}
                    <img src={item.img} alt={item.title} className="w-14 h-14 rounded-lg object-cover border border-white/10" />
                    <div>
                      <h5 className="text-lg font-bold text-white mb-1">{item.title}</h5>
                      <p className="text-xs text-gray-400 leading-snug">{item.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>
            )}

            {/* ASSETS SECTION */}
            {(filteredAssets.length > 0) && (
            <section id="assets" className="mb-20 animate-on-scroll">
              <div className="flex items-center gap-4 mb-8">
                  <div className="h-8 w-1 bg-pink-500 rounded-full"></div>
                  <h3 className="text-3xl font-bold text-white">Assets</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {filteredAssets.map((item, idx) => (
                   <GlassCard key={idx} hoverEffect={false} className="p-5 flex flex-col justify-between h-full group relative">
                       {renderDeleteBtn('assets', item.id)}
                       <div>
                           <Box className="w-8 h-8 text-pink-500 mb-3" />
                           <h5 className="font-bold text-white mb-1">{item.title}</h5>
                           <p className="text-xs text-gray-400 mb-4">{item.desc}</p>
                       </div>
                       <a href={item.url} target="_blank" rel="noreferrer" className="block w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-center text-xs font-bold text-white transition-colors">
                           Download
                       </a>
                   </GlassCard>
                ))}
              </div>
            </section>
            )}

             {/* UTILITIES SECTION */}
            {(filteredUtilities.length > 0) && (
            <section id="utilities" className="mb-20 animate-on-scroll">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full"></div>
                  <h3 className="text-3xl font-bold text-white">Utilities</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {filteredUtilities.map(item => (
                  <GlassCard key={item.id} onClick={() => { setSelectedItem({...item, type: 'utilities'}); setCurrentView('item-detail'); }} className="p-5 group relative">
                     {renderDeleteBtn('utilities', item.id)}
                     <div className="mb-3"><img src={item.img} alt="" className="w-10 h-10 rounded-md" /></div>
                     <h5 className="font-bold text-white">{item.title}</h5>
                     <p className="text-xs text-gray-400">{item.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </section>
            )}
          </main>
        )}

        {/* VIEW: ADMIN DASHBOARD */}
        {currentView === 'admin-dashboard' && (
            <div className="page-enter container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-white">Admin <span className="gradient-text">Dashboard</span></h1>
                        <p className="text-gray-400">Add new content to your website dynamically.</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setCurrentView('main')} className="px-4 py-2 rounded-full border border-gray-600 text-white hover:bg-gray-800">Back to Site</button>
                        <button onClick={handleLogout} className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-500 flex items-center gap-2"><LogOut size={16}/> Logout</button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Add Item Form */}
                    <div className="md:col-span-2">
                        <GlassCard className="p-8" hoverEffect={false}>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Plus className="text-indigo-400"/> Add New Item</h2>
                            <form onSubmit={handleAddItem} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                                        <select 
                                            value={newItem.category}
                                            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                                        >
                                            <option value="plugins">Plugin</option>
                                            <option value="scripts">Script</option>
                                            <option value="assets">Asset</option>
                                            <option value="utilities">Utility</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Item Title</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="e.g. Deep Glow"
                                            value={newItem.title}
                                            onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
                                    <textarea 
                                        required
                                        rows="3"
                                        placeholder="Short description of the item..."
                                        value={newItem.desc}
                                        onChange={(e) => setNewItem({...newItem, desc: e.target.value})}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Image URL</label>
                                    <input 
                                        type="text" 
                                        placeholder="https://..."
                                        value={newItem.img}
                                        onChange={(e) => setNewItem({...newItem, img: e.target.value})}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Leave empty for placeholder.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Download / Drive URL</label>
                                        <input 
                                            required
                                            type="url" 
                                            placeholder="https://drive.google.com..."
                                            value={newItem.url}
                                            onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    {newItem.category !== 'assets' && (
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Version Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. v2.0 or 2025"
                                                value={newItem.versionName}
                                                onChange={(e) => setNewItem({...newItem, versionName: e.target.value})}
                                                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                                            />
                                        </div>
                                    )}
                                </div>

                                <GradientBtn type="submit" fullWidth className="mt-4">
                                    Publish Item
                                </GradientBtn>
                            </form>
                        </GlassCard>
                    </div>

                    {/* Stats / Info Side */}
                    <div className="space-y-6">
                        <GlassCard className="p-6 text-center" hoverEffect={false}>
                            <h3 className="text-gray-400 text-sm uppercase font-bold mb-4">Live Statistics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/20">
                                    <div className="text-2xl font-bold text-white">{plugins.length}</div>
                                    <div className="text-xs text-indigo-300">Plugins</div>
                                </div>
                                <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-500/20">
                                    <div className="text-2xl font-bold text-white">{scripts.length}</div>
                                    <div className="text-xs text-purple-300">Scripts</div>
                                </div>
                                <div className="bg-pink-900/30 p-3 rounded-lg border border-pink-500/20">
                                    <div className="text-2xl font-bold text-white">{assets.length}</div>
                                    <div className="text-xs text-pink-300">Assets</div>
                                </div>
                                <div className="bg-yellow-900/30 p-3 rounded-lg border border-yellow-500/20">
                                    <div className="text-2xl font-bold text-white">{utilities.length}</div>
                                    <div className="text-xs text-yellow-300">Utilities</div>
                                </div>
                            </div>
                        </GlassCard>
                        
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-white/5">
                            <h4 className="font-bold text-white mb-2">Instructions</h4>
                            <ul className="text-sm text-gray-400 space-y-2 list-disc pl-4">
                                <li>Items added here are saved to your browser's Local Storage.</li>
                                <li>They will persist even if you refresh the page.</li>
                                <li>To delete items, go back to the Main Site view and click the red Trash icon on the cards.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* VIEW: SOFTWARE DETAIL */}
        {currentView === 'software-detail' && selectedItem && (
          <div className="page-enter container mx-auto px-6">
            <button onClick={() => setCurrentView('main')} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
               <ArrowRight className="rotate-180" size={20} /> Back to Hub
            </button>
            <div className="flex items-center gap-6 mb-12">
               {selectedItem.icon ? <img src={selectedItem.icon} alt={selectedItem.title} className="w-24 h-24" /> : selectedItem.fallbackIcon}
               <div>
                   <h2 className="text-4xl md:text-5xl font-black text-white mb-2">{selectedItem.title}</h2>
                   <p className="text-xl text-gray-400">{selectedItem.desc}</p>
               </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
               {selectedItem.versions.map((ver, idx) => (
                   <GlassCard key={idx} hoverEffect={false} className="p-6 text-center">
                       <h3 className="text-2xl font-bold text-white mb-1">{ver.year}</h3>
                       <p className="text-xs text-indigo-300 font-medium uppercase tracking-wide mb-4">{ver.desc}</p>
                       <a href={ver.url} className="block w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors">
                           Download
                       </a>
                   </GlassCard>
               ))}
            </div>
          </div>
        )}

        {/* VIEW: ITEM DETAIL (Plugins/Scripts) */}
        {currentView === 'item-detail' && selectedItem && (
           <div className="page-enter container mx-auto px-6 max-w-4xl">
             <button onClick={() => setCurrentView('main')} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
               <ArrowRight className="rotate-180" size={20} /> Back
            </button>
            <GlassCard hoverEffect={false} className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <img src={selectedItem.img} alt={selectedItem.title} className="w-32 h-32 rounded-xl object-cover border-2 border-white/10 shadow-2xl" />
                    <div className="flex-1">
                        <h2 className="text-4xl font-black text-white mb-4">{selectedItem.title}</h2>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">{selectedItem.desc}</p>
                        
                        {/* AtomX Special Case */}
                        {selectedItem.id === 'atomx' && (
                            <div className="mb-8 p-6 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
                                <h4 className="font-bold text-white mb-2">AtomX Mega Pack Available</h4>
                                <p className="text-sm text-gray-400 mb-4">Access the full library of 8+ AtomX packs including graphics, transitions, and text presets.</p>
                                <button onClick={() => setCurrentView('atomx')} className="text-sm font-bold text-indigo-400 hover:text-white flex items-center gap-1">
                                    View Packs <ArrowRight size={14}/>
                                </button>
                            </div>
                        )}

                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Downloads</h4>
                            {selectedItem.versions?.map((ver, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
                                    <span className="font-bold text-white">{selectedItem.title} <span className="text-indigo-400">{ver.name}</span></span>
                                    <a href={ver.url} className="gradient-btn py-1.5 px-4 rounded-full text-xs font-bold">Download</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </GlassCard>
           </div>
        )}

        {/* VIEW: ATOMX PACKS */}
        {currentView === 'atomx' && (
            <div className="page-enter container mx-auto px-6">
                <button onClick={() => {setSelectedItem({...scripts.find(s=>s.id==='atomx'), type: 'scripts'}); setCurrentView('item-detail');}} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowRight className="rotate-180" size={20} /> Back to AtomX
                </button>
                <h1 className="text-4xl font-bold text-white mb-10 text-center">AtomX <span className="gradient-text">Mega Pack</span></h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {ATOMX_PACKS.map((pack, idx) => (
                        <GlassCard key={idx} hoverEffect={false} className="p-6 text-center flex flex-col h-full justify-between">
                            <h4 className="font-bold text-white mb-4">{pack.title}</h4>
                            <div className="flex gap-2 justify-center">
                                <button className="flex-1 py-2 bg-gray-700 rounded-lg text-xs font-bold hover:bg-gray-600">Preview</button>
                                <a href={pack.url} className="flex-1 py-2 bg-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-500">Download</a>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        )}

      </div>

      {/* --- ADMIN LOGIN MODAL --- */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="glass-card w-full max-w-sm p-8 text-center relative border border-white/10">
                <button onClick={() => setShowAdminLogin(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20}/></button>
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock size={32} className="text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Admin Access</h3>
                <p className="text-gray-400 text-sm mb-6">Enter your credentials to manage resources.</p>
                <input 
                    type="password" 
                    placeholder="Enter Password (1234)" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white mb-4 focus:outline-none focus:border-indigo-500 text-center tracking-widest"
                />
                <GradientBtn onClick={handleLogin} fullWidth>Login</GradientBtn>
            </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="border-t border-gray-800/50 bg-black py-8 relative z-10">
          <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Harsh Edits. All rights reserved.</p>
          </div>
      </footer>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:-translate-y-1 active:scale-95">
          <ChevronUp size={24} />
      </button>

    </div>
  );
}
