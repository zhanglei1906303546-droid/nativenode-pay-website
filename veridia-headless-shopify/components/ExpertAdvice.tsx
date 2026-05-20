'use client';

import { motion } from 'framer-motion';

export default function ExpertAdvice() {
  return (
    <section className="flex flex-col md:flex-row h-[840px] overflow-hidden">
      {/* Left Column: Text Content */}
      <div className="flex-[1.2] bg-[#F8BBD0] flex flex-col justify-center items-center px-8 py-20 md:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl space-y-12"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-black leading-[1.05]">
            YOUR GOALS,<br />
            <span className="italic font-normal">BACKED BY EXPERTS</span>
          </h2>
          
          <p className="text-base md:text-xl text-gray-800 font-medium leading-relaxed max-w-lg mx-auto">
            Get personalized advice from Veridia's RD Nutritionist, your science-backed partner in feeling your best this year.
          </p>
          
          <button 
            onClick={() => window.location.href = '/quiz'}
            className="bg-black text-white px-16 py-6 text-sm font-bold tracking-[0.25em] uppercase hover:bg-gray-900 transition-colors shadow-lg"
          >
            TAKE THE QUIZ
          </button>
        </motion.div>
      </div>

      {/* Right Column: Image Content */}
      <div className="flex-1 relative">
        <img 
          src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2400&auto=format&fit=crop" 
          alt="Veridia Nutritionist"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-8 right-8 text-right">
          <p className="text-xs font-bold text-black uppercase tracking-[0.2em]">
            Gaby Vaca-Bernal,
          </p>
          <p className="text-xs font-bold text-black uppercase tracking-[0.2em] opacity-60">
            RD Nutritionist
          </p>
        </div>
      </div>
    </section>
  );
}