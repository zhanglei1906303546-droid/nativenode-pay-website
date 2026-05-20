'use client';

import { PRODUCTS } from '@/lib/mock-data';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import { Check, Info, Minus, Plus, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = PRODUCTS.find(p => p.handle === params.handle) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'sub' | 'once'>('sub');

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <AnnouncementBar />
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Product Images */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#F2F4F7] rounded-[40px] p-12 aspect-[4/5] flex items-center justify-center overflow-hidden">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-[#F2F4F7] rounded-2xl p-4 aspect-square flex items-center justify-center cursor-pointer hover:ring-2 ring-[#e10098] transition-all">
                  <img src={product.image} className="w-full h-full object-contain mix-blend-multiply opacity-50" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-5 space-y-8 sticky top-32">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex text-black">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                  {product.reviews} Reviews
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                {product.title}
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                {product.description}
              </p>
            </div>

            {/* Purchase Toggle */}
            <div className="space-y-4 pt-6">
              <div 
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${purchaseType === 'sub' ? 'border-[#e10098] bg-[#fdf2f8]' : 'border-gray-100 hover:border-gray-200'}`}
                onClick={() => setPurchaseType('sub')}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseType === 'sub' ? 'border-[#e10098]' : 'border-gray-300'}`}>
                      {purchaseType === 'sub' && <div className="w-2.5 h-2.5 rounded-full bg-[#e10098]" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-widest">Subscribe & Save 20%</p>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Free shipping + nutrition coaching</p>
                    </div>
                  </div>
                  <span className="font-bold text-xl">${(product.price * 0.8).toFixed(2)}</span>
                </div>
              </div>

              <div 
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${purchaseType === 'once' ? 'border-[#e10098] bg-[#fdf2f8]' : 'border-gray-100 hover:border-gray-200'}`}
                onClick={() => setPurchaseType('once')}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseType === 'once' ? 'border-[#e10098]' : 'border-gray-300'}`}>
                      {purchaseType === 'once' && <div className="w-2.5 h-2.5 rounded-full bg-[#e10098]" />}
                    </div>
                    <p className="font-bold text-sm uppercase tracking-widest">One-Time Purchase</p>
                  </div>
                  <span className="font-bold text-xl">${product.price}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center border border-gray-200 rounded-full px-6 py-4 bg-gray-50">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus className="w-4 h-4" /></button>
              </div>
              <button className="flex-1 bg-black text-white font-black uppercase tracking-[0.2em] rounded-full py-5 hover:bg-[#e10098] transition-all transform active:scale-[0.98]">
                Add to Cart
              </button>
            </div>

            {/* Icons Section */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              {[
                { label: 'Clean Label', icon: '✨' },
                { label: 'Non-GMO', icon: '🌱' },
                { label: 'Gluten Free', icon: '🌾' }
              ].map(item => (
                <div key={item.label} className="text-center space-y-2">
                  <div className="text-2xl">{item.icon}</div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Tabs / Sections */}
        <section className="mt-32 space-y-20">
          {/* Ingredients Grid */}
          <div className="bg-[#F9F7F2] rounded-[40px] p-12 lg:p-20">
            <div className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-serif">What's Inside</h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Clean, potent, and science-backed</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[1,2,3].map(i => (
                  <div key={i} className="text-center space-y-4">
                    <div className="w-24 h-24 bg-white rounded-full mx-auto shadow-sm flex items-center justify-center text-3xl">🧪</div>
                    <h4 className="font-bold uppercase tracking-widest text-sm">Ingredient {i}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Clinically proven to support overall health and vitality with maximum bioavailability.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-10">
            <div className="space-y-10">
              <h2 className="text-4xl lg:text-5xl font-serif">Clinically Proven Results</h2>
              <div className="space-y-8">
                {[
                  { percent: '90%', text: 'Reported better digestion after 2 weeks' },
                  { percent: '85%', text: 'Saw visible improvement in skin clarity' },
                  { percent: '95%', text: 'Would recommend to a friend' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-8">
                    <span className="text-5xl font-black text-[#e10098] w-24">{item.percent}</span>
                    <p className="text-lg text-gray-600 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-[40px] aspect-video overflow-hidden">
               <div className="w-full h-full bg-[#E8EAEF] flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">
                 Clinical Study Visual
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-20 border-t border-gray-100 text-center text-[10px] font-bold tracking-widest text-gray-300 uppercase">
        &copy; 2026 Veridia Health
      </footer>
    </div>
  );
}