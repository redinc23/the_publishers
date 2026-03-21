/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalsProps {
  type: 'login' | 'register' | null;
  onClose: () => void;
  onSwitch: (type: 'login' | 'register') => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({ type, onClose, onSwitch }) => {
  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-[460px] bg-[#181818] rounded-xl p-10 shadow-2xl border border-white/5"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <h3 className="text-3xl font-extrabold mb-2">{type === 'login' ? 'Welcome back' : 'Create your account'}</h3>
            <p className="text-zinc-500">{type === 'login' ? 'Sign in to your account to continue' : 'Join our community of readers'}</p>
          </div>

          <div className="flex border-b border-white/10 mb-8">
            <button 
              onClick={() => onSwitch('login')}
              className={`flex-1 py-3 font-bold transition-all ${type === 'login' ? 'text-[#ff7700] border-b-2 border-[#ff7700]' : 'text-zinc-500 opacity-70'}`}
            >
              Login
            </button>
            <button 
              onClick={() => onSwitch('register')}
              className={`flex-1 py-3 font-bold transition-all ${type === 'register' ? 'text-[#ff7700] border-b-2 border-[#ff7700]' : 'text-zinc-500 opacity-70'}`}
            >
              Register
            </button>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {type === 'register' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input className="w-full bg-zinc-900 border border-white/10 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-[#ff7700] transition-colors" placeholder="Ada Lovelace" required />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input className="w-full bg-zinc-900 border border-white/10 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-[#ff7700] transition-colors" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input className="w-full bg-zinc-900 border border-white/10 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-[#ff7700] transition-colors" type="password" placeholder="••••••••" required />
              </div>
            </div>
            <button className="w-full py-4 bg-[#ff7700] hover:bg-[#cc5500] rounded-lg font-bold text-lg transition-all shadow-lg shadow-[#ff7700]/20 active:scale-[0.98]">
              {type === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <span className="relative bg-[#181818] px-4 text-sm text-zinc-500">or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 transition-colors">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-black text-white rounded-lg font-bold border border-white/20 hover:bg-zinc-900 transition-colors">
              <img src="https://www.apple.com/favicon.ico" className="w-4 h-4 invert" alt="Apple" />
              Apple
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            {type === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => onSwitch(type === 'login' ? 'register' : 'login')}
              className="ml-2 text-[#ff7700] font-bold hover:underline"
            >
              {type === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
