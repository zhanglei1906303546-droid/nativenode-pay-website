'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const shopCategories = [
  { name: 'Skin', desc: 'Clear & glowing from within', color: '#fce7f3', handle: 'skin' },
  { name: 'Hair', desc: 'Stronger, longer, fuller', color: '#fef3c7', handle: 'hair' },
  { name: 'Mood', desc: 'Balance & mental clarity', color: '#e0e7ff', handle: 'mood' },
  { name: 'Body', desc: 'Metabolism & wellness', color: '#d1fae5', handle: 'body' },
  { name: 'Digestion', desc: 'Gut health & bloating', color: '#ffedd5', handle: 'digestion' },
  { name: 'Sleep', desc: 'Restful, deep recovery', color: '#ede9fe', handle: 'sleep' },
  { name: 'Energy', desc: 'Natural daily boost', color: '#fef9c3', handle: 'energy' },
  { name: 'Immunity', desc: 'Defense & protection', color: '#fee2e2', handle: 'immunity' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const { setIsCartOpen, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'SHOP', href: '#', hasDropdown: true },
    { name: 'QUIZ', href: '/quiz' },
    { name: 'SCIENCE', href: '#' },
  ];

  return (
    <>
      <nav 
        className={cn(
          "sticky top-0 z-[60] px-4 md:px-10 h-20 flex justify-between items-center transition-all duration-300",
          isScrolled || isShopMenuOpen
            ? "bg-white border-b border-gray-100 shadow-sm" 
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="flex gap-12 items-center">
          <div className="relative h-8 w-32 flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
            <svg viewBox="0 0 120 30" className="w-full h-full">
              <text 
                x="0" 
                y="22" 
                fontFamily="var(--font-montserrat)" 
                fontWeight="800" 
                fontSize="24" 
                letterSpacing="-0.02em" 
                fill="currentColor" 
                className={cn("transition-colors duration-300", (isScrolled || isShopMenuOpen) ? "text-black" : "text-black")}
              >
                Veridia
              </text>
            </svg>
          </div>
          
          <div className="hidden md:flex gap-10 text-[13px] font-bold tracking-[0.1em] font-montserrat h-full items-center">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative h-full flex items-center cursor-pointer group"
                onMouseEnter={() => {
                  setHoveredItem(item.name);
                  if (item.hasDropdown) setIsShopMenuOpen(true);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  if (item.hasDropdown) setIsShopMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-1 py-2">
                  <a href={item.href} className="transition-colors duration-300 group-hover:text-[#e10098]">
                    {item.name}
                  </a>
                  {item.hasDropdown && (
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isShopMenuOpen ? "rotate-180 text-[#e10098]" : "group-hover:text-[#e10098]")} />
                  )}
                </div>
                <AnimatePresence>
                  {hoveredItem === item.name && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-5 left-0 right-0 h-[2px] bg-[#e10098]"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <Search className="w-5 h-5 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-[#e10098]" />
          <User className="w-5 h-5 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-[#e10098]" />
          <div className="relative group cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#e10098]" />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-[#e10098] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-md"
              >
                {totalItems}
              </motion.span>
            )}
          </div>
        </div>
      </nav>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {isShopMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
              onMouseEnter={() => setIsShopMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl z-50 pt-12 pb-16 px-10"
              onMouseEnter={() => setIsShopMenuOpen(true)}
              onMouseLeave={() => setIsShopMenuOpen(false)}
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-10">
                  {shopCategories.map((cat) => (
                    <a 
                      key={cat.name} 
                      href={`/collections/${cat.handle}`} 
                      className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-50 group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundColor: cat.color }}
                      >
                        <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">{cat.name}</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm tracking-tight group-hover:text-[#e10098] transition-colors font-montserrat uppercase">{cat.name}</h4>
                        <p className="text-[11px] text-gray-400 leading-tight font-medium font-montserrat">{cat.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
                
                <div className="mt-16 flex justify-between items-center pt-8 border-t border-gray-50">
                  <div className="flex gap-8">
                    <a href="/collections/skin" className="text-[11px] font-black tracking-widest uppercase hover:text-[#e10098] transition-colors font-montserrat">Shop All Products</a>
                    <a href="#" className="text-[11px] font-black tracking-widest uppercase hover:text-[#e10098] transition-colors font-montserrat">Bundle & Save</a>
                    <a href="#" className="text-[11px] font-black tracking-widest uppercase hover:text-[#e10098] transition-colors font-montserrat">New Arrivals</a>
                  </div>
                  <div className="bg-[#87917B]/10 px-6 py-3 rounded-full flex items-center gap-3">
                    <span className="text-[10px] font-bold text-[#87917B] uppercase tracking-wider font-montserrat">Not sure where to start?</span>
                    <a href="/quiz" className="text-[10px] font-black text-black uppercase tracking-widest underline decoration-2 underline-offset-4 font-montserrat">Take the quiz</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}