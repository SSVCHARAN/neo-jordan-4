"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const baseStyle = "relative overflow-hidden font-medium tracking-wide uppercase transition-all duration-500 flex items-center justify-center";
  
  const variants = {
    primary: "bg-white text-luxury-dark hover:bg-gold hover:text-white border border-transparent",
    secondary: "bg-luxury-dark text-white hover:bg-white hover:text-luxury-dark border border-transparent",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-luxury-dark",
  };
  
  const sizes = {
    sm: "px-6 py-2 text-xs",
    md: "px-10 py-4 text-sm",
    lg: "px-14 py-5 text-base",
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
