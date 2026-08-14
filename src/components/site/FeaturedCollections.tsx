"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import featWedding from "@/assets/feat-wedding.jpg";
import featFestive from "@/assets/feat-festive.jpg";
import featSilk from "@/assets/feat-silk.jpg";
import catBridal from "@/assets/cat-bridal.jpg";
import featOccasion from "@/assets/feat-occasion.jpg";
import craftHands from "@/assets/craft-hands.jpg";

import { ZariBorderLine } from "./Ornaments";

gsap.registerPlugin(Observer, ScrollTrigger);

const collections = [
  { id: 1, n: "01", title: "Wedding Edit", shortTitle: "Wedding", descriptor: "Selected for the season", image: featWedding },
  { id: 2, n: "02", title: "Festive Collection", shortTitle: "Festive", descriptor: "Colour for the season of lamps", image: featFestive },
  { id: 3, n: "03", title: "Silk Collection", shortTitle: "Silk", descriptor: "The house classics", image: featSilk },
  { id: 4, n: "04", title: "Women's Edit", shortTitle: "Women's", descriptor: "Contemporary & classic", image: catBridal },
  { id: 5, n: "05", title: "Occasion Wear", shortTitle: "Occasion", descriptor: "For the days that ask for more", image: featOccasion },
  { id: 6, n: "06", title: "Signature Collection", shortTitle: "Signature", descriptor: "Chosen by the house", image: craftHands }
];

