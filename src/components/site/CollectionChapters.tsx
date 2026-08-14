"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
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

const ease = [0.22, 1, 0.36, 1] as const;

// Helper hook to track which chapter is active during scroll
function useChapterInView(index: number, setActiveIndex: (i: number) => void) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger active state when section is centered in the viewport
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  return ref;
}

// Reusable animated elements respecting reduced motion
const FadeUp = ({ children, delay = 0, className = "" }: any) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease, delay: shouldReduceMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const RevealImage = ({ children, className = "" }: any) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.4, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Increased touch target padding on mobile (py-3) vs desktop (pb-1)
const CtaLink = ({ href = "#" }) => (
  <Link
    href={href}
    className="group inline-flex items-center gap-3 mt-6 lg:mt-8 py-3 lg:py-0 lg:pb-1 border-b border-hairline lg:border-hairline text-[0.72rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    Explore Collection
    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
);


// ─── CHAPTER 01: SAREES ───────────────────────────────────────────────
export function Chapter01Sarees({ index, setActiveIndex }: any) {
  const ref = useChapterInView(index, setActiveIndex);

  return (
    <section ref={ref} className="min-h-screen py-20 lg:py-24 flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
        {/* Mobile: Image first, Text second. Desktop: Text first, Image second */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">
          <FadeUp>
            <p className="eyebrow text-primary">01</p>
            <h3 className="font-display text-5xl lg:text-7xl mt-3 lg:mt-4">Sarees</h3>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-4 lg:mt-6 text-muted-foreground text-[0.95rem] lg:text-lg">Silk, cotton &amp; everyday drapes</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <CtaLink />
          </FadeUp>
        </div>
        
        <div className="order-1 lg:order-2 relative">
          <motion.div
            initial={{ opacity: 0, strokeDashoffset: 1000 }}
            whileInView={{ opacity: 1, strokeDashoffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease, delay: 0.5 }}
            className="absolute -left-10 top-10 bottom-10 w-8 z-10 hidden lg:block"
          >
            <ZariBorderLine className="h-full w-full text-primary" />
          </motion.div>
          
          <RevealImage>
            <img src={textureSilk} alt="Sarees Collection" className="w-full aspect-[4/5] object-cover" />
          </RevealImage>
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 02: BRIDAL ───────────────────────────────────────────────
export function Chapter02Bridal({ index, setActiveIndex }: any) {
  const ref = useChapterInView(index, setActiveIndex);

  return (
    <section ref={ref} className="min-h-[100vh] lg:min-h-[120vh] py-20 lg:py-24 flex items-center relative overflow-hidden">
      <div className="w-full max-w-5xl mx-auto relative">
        <BotanicalSpray className="absolute -top-16 -left-10 lg:-left-20 h-64 lg:h-96 text-primary/10 lg:text-primary/30 z-0 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[1fr_1.8fr] gap-6 lg:gap-10 lg:items-end">
          <div className="order-2 lg:order-1 pb-4 lg:pb-12 bg-transparent lg:p-0 mt-0 lg:-mt-20 relative z-20">
            <FadeUp>
              <p className="eyebrow text-primary">02</p>
              <h3 className="font-display text-5xl lg:text-8xl mt-2 tracking-tight">Bridal</h3>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-3 lg:mt-4 text-muted-foreground text-[0.95rem] lg:text-lg">Wedding weaves &amp; trousseau</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <CtaLink />
            </FadeUp>
          </div>
          
          <div className="order-1 lg:order-2 w-full">
            <RevealImage>
              <img src={catBridal} alt="Bridal Collection" className="w-full aspect-[4/5] md:aspect-[4/3] object-cover object-top" />
            </RevealImage>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 03: WOMEN'S WEAR ─────────────────────────────────────────
export function Chapter03Womens({ index, setActiveIndex }: any) {
  const ref = useChapterInView(index, setActiveIndex);

  return (
    <section ref={ref} className="min-h-screen py-20 lg:py-24 flex items-center overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-7 relative order-1">
          <TextileWeave className="absolute -bottom-10 -right-10 lg:-bottom-16 lg:-left-16 lg:right-auto w-full max-w-[400px] lg:max-w-[500px] text-primary/20 lg:text-primary/40 -z-10" />
          <RevealImage className="relative z-10">
            <img src={catWomen} alt="Women's Wear" className="w-full aspect-[4/5] lg:aspect-[3/4] object-cover mask-petal" />
          </RevealImage>
        </div>
        
        <div className="lg:col-span-5 lg:pl-16 text-left order-2">
          <FadeUp>
            <p className="eyebrow text-primary">03</p>
            <h3 className="font-display text-5xl lg:text-6xl mt-3 lg:mt-4 leading-none">Women's Wear</h3>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-4 lg:mt-6 text-muted-foreground text-[0.95rem] lg:text-lg">Contemporary &amp; classic styles</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <CtaLink />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 04: MEN'S WEAR ───────────────────────────────────────────
export function Chapter04Mens({ index, setActiveIndex }: any) {
  const ref = useChapterInView(index, setActiveIndex);

  return (
    <section ref={ref} className="min-h-screen py-20 lg:py-24 flex flex-col justify-center">
      <div className="text-center relative z-10">
        <FadeUp>
          <p className="eyebrow text-primary">04</p>
          <h3 className="font-display text-5xl sm:text-7xl lg:text-[7rem] tracking-tight mt-3 lg:mt-4">Men's Wear</h3>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ThreadLine className="mx-auto mt-6 lg:mt-12 h-6 lg:h-10 w-full max-w-[200px] lg:max-w-md text-primary/60 hidden sm:block" />
        </FadeUp>
      </div>
      
      <div className="mt-8 lg:mt-16 w-full relative">
        <RevealImage>
          <img src={catMen} alt="Men's Wear" className="w-full h-[50vh] lg:h-[50vh] object-cover object-center mask-arch" />
        </RevealImage>
      </div>
      
      <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2 sm:gap-6 text-center sm:text-left">
        <FadeUp delay={0.2}>
          <p className="text-muted-foreground text-[0.95rem] lg:text-lg">Kurtas, dhotis &amp; fine shirting</p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <CtaLink />
        </FadeUp>
      </div>
    </section>
  );
}

// ─── CHAPTER 05: KIDS ─────────────────────────────────────────────────
export function Chapter05Kids({ index, setActiveIndex }: any) {
  const ref = useChapterInView(index, setActiveIndex);

  return (
    <section ref={ref} className="min-h-[100vh] lg:min-h-[110vh] py-20 lg:py-24 flex items-center overflow-hidden">
      <div className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center">
        {/* On mobile: Image first. Desktop: Box overlaps Image */}
        <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6 relative z-10 w-full">
          <BorderMotif className="absolute -top-4 -right-4 lg:-top-10 lg:-right-10 w-32 lg:w-72 text-primary opacity-30 lg:opacity-60 z-0" />
          <RevealImage className="relative z-10">
            <img src={catKids} alt="Kids Collection" className="w-full aspect-[4/5] object-cover" />
          </RevealImage>
        </div>
        
        <div className="order-2 lg:order-1 lg:col-span-5 lg:col-start-1 relative z-20 w-full">
          <div className="bg-transparent lg:bg-background/95 lg:backdrop-blur-md p-0 lg:p-12 lg:-mr-32 lg:border lg:border-hairline/30 lg:shadow-2xl">
            <FadeUp>
              <p className="eyebrow text-primary">05</p>
              <h3 className="font-display text-5xl lg:text-7xl mt-3 lg:mt-4">Kids</h3>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-3 lg:mt-4 text-muted-foreground text-[0.95rem] lg:text-lg">Festive little wardrobes</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <CtaLink />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 06: ACCESSORIES ──────────────────────────────────────────
export function Chapter06Accessories({ index, setActiveIndex }: any) {
  const ref = useChapterInView(index, setActiveIndex);

  return (
    <section ref={ref} className="min-h-screen py-20 lg:py-24 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="relative w-56 sm:w-80 lg:w-[450px]">
        {/* Hand painted mark framing the image - scaled down on mobile */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease, delay: 0.2 }}
          className="absolute -top-8 -right-8 lg:-top-16 lg:-right-16 h-24 w-24 lg:h-40 lg:w-40 text-primary z-0"
        >
          <HandPaintedDot className="w-full h-full" />
        </motion.div>
        
        <RevealImage className="relative z-10">
          <img src={catAcc} alt="Accessories" className="w-full aspect-square object-cover rounded-full" />
        </RevealImage>
      </div>
      
      <div className="mt-12 lg:mt-24 max-w-lg mx-auto w-full">
        <FadeUp>
          <p className="eyebrow text-primary">06</p>
          <h3 className="font-display text-5xl lg:text-6xl mt-3 lg:mt-4">Accessories</h3>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-3 lg:mt-4 text-muted-foreground text-[0.95rem] lg:text-lg">Finishing details and fine adornments</p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <CtaLink />
        </FadeUp>
      </div>
    </section>
  );
}
