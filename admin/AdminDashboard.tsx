import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResourceItem, Category, Version } from '../types';
import { removeItem } from '../services/api';
import { Plus, Trash2, Edit3, Save, X, Settings2, LogOut, AlertCircle, Terminal, ExternalLink } from 'lucide-react';

interface AdminDashboardProps {
  items: ResourceItem[];
  onSave: (item: ResourceItem) => Promise<void>;
  onRefresh: () => void;
  onLogout: () => void;
  dbError: string | null;
  loading: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ items, onSave, onRefresh, onLogout, dbError, loading }) => {
  const [editingItem, setEditingItem] = useState<Partial<ResourceItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleCreateNew = () => {
    setEditingItem({
      id: `asset-${Date.now()}`,
      title: '',
      description: '',
      category: Category.SOFTWARE,
      image: '',
      versions: [{ name: 'Stable v1.0', url: '' }]
    });
  };

  const handleSave = async () => {
    if (editingItem && editingItem.id && editingItem.title) {
      setIsSaving(true);
      try {
        await onSave(editingItem as ResourceItem);
        setEditingItem(null);
      } catch (e: any) {
        alert(e.message || "Failed to save to cloud.");
      } finally {
        setIsSaving(false);
      }
    } else {
      alert("Missing required fields.");
    }
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('Delete permanently from cloud?')) {
      try {
        await removeItem(id);
        onRefresh();
      } catch (e: any) {
        alert(e.message || "Failed to delete from cloud.");
      }
    }
  };

  return (
    <div className="pt-24 md:pt-40 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {dbError && (dbError.includes("PERMISSION_DENIED") || dbError.includes("locked")) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card border-red-500/30 bg-red-500/10 p-8 rounded-[2rem] mb-12 shadow-2xl shadow-red-500/5"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="p-4 rounded-2xl bg-red-500/20 text-red-500">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Cloud Database is Locked</h2>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-2xl">
                  Firebase is currently blocking access because of security rules. To enable editing, you must set your <span className="text-white font-bold">Realtime Database Rules</span> to public in the Firebase Console:
                </p>
                <div className="bg-black/50 p-6 rounded-2xl border border-white/5 font-mono text-[11px] text-green-400 mb-6 flex flex-col gap-3 group">
                   <div className="flex items-center justify-between text-gray-500 text-[10px] uppercase font-bold tracking-widest border-b border-white/5 pb-2 mb-2">
                     <span className="flex items-center gap-2"><Terminal className="w-3 h-3" /> Required Database Rules</span>
                     <span className="text-green-500/50">Ready to copy</span>
                   </div>
                   <pre className="overflow-x-auto">{`{
  "rules": {
    ".read": true,
    ".write": true
  }
}`}</pre>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://console.firebase.google.com/" 
                    target="_blank" 
                    className="inline-flex items-center gap-2 bg-white text-black font-black py-3 px-8 rounded-2xl text-xs hover:bg-gray-200 transition-all transform hover:-translate-y-1"
                  >
                    Open Firebase Console
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={onRefresh}
                    className="inline-flex items-center gap-2 glass-card border-white/10 text-white font-bold py-3 px-8 rounded-2xl text-xs hover:bg-white/5 transition-all"
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16"
        >
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
              <Settings2 className="w-10 h-10 text-violet-400" />
              Cloud Hub
            </h1>
            <p className="text-gray-500 font-medium">Real-time control from anywhere in the world.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleCreateNew} 
              className="flex-1 md:flex-none gradient-btn text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Asset
            </button>
            <button onClick={onLogout} className="p-4 glass-card text-red-400 hover:bg-red-500/10 rounded-2xl transition-all">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {items.map(item => (
            <motion.div 
              layout
              key={item.id} 
              className="glass-card p-6 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 group hover:border-white/20 transition-all"
            >
              <img src={item.image} className="w-20 h-20 rounded-2xl object-cover border border-white/5 bg-white/5" alt="" />
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-500 font-black tracking-widest uppercase">
                    {item.id}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium">{item.category} • {item.versions?.length || 0} versions</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button 
                  onClick={() => setEditingItem(item)} 
                  className="flex-1 md:flex-none p-3 rounded-xl bg-white/5 hover:bg-violet-500/20 text-violet-400 transition-all flex items-center justify-center gap-2 font-bold border border-white/5"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className="flex-1 md:flex-none p-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-red-400 transition-all flex items-center justify-center border border-white/5"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
          {!loading && items.length === 0 && (
            <div className="text-center py-20 text-gray-500 font-bold glass-card rounded-[2rem] border-dashed">No assets found in cloud.</div>
          )}
        </div>

        <AnimatePresence>
          {editingItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-card p-8 md:p-12 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border-white/10 shadow-3xl"
              >
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black text-white">Edit <span className="text-violet-400">Resource</span></h2>
                  <button onClick={() => setEditingItem(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400">
                    <X className="w-8 h-8" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Asset Title</label>
                      <input 
                        type="text" 
                        value={editingItem.title} 
                        onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 p-4 text-white rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all" 
                        placeholder="e.g. Adobe Premiere Pro"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Category</label>
                      <select 
                        value={editingItem.category} 
                        onChange={e => setEditingItem({...editingItem, category: e.target.value as Category})}
                        className="w-full bg-black/40 border border-white/5 p-4 text-white rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all appearance-none"
                      >
                        {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Description</label>
                      <textarea 
                        rows={5}
                        value={editingItem.description} 
                        onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 p-4 text-white rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none" 
                        placeholder="Detailed asset description..."
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Thumbnail URL</label>
                      <input 
                        type="text" 
                        value={editingItem.image} 
                        onChange={e => setEditingItem({...editingItem, image: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 p-4 text-white rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all" 
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500">Versions</label>
                      <button 
                        onClick={() => setEditingItem({...editingItem, versions: [...(editingItem.versions || []), { name: '', url: '' }]})}
                        className="text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Version
                      </button>
                    </div>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {editingItem.versions?.map((v, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 relative group">
                          <button 
                            onClick={() => setEditingItem({...editingItem, versions: editingItem.versions?.filter((_, idx) => idx !== i)})}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <input 
                            placeholder="Version ID (e.g. v24.2)"
                            value={v.name}
                            onChange={e => {
                              const vers = [...(editingItem.versions || [])];
                              vers[i] = {...vers[i], name: e.target.value};
                              setEditingItem({...editingItem, versions: vers});
                            }}
                            className="w-full bg-transparent border-b border-white/10 p-2 text-white mb-2 outline-none focus:border-violet-500"
                          />
                          <input 
                            placeholder="Download Link"
                            value={v.url}
                            onChange={e => {
                              const vers = [...(editingItem.versions || [])];
                              vers[i] = {...vers[i], url: e.target.value};
                              setEditingItem({...editingItem, versions: vers});
                            }}
                            className="w-full bg-transparent p-2 text-gray-400 text-sm outline-none font-mono"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pt-8 space-y-4">
                      <button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="w-full gradient-btn text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 text-lg shadow-2xl disabled:opacity-50"
                      >
                        {isSaving ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Save className="w-6 h-6" />
                            Sync to Cloud
                          </>
                        )}
                      </button>
                      <button onClick={() => setEditingItem(null)} className="w-full glass-card text-gray-400 font-bold py-4 rounded-2xl hover:text-white transition-all">
                        Discard Changes
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
