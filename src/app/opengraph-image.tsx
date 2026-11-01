import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { ZETA_MARK_PATH, ZETA_MARK_VIEWBOX } from "@/components/ui/zeta-mark";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mark = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ZETA_MARK_VIEWBOX}"><path fill="#ffffff" fill-rule="evenodd" d="${ZETA_MARK_PATH}"/></svg>`,
)}`;

/** Default social share image, generated at build time. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={mark} width={64} height={65} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>ZETA</div>
            <div style={{ fontSize: 20, letterSpacing: 3, color: "#d4d4d8" }}>Consulting</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 1000 }}>
            Build smarter systems. Connect what you already use.
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 21, color: "#a1a3ab" }}>
            {["AI Agents", "Web & Mobile", "Immersive", "Transformation", "SEO", "GEO & AEO"].map((t) => (
              <div key={t} style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "8px 18px" }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
