/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose }) => {
  const [year, setYear] = useState(2024);

  return (
    <aside className={`fixed top-[70px] right-0 w-[400px] h-[calc(100vh-70px)] bg-[#181818] z-[1040] p-6 overflow-y-auto transition-transform duration-300 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
        <h3 className="text-xl font-bold">Filter & Sort</h3>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-8">
        <div className="filter-group">
          <h4 className="text-lg font-semibold mb-4">Genres</h4>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} className="bg-white/10 px-4 py-2 rounded-full text-sm hover:bg-[#ff7700] transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4 className="text-lg font-semibold mb-4">Year</h4>
          <input 
            type="range" 
            min="1990" 
            max="2025" 
            value={year} 
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#ff7700]" 
          />
          <div className="flex justify-between text-sm text-zinc-500 mt-2">
            <span>1990</span>
            <span className="text-white font-bold">{year}</span>
            <span>2025</span>
          </div>
        </div>

        <div className="filter-group">
          <h4 className="text-lg font-semibold mb-4">Rating</h4>
          <div className="flex flex-wrap gap-2">
            {['4.5★+', '4.0★+', '3.5★+'].map(r => (
              <button key={r} className="bg-white/10 px-4 py-2 rounded-full text-sm hover:bg-[#ff7700] transition-colors">
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-12">
        <button className="flex-1 py-3 bg-zinc-700/70 hover:bg-zinc-700 rounded-lg font-bold transition-colors">Reset</button>
        <button className="flex-1 py-3 bg-[#ff7700] hover:bg-[#cc5500] rounded-lg font-bold transition-colors">Apply</button>
      </div>
    </aside>
  );
};
