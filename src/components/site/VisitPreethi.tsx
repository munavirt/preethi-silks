"use client";
import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import storeInterior from "@/assets/store-interior.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";
import featWedding from "@/assets/feat-wedding.jpg";
import catBridal from "@/assets/cat-bridal.jpg";
import featFestive from "@/assets/feat-festive.jpg";
import craftHands from "@/assets/craft-hands.jpg";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { id: "kondotty", number: "01", name: "Kondotty", image: storeInterior, address: "Kondotty Main Road\nKerala 673638", hours: "Mon - Sat: 10AM - 8PM\nSun: 10AM - 2PM", phone: "+91 00000 00000" },
  { id: "feroke", number: "02", name: "Feroke", image: heroPortrait, address: "Feroke High Street\nKerala 673631", hours: "Mon - Sat: 10AM - 8PM\nSun: Closed", phone: "+91 00000 00001" },
  { id: "malappuram", number: "03", name: "Malappuram", image: featWedding, address: "Down Hill\nKerala 676519", hours: "Mon - Sun: 9AM - 9PM", phone: "+91 00000 00002" },
  { id: "palakkad", number: "04", name: "Palakkad", image: catBridal, address: "Coimbatore Road\nKerala 678001", hours: "Mon - Sat: 10AM - 8:30PM", phone: "+91 00000 00003" },
  { id: "kuttiady", number: "05", name: "Kuttiady", image: featFestive, address: "Kuttiady Junction\nKerala 673508", hours: "Mon - Sat: 9:30AM - 8PM", phone: "+91 00000 00004" },
  { id: "uae", number: "06", name: "UAE", image: craftHands, address: "Dubai Mall\nDubai, UAE", hours: "Mon - Sun: 10AM - 11PM", phone: "+971 00 000 0000" },
];

function ArchitecturalStorefront({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 300" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" preserveAspectRatio="xMidYMax meet">
       <path d="M0 280 H600" opacity="0.3" />
       <path d="M100 280 V100 H500 V280" opacity="0.5"/>
       <path d="M80 100 H520 V80 H80 Z" opacity="0.6"/>
       <path d="M150 280 V130 H180 V280" opacity="0.4"/>
       <path d="M420 280 V130 H450 V280" opacity="0.4"/>
       <path d="M260 280 V160 Q300 120 340 160 V280" opacity="0.7"/>
    </svg>
  );
}

