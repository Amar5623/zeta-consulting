"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { bookingHref, nav, site } from "@/content/site";
import { services } from "@/content/services";
import { Button } from "@/components/ui/button";
import { easeInOutQuart, easeOutExpo } from "@/components/motion/ease";

const links = [...nav, { label: "Contact", href: "/contact" }];

export function MobileMenu({ open, email }: { open: boolean; email: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: easeInOutQuart }}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-night pb-8 pt-28 text-white lg:hidden"
          data-lenis-prevent
        >
          <div className="container-x flex flex-1 flex-col justify-between gap-12">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {links.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-night-line">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.25 + i * 0.06 }}
                    >
                      <Link href={item.href} className="flex items-baseline justify-between py-4 text-[2.5rem] leading-none tracking-[-0.03em]">
                        {item.label}
                        <span className="text-label text-night-muted">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.6 }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border border-night-line px-3 py-1.5 text-[0.8125rem] text-white/80">
                    {s.title}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <Button href={bookingHref()} variant="light" arrow className="w-full justify-between">
                  Book a free call
                </Button>
                <a href={`mailto:${email}`} className="text-center text-night-muted">
                  {email}
                </a>
              </div>
              <p className="text-center text-[0.8125rem] text-night-muted">{site.address.locality}, {site.address.country}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
