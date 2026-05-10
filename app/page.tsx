"use client";

import { useRef } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import ShoeCanvas from "@/components/ShoeCanvas";
import TestimonialCard from "@/components/TestimonialCard";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { DiaTextReveal } from "@/components/magicui/dia-text-reveal";
import { HyperText } from "@/components/magicui/hyper-text";
import { LightRays } from "@/components/magicui/light-rays";
import { NeonButton } from "@/components/ui/NeonButton";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Beat A: 0 - 20%
  const beatAOpacity = useTransform(smoothProgress, [0, 0.02, 0.18, 0.2], [0, 1, 1, 0]);
  const beatAY = useTransform(smoothProgress, [0, 0.02, 0.18, 0.2], [30, 0, 0, -30]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  // Beat B: 25 - 50%
  const beatBOpacity = useTransform(smoothProgress, [0.25, 0.27, 0.48, 0.5], [0, 1, 1, 0]);
  const beatBY = useTransform(smoothProgress, [0.25, 0.27, 0.48, 0.5], [30, 0, 0, -30]);

  // Beat C: 55 - 75%
  const beatCOpacity = useTransform(smoothProgress, [0.55, 0.57, 0.73, 0.75], [0, 1, 1, 0]);
  const beatCY = useTransform(smoothProgress, [0.55, 0.57, 0.73, 0.75], [30, 0, 0, -30]);

  // Beat D: 80 - 100%
  const beatDOpacity = useTransform(smoothProgress, [0.8, 0.82, 0.98, 1], [0, 1, 1, 0]);
  const beatDY = useTransform(smoothProgress, [0.8, 0.82, 0.98, 1], [30, 0, 0, -30]);

  const scrollToShowcase = () => {
    showcaseRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-[#0A0A0A] selection:bg-white/20 selection:text-white">
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ShoeCanvas progress={smoothProgress} />

          {/* Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Scroll Indicator */}
            <motion.div 
              style={{ opacity: scrollIndicatorOpacity }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              {/* AnimatedGradientText for "Scroll to Explore" */}
              <AnimatedGradientText
                colorFrom="#ffffff"
                colorTo="#525252"
                speed={0.4}
                className="text-xs tracking-widest uppercase font-medium"
              >
                Scroll to Explore
              </AnimatedGradientText>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>

            {/* Beat A */}
            <motion.div 
              style={{ opacity: beatAOpacity, y: beatAY }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <h1 className="text-6xl md:text-9xl font-black text-white/95 tracking-tighter mb-4 uppercase">
                DEFY GRAVITY.
              </h1>
              <p className="text-xl md:text-2xl font-semibold tracking-wide max-w-xl text-balance text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.1)]">
                The future of kinetic footwear has{" "}
                <span className="text-[#D60A22] drop-shadow-[0_0_20px_rgba(214,10,34,0.4)]">arrived.</span>
              </p>
            </motion.div>

            {/* Beat B */}
            <motion.div 
              style={{ opacity: beatBOpacity, y: beatBY }}
              className="absolute inset-0 flex flex-col justify-center px-8 md:px-24"
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white/95 tracking-tighter mb-8 max-w-2xl uppercase">
                ENGINEERED TO FLY.
              </h2>
              <div className="space-y-12 pointer-events-auto">
                <div className="flex flex-col relative">
                  <span className="text-white font-medium text-lg tracking-wide">Aero-Mesh Upper</span>
                  <span className="text-white/50 font-light tracking-wide">Breathable, adaptive fit.</span>
                  <div className="absolute top-1/2 left-[280px] w-32 h-[1px] bg-white/20 hidden lg:block" />
                </div>
                <div className="flex flex-col relative">
                  <span className="text-white font-medium text-lg tracking-wide">Carbon-Propel Plate</span>
                  <span className="text-white/50 font-light tracking-wide">Maximum energy return.</span>
                  <div className="absolute top-1/2 left-[280px] w-48 h-[1px] bg-white/20 hidden lg:block" />
                </div>
                <div className="flex flex-col relative">
                  <span className="text-white font-medium text-lg tracking-wide">Cloud-Foam Midsole</span>
                  <span className="text-white/50 font-light tracking-wide">Zero-gravity cushioning.</span>
                  <div className="absolute top-1/2 left-[280px] w-40 h-[1px] bg-white/20 hidden lg:block" />
                </div>
              </div>
            </motion.div>

            {/* Beat C */}
            <motion.div 
              style={{ opacity: beatCOpacity, y: beatCY }}
              className="absolute inset-0 flex items-center justify-start md:justify-end px-8 md:px-24"
            >
              <div className="flex flex-col gap-6 w-full max-w-md pointer-events-auto">
                <TestimonialCard 
                  quote="Like running on air. It completely changed my marathon pace."
                  author="Sarah J."
                  role="Pro Runner"
                />
                <TestimonialCard 
                  quote="The most responsive sneaker I've ever worn. Period."
                  author="Marcus T."
                  role="Sneaker Collector"
                />
              </div>
            </motion.div>

            {/* Beat D */}
            <motion.div 
              style={{ opacity: beatDOpacity, y: beatDY }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
            >
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white/95">
                <DiaTextReveal
                  text="SECURE YOUR PAIR."
                  textColor="rgba(255,255,255,0.95)"
                  colors={["#FFFFFF", "#A3A3A3", "#525252", "#FFFFFF"]}
                  duration={2.5}
                  delay={0.1}
                  startOnView={true}
                  className="inline-block"
                />
              </h2>
              <div className="flex items-center justify-center">
                <NeonButton
                  variant="ghost"
                  size="lg"
                  onClick={scrollToShowcase}
                  className="tracking-widest"
                >
                  PRE-ORDER NOW
                </NeonButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Product Showcase & Reviews Section */}
      <section ref={showcaseRef} className="bg-[#0A0A0A] text-white py-32 px-4 md:px-12 lg:px-24 rounded-t-[4rem] relative z-20 -mt-10 overflow-hidden border-t border-white/5">
        <LightRays 
          color="rgba(255, 255, 255, 0.05)" 
          count={15} 
          speed={8} 
          className="opacity-50" 
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              Beyond <br />
              <AuroraText colors={["#FFFFFF", "#A3A3A3", "#525252", "#0A0A0A"]}>The Court.</AuroraText>
            </h2>
            <div className="max-w-md text-lg text-[#A3A3A3] font-light tracking-wide text-balance leading-[1.6]">
              Engineered for the elite. The Air Jordan 4 "Bred" returns with true-to-original specifications, remastered for a new era of flight.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
            {/* Main Image feature */}
            <div className="md:col-span-8 rounded-3xl overflow-hidden bg-black/40 aspect-video relative group border border-white/10">
              <img src="/sequence/frame_0.jpg" alt="Air Jordan 4 Side" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-screen" />
            </div>

            {/* Testimonial Card 1 */}
            <div className="md:col-span-4 rounded-3xl bg-white/5 p-10 flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500 border border-white/10">
              <div className="text-4xl text-white/20">"</div>
              <p className="text-2xl font-light text-white/90 leading-snug text-balance">
                An absolute masterpiece. The silhouette is aggressive yet perfectly balanced.
              </p>
              <div className="mt-8">
                <p className="font-bold tracking-wide text-white">Complex Sneakers</p>
                <p className="text-sm text-white/30 uppercase tracking-widest mt-1">Editorial Review</p>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="md:col-span-5 rounded-3xl bg-white/5 p-10 flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500 border border-white/10">
              <div className="text-4xl text-white/20">"</div>
              <p className="text-2xl font-light text-white/90 leading-snug text-balance">
                The attention to detail on the 1989 true specs is flawless. A must-have for any serious collector.
              </p>
              <div className="mt-8">
                <p className="font-bold tracking-wide text-white">Hypebeast</p>
                <p className="text-sm text-white/30 uppercase tracking-widest mt-1">Product Review</p>
              </div>
            </div>

            {/* Secondary Image Features */}
            <div className="md:col-span-7 grid grid-cols-2 gap-6">
              <div className="rounded-3xl overflow-hidden bg-white/5 aspect-square relative group border border-white/10">
                <img src="/sequence/frame_45.jpg" alt="Air Jordan 4 Detail" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-screen" />
              </div>
              <div className="rounded-3xl overflow-hidden bg-white/5 aspect-square relative group border border-white/10">
                <img src="/sequence/frame_135.jpg" alt="Air Jordan 4 Detail" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-screen" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center bg-black/40 rounded-[3rem] p-16 md:p-32 text-white overflow-hidden relative border border-white/10 shadow-[0_0_80px_rgba(214,10,34,0.15)]">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img src="/sequence/frame_100.jpg" alt="Background Texture" className="w-full h-full object-cover mix-blend-screen blur-[2px]" />
            </div>
            
            <div className="relative z-10 mb-10 md:mb-0 max-w-xl">
              <HyperText 
                as="h3" 
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white"
                duration={1000}
                startOnView={true}
              >
                The Icon Returns.
              </HyperText>
              <p className="text-white/40 font-light text-lg mb-8 tracking-wide">
                Available now. Limited quantities.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center md:items-end">
              <span className="text-5xl font-medium tracking-widest mb-6 text-white/70">$240.00</span>
              <NeonButton 
                variant="ghost"
                size="lg"
                onClick={() => alert("Redirecting to secure checkout...")}
                className="tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.05)]"
              >
                Buy Now
              </NeonButton>
            </div>
          </div>

        </div>
      </section>
      
      <footer className="max-w-7xl mx-auto w-full px-4 md:px-12 lg:px-24 pt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-white/40">
        <div>© 2026 NEO. All Rights Reserved.</div>
        <div className="group cursor-default">
          DESIGNED & DEVELOPED BY{" "}
          <span className="text-white/40 group-hover:text-white transition-colors duration-500 border-b border-transparent group-hover:border-white/20 pb-0.5">
            SSV CHARAN.
          </span>
        </div>
      </footer>
    </main>
  );
}
