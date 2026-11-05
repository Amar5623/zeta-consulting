"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Adjust currency/ranges to your market.
const budgets = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+", "Not sure yet"];

type Draft = { subject: string; body: string };

const enc = encodeURIComponent;

/** Where the drafted email can be opened: the visitor's default mail app, or a webmail compose screen. */
function composeLinks({ subject, body }: Draft) {
  return {
    app: `mailto:${site.email}?subject=${enc(subject)}&body=${enc(body)}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(site.email)}&su=${enc(subject)}&body=${enc(body)}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(site.email)}&subject=${enc(subject)}&body=${enc(body)}`,
  };
}

/**
 * No form backend: submitting drafts an email to site.email from the visitor's own mailbox, pre-filled with
 * the form data, and opens their default mail app. Gmail, Outlook and copy-to-clipboard are offered for
 * visitors without a mail app. Replies go straight to the lead's real address.
 */
export function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copied, setCopied] = useState(false);

  const toggle = (title: string) => setSelected((s) => (s.includes(title) ? s.filter((x) => x !== title) : [...s, title]));

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (data._honey) return; // honeypot

    const details = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : null,
      data.phone ? `Phone: ${data.phone}` : null,
      selected.length > 0 ? `Interested in: ${selected.join(", ")}` : null,
      budget ? `Estimated budget: ${budget}` : null,
    ].filter((l) => l !== null);
    const lines = [`Hi ${site.shortName} team,`, "", data.message.trim(), "", "—", ...details];
    const next = {
      subject: `Project enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      body: lines.join("\n"),
    };
    setDraft(next);
    setCopied(false);
    window.location.href = composeLinks(next).app;
  }

  async function copy() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\nSubject: ${draft.subject}\n\n${draft.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const links = draft ? composeLinks(draft) : null;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10 rounded-xl border border-line bg-white p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Work email" name="email" type="email" required autoComplete="email" />
        <Field label="Company" name="company" autoComplete="organization" />
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
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
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Estimated budget">
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
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {links ? (
        <div role="status" aria-live="polite" className="flex flex-col gap-5 rounded-lg bg-canvas p-6">
          <div className="flex flex-col gap-1.5">
            <p className="text-h4">Your email is ready to send.</p>
            <p className="text-[0.9375rem] text-fg-muted">
              We opened it in your mail app, addressed to {site.email}. Just press send. If nothing opened, use one of these:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href={links.app} size="md">
              <span className="inline-flex items-center gap-2">
                <Mail className="size-4" strokeWidth={1.75} /> Mail app
              </span>
            </Button>
            <Button href={links.gmail} variant="secondary" size="md">
              Gmail
            </Button>
            <Button href={links.outlook} variant="secondary" size="md">
              Outlook
            </Button>
            <Button variant="secondary" size="md" onClick={copy}>
              <span className="inline-flex items-center gap-2">
                {copied ? <Check className="size-4" strokeWidth={2} /> : <Copy className="size-4" strokeWidth={1.75} />}
                {copied ? "Copied" : "Copy message"}
              </span>
            </Button>
          </div>
          <p className="text-[0.8125rem] text-fg-muted">
            Prefer to talk? Call {site.phoneDisplay}. Changed something above?{" "}
            <button type="submit" className="underline underline-offset-4 hover:text-ink">
              Update the email
            </button>
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-fg-muted">This opens a ready-to-send email in your own mail app. Nothing is stored on our side.</p>
          <Button type="submit" arrow>
            Send message
          </Button>
        </div>
      )}
    </form>
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
