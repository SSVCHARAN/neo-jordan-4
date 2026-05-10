"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion, useMotionValueEvent, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 192;

export default function JordanCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // 1. Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Smooth spring physics for mechanical feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 3. Preloading images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = async () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/sequence/frame_${i}.jpg`;
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount === TOTAL_FRAMES) {
            setImages(loadedImages);
            // Slight delay for smooth transition after loading
            setTimeout(() => setIsLoading(false), 500);
          }
        };
        loadedImages[i] = img;
      }
    };

    preloadImages();
  }, []);

  // 4. Drawing logic
  const render = (progress: number) => {
    if (!canvasRef.current || images.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(progress * TOTAL_FRAMES)
    );

    const img = images[frameIndex];
    if (!img) return;

    const canvas = canvasRef.current;
    const { width, height } = canvas;
    
    ctx.clearRect(0, 0, width, height);

    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;
    
    let drawWidth, drawHeight, x, y;

    if (imgRatio > canvasRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      x = 0;
      y = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      x = (width - drawWidth) / 2;
      y = 0;
    }

    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  };

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    render(latest);
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        render(smoothProgress.get());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-5xl font-black tracking-tighter mb-4 italic"
            >
              {loadProgress}%
            </motion.div>
            <div className="w-64 h-[2px] bg-white/10 overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-red-600"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="mt-8 text-white/40 text-[10px] tracking-[0.4em] uppercase">
              Initializing DNA Assembly
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-0 left-0 h-dvh w-full flex items-center justify-center overflow-hidden z-0 pointer-events-none will-change-transform">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none"
        />

        <div className="absolute inset-0 pointer-events-none">
          <BeatOverlay 
            progress={smoothProgress}
            range={[0, 0.15]}
            title="AJ4 BRED"
            subtitle="The anatomy of a legend."
          />
          <BeatOverlay 
            progress={smoothProgress}
            range={[0.25, 0.4]}
            title="STRUCTURAL CORE"
            subtitle="Support wings and mesh side panels engineered for the court."
          />
          <BeatOverlay 
            progress={smoothProgress}
            range={[0.5, 0.65]}
            title="VISIBLE AIR"
            subtitle="The iconic heel unit meets a sculpted polyurethane midsole."
          />
          <BeatOverlay 
            progress={smoothProgress}
            range={[0.75, 0.9]}
            title="FLIGHT REVIVED"
            subtitle="Secured for the next generation."
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll to assemble</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white/60"
            />
          </div>
        </motion.div>

        {/* Global Progress Bar (Right Side) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 h-48 w-[1px] bg-white/10">
          <motion.div 
            style={{ 
              height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
              backgroundColor: "#e60000"
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function BeatOverlay({ progress, range, title, subtitle }: { 
  progress: any, 
  range: [number, number],
  title: string,
  subtitle: string 
}) {
  const opacity = useTransform(
    progress,
    [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
    [0, 1, 1, 0]
  );

  const blur = useTransform(
    progress,
    [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
    ["10px", "0px", "0px", "10px"]
  );

  const scale = useTransform(
    progress,
    [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
    [0.95, 1, 1, 1.05]
  );

  return (
    <motion.div 
      style={{ opacity, scale, filter: `blur(${blur})` }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
    >
      <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-6 italic">
        {title}
      </h2>
      <div className="h-[2px] w-12 bg-red-600 mb-6" />
      <p className="text-base md:text-lg text-white/50 font-light max-w-lg tracking-[0.2em] uppercase leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
}

