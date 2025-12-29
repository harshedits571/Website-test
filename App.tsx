
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResourceItem } from './types';
import { getItems, saveItem } from './services/api';
import Header from './components/Header';
import AuroraBackground from './components/AuroraBackground';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { AlertCircle, RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  const refreshItems = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    const result = await getItems();
    if (result.error) {
      setDbError(result.error);
    }
    setItems(result.items);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshItems();
  }, [refreshItems]);

  const filteredItems = items.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveItem = async (item: ResourceItem) => {
    await saveItem(item);
    await refreshItems();
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
        <AuroraBackground />
        <Header searchTerm={searchTerm} onSearch={setSearchTerm} />
        
        {loading ? (
          <div className="pt-40 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Connecting to Cloud Hub...</p>
          </div>
        ) : (
          <>
            {dbError && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-xl px-4">
                <div className="glass-card border-red-500/50 bg-red-500/10 p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-xs font-bold uppercase tracking-wide">Database Connection Issue</p>
                      <p className="text-red-200 text-[10px] leading-relaxed line-clamp-2">{dbError}</p>
                    </div>
                  </div>
                  <button 
                    onClick={refreshItems}
                    className="p-2 rounded-full hover:bg-white/10 text-white transition-all"
                    title="Retry Connection"
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            
            <Routes>
              <Route path="/" element={<Home items={filteredItems} />} />
              <Route path="/item/:id" element={<ItemDetail items={items} />} />
              <Route 
                path="/admin" 
                element={isAdmin ? (
                  <AdminDashboard 
                    items={items} 
                    onSave={handleSaveItem} 
                    onRefresh={refreshItems} 
                    onLogout={() => setIsAdmin(false)} 
                    dbError={dbError}
                    // Added missing loading prop
                    loading={loading}
                  />
                ) : (
                  <AdminLogin onLogin={() => setIsAdmin(true)} />
                )} 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </>
        )}

        <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Harsh Edits. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="https://discord.gg/y3qnSA4ZbE" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
