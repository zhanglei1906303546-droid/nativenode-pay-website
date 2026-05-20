'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

interface ProductListProps {
  products: any[];
}

export default function ProductList({ products }: ProductListProps) {
  const { addToCart } = useCart();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {products.map(({ node }: any) => (
        <motion.div 
          key={node.id} 
          variants={itemVariants}
          className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 group relative flex flex-col h-full"
        >
          <div className="aspect-[4/5] mb-8 overflow-hidden flex items-center justify-center bg-[#fafafa] rounded-[2rem] p-4">
            <img 
              src={node.images.edges[0]?.node.url} 
              alt={node.title}
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />)}
            <span className="text-[11px] text-gray-400 font-medium ml-2 font-montserrat">4.8 (2,400 Reviews)</span>
          </div>
          <h4 className="font-bold text-xl mb-2 leading-tight tracking-tight">{node.title}</h4>
          <p className="text-[13px] text-gray-400 mb-6 line-clamp-2 leading-relaxed font-montserrat">{node.description}</p>
          <div className="flex justify-between items-center mt-auto pt-4">
            <span className="font-black text-2xl font-montserrat tracking-tight">${parseFloat(node.priceRange.minVariantPrice.amount).toFixed(0)}</span>
            <button 
              onClick={() => addToCart({
                id: node.id,
                title: node.title,
                price: parseFloat(node.priceRange.minVariantPrice.amount),
                quantity: 1,
                image: node.images.edges[0]?.node.url
              })}
              className="bg-black text-white text-[11px] font-bold px-6 py-3 rounded-full uppercase tracking-widest hover:bg-[#87917B] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Add to Bag
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}