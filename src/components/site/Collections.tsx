/*
// ==========================================
// PREVIOUS COLLECTIONS IMPLEMENTATION
// Commented out as per instructions.
// ==========================================
import { useState } from "react";
"use client";
import { motion } from "motion/react";
import { 
  Chapter01Sarees, 
  Chapter02Bridal, 
  Chapter03Womens, 
  Chapter04Mens, 
  Chapter05Kids, 
  Chapter06Accessories 
} from "./CollectionChapters";

export function OldCollections() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="collections-old" className="bg-ivory relative flex w-full">
      <div className="hidden lg:flex w-24 xl:w-32 shrink-0 relative">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
          <div className="flex flex-col gap-6 items-center">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <span className={`text-[0.65rem] font-medium tracking-[0.2em] transition-colors duration-500 ${activeIndex === i ? 'text-primary scale-110' : 'text-muted-foreground/30'}`}>
                  0{i + 1}
                </span>
                {i !== 5 && <div className={`w-px h-8 transition-colors duration-500 ${activeIndex >= i ? 'bg-primary/50' : 'bg-border/30'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex-1 px-6 md:px-10 lg:pl-10 lg:pr-20 max-w-[1400px] mx-auto pb-32">
        <div className="pt-32 pb-16 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="eyebrow text-primary">Explore</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl max-w-3xl mx-auto lg:mx-0">
              Six distinct worlds of <br className="hidden lg:block"/><span className="italic text-primary">Preethi Silks</span>
            </h2>
          </motion.div>
        </div>
        <div className="lg:hidden sticky top-[72px] z-40 bg-ivory/95 backdrop-blur-md py-4 mb-8 border-b border-hairline/30 flex justify-between items-center transition-all duration-300">
          <span className="eyebrow text-primary">{['Sarees', 'Bridal', "Women's Wear", "Men's Wear", 'Kids', 'Accessories'][activeIndex]}</span>
          <span className="text-[0.65rem] tracking-widest text-muted-foreground">0{activeIndex + 1} / 06</span>
        </div>
        <div className="flex flex-col gap-24 lg:gap-0">
          <Chapter01Sarees index={0} setActiveIndex={setActiveIndex} />
          <Chapter02Bridal index={1} setActiveIndex={setActiveIndex} />
          <Chapter03Womens index={2} setActiveIndex={setActiveIndex} />
          <Chapter04Mens index={3} setActiveIndex={setActiveIndex} />
          <Chapter05Kids index={4} setActiveIndex={setActiveIndex} />
          <Chapter06Accessories index={5} setActiveIndex={setActiveIndex} />
        </div>
      </div>
    </section>
  );
}
*/

import { CollectionStage } from "./CollectionStage";

export function Collections() {
  return <CollectionStage />;
}
