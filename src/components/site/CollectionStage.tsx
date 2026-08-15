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

gsap.registerPlugin(ScrollTrigger, Observer);

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
    let ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = prefersReducedMotion ? 0 : 0.8;
      const ease = "power3.inOut";

      let currentIndex = 0;
      let isTransitioning = false;
      let isCollectionActive = false;

      // Set initial states for panels > 0
      gsap.set(".panel:not(.panel-0)", { autoAlpha: 0 });

      function gotoIndex(index: number, direction: 1 | -1) {
        console.log("[Collections] gotoIndex", index, "direction", direction);
        if (index < 0 || index >= collections.length) return;
        isTransitioning = true;

        const outgoing = `.panel-${currentIndex}`;
        const incoming = `.panel-${index}`;

        const tl = gsap.timeline({
          onComplete: () => {
            console.log("[Collections] timeline onComplete");
            currentIndex = index;
            isTransitioning = false;
          }
        });

        if (prefersReducedMotion) {
          tl.to(outgoing, { autoAlpha: 0, duration: 0 })
            .to(incoming, { autoAlpha: 1, duration: 0 });
        } else {
          // Horizontal animation logic based on scroll direction
          // direction 1 (Down): 01(R)->02(L). Everything moves Right to Left.
          // direction -1 (Up): 02(L)->01(R). Everything moves Left to Right.
          
          const imgTravelOut = direction === 1 ? "-100vw" : "100vw";
          const imgTravelIn = direction === 1 ? "100vw" : "-100vw";
          
          // Text moves less to emphasize the image as the major visual motion
          const textTravelOut = direction === 1 ? "-15vw" : "15vw";
          const textTravelIn = direction === 1 ? "15vw" : "-15vw";

          // Outgoing Panel
          tl.to(`${outgoing} .image-wrap`, { x: imgTravelOut, scale: 0.95, opacity: 0, duration, ease }, 0)
            .to(`${outgoing} .text-content, ${outgoing} .mobile-cta`, { x: textTravelOut, opacity: 0, duration: duration * 0.8, ease }, 0)
            .set(outgoing, { autoAlpha: 0 }, duration);

          // Incoming Panel
          tl.set(incoming, { autoAlpha: 1 }, 0)
            .fromTo(`${incoming} .image-wrap`,
              { x: imgTravelIn, scale: 1.05, clipPath: direction === 1 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)", opacity: 0 },
              { x: "0vw", scale: 1, clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration, ease },
              0.1
            )
            .fromTo(`${incoming} .text-content, ${incoming} .mobile-cta`,
              { x: textTravelIn, opacity: 0 },
              { x: "0vw", opacity: 1, duration: duration * 0.8, ease },
              0.2
            );
        }
      }

      const handleIntent = (direction: 1 | -1) => {
        console.log("[Collections] handleIntent", direction, "currentIndex", currentIndex, "isTransitioning", isTransitioning, "isActive", isCollectionActive);
        if (!isCollectionActive) return;
        if (isTransitioning) return;

        if (direction === 1) { // Down
          if (currentIndex < collections.length - 1) {
            gotoIndex(currentIndex + 1, 1);
          } else {
            // At last slide. Release the trap to allow scrolling down natively.
            console.log("[Collections] Releasing downward scroll");
            isCollectionActive = false;
            intentObserver.disable();
          }
        } else { // Up
          if (currentIndex > 0) {
            gotoIndex(currentIndex - 1, -1);
          } else {
            // At first slide. Release the trap to allow scrolling up natively.
            console.log("[Collections] Releasing upward scroll");
            isCollectionActive = false;
            intentObserver.disable();
          }
        }
      };

      // Observer to detect meaningful scroll intent without scrubbing
      const intentObserver = Observer.create({
        target: window,
        type: "wheel,touch",
        tolerance: 30, // Prevents tiny trackpad movements from triggering a slide
        preventDefault: true, // Traps the scroll while inside the carousel
        onUp: () => {
          console.log("[Collections] Observer onUp (Gesture UP)");
          handleIntent(-1);
        },
        onDown: () => {
          console.log("[Collections] Observer onDown (Gesture DOWN)");
          handleIntent(1);
        }
      });

      // Disabled initially; we only enable it when the section is perfectly pinned.
      intentObserver.disable();

      // Pin the section to the viewport.
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: ".stage-pin",
        start: "top top",
        end: () =>
          `+=${window.innerHeight * collections.length}`,
        onEnter: (self) => {
          console.log("[Collections] ScrollTrigger onEnter");
          isCollectionActive = true;
          intentObserver.enable();
          console.log("[Collections] observer enabled");
        },
        onEnterBack: (self) => {
          console.log("[Collections] ScrollTrigger onEnterBack");
          isCollectionActive = true;
          intentObserver.enable();
          console.log("[Collections] observer enabled");
        },
        onLeave: () => {
          console.log("[Collections] ScrollTrigger onLeave");
          isCollectionActive = false;
          intentObserver.disable();
        },
        onLeaveBack: () => {
          console.log("[Collections] ScrollTrigger onLeaveBack");
          isCollectionActive = false;
          intentObserver.disable();
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
              <div className={`text-content flex flex-col justify-start md:justify-center w-full shrink-0 text-center ${i % 2 === 0 ? "md:text-left md:items-start md:order-1" : "md:text-right md:items-end md:order-2"} mt-2 md:mt-0`}>
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
              <div className={`relative w-full flex-1 md:h-[70vh] lg:h-[80vh] flex items-center justify-center ${i % 2 === 0 ? "md:justify-end md:pr-10 md:order-2" : "md:justify-start md:pl-10 md:order-1"} min-h-[30vh]`}>

                {/* Clean Editorial Image */}
                <div className="image-wrap w-full max-w-[280px] sm:max-w-sm md:max-w-[420px] lg:max-w-[500px] aspect-[4/5] overflow-hidden rounded-3xl relative z-10 shadow-xl">
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
