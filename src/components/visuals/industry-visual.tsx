import { useId } from "react";
import { cn } from "@/lib/utils";
import type { Industry, VisualChart } from "@/content/industries";

/**
 * Illustrative product-interface scene for an industry, drawn as one SVG so it stays crisp at any size.
 * It's a designed concept visual — swap in real screenshots via a case study's `cover` when available.
 */

// Tight crop around the composition; the backdrop (grid + glow) is CSS so it extends seamlessly.
const VIEWBOX = "8 36 912 540";
// Chart area inside the left panel
const CX = 104;
const CY = 192;
const CW = 452;
const CH = 246;

const tone = { ok: "#34D399", warn: "#F5A524", info: "rgb(255 255 255 / 0.4)" } as const;

export function IndustryVisual({
  industry,
  className,
  fit = "contain",
  align = "center",
}: {
  industry: Industry;
  className?: string;
  /** "contain" keeps the whole scene visible at any aspect ratio; "cover" fills and crops. */
  fit?: "cover" | "contain";
  align?: "center" | "left";
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const v = industry.visual;
  const par = `${align === "left" ? "xMin" : "xMid"}YMid ${fit === "cover" ? "slice" : "meet"}`;

  return (
    <div
      className={cn("relative overflow-hidden bg-night", className)}
      style={{ backgroundImage: `radial-gradient(ellipse 70% 60% at 88% 0%, ${v.accent}33, transparent 70%), linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)`, backgroundSize: "100% 100%, 48px 48px, 48px 48px" }}
    >
      <svg
        viewBox={VIEWBOX}
        preserveAspectRatio={par}
        role="img"
        aria-label={`${industry.name} — illustrative interface concept`}
        className="absolute inset-0 h-full w-full"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <defs>
          <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={v.accent} stopOpacity="0.28" />
            <stop offset="1" stopColor={v.accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* window */}
        <rect x="56" y="52" width="848" height="496" rx="20" fill="#141416" stroke="rgb(255 255 255 / 0.08)" />
        {[84, 102, 120].map((cx) => (
          <circle key={cx} cx={cx} cy="82" r="5" fill="rgb(255 255 255 / 0.16)" />
        ))}
        <text x="144" y="87" fontSize="15" fontWeight="500" fill="rgb(255 255 255 / 0.9)">
          {v.title}
        </text>
        <Badge text={v.badge} accent={v.accent} />
        <line x1="56" y1="110" x2="904" y2="110" stroke="rgb(255 255 255 / 0.07)" />

        {/* chart panel */}
        <rect x="80" y="134" width="500" height="390" rx="14" fill="rgb(255 255 255 / 0.025)" stroke="rgb(255 255 255 / 0.05)" />
        <text x={CX} y="166" fontSize="13" fill="rgb(255 255 255 / 0.55)">
          {v.chart.label}
        </text>
        <Chart chart={v.chart} accent={v.accent} fadeId={`fade-${uid}`} />

        {/* stats */}
        {v.stats.map(([label, value], i) => {
          const x = 604 + i * 144;
          return (
            <g key={label}>
              <rect x={x} y="134" width="132" height="96" rx="12" fill="rgb(255 255 255 / 0.04)" />
              <text x={x + 16} y="164" fontSize="12" fill="rgb(255 255 255 / 0.5)">
                {label}
              </text>
              <text x={x + 16} y="206" fontSize="26" fontWeight="500" fill="#fff" letterSpacing="-0.5">
                {value}
              </text>
            </g>
          );
        })}

        {/* activity rows */}
        {v.rows.map((r, i) => {
          const y = 246 + i * 68;
          return (
            <g key={r.label}>
              <rect x="604" y={y} width="276" height="58" rx="10" fill="rgb(255 255 255 / 0.03)" />
              <circle cx="624" cy={y + 29} r="4" fill={r.tone === "info" ? v.accent : tone[r.tone]} opacity={r.tone === "info" ? 0.7 : 1} />
              <text x="640" y={y + 34} fontSize="13" fill="rgb(255 255 255 / 0.85)">
                {r.label}
              </text>
              <text x="864" y={y + 34} fontSize="12" fill="rgb(255 255 255 / 0.5)" textAnchor="end">
                {r.meta}
              </text>
            </g>
          );
        })}

        {/* floating callout */}
        <rect x="30" y="456" width="300" height="104" rx="16" fill="#000" opacity="0.45" transform="translate(0 8)" />
        <rect x="24" y="452" width="300" height="104" rx="16" fill="#1d1d21" stroke={v.accent} strokeOpacity="0.45" />
        <circle cx="52" cy="484" r="11" fill={v.accent} opacity="0.18" />
        <circle cx="52" cy="484" r="4.5" fill={v.accent} />
        <text x="74" y="489" fontSize="14" fontWeight="500" fill="#fff">
          {v.callout.title}
        </text>
        <text x="44" y="518" fontSize="12.5" fill="rgb(255 255 255 / 0.62)">
          {v.callout.lines[0]}
        </text>
        <text x="44" y="537" fontSize="12.5" fill="rgb(255 255 255 / 0.62)">
          {v.callout.lines[1]}
        </text>
      </svg>
    </div>
  );
}

function Badge({ text, accent }: { text: string; accent: string }) {
  const w = 22 + text.length * 7.4;
  const x = 880 - w;
  return (
    <g>
      <rect x={x} y="68" width={w} height="28" rx="14" fill={accent} opacity="0.16" />
      <text x={x + w / 2} y="86.5" fontSize="12" fontWeight="500" fill={accent} textAnchor="middle">
        {text}
      </text>
    </g>
  );
}

function Chart({ chart, accent, fadeId }: { chart: VisualChart; accent: string; fadeId: string }) {
  switch (chart.kind) {
    case "bars":
      return <Bars values={chart.values} accent={accent} />;
    case "line":
      return <Line values={chart.values} accent={accent} fadeId={fadeId} />;
    case "ring":
      return <Ring segments={chart.segments} accent={accent} />;
    case "grid":
      return <Tiles tiles={chart.tiles} accent={accent} />;
    case "map":
      return <MapRoutes accent={accent} />;
    case "nodes":
      return <Nodes steps={chart.steps} accent={accent} />;
    case "vision":
      return <Vision accent={accent} />;
    case "doc":
      return <Doc fields={chart.fields} accent={accent} />;
    case "timeline":
      return <Timeline lanes={chart.lanes} accent={accent} />;
  }
}

function Guides() {
  return (
    <g stroke="rgb(255 255 255 / 0.05)">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={CX} x2={CX + CW} y1={CY + (CH / 3) * i} y2={CY + (CH / 3) * i} />
      ))}
    </g>
  );
}

