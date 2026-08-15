"use client";
import { useReveal } from "@/lib/use-reveal";
import craftHands from "@/assets/craft-hands.jpg";
import { BotanicalSpray, BorderMotif } from "./Ornaments";

const pillars = [
  {
    n: "01",
    title: "Quality",
    body: "Weaves selected thread by thread, judged on fall, finish and how they wear over years.",
  },
  {
    n: "02",
    title: "Craftsmanship",
    body: "Work made by hands that know the loom — the detail lives in the border, the pallu, the join.",
  },
  {
    n: "03",
    title: "Curated Collections",
    body: "An edited house rather than an endless rack. Everything on the shelf earns its place.",
  },
  {
    n: "04",
    title: "Customer Experience",
    body: "Unhurried attention in store, from the first drape to the last recommendation.",
  },
];

export function WhyPreethi() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="why-preethi" ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <BorderMotif className="absolute inset-x-0 top-0 h-8 w-full text-primary/25" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* Artistic composition */}
        <div className="relative lg:col-span-5">
          <div className="reveal relative mx-auto max-w-md">
            <div className="mask-petal overflow-hidden">
              <img
                src={craftHands}
                alt="A weaver's hands working silk threads on a traditional handloom"
                width={1000}
                height={1250}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <BotanicalSpray className="pointer-events-none absolute -right-6 -top-10 h-64 text-primary/45 sm:-right-12 sm:h-80" />
            <div className="pointer-events-none absolute -bottom-6 -left-4 hidden size-40 rounded-full border border-primary/40 sm:block" />
            <p className="mt-8 max-w-xs font-display text-xl italic leading-snug text-primary">
              &ldquo;A good silk announces nothing. It simply holds its shape.&rdquo;
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-7">
          <p className="reveal eyebrow text-primary">Why Preethi</p>
          <h2 className="reveal mt-4 max-w-lg font-display text-4xl leading-[1.05] sm:text-5xl" data-delay="0.05">
            Four things we refuse to <span className="italic text-primary">compromise on</span>
          </h2>

          <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <div key={p.n} className="reveal group" data-delay={0.08 * i}>
                <span className="font-display text-3xl text-primary/40 transition-colors duration-300 group-hover:text-primary">
                  {p.n}
                </span>
                <div className="mt-2 h-px w-10 rule-red transition-all duration-500 group-hover:w-20" />
                <dt className="mt-4 font-display text-2xl">{p.title}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
