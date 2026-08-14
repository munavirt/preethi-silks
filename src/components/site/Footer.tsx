import { Instagram, Facebook, Youtube } from "lucide-react";
import { BorderMotif } from "./Ornaments";
import Link from "next/link";

const columns = [
  {
    title: "Collections",
    links: ["Sarees", "Bridal", "Women's Wear", "Men's Wear", "Kids", "Accessories"],
  },
  { title: "Company", links: ["Why Preethi", "Craftsmanship", "Careers"] },
  { title: "Stores", links: ["City Centre", "North Avenue", "Temple Street"] },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-ivory">
      <BorderMotif className="h-8 w-full text-primary/25" />
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="#top" className="flex items-baseline gap-2">
              <span className="font-display text-3xl tracking-[0.14em] text-primary">
                PREETHI
              </span>
              <span className="eyebrow text-muted-foreground">Silks</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A textile house for sarees, bridal weaves and everyday silks. Come see them
              in person.
            </p>
            <div className="mt-7 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <Link
                  key={label}
                  href="#contact"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h3 className="eyebrow text-primary">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#contact"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <h3 className="eyebrow text-primary">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="tel:+910000000000" className="hover:text-primary">
                  +91 00000 00000
                </a>
              </li>
              <li>
                <a href="mailto:hello@preethisilks.com" className="hover:text-primary">
                  hello@preethisilks.com
                </a>
              </li>
              <li>Mon — Sat · 10:00 — 20:30</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Preethi Silks. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#contact" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="#contact" className="hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
