"use client";

import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export default function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="bg-black/40 border border-white/10 p-8 backdrop-blur-[20px] rounded-3xl flex flex-col gap-4 transition-all hover:bg-black/50 hover:border-white/20 group">
      <Quote className="text-white w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity" />
      <p className="text-white/95 text-lg font-light leading-relaxed">
        "{quote}"
      </p>
      <div className="mt-2">
        <div className="text-white font-medium tracking-wide">{author}</div>
        <div className="text-white/40 text-sm tracking-widest uppercase">{role}</div>
      </div>
    </div>
  );
}
