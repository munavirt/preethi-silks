"use client";
import { useEffect, useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Collections", href: "#collections" },
  { label: "Why Preethi", href: "#why-preethi" },
  { label: "Visit", href: "#visit" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 60px threshold for deliberate scrolling detection
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Determine if navbar should be transparent (over video)
  const isTransparent = transparentOnTop && !scrolled && !open;

  // Shared precise transition for colors and dimensions (300ms cubic-bezier)
  const colorTrans = "transition-colors duration-300 ease-in-out";
  const boxTrans = "transition-[background-color,border-color,padding,backdrop-filter] duration-300 ease-in-out";

  // Container state
  const headerClass = isTransparent
    ? "border-transparent bg-transparent"
    : "border-border/40 bg-background"; // Solid background, no glassmorphism, subtle border

  const navPaddingClass = "py-5 md:py-6"; // Same height regardless of scroll state

  // Text color logic
  const primaryTextClass = isTransparent ? "text-white" : "text-primary";
  const mutedTextClass = isTransparent ? "text-white/80 group-hover:text-white" : "text-muted-foreground group-hover:text-primary";
  const linkTextClass = isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary";
  const linkLineClass = isTransparent ? "bg-white" : "bg-primary";
  
  const iconClass = isTransparent 
    ? "border-white/30 text-white hover:border-white hover:bg-white hover:text-black" 
    : "border-border text-foreground hover:border-primary hover:text-primary";
    
  const mapBtnClass = isTransparent 
    ? "border-white/40 text-white hover:bg-white hover:text-black hover:border-white" 
    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b ${boxTrans} ${headerClass}`}>
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 ${boxTrans} ${navPaddingClass}`}
      >
        <Link href="#top" onClick={() => setOpen(false)} className="group flex items-baseline gap-2">
          <span className={`font-display text-2xl leading-none tracking-[0.14em] md:text-[1.7rem] ${colorTrans} ${primaryTextClass}`}>
            PREETHI
          </span>
          <span className={`eyebrow ${colorTrans} ${mutedTextClass}`}>
            Silks
          </span>
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={`group relative inline-block py-1 text-[0.8rem] uppercase tracking-[0.18em] ${colorTrans} ${linkTextClass}`}
              >
                {l.label}
                <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 ${linkLineClass}`} />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="#visit"
            onClick={() => setOpen(false)}
            className={`hidden items-center gap-2 border px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.2em] rounded-sm sm:inline-flex ${colorTrans} ${mapBtnClass}`}
          >
            <MapPin className="size-3.5" aria-hidden="true" />
            Find a Store
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex size-10 items-center justify-center border lg:hidden rounded-sm ${colorTrans} ${iconClass}`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden overflow-y-auto"
        style={{ height: "calc(100svh - 60px)" }}
      >
        <ul className="px-6 py-6">
          {links.map((l) => (
            <li key={l.label} className="border-b border-border/60 last:border-0">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-3xl text-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-8">
            <Link
              href="#visit"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-5 text-[0.75rem] uppercase tracking-[0.2em] text-primary-foreground font-medium rounded-sm"
            >
              <MapPin className="size-4" aria-hidden="true" /> Find a Store
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
