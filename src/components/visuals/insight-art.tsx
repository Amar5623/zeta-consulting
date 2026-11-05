import type { CSSProperties, ReactNode } from "react";
import type { CoverKind, DiagramKind } from "@/content/insights";
import { cn } from "@/lib/utils";

/**
 * Designed artwork for Insights: cover illustrations and the architecture diagrams inside articles.
 * Pure SVG on the same dark panel as the industry visuals, with one bright accent per article.
 */

export const coverAccent: Record<CoverKind, string> = { agent: "#F55C1A", versus: "#A78BFA", rag: "#34D399" };

const C = {
  canvas: "#0b0b0c",
  surface: "#151517",
  line: "rgb(255 255 255 / 0.12)",
  ink: "#ffffff",
  body: "#a1a3ab",
  subtle: "#868a94",
  faint: "rgb(255 255 255 / 0.32)",
  signal: "var(--art-accent)",
  alt: "rgb(255 255 255 / 0.55)",
  live: "#34D399",
  warn: "#F5A524",
};

const font = { fontFamily: "var(--font-mono)" };

function Box({ x, y, w, h, label, sub, tone = "line" }: { x: number; y: number; w: number; h: number; label: string; sub?: string; tone?: "line" | "signal" | "alt" | "live" | "warn" }) {
  const stroke = tone === "line" ? C.line : C[tone];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={C.surface} stroke={stroke} strokeWidth={tone === "line" ? 1 : 1.5} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 3 : h / 2 + 4)} fill={C.ink} fontSize="12.5" fontWeight="600" textAnchor="middle" style={{ fontFamily: "var(--font-sans)" }}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 14} fill={C.subtle} fontSize="10" textAnchor="middle" style={font}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ d, tone = "faint", dashed }: { d: string; tone?: "faint" | "signal"; dashed?: boolean }) {
  return <path d={d} fill="none" stroke={C[tone]} strokeWidth="1.5" strokeDasharray={dashed ? "4 5" : undefined} markerEnd={`url(#arrow-${tone})`} />;
}

