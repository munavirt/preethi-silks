"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/hero-video-1.mp4";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Intro animations
      const tl = gsap.timeline();
      tl.fromTo(".ch-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" })
        .fromTo(".ch-title .line", { y: "110%" }, { y: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }, "-=0.6")
        .fromTo(".ch-subtitle", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.4")
        .fromTo(".ch-cta", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8");

      // Scroll transition to next section (BrandStory)
      gsap.to(".ch-content-layer", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        y: "25%",
        ease: "none"
      });
      
      gsap.to(".ch-video-layer", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        scale: 0.95,
        ease: "none"
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="top" className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black text-white">
      
      {/* Video Background Layer */}
      <div className="ch-video-layer absolute inset-0 w-full h-full z-0 will-change-transform">
        <video 
          src={heroVideo} 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-90 scale-105"
        />
        {/* Subtle gradient for text readability - minimal impact on video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />
      </div>

      {/* Content Layer */}
      <div className="ch-content-layer relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto mt-20 will-change-transform">
        
        <p className="ch-eyebrow eyebrow tracking-[0.3em] mb-6 md:mb-8 text-white/90">
          PREETHI SILKS
        </p>
        
        <h1 className="ch-title font-display text-[3.5rem] leading-[0.9] tracking-[-0.02em] sm:text-[4.5rem] md:text-6xl lg:text-[6.5rem] mb-6 md:mb-8 max-w-4xl">
           <span className="block overflow-hidden pb-2"><span className="line block">For every occasion</span></span>
           <span className="block overflow-hidden"><span className="line block italic text-white/95">worth remembering.</span></span>
        </h1>
        
        <h2 className="ch-subtitle text-xs md:text-sm lg:text-[0.95rem] font-medium tracking-[0.2em] uppercase text-white/80 mb-10 md:mb-14">
          Premium Silk Sarees, Bridal & Family Fashion in Kerala
        </h2>
        
        <div className="ch-cta">
          <Link 
            href="#discover" 
            className="group inline-flex items-center gap-3 bg-transparent border border-white text-white px-8 py-4 md:px-10 md:py-4 text-[0.7rem] uppercase tracking-[0.2em] font-medium transition-colors duration-300 hover:bg-primary hover:border-primary hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
          >
            Discover Preethi
            <ArrowRight className="size-3.5 md:size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
      </div>
    </section>
  );
}
