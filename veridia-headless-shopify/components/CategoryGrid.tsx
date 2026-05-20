'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    title: 'Digestion',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop',
    handle: 'digestion'
  },
  {
    title: 'Skin',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop',
    handle: 'skin'
  },
  {
    title: 'Hair',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop',
    handle: 'hair'
  },
  {
    title: 'Mood',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    handle: 'mood'
  },
  {
    title: 'Immunity',
    image: 'https://images.unsplash.com/photo-1511295742364-917e700b6248?q=80&w=800&auto=format&fit=crop',
    handle: 'immunity'
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-24 px-4 md:px-6 w-full max-w-[1600px] mx-auto">
      <h2 className="text-center text-3xl md:text-5xl font-bold font-montserrat mb-16 tracking-tight text-gray-900">
        Shop for Skin, Hair, Body and Mood
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
        {categories.map((cat, i) => (
          <motion.a
            key={cat.title}
            href={`/collections/${cat.handle}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col items-center space-y-4"
          >
            <div className="w-full aspect-square overflow-hidden rounded-[1.25rem] shadow-sm group-hover:shadow-xl transition-all duration-500">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="flex items-center gap-1.5 transition-colors group-hover:text-[#e10098]">
              <span className="text-sm font-bold tracking-tight font-montserrat uppercase">{cat.title}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}