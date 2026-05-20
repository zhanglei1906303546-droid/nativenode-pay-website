'use client';

import { COLLECTIONS, PRODUCTS } from '@/lib/mock-data';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import ProductList from '@/components/ProductList';
import { ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CollectionPage({ params }: { params: { handle: string } }) {
  const collection = COLLECTIONS.find(c => c.handle === params.handle);
  const products = PRODUCTS.filter(p => p.collection === params.handle);

  if (!collection) return <div>Collection not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* Hero Header */}
      <header className="bg-[#F9F7F2] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <nav className="flex justify-center items-center gap-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            <a href="/" className="hover:text-black">Home</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-black">{collection.title}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900">{collection.title}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-montserrat">
            {collection.description}
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-20 z-30 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase hover:text-[#e10098] transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Filter By
            </button>
            <span className="h-4 w-px bg-gray-200 hidden md:block" />
            <div className="hidden md:flex gap-4">
              {['Vegan', 'Gluten-Free', 'Non-GMO'].map(f => (
                <button key={f} className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest">
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{products.length} Products</span>
            <select className="text-[11px] font-bold uppercase tracking-widest border-none focus:ring-0 cursor-pointer bg-transparent">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => window.location.href = `/products/${product.handle}`}
            >
              {/* Image with background */}
              <div className="aspect-square bg-[#F2F4F7] rounded-3xl p-10 mb-6 relative overflow-hidden flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                />
                <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-6 py-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 uppercase tracking-widest">
                  Quick Add
                </button>
              </div>

              {/* Info */}
              <div className="space-y-3 px-2">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 bg-black rounded-full scale-[0.8]" />)}
                  <span className="text-[10px] font-bold text-gray-400 ml-1 uppercase">{product.reviews} Reviews</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900">{product.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 min-h-[2.5rem] font-montserrat">
                  {product.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="font-bold text-lg">${product.price}</span>
                  <button className="text-[11px] font-black tracking-widest uppercase hover:text-[#e10098] transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer Placeholder */}
      <footer className="bg-white py-20 border-t border-gray-100 text-center text-[10px] font-bold tracking-widest text-gray-300 uppercase">
        &copy; 2026 Veridia Health
      </footer>
    </div>
  );
}