'use client';

import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  
  const freeShippingThreshold = 50;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#F9F7F2] z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="text-xl font-bold tracking-tight font-montserrat flex items-center">
                YOUR BAG <span className="ml-2 text-sm text-gray-400">({cartItems.length})</span>
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Shipping Progress */}
            <div className="p-6 bg-white border-b border-gray-50">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-3">
                <span>
                  {subtotal >= freeShippingThreshold 
                    ? "You've unlocked free shipping! 🎉" 
                    : `You're $${remainingForFreeShipping.toFixed(2)} away from free shipping`}
                </span>
                <span className="text-gray-400">${subtotal.toFixed(2)} / $${freeShippingThreshold}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-[#87917B]"
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-lg">Your bag is empty</p>
                    <p className="text-sm text-gray-400">Add something to your bag to see it here.</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="bg-black text-white px-8 py-3 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-[#87917B] transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-24 bg-white rounded-2xl p-2 flex items-center justify-center border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-sm tracking-tight leading-tight">{item.title}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#87917B] font-bold mb-2">Subscribe & Save 20%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-[#e10098] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-[#e10098] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-black text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-white border-t border-gray-100 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Subtotal</span>
                  <span className="text-2xl font-black">${subtotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-black text-white py-5 rounded-full font-bold tracking-[0.2em] uppercase hover:bg-[#e10098] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group">
                  Secure Checkout
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    →
                  </motion.span>
                </button>
                <p className="text-[10px] text-center text-gray-400 font-medium">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}