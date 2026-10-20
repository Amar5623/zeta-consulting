"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useLayoutEffect, useState, type FormEvent } from "react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { easeOutExpo } from "@/components/motion/ease";

// Adjust currency/ranges to your market.
const budgets = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+", "Not sure yet"];

/**
 * Posts JSON to NEXT_PUBLIC_CONTACT_ENDPOINT (Formspree, Basin, a Make/Zapier webhook, or your own API).
 * Without an endpoint it falls back to opening the visitor's email client with the message pre-filled.
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");

  // Pages stay mounted (hidden) after navigation; clear the success state when leaving.
  useLayoutEffect(() => () => setStatus("idle"), []);

  const toggle = (title: string) => setSelected((s) => (s.includes(title) ? s.filter((x) => x !== title) : [...s, title]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.website) return; // honeypot
    const payload = { name: data.name, email: data.email, company: data.company, message: data.message, services: selected, budget };

    if (!endpoint) {
      const body = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.company && `Company: ${payload.company}`,
        selected.length > 0 && `Interested in: ${selected.join(", ")}`,
        budget && `Budget: ${budget}`,
        "",
        payload.message,
      ]
        .filter(Boolean)
        .join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New project enquiry — ${payload.name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setSelected([]);
      setBudget("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="flex flex-col items-start gap-6 rounded-xl border border-line bg-white p-8 sm:p-12"
          >
            <span className="grid size-14 place-items-center rounded-full bg-success/15 text-success">
              <Check className="size-6" strokeWidth={2.5} />
            </span>
            <h2 className="text-h3">Thanks, we&apos;ve got it.</h2>
            <p className="max-w-md text-fg-muted">{site.responseTime} Look out for an email from {site.email}.</p>
            <Button variant="secondary" size="md" onClick={() => setStatus("idle")}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-10 rounded-xl border border-line bg-white p-6 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="name" required autoComplete="name" />
              <Field label="Work email" name="email" type="email" required autoComplete="email" />
              <Field label="Company" name="company" autoComplete="organization" className="sm:col-span-2" />
            </div>

            <fieldset className="flex flex-col gap-4">
              <legend className="mb-4 text-[0.9375rem]">What can we help with?</legend>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <ToggleChip key={s.slug} active={selected.includes(s.title)} onClick={() => toggle(s.title)}>
                    {s.title}
                  </ToggleChip>
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-4">
              <legend className="mb-4 text-[0.9375rem]">Estimated budget</legend>
              <div className="flex flex-wrap gap-2" role="radiogroup">
                {budgets.map((b) => (
                  <ToggleChip key={b} role="radio" active={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>
                    {b}
                  </ToggleChip>
                ))}
              </div>
            </fieldset>

            <label className="flex flex-col gap-2.5">
              <span className="text-[0.9375rem]">
                Tell us about your project <span className="text-accent">*</span>
              </span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Goals, timeline, links — whatever helps us understand what you need."
                className="resize-y rounded-lg border border-line bg-canvas/40 px-5 py-4 text-[0.9375rem] outline-none transition-colors placeholder:text-fg-subtle focus:border-ink focus:bg-white"
              />
            </label>

            {/* Honeypot — hidden from people, catches naive bots */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.8125rem] text-fg-muted">
                {status === "error" ? (
                  <span className="text-error">Something went wrong. Please email us at {site.email}.</span>
                ) : (
                  "We'll only use your details to reply to this enquiry."
                )}
              </p>
              <Button type="submit" arrow disabled={status === "sending"} className="disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send message"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2.5", className)}>
      <span className="text-[0.9375rem]">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="h-14 rounded-full border border-line bg-canvas/40 px-5 text-[0.9375rem] outline-none transition-colors focus:border-ink focus:bg-white"
      />
    </label>
  );
}

function ToggleChip({ active, onClick, children, role }: { active: boolean; onClick: () => void; children: React.ReactNode; role?: string }) {
  return (
    <button
      type="button"
      role={role}
      aria-pressed={role ? undefined : active}
      aria-checked={role ? active : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[0.875rem] transition-all duration-300",
        active ? "border-ink bg-ink text-white" : "border-line hover:border-fg-subtle",
      )}
    >
      {active && <Check className="size-3.5" strokeWidth={2.5} />}
      {children}
    </button>
  );
}
