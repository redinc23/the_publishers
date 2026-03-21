/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Accessibility, Type, Sun, Moon, Volume2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AccessibilityTools: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[1050]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[320px] bg-[#181818] rounded-2xl p-8 shadow-2xl border border-white/10"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Accessibility className="w-6 h-6 text-[#ff7700]" />
              Accessibility
            </h3>

            <div className="space-y-8">
              <div className="tool-group">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Font Size</span>
                  <span className="text-white font-bold">{fontSize}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <Type className="w-4 h-4 text-zinc-500" />
                  <input 
                    type="range" 
                    min="80" 
                    max="150" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#ff7700]" 
                  />
                  <Type className="w-6 h-6 text-zinc-500" />
                </div>
              </div>

              <div className="tool-group">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">High Contrast</span>
                  <button 
                    onClick={() => setHighContrast(!highContrast)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${highContrast ? 'bg-[#ff7700]' : 'bg-zinc-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${highContrast ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <Eye className="w-5 h-5" />
                  <span>Improve readability for low vision</span>
                </div>
              </div>

              <div className="tool-group">
                <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 block">Quick Actions</span>
                <div className="grid grid-cols-3 gap-4">
                  <button className="flex flex-col items-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors group">
                    <Sun className="w-5 h-5 group-hover:text-[#ff7700] transition-colors" />
                    <span className="text-[10px] font-bold">Light</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors group">
                    <Moon className="w-5 h-5 group-hover:text-[#ff7700] transition-colors" />
                    <span className="text-[10px] font-bold">Dark</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors group">
                    <Volume2 className="w-5 h-5 group-hover:text-[#ff7700] transition-colors" />
                    <span className="text-[10px] font-bold">TTS</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95 ${isOpen ? 'bg-[#ff7700] rotate-90' : 'bg-zinc-800 hover:bg-zinc-700'}`}
      >
        <Accessibility className="w-8 h-8" />
      </button>
    </div>
  );
};
