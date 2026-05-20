'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface BestsellersSliderProps {
  products: any[];
}

export default function BestsellersSlider({ products }: BestsellersSliderProps) {
  const { addToCart } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Clone products for infinite loop effect
  const repeatedProducts = [...products, ...products, ...products];
  const [metrics, setMetrics] = useState({ itemWidth: 320, gap: 32, singleSetWidth: 0 });

  useEffect(() => {
    const calculateMetrics = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const firstItem = container.firstElementChild as HTMLElement;
        if (firstItem) {
          const itemWidth = firstItem.offsetWidth;
          const computedStyle = window.getComputedStyle(container);
          const gap = parseInt(computedStyle.columnGap || computedStyle.gap) || 32;
          const singleSetWidth = products.length * (itemWidth + gap);
          
          setMetrics({ itemWidth, gap, singleSetWidth });

          const screenWidth = window.innerWidth;
          // Precision initial offset calculation to center items with side peeks
          const initialOffset = singleSetWidth - ((screenWidth - itemWidth) / 2);
          container.scrollLeft = Math.round(initialOffset);
        }
      }
    };

    const timer = setTimeout(calculateMetrics, 100);
    window.addEventListener('resize', calculateMetrics);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateMetrics);
    };
  }, [products.length]);

  const handleScroll = () => {
    if (!scrollContainerRef.current || metrics.singleSetWidth === 0) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const { singleSetWidth } = metrics;

    // Seamless loop jump logic
    if (scrollLeft < singleSetWidth - clientWidth) {
      scrollContainerRef.current.scrollLeft = scrollLeft + singleSetWidth;
    } 
    else if (scrollLeft > 2 * singleSetWidth) {
      scrollContainerRef.current.scrollLeft = scrollLeft - singleSetWidth;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = metrics.itemWidth + metrics.gap;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 mb-16">
        <h3 className="text-center text-3xl md:text-5xl font-bold font-montserrat tracking-tight text-gray-900">
          Meet our Bestsellers
        </h3>
      </div>

      <div className="relative w-full">
        {/* Navigation Buttons - Larger size (w-16 h-16) */}
        <div className="absolute top-[35%] -translate-y-1/2 left-4 md:left-10 z-20">
          <button 
            onClick={() => scroll('left')}
            className="w-16 h-16 bg-[#e10098] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-8 h-8 stroke-[3px]" />
          </button>
        </div>
        
        <div className="absolute top-[35%] -translate-y-1/2 right-4 md:right-10 z-20">
          <button 
            onClick={() => scroll('right')}
            className="w-16 h-16 bg-[#e10098] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-8 h-8 stroke-[3px]" />
          </button>
        </div>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-8 overflow-x-auto scrollbar-hide px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {repeatedProducts.map((item: any, i: number) => {
            const node = item.node;
            return (
              <div 
                key={`${node.id}-${i}`} 
                className="flex-shrink-0 w-[320px] bg-white group cursor-pointer snap-start"
                onClick={() => window.location.href = `/products/${node.handle}`}
              >
                <div className="aspect-square mb-6 overflow-hidden flex items-center justify-center bg-[#F2F4F7] rounded-xl p-8 transition-shadow group-hover:shadow-md">
                  <img 
                    src={node.images.edges[0]?.node.url} 
                    alt={node.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="space-y-4 px-2">
                  <div className="text-center space-y-2">
                    <h4 className="font-bold text-xl tracking-tight text-gray-900 line-clamp-1">
                      {node.title}
                    </h4>
                    <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                      {node.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1 pt-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={cn("w-4 h-4 fill-black text-black", s === 5 && "fill-transparent")} />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                      <span>4.5</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>816 reviews</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-4">
                    <span className="font-bold text-lg text-gray-900">
                      ${parseFloat(node.priceRange.minVariantPrice.amount).toFixed(0)}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: node.id,
                          title: node.title,
                          price: parseFloat(node.priceRange.minVariantPrice.amount),
                          quantity: 1,
                          image: node.images.edges[0]?.node.url
                        });
                      }}
                      className="text-[13px] font-black tracking-widest uppercase hover:text-[#e10098] transition-colors font-montserrat"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Centered Start Shopping Button */}
      <div className="text-center mt-20">
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-[#e10098] text-white px-24 py-5 rounded-[4px] font-montserrat font-bold text-[13px] tracking-[0.2em] uppercase hover:bg-black transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 min-w-[320px]"
        >
          START SHOPPING
        </button>
      </div>
    </section>
  );
}