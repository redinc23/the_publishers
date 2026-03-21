/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, BookOpen, Plus } from 'lucide-react';
import { Book } from '../types';
import { motion } from 'motion/react';

interface TrendingCarouselProps {
  books: Book[];
  onSelect: (book: Book) => void;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({ books, onSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="trending-section py-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-[#ff6b35] after:to-[#f7931e] after:rounded-full">
            Trending Now
          </h2>
          <span className="text-sm text-zinc-500 hover:text-[#ff6b35] cursor-pointer transition-colors">See all</span>
        </div>
        
        <div className="relative group">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-[-25px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[#ff6b35]/90 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ff6b35] shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth"
          >
            {books.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.08 }}
                className="flex-none w-[200px] h-[300px] rounded-lg overflow-hidden relative cursor-pointer shadow-2xl bg-zinc-900 group/card"
                onClick={() => onSelect(book)}
              >
                {book.isNew && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded z-10">
                    NEW
                  </div>
                )}
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-all group-hover/card:brightness-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#E50914] origin-left scale-x-0 group-hover/card:scale-x-60 transition-transform duration-500" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all p-4 flex flex-col justify-end translate-y-4 group-hover/card:translate-y-0">
                  <h3 className="text-white font-bold text-sm truncate mb-1">{book.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-300 mb-2 flex-wrap">
                    <span className="text-[#46d369] font-bold">{book.matchRate}% Match</span>
                    <span>{book.year}</span>
                    <span className="border border-white/40 px-1 rounded-sm">{book.maturityRating}</span>
                    <span>{book.length}</span>
                  </div>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {book.genres?.slice(0, 2).map(g => (
                      <span key={g} className="bg-white/10 px-1.5 py-0.5 rounded text-[8px] text-zinc-300">{g}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-zinc-800/60 border border-white/40 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white transition-all">
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                    <button className="w-8 h-8 bg-zinc-800/60 border border-white/40 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white transition-all">
                      <BookOpen className="w-3 h-3" />
                    </button>
                    <button className="w-8 h-8 bg-zinc-800/60 border border-white/40 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white transition-all">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-[-25px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[#ff6b35]/90 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ff6b35] shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