function Defs() {
  return (
    <defs>
      {(["faint", "signal"] as const).map((t) => (
        <marker key={t} id={`arrow-${t}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={C[t]} />
        </marker>
      ))}
    </defs>
  );
}

function Label({ x, y, children, anchor = "start", fill = C.subtle }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; fill?: string }) {
  return (
    <text x={x} y={y} fill={fill} fontSize="10" textAnchor={anchor} style={font} letterSpacing="0.06em">
      {children}
    </text>
  );
}

/* ---------------------------------------------------------------- Diagrams */

export function Diagram({ kind, alt, accent, className }: { kind: DiagramKind; alt: string; accent: string; className?: string }) {
  return (
    <svg viewBox="0 0 720 360" role="img" aria-label={alt} className={cn("h-auto w-full", className)} style={{ "--art-accent": accent } as CSSProperties}>
      <Defs />
      {kind === "agent-loop" && <AgentLoop />}
      {kind === "hybrid-automation" && <Hybrid />}
      {kind === "rag-pipeline" && <RagPipeline />}
    </svg>
  );
}

function AgentLoop() {
  return (
    <g>
      <rect x="150" y="30" width="420" height="300" rx="18" fill="none" stroke={C.alt} strokeOpacity="0.6" strokeDasharray="6 6" />
      <Label x={166} y={52} fill={C.alt}>
        GUARDRAILS · PERMISSIONS · LOGGING
      </Label>
      <Box x={20} y={150} w={110} h={60} label="Goal" sub="+ context" />
      <Arrow d="M130 180H196" />
      <Box x={200} y={140} w={140} h={80} label="Model" sub="plan next step" tone="signal" />
      <Box x={400} y={70} w={140} h={60} label="Act" sub="call a tool" />
      <Box x={400} y={230} w={140} h={60} label="Observe" sub="read the result" />
      <Arrow d="M340 165C370 140 380 110 398 102" tone="signal" />
      <Arrow d="M470 130V228" tone="signal" />
      <Arrow d="M398 262C370 260 345 235 330 222" tone="signal" />
      <Box x={590} y={70} w={110} h={60} label="Tools" sub="CRM · DB · API" />
      <Arrow d="M540 100H588" dashed />
      <Box x={590} y={230} w={110} h={60} label="Human" sub="approves" tone="live" />
      <Arrow d="M540 260H588" />
      <Label x={360} y={350} anchor="middle">
        LOOP UNTIL DONE OR ESCALATED
      </Label>
    </g>
  );
}

function Hybrid() {
  return (
    <g>
      <Box x={20} y={60} w={120} h={50} label="Emails" sub="free text" />
      <Box x={20} y={130} w={120} h={50} label="PDFs & scans" sub="unstructured" />
      <Box x={20} y={200} w={120} h={50} label="Chat" sub="requests" />
      <Arrow d="M140 85C170 85 175 150 196 155" />
      <Arrow d="M140 155H196" />
      <Arrow d="M140 225C170 225 175 160 196 158" />
      <Box x={200} y={120} w={130} h={74} label="AI agent" sub="classify · extract" tone="signal" />
      <Arrow d="M330 157H376" tone="signal" />
      <Box x={380} y={127} w={110} h={60} label="Validate" sub="rules + schema" tone="alt" />
      <Arrow d="M490 145C520 140 530 100 556 96" />
      <Arrow d="M490 170C520 176 530 240 556 246" dashed />
      <Box x={560} y={66} w={140} h={60} label="RPA / API" sub="execute" />
      <Box x={560} y={216} w={140} h={60} label="Human review" sub="exceptions" tone="live" />
      <Arrow d="M630 126V160" />
      <Box x={560} y={160} w={140} h={36} label="System of record" />
      <Label x={520} y={110}>
        VALID
      </Label>
      <Label x={505} y={222}>
        EXCEPTION
      </Label>
      <Label x={360} y={330} anchor="middle">
        AGENT INTERPRETS · AUTOMATION EXECUTES · PEOPLE DECIDE EXCEPTIONS
      </Label>
    </g>
  );
}

function RagPipeline() {
  return (
    <g>
      <Label x={20} y={36}>
        INDEXING · ONCE PER CHANGE
      </Label>
      <Box x={20} y={50} w={130} h={56} label="Documents" sub="policies · tickets" />
      <Arrow d="M150 78H196" />
      <Box x={200} y={50} w={120} h={56} label="Chunk & embed" />
      <Arrow d="M320 78H366" />
      <Box x={370} y={46} w={140} h={64} label="Search index" sub="+ permissions" tone="alt" />
      <line x1="20" y1="150" x2="700" y2="150" stroke={C.line} />
      <Label x={20} y={180}>
        ANSWERING · EVERY QUESTION
      </Label>
      <Box x={20} y={200} w={130} h={56} label="Question" />
      <Arrow d="M150 228H196" />
      <Box x={200} y={200} w={120} h={56} label="Retrieve" sub="top passages" />
      <Arrow d="M440 110V180C440 200 340 200 322 214" dashed />
      <Arrow d="M320 228H396" tone="signal" />
      <Box x={400} y={196} w={140} h={64} label="Model" sub="question + passages" tone="signal" />
      <Arrow d="M540 228H576" tone="signal" />
      <Box x={580} y={196} w={120} h={64} label="Answer" sub="with citations" tone="live" />
      <Label x={360} y={320} anchor="middle">
        KNOWLEDGE LIVES IN THE INDEX, NOT THE MODEL
      </Label>
    </g>
  );
}

/* ---------------------------------------------------------------- Covers */

/** Decorative cover for an article card or header. */
export function InsightCover({ kind, className }: { kind: CoverKind; className?: string }) {
  const accent = coverAccent[kind];
  return (
    <div
      aria-hidden="true"
      className={cn("bg-grid-light relative overflow-hidden bg-night", className)}
      style={{ "--art-accent": accent } as CSSProperties}
    >
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 85% 0%, ${accent}40, transparent 70%)` }} />
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <Defs />
        {kind === "agent" && <CoverAgent />}
        {kind === "versus" && <CoverVersus />}
        {kind === "rag" && <CoverRag />}
      </svg>
    </div>
  );
}

function CoverAgent() {
  const nodes = [
    [320, 110],
    [440, 200],
    [320, 290],
    [200, 200],
  ];
  return (
    <g>
      <circle cx="320" cy="200" r="90" fill="none" stroke={C.line} strokeWidth="1.5" />
      <circle cx="320" cy="200" r="90" fill="none" stroke={C.signal} strokeWidth="2" strokeDasharray="140 426" strokeLinecap="round" />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="16" fill={C.surface} stroke={i === 0 ? C.signal : C.faint} strokeWidth="1.5" />
          <circle cx={x} cy={y} r="4" fill={i === 0 ? C.signal : C.faint} />
        </g>
      ))}
      <rect x="282" y="182" width="76" height="36" rx="8" fill={C.surface} stroke={C.signal} />
      <text x="320" y="205" fill={C.ink} fontSize="13" textAnchor="middle" style={font}>
        agent
      </text>
      {[
        [470, 90, "tool.call()"],
        [90, 300, "observe"],
        [470, 320, "approve?"],
      ].map(([x, y, t]) => (
        <g key={t as string}>
          <rect x={x as number} y={(y as number) - 18} width="96" height="28" rx="6" fill={C.surface} stroke={C.line} />
          <text x={(x as number) + 48} y={(y as number) + 1} fill={C.body} fontSize="11" textAnchor="middle" style={font}>
            {t}
          </text>
        </g>
      ))}
    </g>
  );
}

