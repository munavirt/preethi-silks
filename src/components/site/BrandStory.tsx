"use client";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import textureSilk from "@/assets/texture-silk.jpg";
import { BotanicalSpray, ThreadLine } from "./Ornaments";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export function BrandStory() {
  return (
    <section id="discover" className="relative overflow-hidden bg-background pt-24 md:pt-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-16 md:px-10 lg:grid-cols-12 lg:gap-6 lg:pb-24">
        {/* Typography column */}
        <div className="relative z-10 lg:col-span-6 lg:pt-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="eyebrow text-primary"
          >
            A LEGACY BUILT ON SELECTION
          </motion.p>

          <h2 className="mt-6 font-display text-[3.2rem] leading-[0.92] tracking-[-0.02em] sm:text-[4.2rem] lg:text-[5.2rem]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease, delay: 0.1 }}
              >
                The Preethi
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block italic text-primary"
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease, delay: 0.2 }}
              >
                Experience.
              </motion.span>
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.5 }}
            className="mt-8 max-w-md"
          >
            <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
              A premier textile destination curating exceptional silk sarees, bridal weaves, and family fashion. We bring together the finest selections for those who appreciate quality, heritage, and an unhurried shopping experience.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#collections"
                className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors duration-300 hover:bg-primary-deep rounded-sm"
              >
                Explore Collections
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <ThreadLine className="mt-14 hidden h-10 w-full max-w-sm text-primary/40 lg:block" />
        </div>

        {/* Photography column */}
        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.3, ease, delay: 0.2 }}
            className="relative ml-auto w-full max-w-[560px] mask-arch overflow-hidden"
          >
            <img
              src={heroPortrait}
              alt="Model wearing a deep red Kanjivaram silk saree with a gold zari border"
              width={1008}
              height={1408}
              fetchPriority="high"
              className="h-[68vh] min-h-[420px] w-full object-cover lg:h-[76vh]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.7 }}
            className="absolute -bottom-8 left-0 hidden w-52 overflow-hidden border-4 border-background sm:block"
          >
            <img
              src={textureSilk}
              alt="Close-up of red silk with a woven gold zari border"
              width={1200}
              height={900}
              loading="lazy"
              className="h-40 w-full object-cover"
            />
          </motion.div>

          <BotanicalSpray className="pointer-events-none absolute -left-6 top-10 hidden h-72 text-primary/35 lg:block" />
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="h-px w-full rule-red" />
      </div>
    </section>
  );
}