function Bars({ values, accent }: { values: number[]; accent: string }) {
  const gap = values.length > 8 ? 10 : 18;
  const bw = (CW - gap * (values.length - 1)) / values.length;
  const max = Math.max(...values);
  return (
    <g>
      <Guides />
      {values.map((v, i) => {
        const h = (v / max) * (CH - 16);
        return (
          <rect
            key={i}
            x={CX + i * (bw + gap)}
            y={CY + CH - h}
            width={bw}
            height={h}
            rx="5"
            fill={v === max ? accent : "rgb(255 255 255 / 0.14)"}
          />
        );
      })}
    </g>
  );
}

function Line({ values, accent, fadeId }: { values: number[]; accent: string; fadeId: string }) {
  const max = Math.max(...values) * 1.1;
  const min = Math.min(...values) * 0.8;
  const pts = values.map((v, i) => [CX + (i / (values.length - 1)) * CW, CY + CH - ((v - min) / (max - min)) * CH] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
  const last = pts[pts.length - 1];
  return (
    <g>
      <Guides />
      <path d={`${line}L${CX + CW} ${CY + CH}L${CX} ${CY + CH}Z`} fill={`url(#${fadeId})`} />
      <path d={line} fill="none" stroke={accent} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="9" fill={accent} opacity="0.2" />
      <circle cx={last[0]} cy={last[1]} r="4.5" fill={accent} />
    </g>
  );
}

function Ring({ segments, accent }: { segments: { label: string; value: number }[]; accent: string }) {
  const r = 92;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0);
  const shades = [accent, "rgb(255 255 255 / 0.55)", "rgb(255 255 255 / 0.3)", "rgb(255 255 255 / 0.14)"];
  const arcs = segments.map((s, i) => {
    const before = segments.slice(0, i).reduce((a, x) => a + x.value, 0);
    return { ...s, len: (s.value / total) * c, offset: (before / total) * c };
  });
  return (
    <g>
      <g transform={`rotate(-90 ${CX + 118} ${CY + 124})`}>
        {arcs.map((a, i) => (
          <circle
            key={a.label}
            cx={CX + 118}
            cy={CY + 124}
            r={r}
            fill="none"
            stroke={shades[i % shades.length]}
            strokeWidth="26"
            strokeDasharray={`${a.len - 4} ${c - a.len + 4}`}
            strokeDashoffset={-a.offset}
          />
        ))}
      </g>
      <text x={CX + 118} y={CY + 124} fontSize="34" fontWeight="500" fill="#fff" textAnchor="middle" letterSpacing="-1">
        {segments[0].value}%
      </text>
      <text x={CX + 118} y={CY + 148} fontSize="12" fill="rgb(255 255 255 / 0.5)" textAnchor="middle">
        {segments[0].label}
      </text>
      {segments.map((s, i) => (
        <g key={s.label} transform={`translate(${CX + 272} ${CY + 52 + i * 44})`}>
          <rect width="12" height="12" rx="3" fill={shades[i % shades.length]} />
          <text x="22" y="11" fontSize="13" fill="rgb(255 255 255 / 0.8)">
            {s.label}
          </text>
          <text x="172" y="11" fontSize="13" fill="rgb(255 255 255 / 0.5)" textAnchor="end">
            {s.value}%
          </text>
        </g>
      ))}
    </g>
  );
}