export function VisitPreethi() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const isAnimating = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
      
      tl.fromTo(".vp-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" })
        .fromTo(".vp-thread-line", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, "-=0.5")
        .fromTo(".vp-thread-line-v", { scaleY: 0 }, { scaleY: 1, duration: 1.5, ease: "power3.inOut" }, "<")
        .fromTo(".vp-node", { scale: 0 }, { scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }, "-=1")
        .fromTo(".vp-node-label", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.8")
        .fromTo(".vp-presentation", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.6");
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSelect = (index: number) => {
    if (index === active || isAnimating.current) return;
    
    setPrev(active);
    setActive(index);
    isAnimating.current = true;
    
    const ctx = gsap.context(() => {
      // Directional Wipe Mask
      gsap.fromTo(".vp-image-new", 
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        { 
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
          duration: 1.2, 
          ease: "power3.inOut",
          onComplete: () => { isAnimating.current = false; }
        }
      );
      
      // Slight pan on the new image for premium feel
      gsap.fromTo(".vp-image-new-img",
        { scale: 1.05, x: -10 },
        { scale: 1, x: 0, duration: 1.6, ease: "power3.out" }
      );
      
      // Info Panel Crossfade
      gsap.fromTo(".vp-info",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" }
      );
      
    }, containerRef);
  };
  
  return (
    <section ref={containerRef} id="visit" className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden">
      
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <p className="vp-title eyebrow text-primary mb-4 tracking-[0.3em]">VISIT PREETHI</p>
          <h2 className="vp-title font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1]">
            SIX PLACES.<br className="md:hidden" /> ONE PREETHI.
          </h2>
        </div>

        {/* The Thread & Nodes */}
        <div className="relative mt-20 lg:mt-32 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0">
          
          {/* Architectural Artwork */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%] w-[400px] lg:w-[600px] text-foreground opacity-[0.03] pointer-events-none -z-0">
             <ArchitecturalStorefront className="w-full h-full" />
          </div>

          {/* Desktop Line */}
          <div className="hidden md:block absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[1px] bg-border/40" />
          <div className="vp-thread-line hidden md:block absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[1px] bg-primary origin-left" />
          
          {/* Mobile Line */}
          <div className="md:hidden absolute top-4 bottom-4 left-[9px] w-[1px] bg-border/40" />
          <div className="vp-thread-line-v md:hidden absolute top-4 bottom-4 left-[9px] w-[1px] bg-primary origin-top" />

          {locations.map((loc, i) => (
            <button 
              key={loc.id}
              onClick={() => handleSelect(i)}
              className="relative z-10 flex flex-row md:flex-col items-center gap-6 md:gap-5 group outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm"
              aria-label={`View ${loc.name} store details`}
            >
              <div className={`vp-node w-5 h-5 rounded-full border border-primary flex items-center justify-center transition-colors duration-500 ${active === i ? 'bg-primary' : 'bg-background group-hover:bg-primary/10'}`}>
                 {active === i && <div className="w-1.5 h-1.5 rounded-full bg-background" />}
              </div>
              <span className={`vp-node-label font-display uppercase tracking-[0.2em] text-sm md:text-[0.65rem] lg:text-xs transition-colors duration-500 ${active === i ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                {loc.name}
              </span>
            </button>
          ))}
        </div>

        {/* Presentation Area */}
        <div className="vp-presentation mt-16 md:mt-24 lg:mt-32 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Photograph Container */}
          <div className="relative w-full lg:w-3/5 aspect-[4/5] sm:aspect-square md:aspect-[16/9] lg:aspect-[4/3] bg-muted/20 overflow-hidden">
             
             {/* Previous Image */}
             <div className="absolute inset-0 w-full h-full">
                <img src={locations[prev]!.image} alt="" className="w-full h-full object-cover grayscale-[20%]" />
             </div>
             
             {/* New Image (Wipes in over previous) */}
             <div className="vp-image-new absolute inset-0 w-full h-full z-10" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
                <img src={locations[active]!.image} alt={`${locations[active]!.name} Store`} className="vp-image-new-img w-full h-full object-cover" />
             </div>
             
             {/* Editorial Overlay */}
             <div className="absolute inset-0 border border-border/20 pointer-events-none mix-blend-overlay z-20" />
          </div>

          {/* Details Container */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center text-left">
             <div className="vp-info">
               <p className="eyebrow text-primary/70 mb-4">{locations[active]!.number} — Visit us in {locations[active]!.name}</p>
               <h3 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl tracking-tight mb-10">{locations[active]!.name}</h3>
               
               <div className="space-y-8">
                 <div>
                   <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">Address</h4>
                   <p className="text-sm lg:text-base leading-relaxed whitespace-pre-line text-foreground/90">{locations[active]!.address}</p>
                 </div>
                 
                 <div>
                   <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">Opening Hours</h4>
                   <p className="text-sm lg:text-base leading-relaxed whitespace-pre-line text-foreground/90">{locations[active]!.hours}</p>
                 </div>
                 
                 <div>
                   <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">Contact</h4>
                   <a href={`tel:${locations[active]!.phone.replace(/[^0-9+]/g, '')}`} className="text-sm lg:text-base leading-relaxed text-foreground/90 hover:text-primary transition-colors">
                     {locations[active]!.phone}
                   </a>
                 </div>
               </div>

               <div className="mt-12 pt-8 border-t border-border/50 flex flex-wrap gap-6">
                 <Link href="#directions" className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground font-medium transition-colors hover:bg-primary-deep outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                    Get Directions <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                 </Link>
               </div>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
}
