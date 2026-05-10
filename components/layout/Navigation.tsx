"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-6 ${
          isScrolled ? 'bg-luxury-dark/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-white hover:text-gold transition-colors"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
          
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif font-medium text-3xl tracking-[0.25em] text-white">
            NÉO
          </Link>
          
          <div className="flex items-center space-x-6">
            <button className="text-white hover:text-gold transition-colors text-sm uppercase tracking-widest hidden md:block">
              Account
            </button>
            <button className="text-white hover:text-gold transition-colors relative">
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-2 text-[10px] bg-gold text-white w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-luxury-dark/95 backdrop-blur-lg flex flex-col justify-center items-center"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-white hover:text-gold transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
            
            <nav className="flex flex-col space-y-8 text-center">
              {['Collection', 'Craftsmanship', 'Heritage', 'Journal', 'Contact'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href="#" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl md:text-6xl font-serif font-light text-white hover:text-gold transition-colors tracking-wide"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