function Tiles({ tiles, accent }: { tiles: string[]; accent: string }) {
  const cols = 3;
  const gap = 12;
  const tw = (CW - gap * (cols - 1)) / cols;
  const th = (CH - gap) / 2;
  return (
    <g>
      {tiles.slice(0, 6).map((t, i) => {
        const x = CX + (i % cols) * (tw + gap);
        const y = CY + Math.floor(i / cols) * (th + gap);
        return (
          <g key={t}>
            <rect x={x} y={y} width={tw} height={th} rx="10" fill="rgb(255 255 255 / 0.04)" />
            <rect x={x + 8} y={y + 8} width={tw - 16} height={th - 48} rx="7" fill={accent} opacity={0.1 + ((i * 7) % 5) * 0.035} />
            <text x={x + 12} y={y + th - 20} fontSize="12" fill="rgb(255 255 255 / 0.82)">
              {t}
            </text>
            <rect x={x + 12} y={y + th - 13} width={tw * 0.35} height="4" rx="2" fill="rgb(255 255 255 / 0.15)" />
          </g>
        );
      })}
    </g>
  );
}

function MapRoutes({ accent }: { accent: string }) {
  const dots = [];
  for (let x = CX + 6; x < CX + CW; x += 18) {
    for (let y = CY + 6; y < CY + CH; y += 18) {
      // a loose continental silhouette
      const nx = (x - CX) / CW;
      const ny = (y - CY) / CH;
      const land = Math.sin(nx * 7.5) * 0.18 + Math.cos(ny * 5 + nx * 3) * 0.22 > -0.05;
      if (land) dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="rgb(255 255 255 / 0.13)" />);
    }
  }
  const routes = [
    `M${CX + 40} ${CY + 196} C ${CX + 140} ${CY + 60}, ${CX + 260} ${CY + 70}, ${CX + 380} ${CY + 110}`,
    `M${CX + 60} ${CY + 60} C ${CX + 180} ${CY + 140}, ${CX + 280} ${CY + 200}, ${CX + 420} ${CY + 210}`,
    `M${CX + 150} ${CY + 230} C ${CX + 220} ${CY + 170}, ${CX + 300} ${CY + 150}, ${CX + 300} ${CY + 40}`,
  ];
  return (
    <g>
      {dots}
      {routes.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={i === 0 ? accent : "rgb(255 255 255 / 0.3)"} strokeWidth={i === 0 ? 2.5 : 1.5} strokeDasharray={i === 0 ? undefined : "4 6"} />
      ))}
      {[
        [CX + 380, CY + 110, accent],
        [CX + 420, CY + 210, "rgb(255 255 255 / 0.7)"],
        [CX + 300, CY + 40, "rgb(255 255 255 / 0.7)"],
      ].map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" fill={c as string} opacity="0.18" />
          <circle cx={x} cy={y} r="4.5" fill={c as string} />
        </g>
      ))}
      <circle cx={CX + 228} cy={CY + 92} r="16" fill="none" stroke={tone.warn} strokeWidth="2" opacity="0.7" />
      <circle cx={CX + 228} cy={CY + 92} r="5" fill={tone.warn} />
    </g>
  );
}

