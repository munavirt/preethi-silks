"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import catWomen from "@/assets/cat-women.jpg";
import featFestive from "@/assets/feat-festive.jpg";
import textureSilk from "@/assets/texture-silk.jpg";
import craftHands from "@/assets/craft-hands.jpg";

gsap.registerPlugin(ScrollTrigger);

const journalEntries = [
  {
    id: 1,
    date: "OCTOBER 2026",
    title: "Festive Stories",
    description: "Celebrating the vibrant hues and intricate weaves of our latest festive collection.",
    image: featFestive,
    instagramUrl: "#"
  },
  {
    id: 2,
    date: "SEPTEMBER 2026",
    title: "The Kanchipuram Weavers",
    description: "Behind the scenes with the master craftsmen who bring our silk visions to life.",
    image: craftHands,
    instagramUrl: "#"
  },
  {
    id: 3,
    date: "AUGUST 2026",
    title: "The New Silk Edit",
    description: "A contemporary take on traditional motifs, designed for the modern muse.",
    image: catWomen,
    instagramUrl: "#"
  },
  {
    id: 4,
    date: "JULY 2026",
    title: "Studio Textures",
    description: "Exploring the weight, drape, and luminous quality of pure handwoven silk.",
    image: textureSilk,
    instagramUrl: "#"
  }
];

export function PreethiJournal() {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      
      // Desktop animation
      mm.add("(min-width: 768px)", () => {
        const images = gsap.utils.toArray<HTMLElement>(".desktop-image");
        const texts = gsap.utils.toArray<HTMLElement>(".desktop-text");
        
        if (!images.length || !desktopContainerRef.current) return;

        // Set initial states
        gsap.set(texts, { autoAlpha: 0, y: 20 });
        gsap.set(texts[0]!, { autoAlpha: 1, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopContainerRef.current,
            start: "top top",
            end: `+=${images.length * 100}%`,
            pin: true,
            scrub: 1,
          }
        });

        images.forEach((img, i) => {
          if (i === 0) return;
          
          const label = `step${i}`;
          tl.add(label);
          
          // Image wipe up
          tl.fromTo(img, 
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" },
            label
          );
          
          // Text crossfade
          tl.to(texts[i - 1]!, { autoAlpha: 0, y: -20, duration: 0.3 }, label);
          tl.to(texts[i]!, { autoAlpha: 1, y: 0, duration: 0.3 }, `${label}+=0.7`);
        });
      });
      
      // Mobile animation (Subtle reveals)
      mm.add("(max-width: 767px)", () => {
        const mobileEntries = gsap.utils.toArray<HTMLElement>(".mobile-entry");
        mobileEntries.forEach(entry => {
          const img = entry.querySelector(".mobile-image");
          
          // Image subtle parallax/scale
          gsap.fromTo(img, 
            { scale: 1.1 },
            { 
              scale: 1, 
              ease: "none", 
              scrollTrigger: {
                trigger: entry,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );
          
          // Entry fade in
          gsap.fromTo(entry,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 85%"
              }
            }
          );
        });
      });

    });
    
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* DESKTOP EXPERIENCE */}
      <section ref={desktopContainerRef} className="relative w-full bg-background hidden md:block">
        <div className="h-screen w-full flex relative">
          
          {/* Left side text */}
          <div className="w-[45%] h-full flex flex-col justify-center pl-10 pr-12 lg:pl-24 lg:pr-16 z-10 relative bg-background border-r border-border/10">
             <div className="absolute top-24 left-10 lg:left-24">
               <h2 className="text-xl lg:text-2xl font-display uppercase tracking-[0.2em]">The Preethi Journal</h2>
               <p className="text-[10px] text-muted-foreground mt-2 tracking-[0.3em] font-medium">@PREETHISILKS</p>
             </div>
             
             <div className="relative w-full h-[300px]">
                {journalEntries.map((entry, index) => (
                   <div 
                     key={entry.id} 
                     className="desktop-text absolute inset-0 flex flex-col justify-center"
                   >
                     <div className="flex items-center gap-4 mb-8">
                        <span className="text-xs font-medium tracking-[0.2em] text-primary/60">0{index + 1} / 0{journalEntries.length}</span>
                        <span className="w-12 h-[1px] bg-primary/20"></span>
                        <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{entry.date}</span>
                     </div>
                     <h3 className="font-display text-4xl lg:text-5xl xl:text-6xl mb-6 leading-[1.1]">{entry.title}</h3>
                     <p className="text-muted-foreground font-light leading-relaxed max-w-sm mb-10 lg:text-lg">{entry.description}</p>
                     <div>
                       <a href={entry.instagramUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] hover:text-primary transition-colors pb-2 border-b border-primary/20 hover:border-primary">
                         Explore this story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                       </a>
                     </div>
                   </div>
                ))}
             </div>
          </div>
          
          {/* Right side images */}
          <div className="w-[55%] h-full relative overflow-hidden bg-muted/5">
             {journalEntries.map((entry, index) => (
               <div 
                 key={entry.id}
                 className="desktop-image absolute inset-0 will-change-transform"
                 style={{ zIndex: index }}
               >
                 <img src={entry.image} alt={entry.title} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
          
        </div>
      </section>

      {/* MOBILE EXPERIENCE */}
      <section ref={mobileContainerRef} className="w-full bg-background block md:hidden py-24">
        <div className="px-6 mb-20 text-center">
          <h2 className="text-2xl font-display uppercase tracking-[0.2em]">The Preethi Journal</h2>
          <p className="text-[10px] text-muted-foreground mt-3 tracking-[0.3em] font-medium">@PREETHISILKS</p>
        </div>
        
        <div className="flex flex-col gap-32">
          {journalEntries.map((entry, index) => (
            <div key={entry.id} className="mobile-entry flex flex-col opacity-0 translate-y-8">
               <div className="px-6 mb-6 flex justify-between items-end">
                  <span className="text-xs font-medium tracking-[0.2em] text-primary/60">0{index + 1} / 0{journalEntries.length}</span>
                  <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{entry.date}</span>
               </div>
               
               <div className="w-full aspect-[4/5] relative overflow-hidden mb-10 bg-muted/10">
                  <img src={entry.image} alt={entry.title} className="w-full h-full object-cover mobile-image will-change-transform" />
               </div>
               
               <div className="px-6 text-center flex flex-col items-center">
                  <h3 className="font-display text-4xl mb-5 leading-tight">{entry.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-8 text-sm max-w-[280px] mx-auto">{entry.description}</p>
                  <a href={entry.instagramUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] hover:text-primary transition-colors pb-1 border-b border-primary/20 hover:border-primary">
                    View on Instagram <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </a>
               </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
