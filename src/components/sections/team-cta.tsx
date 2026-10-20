import Image from "next/image";
import { Mail } from "lucide-react";
import { bookingHref, site } from "@/content/site";
import { team, type TeamMember } from "@/content/people";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

const tints = ["#E7E5F3", "#E2EBE5", "#F2E6DD", "#E1E8F0"];

function Avatar({ member, index }: { member: TeamMember; index: number }) {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      className="relative grid size-16 place-items-center overflow-hidden rounded-full text-[0.9375rem] font-medium text-ink/60 ring-4 ring-white sm:size-[4.5rem]"
      style={{ backgroundColor: tints[index % tints.length] }}
    >
      {member.photo ? <Image src={member.photo} alt={`${member.name}, ${member.role}`} fill sizes="72px" className="object-cover" /> : initials}
    </span>
  );
}

/** Mid-page "talk to the team" band. Add photos via `photo` in src/content/people.ts. */
export function TeamCta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-10 rounded-xl border border-line bg-white p-6 shadow-card sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex shrink-0 -space-x-4">
                {team.slice(0, 4).map((m, i) => (
                  <Avatar key={`${m.role}-${i}`} member={m} index={i} />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-h3">
                  Talk directly with <span className="accent-serif">our team.</span>
                </p>
                <p className="max-w-lg text-fg-muted">
                  A free 30-minute call with the senior people who would build your project. Bring an idea, a problem or a half-finished build,
                  and leave with a clear next step.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <Button href={bookingHref()} arrow>
                Book an intro call
              </Button>
              <Button href={`mailto:${site.email}`} variant="secondary">
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-4" strokeWidth={1.75} /> Email us
                </span>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
