'use client';

import { motion } from 'framer-motion';

const text = "HIGH PERFORMANCE WELLNESS MADE FOR REAL LIFE";

export default function ScrollingTicker() {
  return (
    <div className="bg-[#FFF44F] border-y border-[#FFF44F] py-3 overflow-hidden flex whitespace-nowrap">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        className="flex gap-12 items-center"
      >
        {[...Array(10)].map((_, i) => (
          <span 
            key={i} 
            className="text-sm md:text-base font-montserrat font-black tracking-tight text-black uppercase"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}