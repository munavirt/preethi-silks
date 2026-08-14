"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import catBridal from "@/assets/cat-bridal.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catAcc from "@/assets/cat-accessories.jpg";
import textureSilk from "@/assets/texture-silk.jpg";

import { ZariBorderLine, BotanicalSpray, ThreadLine, BorderMotif } from "./Ornaments";
import { TextileWeave, HandPaintedDot } from "./CollectionArtwork";

import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

const collections = [
  { id: "01", name: "SAREES", desc: "Silk, craft & occasion", image: textureSilk, art: ZariBorderLine },
  { id: "02", name: "BRIDAL", desc: "Wedding weaves & trousseau", image: catBridal, art: BotanicalSpray },
  { id: "03", name: "WOMEN'S", desc: "Contemporary & classic", image: catWomen, art: TextileWeave },
  { id: "04", name: "MEN'S", desc: "Kurtas, dhotis & shirting", image: catMen, art: ThreadLine },
  { id: "05", name: "KIDS", desc: "Festive little wardrobes", image: catKids, art: BorderMotif },
];

export function CollectionStage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const currentIndex = { current: 0 };
    const isTransitioning = { current: false };
    const isCollectionActive = { current: false };
    
    let observer: globalThis.Observer | null = null;
    let scrollTrigger: globalThis.ScrollTrigger | null = null;

    let ctx = gsap.context(() => {
      
      // 1. Initial State
      gsap.set(".panel:not(.panel-0)", { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(".panel-0", { autoAlpha: 1, pointerEvents: "auto" });

      // 2. Transition Function
      function goToPanel(nextIndex: number, direction: 1 | -1) {
        if (nextIndex < 0 || nextIndex >= collections.length) return;
        if (isTransitioning.current) return;
        
        isTransitioning.current = true;
        
        const outgoing = `.panel-${currentIndex.current}`;
        const incoming = `.panel-${nextIndex}`;
        
        const tl = gsap.timeline({
          onComplete: () => {
            currentIndex.current = nextIndex;
            isTransitioning.current = false;
          }
        });
        
        // Z-Index handling
        gsap.set(incoming, { zIndex: 20 });
        gsap.set(outgoing, { zIndex: 10 });
        
        if (prefersReducedMotion) {
          tl.to(outgoing, { autoAlpha: 0, pointerEvents: "none", duration: 0 })
            .to(incoming, { autoAlpha: 1, pointerEvents: "auto", duration: 0 });
        } else {
          const yOffset = direction === 1 ? 50 : -50;
          const duration = 0.8;
          const ease = "power3.inOut";
          
          tl.to(`${outgoing} .image-wrap`, { yPercent: -direction * 5, scale: 0.95, opacity: 0, duration, ease }, 0)
            .to(`${outgoing} .text-content, ${outgoing} .mobile-cta`, { y: -yOffset, opacity: 0, duration: duration * 0.8, ease }, 0)
            .set(outgoing, { autoAlpha: 0, pointerEvents: "none" }, duration)
            
            .set(incoming, { autoAlpha: 1, pointerEvents: "auto" }, 0)
            .fromTo(`${incoming} .image-wrap`, 
              { yPercent: direction * 5, scale: 1.05, clipPath: direction === 1 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)", opacity: 0 },
              { yPercent: 0, scale: 1, clipPath: "inset(0% 0 0 0)", opacity: 1, duration, ease },
              0.1
            )
            .fromTo(`${incoming} .text-content, ${incoming} .mobile-cta`,
              { y: yOffset, opacity: 0 },
              { y: 0, opacity: 1, duration: duration * 0.8, ease },
              0.2
            );
        }
      }

      function releaseDownwardScroll() {
        isCollectionActive.current = false;
        if (observer) observer.disable();
        if (scrollTrigger) {
          gsap.to(window, { scrollTo: scrollTrigger.end, duration: 0.6, ease: "power2.inOut" });
        }
      }

      function releaseUpwardScroll() {
        isCollectionActive.current = false;
        if (observer) observer.disable();
        if (scrollTrigger) {
          gsap.to(window, { scrollTo: scrollTrigger.start, duration: 0.6, ease: "power2.inOut" });
        }
      }

      function requestNext() {
        if (!isCollectionActive.current) return;
        if (isTransitioning.current) return;
        
        if (currentIndex.current < collections.length - 1) {
          goToPanel(currentIndex.current + 1, 1);
        } else {
          releaseDownwardScroll();
        }
      }

      function requestPrevious() {
        if (!isCollectionActive.current) return;
        if (isTransitioning.current) return;
        
        if (currentIndex.current > 0) {
          goToPanel(currentIndex.current - 1, -1);
        } else {
          releaseUpwardScroll();
        }
      }

      observer = Observer.create({
        target: window,
        type: "wheel,touch",
        tolerance: 30,
        preventDefault: true,
        onDown: () => requestNext(), 
        onUp: () => requestPrevious()
      });
      observer.disable();

      scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: ".stage-pin",
        start: "top top",
        end: () => `+=${window.innerHeight * (collections.length - 0.5)}`,
        onEnter: () => {
          isCollectionActive.current = true;
          if (observer) observer.enable();
        },
        onEnterBack: () => {
          isCollectionActive.current = true;
          if (observer) observer.enable();
        },
        onLeave: () => {
          isCollectionActive.current = false;
          if (observer) observer.disable();
        },
        onLeaveBack: () => {
          isCollectionActive.current = false;
          if (observer) observer.disable();
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="collections" ref={containerRef} className="relative w-full bg-ivory">

      {/* ─── UNIVERSAL GSAP STAGE ───────────────────────── */}
      <div className="stage-pin h-[100svh] w-full relative overflow-hidden">
        {collections.map((c, i) => (
          <div key={c.id} className={`panel panel-${i} absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center pt-24 pb-8 px-6 md:p-10`}>

            {/* Main Grid Wrapper */}
            <div className="flex flex-col md:grid md:grid-cols-[1fr_1.1fr] gap-6 md:gap-12 lg:gap-20 items-center w-full h-full max-w-[1200px] relative z-10 mx-auto">

              {/* ─── TEXT CONTENT ─── */}
              <div className="text-content flex flex-col justify-start md:justify-center w-full shrink-0 text-center md:text-left mt-2 md:mt-0">
                <p className="eyebrow text-primary tracking-[0.3em]">{c.id} / 0{collections.length}</p>
                <h3 className="font-display text-[2.8rem] sm:text-6xl lg:text-7xl xl:text-[7rem] leading-[1] mt-2 md:mt-6 tracking-tight uppercase">
                  {c.name}
                </h3>

                {/* Desktop CTA (Hidden on mobile) */}
                <div className="hidden md:block">
                  <p className="mt-8 text-xl text-muted-foreground">{c.desc}</p>
                  <div className="mt-12">
                    <Link
                      href="#explore"
                      className="group inline-flex items-center gap-3 pb-1 border-b border-hairline text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Explore Collection
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* ─── IMAGE PRESENTATION ─── */}
              <div className="relative w-full flex-1 md:h-[70vh] lg:h-[80vh] flex items-center justify-center md:justify-end md:pr-10 min-h-[30vh]">

                {/* Clean Editorial Image */}
                <div className="image-wrap w-full max-w-[280px] sm:max-w-sm md:max-w-[420px] lg:max-w-[500px] aspect-[4/5] overflow-hidden relative z-10 shadow-xl">
                  <img src={c.image} alt={`${c.name} Collection`} className="w-full h-full object-cover" />
                </div>

              </div>

              {/* ─── MOBILE CTA (Hidden on desktop) ─── */}
              <div className="mobile-cta md:hidden flex flex-col items-center text-center mt-auto pb-4 shrink-0 w-full">
                <p className="text-muted-foreground text-[0.95rem]">{c.desc}</p>
                <Link
                  href="#explore"
                  className="group inline-flex items-center gap-3 mt-4 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-primary font-medium"
                >
                  Explore Collection <ArrowRight className="size-3.5" />
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