function Nodes({ steps, accent }: { steps: string[]; accent: string }) {
  const n = steps.length;
  const gap = 18;
  const bw = (CW - gap * (n - 1)) / n;
  const y = CY + 40;
  const active = Math.min(3, n - 1);
  return (
    <g>
      {steps.map((s, i) => {
        const x = CX + i * (bw + gap);
        const on = i === active;
        const done = i < active;
        return (
          <g key={s}>
            {i < n - 1 && <line x1={x + bw} x2={x + bw + gap} y1={y + 30} y2={y + 30} stroke={done ? accent : "rgb(255 255 255 / 0.2)"} strokeWidth="2" />}
            <rect
              x={x}
              y={y}
              width={bw}
              height="60"
              rx="10"
              fill={on ? accent : "rgb(255 255 255 / 0.05)"}
              fillOpacity={on ? 0.16 : 1}
              stroke={on || done ? accent : "rgb(255 255 255 / 0.12)"}
              strokeOpacity={done ? 0.5 : 1}
            />
            <text x={x + bw / 2} y={y + 35} fontSize="12" fill={on ? "#fff" : "rgb(255 255 255 / 0.75)"} textAnchor="middle">
              {s}
            </text>
          </g>
        );
      })}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${CX} ${CY + 132 + i * 28})`}>
          <circle cx="6" cy="6" r="3.5" fill={i === 0 ? accent : "rgb(255 255 255 / 0.3)"} />
          <rect x="20" y="3" width={[300, 240, 280, 200][i]} height="6" rx="3" fill="rgb(255 255 255 / 0.1)" />
          <rect x={CW - 56} y="3" width="56" height="6" rx="3" fill="rgb(255 255 255 / 0.07)" />
        </g>
      ))}
    </g>
  );
}

function Vision({ accent }: { accent: string }) {
  return (
    <g>
      <rect x={CX} y={CY} width={CW} height={CH} rx="10" fill="#1b1b1f" />
      {/* camera corners */}
      {[
        [CX + 14, CY + 14, 1, 1],
        [CX + CW - 14, CY + 14, -1, 1],
        [CX + 14, CY + CH - 14, 1, -1],
        [CX + CW - 14, CY + CH - 14, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <path key={i} d={`M${x} ${y + 18 * sy}V${y}H${x + 18 * sx}`} fill="none" stroke="rgb(255 255 255 / 0.4)" strokeWidth="2" />
      ))}
      {/* part on the line */}
      <rect x={CX + 96} y={CY + 52} width="260" height="142" rx="18" fill="rgb(255 255 255 / 0.1)" stroke="rgb(255 255 255 / 0.18)" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={CX + 132 + i * 62} cy={CY + 92} r="12" fill="#1b1b1f" stroke="rgb(255 255 255 / 0.2)" />
      ))}
      <rect x={CX + 120} y={CY + 130} width="210" height="8" rx="4" fill="rgb(255 255 255 / 0.12)" />
      {/* detections */}
      <rect x={CX + 236} y={CY + 118} width="96" height="56" rx="4" fill="none" stroke={tone.warn} strokeWidth="2" strokeDasharray="6 4" />
      <rect x={CX + 236} y={CY + 96} width="104" height="20" rx="4" fill={tone.warn} />
      <text x={CX + 244} y={CY + 110} fontSize="11" fontWeight="500" fill="#0b0b0c">
        scratch · 0.94
      </text>
      <rect x={CX + 108} y={CY + 72} width="48" height="40" rx="4" fill="none" stroke={accent} strokeWidth="2" opacity="0.8" />
      <rect x={CX + 108} y={CY + 50} width="62" height="20" rx="4" fill={accent} opacity="0.85" />
      <text x={CX + 115} y={CY + 64} fontSize="11" fontWeight="500" fill="#0b0b0c">
        hole · OK
      </text>
      {/* scan line */}
      <line x1={CX + 14} x2={CX + CW - 14} y1={CY + 214} y2={CY + 214} stroke={accent} strokeOpacity="0.4" />
    </g>
  );
}

function Doc({ fields, accent }: { fields: [string, string][]; accent: string }) {
  const dx = CX;
  const dy = CY - 4;
  return (
    <g>
      <rect x={dx} y={dy} width="210" height={CH + 8} rx="8" fill="#ececee" />
      <rect x={dx + 18} y={dy + 20} width="70" height="10" rx="3" fill="#0b0b0c" opacity="0.7" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={dx + 18} y={dy + 46 + i * 14} width={[150, 120, 136][i]} height="6" rx="3" fill="#0b0b0c" opacity="0.15" />
      ))}
      {fields.map(([k], i) => (
        <g key={k}>
          <rect x={dx + 12} y={dy + 98 + i * 34} width="186" height="26" rx="5" fill={accent} opacity="0.18" stroke={accent} strokeOpacity="0.7" />
          <rect x={dx + 22} y={dy + 108 + i * 34} width={[90, 70, 60, 80][i % 4]} height="6" rx="3" fill="#0b0b0c" opacity="0.35" />
        </g>
      ))}
      {/* extraction panel */}
      {fields.map(([k, val], i) => (
        <g key={`f-${k}`} transform={`translate(${dx + 236} ${dy + 14 + i * 58})`}>
          <rect width="216" height="48" rx="9" fill="rgb(255 255 255 / 0.04)" />
          <text x="14" y="19" fontSize="11" fill="rgb(255 255 255 / 0.5)">
            {k}
          </text>
          <text x="14" y="37" fontSize="13.5" fontWeight="500" fill="#fff">
            {val}
          </text>
          <circle cx="196" cy="24" r="8" fill={i === fields.length - 1 ? tone.warn : accent} opacity="0.2" />
          <circle cx="196" cy="24" r="3.5" fill={i === fields.length - 1 ? tone.warn : accent} />
        </g>
      ))}
    </g>
  );
}

function Timeline({ lanes, accent }: { lanes: { label: string; blocks: [number, number][] }[]; accent: string }) {
  const tx = CX + 64;
  const tw = CW - 64;
  const slots = 9;
  const sw = tw / slots;
  const lh = Math.min(44, (CH - 24) / lanes.length - 10);
  return (
    <g>
      {Array.from({ length: slots + 1 }, (_, i) => (
        <line key={i} x1={tx + i * sw} x2={tx + i * sw} y1={CY} y2={CY + CH - 18} stroke="rgb(255 255 255 / 0.05)" />
      ))}
      {Array.from({ length: slots }, (_, i) => (
        <text key={i} x={tx + i * sw + 4} y={CY + CH - 2} fontSize="10.5" fill="rgb(255 255 255 / 0.35)">
          {9 + i}:00
        </text>
      ))}
      {lanes.map((lane, li) => {
        const y = CY + 4 + li * (lh + 12);
        return (
          <g key={lane.label}>
            <text x={CX} y={y + lh / 2 + 4} fontSize="12" fill="rgb(255 255 255 / 0.6)">
              {lane.label}
            </text>
            {lane.blocks.map(([start, len], bi) => {
              const hot = li === 1 && bi === 0;
              return (
                <rect
                  key={bi}
                  x={tx + start * sw + 2}
                  y={y}
                  width={len * sw - 4}
                  height={lh}
                  rx="8"
                  fill={accent}
                  fillOpacity={hot ? 0.85 : 0.2}
                  stroke={accent}
                  strokeOpacity={hot ? 0 : 0.5}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}
