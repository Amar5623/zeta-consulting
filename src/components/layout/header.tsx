"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { bookingHref, nav, site } from "@/content/site";
import { serviceGroups, servicesByGroup } from "@/content/services";
import { Logo } from "@/components/ui/logo";
import { Button, RollText } from "@/components/ui/button";
import { easeOutExpo } from "@/components/motion/ease";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 240 && y > prev && !megaOpen);
  });

  // Close menus whenever the route changes (state adjusted during render, not in an effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMegaOpen(false);
    setMenuOpen(false);
  }

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        style={{ viewTransitionName: "site-header" }}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? "-120%" : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="fixed inset-x-0 top-0 z-50 pt-3"
      >
        <div className="container-x relative" onMouseLeave={scheduleClose}>
          <div
            className={cn(
              "flex h-16 items-center justify-between rounded-full border pl-4 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 sm:pl-5",
              (scrolled || megaOpen) && !menuOpen
                ? "border-line/80 bg-white/80 shadow-card backdrop-blur-xl backdrop-saturate-150"
                : "border-transparent bg-transparent",
            )}
          >
            <Logo tone={menuOpen ? "light" : "dark"} />

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) =>
                item.href === "/services" ? (
                  <div key={item.href} onMouseEnter={openMega}>
                    <button
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls="mega-menu"
                      onClick={() => setMegaOpen((o) => !o)}
                      className={cn(
                        "group flex h-10 items-center gap-1 rounded-full px-4 text-[0.9375rem] transition-colors hover:bg-canvas",
                        isActive(item.href) && "text-ink",
                      )}
                    >
                      <RollText>{item.label}</RollText>
                      <ChevronDown className={cn("size-3.5 transition-transform duration-500 ease-out-expo", megaOpen && "rotate-180")} strokeWidth={2} />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={scheduleClose}
                    className="group relative flex h-10 items-center rounded-full px-4 text-[0.9375rem] transition-colors hover:bg-canvas"
                  >
                    <RollText>{item.label}</RollText>
                    {isActive(item.href) && <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent" />}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/contact" className={cn("group hidden h-10 items-center px-4 text-[0.9375rem] md:flex", menuOpen && "md:hidden")}>
                <RollText>Contact</RollText>
              </Link>
              <Button href={bookingHref()} size="md" arrow className={cn("hidden sm:inline-flex", menuOpen && "sm:hidden")}>
                Book a call
              </Button>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "relative grid size-12 place-items-center rounded-full transition-colors duration-500 lg:hidden",
                  menuOpen ? "bg-white text-ink" : "bg-ink text-white",
                )}
              >
                <span className="relative block h-3 w-5">
                  <span className={cn("absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo", menuOpen && "translate-y-[5.25px] rotate-45")} />
                  <span className={cn("absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo", menuOpen && "-translate-y-[5.25px] -rotate-45")} />
                </span>
              </button>
            </div>
          </div>

          {/* Services mega-menu */}
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                id="mega-menu"
                onMouseEnter={openMega}
                initial={{ opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.99 }}
                transition={{ duration: 0.45, ease: easeOutExpo }}
                className="absolute inset-x-4 top-[calc(100%+10px)] hidden origin-top sm:inset-x-6 lg:inset-x-10 lg:block"
              >
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_17rem] gap-2 rounded-xl border border-line bg-white p-2 shadow-float">
                  {serviceGroups.map((group) => (
                    <div key={group.id} className="rounded-lg p-4">
                      <p className="mb-4 text-label text-fg-subtle">{group.label}</p>
                      <ul className="flex flex-col gap-1">
                        {servicesByGroup(group.id).map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="group -mx-2 flex gap-3 rounded-md p-2 transition-colors hover:bg-canvas">
                              <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-white transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                                <s.icon className="size-4" strokeWidth={1.75} />
                              </span>
                              <span className="flex flex-col gap-0.5">
                                <span className="text-[0.9375rem] leading-tight">{s.title}</span>
                                <span className="line-clamp-2 text-[0.8125rem] leading-snug text-fg-muted">{s.short}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="flex flex-col justify-between rounded-lg bg-ink p-5 text-white">
                    <div className="flex flex-col gap-3">
                      <p className="text-h4">
                        Not sure where <span className="accent-serif">to start?</span>
                      </p>
                      <p className="text-[0.875rem] text-night-muted">A free 30-minute call with a senior lead. We&apos;ll point you to the right approach, even if it isn&apos;t us.</p>
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                      <Button href={bookingHref()} variant="light" size="md" arrow className="w-full justify-between">
                        Book a call
                      </Button>
                      <Link href="/services" className="group inline-flex items-center gap-1 text-[0.875rem] text-night-muted hover:text-white">
                        All services <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} email={site.email} />
    </>
  );
}
