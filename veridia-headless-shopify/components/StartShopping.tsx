'use client';

import { motion } from 'framer-motion';

export default function StartShoppingSection() {
  return (
    <section className="py-32 bg-[#F9F7F2] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight">
            Ready to feel <br />
            <span className="italic">your best?</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto font-montserrat font-medium">
            Join 1M+ people who have transformed their wellness journey with Veridia.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-black text-white px-16 py-6 rounded-full font-montserrat font-black text-sm tracking-[0.25em] uppercase hover:bg-[#e10098] transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(225,0,152,0.2)] transform hover:-translate-y-1"
          >
            START SHOPPING
          </button>
        </motion.div>
      </div>
    </section>
  );
}