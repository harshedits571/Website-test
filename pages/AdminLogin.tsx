
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo password "1234"
    if (password === '1234') {
      onLogin();
    } else {
      setError('Incorrect password. Try "1234"');
    }
  };

  return (
    <div className="pt-32 flex items-center justify-center min-h-[70vh]">
      <div className="glass-card p-8 w-full max-w-sm">
        <h2 className="text-3xl font-black text-white mb-4 text-center">Admin Access</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">Enter the administrator password to manage resources.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-gray-900 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button type="submit" className="w-full gradient-btn text-white font-bold py-3 rounded-xl">
            Authorize
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
