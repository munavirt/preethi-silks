"use client";

import { useState, useRef } from "react";
import gsap from "gsap";

const reviews = [
  {
    id: "01",
    quote: "Real customer review will be inserted here.",
    author: "Verified Customer",
    location: "Kochi, Kerala",
  },
  {
    id: "02",
    quote: "A short genuine customer quote goes here. Waiting for client to provide real reviews.",
    author: "Customer Name",
    location: "Wedding Trousseau",
  },
  {
    id: "03",
    quote: "Another authentic experience from a customer who visited the store.",
    author: "Store Visitor",
    location: "Ernakulam",
  },
  {
    id: "04",
    quote: "An elegant short quote that fits perfectly in an editorial layout.",
    author: "Bridal Client",
    location: "Trivandrum",
  }
];

export function CustomerVoices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  
  const handleSwitch = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      setActiveIndex(index);
      return;
    }
    
    setIsAnimating(true);
    
    if (quoteContainerRef.current) {
      gsap.to(quoteContainerRef.current, {
        autoAlpha: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveIndex(index);
          gsap.fromTo(quoteContainerRef.current, 
            { autoAlpha: 0, y: 10 }, 
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", onComplete: () => setIsAnimating(false) }
          );
        }
      });
    } else {
      setActiveIndex(index);
      setIsAnimating(false);
    }
  };

  const activeReview = reviews[activeIndex];

  return (
    <section className="py-24 md:py-32 bg-ivory relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <p className="eyebrow text-primary tracking-[0.3em] uppercase mb-16 md:mb-24 text-center md:text-left">
          From Our Customers
        </p>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Dominant Quote Area */}
          <div className="flex-1 relative w-full">
            <div className="text-primary text-6xl md:text-8xl font-display leading-none absolute -top-6 md:-top-10 -left-2 md:-left-6 opacity-40 select-none">
              &ldquo;
            </div>
            
            <div ref={quoteContainerRef} className="relative z-10 min-h-[200px] md:min-h-[250px] flex flex-col justify-center">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.2] tracking-tight text-foreground">
                {activeReview?.quote}
              </h3>
              
              <div className="mt-10 md:mt-16 flex flex-col">
                <span className="font-medium text-sm md:text-base tracking-[0.1em] uppercase text-foreground">
                  &mdash; {activeReview?.author}
                </span>
                {activeReview?.location && (
                  <span className="text-muted-foreground text-sm tracking-wider mt-1">
                    {activeReview?.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Supporting Quotes / Selectors */}
          <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col gap-2 relative">
             {/* Decorative connecting line */}
             <div className="hidden lg:block absolute -left-8 xl:-left-12 top-0 bottom-0 w-px bg-border/40" />

             {reviews.map((review, i) => {
               const isActive = i === activeIndex;
               return (
                 <button 
                   key={review.id}
                   onClick={() => handleSwitch(i)}
                   className="group flex gap-5 text-left w-full py-4 items-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
                   aria-pressed={isActive}
                 >
                   <span className={`text-sm tracking-[0.2em] transition-colors duration-500 font-medium shrink-0 pt-0.5 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                     {review.id}
                   </span>
                   <div className="flex flex-col gap-3">
                     <p className={`text-sm md:text-[0.95rem] leading-relaxed transition-colors duration-500 line-clamp-2 ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground/80'}`}>
                       &ldquo;{review.quote}&rdquo;
                     </p>
                     {/* Subtle active indicator line */}
                     <div className={`h-[1px] bg-primary transition-all duration-700 ease-out origin-left ${isActive ? 'w-full scale-x-100 opacity-100' : 'w-full scale-x-0 opacity-0'}`} />
                   </div>
                 </button>
               )
             })}
          </div>
        </div>
      </div>
    </section>
  );
}
