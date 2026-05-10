"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";

const FRAME_COUNT = 192; // 0 to 191

interface ShoeCanvasProps {
  progress: MotionValue<number>;
}

export default function ShoeCanvas({ progress }: ShoeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoaded(Math.round((loadedCount / FRAME_COUNT) * 100));
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  const renderFrame = (p: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT)));
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useEffect(() => {
    if (loaded === 100) {
      renderFrame(progress.get());
    }
    const unsubscribe = progress.on("change", (p) => renderFrame(p));
    return () => unsubscribe();
  }, [loaded, progress]);

  useEffect(() => {
    const handleResize = () => {
      if (loaded === 100) {
        renderFrame(progress.get());
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, progress]);

  return (
    <>
      {loaded < 100 && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
          <div className="text-4xl font-light mb-4 tracking-tighter">{loaded}%</div>
          <div className="h-[2px] w-48 bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${loaded}%` }}
            />
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />
    </>
  );
}
