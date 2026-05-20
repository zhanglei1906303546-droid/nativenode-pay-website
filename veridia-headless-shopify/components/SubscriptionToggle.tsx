'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface SubscriptionToggleProps {
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
  };
}

export default function SubscriptionToggle({ product }: SubscriptionToggleProps) {
  const { addToCart } = useCart();
  const [isSubscription, setIsSubscription] = useState(true);
  const oneTimePrice = product.price;
  const discount = 0.20;
  const subscriptionPrice = oneTimePrice * (1 - discount);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      title: product.title + (isSubscription ? ' (Subscription)' : ''),
      price: isSubscription ? subscriptionPrice : oneTimePrice,
      quantity: 1,
      image: product.image
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Subscription Option */}
        <div 
          onClick={() => setIsSubscription(true)}
          className={cn(
            "p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden",
            isSubscription ? "border-[#87917B] bg-[#f8f9f8]" : "border-gray-100 bg-white hover:border-gray-200"
          )}
        >
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                isSubscription ? "border-[#87917B] bg-[#87917B]" : "border-gray-300"
              )}>
                {isSubscription && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="font-bold text-sm tracking-tight">SUBSCRIBE & SAVE 20%</span>
            </div>
            <span className="font-black text-lg">${subscriptionPrice.toFixed(2)}</span>
          </div>
          <p className="text-[11px] text-gray-400 ml-8 font-medium">Free shipping + flexible delivery. Cancel anytime.</p>
          {isSubscription && (
            <motion.div 
              layoutId="active-bg"
              className="absolute top-0 right-0 bg-[#87917B] text-white text-[9px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest"
            >
              Popular
            </motion.div>
          )}
        </div>

        {/* One-time Option */}
        <div 
          onClick={() => setIsSubscription(false)}
          className={cn(
            "p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300",
            !isSubscription ? "border-black bg-gray-50" : "border-gray-100 bg-white hover:border-gray-200"
          )}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                !isSubscription ? "border-black bg-black" : "border-gray-300"
              )}>
                {!isSubscription && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="font-bold text-sm tracking-tight uppercase">One-time purchase</span>
            </div>
            <span className="font-black text-lg">${oneTimePrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: ShieldCheck, text: 'Science-Backed' },
          { icon: Zap, text: 'Fast Results' },
          { icon: Info, text: 'Clean Label' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center p-3 bg-white border border-gray-100 rounded-xl text-center space-y-2">
            <item.icon className="w-4 h-4 text-[#87917B]" />
            <span className="text-[9px] font-bold uppercase tracking-tighter text-gray-500">{item.text}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={handleAdd}
        className="w-full bg-black text-white py-5 rounded-full font-bold tracking-[0.2em] uppercase hover:bg-[#87917B] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group"
      >
        <span>ADD TO BAG</span>
        <span className="w-px h-4 bg-white/20" />
        <span className="font-black">${(isSubscription ? subscriptionPrice : oneTimePrice).toFixed(2)}</span>
      </button>
    </div>
  );
}