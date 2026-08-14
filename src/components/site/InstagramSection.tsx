"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Instagram, ArrowRight } from "lucide-react";

import catWomen from "@/assets/cat-women.jpg";
import featFestive from "@/assets/feat-festive.jpg";
import storeInterior from "@/assets/store-interior.jpg";
import textureSilk from "@/assets/texture-silk.jpg";
import craftHands from "@/assets/craft-hands.jpg";

gsap.registerPlugin(ScrollTrigger);

const instagramPosts = [
  { id: 1, image: catWomen, type: "image" },
  { id: 2, image: storeInterior, type: "reel" },
  { id: 3, image: textureSilk, type: "image" },
  { id: 4, image: featFestive, type: "image" },
  { id: 5, image: craftHands, type: "image" },
];

export function InstagramSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
      
      tl.fromTo(".ig-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out" })
        .fromTo(".ig-item", 
          { y: 50, opacity: 0, scale: 0.98 }, 
          { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }, 
          "-=0.6"
        )
        .fromTo(".ig-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8");
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 lg:py-40 bg-background overflow-hidden border-t border-border/30">
      
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        
        {/* Intro */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <p className="ig-title eyebrow text-primary mb-4 tracking-[0.25em]">FOLLOW THE PREETHI STORY</p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ig-title font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1] hover:text-primary transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
            @preethisilks
          </a>
          <p className="ig-title mt-6 text-sm md:text-base text-muted-foreground font-light leading-relaxed">
            Discover the latest stories, collections and moments from Preethi Silks.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 auto-rows-min">
          
          {/* Post 1: Large Feature (Mobile 100%, Tablet 100%, Desktop 5/12) */}
          <a href="#" className="ig-item group relative overflow-hidden bg-muted/20 col-span-2 md:col-span-12 lg:col-span-5 lg:row-span-2 aspect-[4/5] lg:aspect-auto h-full rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <img src={instagramPosts[0]!.image} alt="Preethi Silks Instagram" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" />
            <HoverOverlay type={instagramPosts[0]!.type} />
          </a>

          {/* Post 2: Medium Reel (Mobile 100%, Tablet 50%, Desktop 4/12) */}
          <a href="#" className="ig-item group relative overflow-hidden bg-muted/20 col-span-2 md:col-span-6 lg:col-span-4 lg:row-span-2 aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] h-full rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <img src={instagramPosts[1]!.image} alt="Preethi Silks Instagram" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" />
            <HoverOverlay type={instagramPosts[1]!.type} />
          </a>

          {/* Post 3 & 4: Stack on Right (Mobile Side-by-Side, Tablet 50% stack, Desktop 3/12 stack) */}
          <div className="col-span-2 md:col-span-6 lg:col-span-3 grid grid-cols-2 md:flex md:flex-col gap-4 md:gap-6 lg:gap-8">
            <a href="#" className="ig-item group relative overflow-hidden bg-muted/20 aspect-square rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <img src={instagramPosts[2]!.image} alt="Preethi Silks Instagram" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" />
              <HoverOverlay type={instagramPosts[2]!.type} />
            </a>
            <a href="#" className="ig-item group relative overflow-hidden bg-muted/20 aspect-square rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <img src={instagramPosts[3]!.image} alt="Preethi Silks Instagram" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" />
              <HoverOverlay type={instagramPosts[3]!.type} />
            </a>
          </div>

          {/* Post 5: Detail Floating (Desktop Only) */}
          <a href="#" className="ig-item hidden lg:block group relative overflow-hidden bg-muted/20 lg:col-span-3 lg:col-start-6 lg:-mt-16 aspect-square z-10 rounded-sm shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary">
             <img src={instagramPosts[4]!.image} alt="Preethi Silks Instagram" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" />
             <HoverOverlay type={instagramPosts[4]!.type} />
          </a>
          
        </div>

        {/* CTA */}
        <div className="ig-cta mt-16 md:mt-24 flex justify-center">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 border border-border px-8 py-4 text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
            <Instagram className="size-4" /> Follow @preethisilks <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}

function HoverOverlay({ type }: { type: string }) {
  return (
    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:bg-black/30 flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center translate-y-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <Instagram className="size-8 text-white mb-3 stroke-[1]" />
        <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white font-medium">
          {type === 'reel' ? 'Watch Reel' : 'View on Instagram'}
        </span>
      </div>
    </div>
  );
}