function CoverVersus() {
  return (
    <g>
      {/* RPA: rigid grid of steps */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="90" y={90 + i * 56} width="150" height="36" rx="6" fill={C.surface} stroke={C.line} />
          <rect x="102" y={104 + i * 56} width={[90, 70, 110, 60][i]} height="8" rx="4" fill={C.faint} />
          {i < 3 && <line x1="165" x2="165" y1={126 + i * 56} y2={146 + i * 56} stroke={C.faint} strokeWidth="1.5" />}
        </g>
      ))}
      <text x="165" y="70" fill={C.subtle} fontSize="12" textAnchor="middle" style={font} letterSpacing="0.1em">
        RPA
      </text>
      <text x="320" y="210" fill={C.subtle} fontSize="16" textAnchor="middle" style={font}>
        vs
      </text>
      {/* Agent: branching paths */}
      <circle cx="475" cy="108" r="14" fill={C.surface} stroke={C.signal} strokeWidth="1.5" />
      {[
        [400, 200],
        [475, 210],
        [550, 195],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M475 122C475 160 ${x} 160 ${x} ${y - 14}`} fill="none" stroke={i === 1 ? C.signal : C.faint} strokeWidth="1.5" />
          <circle cx={x} cy={y} r="12" fill={C.surface} stroke={i === 1 ? C.signal : C.faint} strokeWidth="1.5" />
        </g>
      ))}
      <path d="M475 222C475 260 520 270 520 300" fill="none" stroke={C.signal} strokeWidth="1.5" />
      <rect x="470" y="300" width="100" height="32" rx="6" fill={C.surface} stroke={C.live} />
      <circle cx="488" cy="316" r="4" fill={C.live} />
      <text x="530" y="320" fill={C.ink} fontSize="11" textAnchor="middle" style={font}>
        done
      </text>
      <text x="475" y="70" fill={C.subtle} fontSize="12" textAnchor="middle" style={font} letterSpacing="0.1em">
        AGENT
      </text>
    </g>
  );
}

function CoverRag() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${70 + i * 14} ${110 + i * 14})`}>
          <rect width="120" height="150" rx="8" fill={C.surface} stroke={i === 2 ? C.faint : C.line} />
          {[0, 1, 2, 3, 4].map((j) => (
            <rect key={j} x="14" y={20 + j * 22} width={[80, 92, 64, 88, 50][j]} height="7" rx="3.5" fill={i === 2 && j === 2 ? C.signal : C.line} />
          ))}
        </g>
      ))}
      <path d="M240 200H300" stroke={C.signal} strokeWidth="1.5" markerEnd="url(#arrow-signal)" />
      <g>
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 5 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={330 + c * 18} cy={164 + r * 18} r="3" fill={r === 2 && c === 3 ? C.signal : C.faint} />
          )),
        )}
      </g>
      <path d="M430 200H490" stroke={C.signal} strokeWidth="1.5" markerEnd="url(#arrow-signal)" />
      <rect x="496" y="150" width="104" height="100" rx="10" fill={C.surface} stroke={C.signal} />
      <rect x="510" y="168" width="70" height="7" rx="3.5" fill={C.body} />
      <rect x="510" y="184" width="56" height="7" rx="3.5" fill={C.line} />
      <rect x="510" y="200" width="64" height="7" rx="3.5" fill={C.line} />
      <rect x="510" y="222" width="34" height="14" rx="7" fill={C.signal} opacity="0.25" />
      <text x="527" y="232" fill={C.signal} fontSize="9" textAnchor="middle" style={font}>
        [1]
      </text>
    </g>
  );
}
