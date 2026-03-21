/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  Play, 
  Info, 
  BookOpen, 
  ChevronDown,
  Filter,
  LogOut,
  LayoutDashboard,
  Upload,
  ShieldCheck,
  Globe,
  GraduationCap,
  Building2,
  BookMarked,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Constants
import { Book, TabType } from './types';
import { BOOKS, CATEGORIES } from './constants';

// Components
import { NetflixTV } from './components/NetflixTV';
import { TrendingCarousel } from './components/TrendingCarousel';
import { FilterPanel } from './components/FilterPanel';
import { UploadSection } from './components/UploadSection';
import { Dashboard } from './components/Dashboard';
import { AuthModals } from './components/AuthModals';
import { AdminPanel } from './components/AdminPanel';
import { AccessibilityTools } from './components/AccessibilityTools';

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'partner'>('user');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredBook = BOOKS[0];

  const filteredBooks = BOOKS.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans selection:bg-[#ff7700] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 px-6 lg:px-12 py-4 flex items-center justify-between ${scrolled ? 'bg-[#141414] shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <div 
            className="text-2xl font-black tracking-tighter text-[#ff7700] cursor-pointer flex items-center gap-2 group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-8 h-8 bg-[#ff7700] rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">L</div>
            <span className="hidden sm:inline uppercase">LitStream</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {(['home', 'catalog', 'portal', 'audiobooks', 'about'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition-colors hover:text-[#ff7700] capitalize ${activeTab === tab ? 'text-white font-bold' : 'text-zinc-400'}`}
              >
                {tab === 'portal' ? 'Partner Portal' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ff7700] transition-colors" />
            <input 
              type="text"
              placeholder="Titles, authors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-[#ff7700] focus:bg-black/60 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff7700] rounded-full border-2 border-[#141414]" />
            </button>
            
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#ff7700] to-[#cc5500] flex items-center justify-center font-bold text-xs">R</div>
                <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#181818] border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50">
                <div className="px-4 py-3 border-b border-white/5 mb-2">
                  <p className="text-sm font-bold">Renee Mangu</p>
                  <p className="text-xs text-zinc-500">renee@mangu-publishers.com</p>
                </div>
                <button onClick={() => setAuthType('login')} className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 flex items-center gap-3"><User className="w-4 h-4" /> Profile</button>
                <button onClick={() => setUserRole(userRole === 'admin' ? 'user' : 'admin')} className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 flex items-center gap-3"><ShieldCheck className="w-4 h-4" /> {userRole === 'admin' ? 'Switch to User' : 'Admin Panel'}</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 flex items-center gap-3"><LayoutDashboard className="w-4 h-4" /> Dashboard</button>
                <div className="border-t border-white/5 mt-2 pt-2">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 text-[#e50914] flex items-center gap-3"><LogOut className="w-4 h-4" /> Sign Out</button>
                </div>
              </div>
            </div>
            
            <button 
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[900] bg-[#141414] pt-24 px-8 flex flex-col gap-8"
          >
            {(['home', 'catalog', 'portal', 'audiobooks', 'about'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                className={`text-2xl font-bold capitalize ${activeTab === tab ? 'text-[#ff7700]' : 'text-zinc-400'}`}
              >
                {tab === 'portal' ? 'Partner Portal' : tab}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-0">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center px-6 lg:px-12 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src={featuredBook.cover} 
                  alt="Featured" 
                  className="w-full h-full object-cover brightness-[0.3] scale-110 blur-[2px]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
              </div>

              <div className="relative z-10 max-w-3xl flex flex-col items-start gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-1 bg-[#ff7700] rounded-full" />
                  <span className="text-[#ff7700] font-black tracking-widest uppercase text-sm">Featured Selection</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white"
                >
                  {featuredBook.title}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-zinc-300 max-w-xl leading-relaxed"
                >
                  {featuredBook.description}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4 mt-4"
                >
                  <button 
                    onClick={() => { setSelectedBook(featuredBook); setIsReading(true); }}
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-black hover:bg-zinc-200 transition-all active:scale-95 shadow-xl"
                  >
                    <Play className="w-6 h-6 fill-current" />
                    Start Reading
                  </button>
                  <button 
                    onClick={() => setSelectedBook(featuredBook)}
                    className="flex items-center gap-3 bg-zinc-600/50 backdrop-blur-md text-white px-8 py-4 rounded-lg font-black hover:bg-zinc-600 transition-all active:scale-95 border border-white/10"
                  >
                    <Info className="w-6 h-6" />
                    More Info
                  </button>
                </motion.div>
              </div>

              {/* Netflix TV Component */}
              <NetflixTV />
            </section>

            {/* Trending Carousel */}
            <TrendingCarousel books={BOOKS} onSelect={setSelectedBook} />

            {/* Catalog Preview */}
            <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-transparent to-[#0a0a0a]">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-4xl font-black mb-4">Explore Catalog</h2>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                      {CATEGORIES.map(cat => (
                        <button key={cat} className="whitespace-nowrap px-6 py-2 rounded-full bg-zinc-800/50 border border-white/5 text-zinc-400 hover:text-white hover:bg-[#ff7700] hover:border-[#ff7700] transition-all text-sm font-bold">
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => setFilterOpen(true)}
                    className="flex items-center gap-2 bg-zinc-800/50 px-6 py-3 rounded-xl border border-white/5 hover:bg-zinc-700 transition-all font-bold"
                  >
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {filteredBooks.map((book) => (
                    <motion.div
                      key={book.id}
                      whileHover={{ y: -10 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedBook(book)}
                    >
                      <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4 shadow-2xl">
                        <img 
                          src={book.cover} 
                          alt={book.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 bg-[#ff7700] rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-white group-hover:text-[#ff7700] transition-colors truncate">{book.title}</h3>
                      <p className="text-xs text-zinc-500">{book.author}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Upload CTA */}
            <UploadSection />

            {/* Dashboard Preview */}
            <Dashboard />
          </>
        )}

        {activeTab === 'catalog' && (
          <div className="pt-24 px-6 lg:px-12 max-w-7xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-5xl font-black">Full Catalog</h1>
              <div className="flex gap-4">
                <button onClick={() => setFilterOpen(true)} className="flex items-center gap-2 bg-zinc-800 px-6 py-3 rounded-xl border border-white/5 hover:bg-zinc-700 transition-all font-bold">
                  <Filter className="w-5 h-5" />
                  Filter
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedBook(book)}
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4 shadow-2xl">
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-[#ff7700] rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-white group-hover:text-[#ff7700] transition-colors truncate">{book.title}</h3>
                  <p className="text-xs text-zinc-500">{book.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portal' && (
          <div className="pt-24 pb-20">
            <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-20">
              <div className="text-center mb-16">
                <h1 className="text-6xl font-black mb-6">Partner Portal</h1>
                <p className="text-xl text-zinc-400 max-w-3xl mx-auto">LitStream empowers publishers, academics, and trade partners with advanced tools for content distribution and analytics.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Publishers', icon: Building2, desc: 'Direct distribution, royalty tracking, and global reach for your catalog.', color: 'from-blue-500 to-indigo-600' },
                  { title: 'Academics', icon: GraduationCap, desc: 'Institutional access, research tools, and collaborative reading environments.', color: 'from-emerald-500 to-teal-600' },
                  { title: 'Trade Partners', icon: Globe, desc: 'Retail integrations, bulk licensing, and promotional partnerships.', color: 'from-orange-500 to-red-600' }
                ].map((p, i) => (
                  <div key={i} className="bg-[#181818] p-10 rounded-2xl border border-white/5 hover:border-[#ff7700]/30 transition-all group">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                      <p.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                    <p className="text-zinc-500 leading-relaxed mb-8">{p.desc}</p>
                    <button className="w-full py-4 bg-zinc-800 hover:bg-[#ff7700] rounded-xl font-bold transition-all">Learn More</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-zinc-900/40 py-20">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-8">Ready to Partner?</h2>
                <div className="bg-[#181818] p-10 rounded-2xl border border-white/5 text-left">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-[#ff7700]" /> Demo Access</h3>
                  <p className="text-zinc-400 mb-8">Experience the full power of our partner dashboard with these demo credentials:</p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                      <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Username</p>
                      <p className="font-mono text-[#ff7700]">partner_demo</p>
                    </div>
                    <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                      <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Password</p>
                      <p className="font-mono text-[#ff7700]">litstream2025</p>
                    </div>
                  </div>
                  <button className="w-full mt-10 py-4 bg-[#ff7700] hover:bg-[#cc5500] rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#ff7700]/20">Access Dashboard</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'audiobooks' && (
          <div className="pt-24 px-6 lg:px-12 max-w-7xl mx-auto pb-20">
            <h1 className="text-5xl font-black mb-12">Audiobooks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BOOKS.slice(0, 3).map(book => (
                <div key={book.id} className="bg-[#181818] rounded-2xl overflow-hidden border border-white/5 group hover:border-[#ff7700]/30 transition-all flex">
                  <div className="w-1/3 aspect-[2/3] overflow-hidden">
                    <img src={book.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-[#ff7700] transition-colors">{book.title}</h3>
                      <p className="text-sm text-zinc-500 mb-4">{book.author}</p>
                      <div className="flex items-center gap-2 text-xs text-[#46d369] font-bold">
                        <Play className="w-3 h-3 fill-current" />
                        12h 45m
                      </div>
                    </div>
                    <button className="w-full py-3 bg-zinc-800 hover:bg-[#ff7700] rounded-lg font-bold text-sm transition-all">Listen Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-24 pb-20">
            <section className="px-6 lg:px-12 max-w-4xl mx-auto text-center mb-20">
              <h1 className="text-6xl font-black mb-8">Our Mission</h1>
              <p className="text-2xl text-zinc-400 leading-relaxed">LitStream is redefining the literary experience. We believe that stories should be accessible, engaging, and immersive for everyone, everywhere.</p>
            </section>
            
            <section className="bg-zinc-900/40 py-20 px-6">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-4xl font-black mb-6">Why LitStream?</h2>
                  <ul className="space-y-6">
                    {[
                      { t: 'Unlimited Access', d: 'Stream thousands of books and audiobooks for one low monthly price.' },
                      { t: 'Exclusive Content', d: 'Original series and books you won\'t find anywhere else.' },
                      { t: 'Seamless Experience', d: 'Start reading on your phone, finish on your tablet or TV.' }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#ff7700] flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-xl mb-1">{item.t}</h4>
                          <p className="text-zinc-500">{item.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img src="https://picsum.photos/seed/about/800/450" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="w-20 h-20 bg-[#ff7700] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Admin Panel Overlay */}
      {userRole === 'admin' && <AdminPanel />}

      {/* Footer */}
      <footer className="bg-[#0a0a0a] pt-20 pb-10 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <div className="text-2xl font-black tracking-tighter text-[#ff7700] mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ff7700] rounded-lg flex items-center justify-center text-white">L</div>
              LITSTREAM
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed mb-8">
              Mangu Publishing's LitStream is the world's leading literary streaming platform, bringing stories to life through books, audio, and video.
            </p>
            <div className="flex gap-4">
              {['FB', 'TW', 'IG', 'YT'].map(s => (
                <button key={s} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#ff7700] transition-colors font-bold text-xs">{s}</button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-zinc-400">Platform</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><button className="hover:text-white transition-colors">Browse Catalog</button></li>
              <li><button className="hover:text-white transition-colors">Audiobooks</button></li>
              <li><button className="hover:text-white transition-colors">Originals</button></li>
              <li><button className="hover:text-white transition-colors">Gift Cards</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-zinc-400">Support</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><button className="hover:text-white transition-colors">Help Center</button></li>
              <li><button className="hover:text-white transition-colors">Account</button></li>
              <li><button className="hover:text-white transition-colors">Media Center</button></li>
              <li><button className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-zinc-400">Legal</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-white transition-colors">Terms of Use</button></li>
              <li><button className="hover:text-white transition-colors">Cookie Prefs</button></li>
              <li><button className="hover:text-white transition-colors">Corporate Info</button></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-zinc-600">© 2026 Mangu Publishing - LitStream. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            <button className="hover:text-zinc-400 transition-colors">English (US)</button>
            <button className="hover:text-zinc-400 transition-colors">Cookie Settings</button>
          </div>
        </div>
      </footer>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && !isReading && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-5xl bg-[#181818] rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedBook(null)}
                className="absolute top-6 right-6 z-50 p-2 bg-black/50 rounded-full hover:bg-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="lg:w-2/5 relative">
                <img 
                  src={selectedBook.cover} 
                  alt={selectedBook.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#181818] hidden lg:block" />
              </div>

              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#46d369] font-bold text-lg">{selectedBook.matchRate}% Match</span>
                    <span className="text-zinc-500">{selectedBook.year}</span>
                    <span className="border border-zinc-500 px-2 rounded text-sm">{selectedBook.maturityRating}</span>
                    <span className="text-zinc-500">{selectedBook.length}</span>
                  </div>
                  <h2 className="text-5xl font-black mb-4 leading-tight">{selectedBook.title}</h2>
                  <p className="text-xl text-[#ff7700] font-bold mb-6">{selectedBook.author}</p>
                  <p className="text-zinc-400 text-lg leading-relaxed">{selectedBook.description}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setIsReading(true)}
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-black hover:bg-zinc-200 transition-all active:scale-95"
                  >
                    <Play className="w-6 h-6 fill-current" />
                    Start Reading
                  </button>
                  <button className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl font-black transition-all active:scale-95 border border-white/5">
                    <BookMarked className="w-6 h-6" />
                    Add to List
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <span className="text-zinc-500 block mb-2 uppercase tracking-widest font-bold text-[10px]">Genres</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedBook.genres?.map(g => (
                        <span key={g} className="text-white hover:underline cursor-pointer">{g}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-2 uppercase tracking-widest font-bold text-[10px]">This book is</span>
                    <p className="text-white">Immersive, Emotional, Award-winning</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reading Interface Overlay */}
      <AnimatePresence>
        {isReading && selectedBook && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-[3000] bg-white text-black flex flex-col"
          >
            <div className="h-16 border-b flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsReading(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <div>
                  <h3 className="font-bold text-sm">{selectedBook.title}</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Chapter 1: The Beginning</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-32 h-1 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff7700] w-[15%]" />
                  </div>
                  <span className="text-xs font-bold">15%</span>
                </div>
                <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><Settings className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-20 px-6">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-serif mb-12 text-center">Chapter One</h1>
                <div className="space-y-8 text-xl font-serif leading-relaxed text-zinc-800">
                  <p><span className="text-6xl font-black float-left mr-4 mt-2 text-[#ff7700]">I</span>t was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.</p>
                  <p>The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features. Winston made for the stairs. It was no use trying the lift. Even at the best of times it was seldom working, and at present the electric current was cut off during daylight hours. It was part of the economy drive in preparation for Hate Week. The flat was seven flights up, and Winston, who was thirty-nine and had a varicose ulcer above his right ankle, went slowly, resting several times on the way. On each landing, opposite the lift-shaft, the poster with the enormous face gazed from the wall. It was one of those pictures which are so contrived that the eyes follow you about when you move. BIG BROTHER IS WATCHING YOU, the caption beneath it ran.</p>
                  <p>Inside the flat a fruity voice was reading out a list of figures which had something to do with the production of pig-iron. The voice came from an oblong metal plaque like a dulled mirror which formed part of the surface of the right-hand wall. Winston turned a switch and the voice sank somewhat, though the words were still distinguishable. The instrument (the telescreen, it was called) could be dimmed, but there was no way of shutting it off completely. He moved over to the window: a smallish, frail figure, the meagreness of his body merely emphasized by the blue overalls which were the uniform of the party. His hair was very fair, his face naturally sanguine, his skin roughened by coarse soap and blunt razor blades and the cold of the winter that had just ended.</p>
                </div>
              </div>
            </div>
            
            <div className="h-16 border-t flex items-center justify-center gap-12 bg-white">
              <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><ChevronLeft className="w-6 h-6" /></button>
              <span className="text-sm font-bold">Page 1 of 432</span>
              <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlays & Tools */}
      <FilterPanel isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <AuthModals type={authType} onClose={() => setAuthType(null)} onSwitch={setAuthType} />
      <AccessibilityTools />
    </div>
  );
}