export function FeaturedCollections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const progressRef = useRef(0);
  const isDraggingRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const len = collections.length;
      
      // Initial render to position cards
      renderCards(0);

      // Section Entrance Reveal
      gsap.fromTo(
        ".gs-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
      );
      
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 65%" } }
      );

      // Drag and Swipe Observer
      Observer.create({
        target: carouselRef.current,
        type: "pointer,touch",
        wheelSpeed: -1,
        tolerance: 10,
        lockAxis: true,
        onPress: () => {
          isDraggingRef.current = true;
          gsap.killTweensOf(progressRef); // Stop any active snapping tween
        },
        onDrag: (e) => {
          // Adjust responsiveness of drag based on device
          const dragFactor = window.innerWidth < 768 ? 0.005 : 0.003;
          progressRef.current -= e.deltaX * dragFactor;
          
          // Keep progress bounded cleanly for infinite loop
          if (progressRef.current < 0) progressRef.current += len * 100;
          progressRef.current %= len;
          
          renderCards(progressRef.current);
        },
        onRelease: (e) => {
          isDraggingRef.current = false;
          // Apply velocity for throw momentum
          const velocity = e.velocityX * -0.0015;
          let target = Math.round(progressRef.current + velocity);
          snapToProgress(target);
        }
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  function snapToProgress(targetProgress: number) {
    const len = collections.length;
    gsap.to(progressRef, {
      current: targetProgress,
      duration: 0.85,
      ease: "power3.out", // Natural physical spring
      onUpdate: () => {
        let p = progressRef.current % len;
        if (p < 0) p += len;
        renderCards(p);
      }
    });
  }

  function handleCardClick(index: number) {
    if (isDraggingRef.current) return;
    
    let currentP = progressRef.current;
    const len = collections.length;
    
    // Find shortest rotational path to the clicked card
    let diff = (index - currentP) % len;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    
    snapToProgress(currentP + diff);
  }
  
  function goPrev() { snapToProgress(Math.round(progressRef.current) - 1); }
  function goNext() { snapToProgress(Math.round(progressRef.current) + 1); }

  function renderCards(progress: number) {
    const len = collections.length;
    
    // Dynamic offset based on screen width ensures we hit the 12-20% exposure target
    const offsetBase = window.innerWidth < 768 ? 95 : window.innerWidth < 1024 ? 140 : 190;
    
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      // Calculate shortest distance wrapped
      let diff = (index - progress) % len;
      if (diff > len / 2) diff -= len;
      if (diff < -len / 2) diff += len;
      
      const absDiff = Math.abs(diff);
      
      let x = diff * offsetBase;
      let scale = 1 - absDiff * 0.12;
      let opacity = 1 - absDiff * 0.25;
      let rotate = diff * 2.5; // Slight rotation for organic feel
      let zIndex = Math.round(100 - absDiff * 10);
      
      // Hide the back-most card
      if (absDiff > 2.5) {
        opacity = 0;
      }
      
      gsap.set(card, {
        x,
        scale,
        opacity,
        rotation: rotate,
        zIndex,
        force3D: true
      });
      
      // Reactive UI mapping based on continuous depth
      const content = card.querySelector('.card-content');
      const sideLabel = card.querySelector('.card-side-label');
      
      if (content) {
        // Fades out entirely by the time it reaches the inner slot
        const contentOp = Math.max(0, 1 - absDiff * 3);
        gsap.set(content, { opacity: contentOp });
      }
      
      if (sideLabel) {
        // Appears strongly on inner sides, hidden in center
        let labelOp = 0;
        if (absDiff > 0.3 && absDiff < 2.5) {
          labelOp = Math.min(1, (absDiff - 0.3) * 2);
        }
        gsap.set(sideLabel, { opacity: labelOp });
      }
    });
  }

  return (
    <section ref={containerRef} id="preethi-edit" className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden select-none">
      
      {/* Background 2D Artwork Layer */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-full text-primary opacity-[0.05] pointer-events-none -z-0 flex items-center justify-center">
        <ZariBorderLine className="w-[120%] md:w-[80%] h-[300px] object-cover scale-150 rotate-[-5deg]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 flex flex-col items-center text-center">
        
        {/* Entrance Heading */}
        <div className="gs-title">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight">
            THE PREETHI EDIT
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground font-light uppercase tracking-[0.25em]">
            Selected collections from the house.
          </p>
        </div>

        {/* Carousel Spatial Stage */}
        <div 
          ref={carouselRef} 
          className="relative w-full h-[55vh] md:h-[65vh] lg:h-[75vh] mt-16 md:mt-24 cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }} // Allows native vertical scrolling while we handle horizontal drag
        >
          {collections.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              onClick={() => handleCardClick(i)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[460px] aspect-[4/5] rounded-xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] will-change-transform bg-background origin-center transition-shadow duration-300 hover:shadow-[0_35px_70px_-15px_rgba(0,0,0,0.2)]"
            >
              <img 
                src={item.image} 
                alt={item.title}
                draggable="false"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
              
              {/* Full Content — Fades in at Center */}
              <div className="card-content absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 text-white text-left pointer-events-none">
                <p className="eyebrow text-white/70 mb-2">{item.n} / 06</p>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl leading-none">{item.title}</h3>
                <p className="mt-3 text-[0.8rem] md:text-sm text-white/80 font-light">{item.descriptor}</p>
                
                <Link 
                  href={`#${item.shortTitle.toLowerCase()}`} 
                  className="group mt-6 inline-flex items-center gap-2 text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] uppercase text-white font-medium pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-sm"
                >
                  Explore 
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              
              {/* Side Label — Fades in at Sides */}
              <div className="card-side-label absolute bottom-10 left-0 right-0 flex justify-center text-white pointer-events-none opacity-0 drop-shadow-md">
                <p className="eyebrow text-white/90">{item.n} — {item.shortTitle}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Accessible Keyboard & Secondary Navigation */}
        <div className="mt-12 flex items-center justify-center gap-8 lg:mt-16 text-muted-foreground gs-title">
          <button 
            onClick={goPrev}
            className="p-3 transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
            aria-label="Previous collection"
          >
            <ChevronLeft className="size-6 stroke-[1.5]" />
          </button>
          
          <div className="w-16 h-[2px] bg-border/40" />
          
          <button 
            onClick={goNext}
            className="p-3 transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
            aria-label="Next collection"
          >
            <ChevronRight className="size-6 stroke-[1.5]" />
          </button>
        </div>

      </div>
    </section>
  );
}
