import { Instagram, Facebook, Youtube } from "lucide-react";
import { BorderMotif } from "./Ornaments";
import Link from "next/link";

const columns = [
  {
    title: "Collections",
    links: ["Sarees", "Bridal", "Women's Wear", "Men's Wear", "Kids"],
  },
  { title: "Company", links: ["Why Preethi", "Craftsmanship", "Careers"] },
  { title: "Stores", links: ["Kondotty", "Feroke", "Malappuram", "Palakkad", "Kuttiady", "UAE"] },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-ivory relative overflow-hidden">
      {/* Refined Textile Border - Preethi Red, extremely delicate */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden opacity-60">
        <BorderMotif className="h-5 w-full text-primary/60" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-24">
        {/* Intentional Mobile Hierarchy: Grouped into semantic sections */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* 1. Brand Section */}
          <div className="lg:w-[350px] shrink-0 flex flex-col items-start text-left">
            <Link href="#top" className="flex items-baseline gap-2 group">
              <span className="font-display text-3xl tracking-[0.14em] text-primary transition-colors duration-300">
                PREETHI
              </span>
              <span className="eyebrow text-muted-foreground group-hover:text-primary transition-colors duration-300">Silks</span>
            </Link>
            
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-muted-foreground">
              A textile house for sarees, bridal weaves and everyday silks. Come see them in person.
            </p>
            
            <div className="mt-8 flex gap-4">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <Link
                  key={label}
                  href="#contact"
                  aria-label={label}
                  className="group inline-flex size-10 items-center justify-center border border-border/70 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
                >
                  <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Navigation Columns - 2x2 grid on mobile, 4 cols on desktop */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:flex-1">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="eyebrow text-primary tracking-[0.15em]">{col.title}</h3>
                <ul className="mt-6 space-y-4">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#contact"
                        className="text-[0.9rem] text-muted-foreground transition-colors duration-300 hover:text-primary"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Contact Column inside the same grid for clean alignment */}
            <div>
              <h3 className="eyebrow text-primary tracking-[0.15em]">Contact</h3>
              <ul className="mt-6 space-y-4 text-[0.9rem] text-muted-foreground">
                <li>
                  <a href="tel:+910000000000" className="transition-colors duration-300 hover:text-primary">
                    +91 00000 00000
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@preethisilks.com" className="transition-colors duration-300 hover:text-primary break-all">
                    hello@preethisilks.com
                  </a>
                </li>
                <li className="pt-2 text-border">
                  Mon &mdash; Sat <br/> 10:00 &mdash; 20:30
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal Row */}
        <div className="mt-16 md:mt-24 flex flex-col items-start justify-between gap-6 border-t border-border/40 pt-8 text-[0.8rem] text-muted-foreground sm:flex-row sm:items-center">
          <p className="tracking-wide">&copy; {new Date().getFullYear()} Preethi Silks. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#contact" className="transition-colors duration-300 hover:text-primary">
              Privacy
            </Link>
            <Link href="#contact" className="transition-colors duration-300 hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
