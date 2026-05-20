'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Free shipping on $50+*",
  "Save 30% on every order - simply bundle and subscribe."
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white text-[12px] md:text-[13px] py-2 text-center font-bold tracking-[0.15em] h-12 flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute whitespace-nowrap px-4"
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}