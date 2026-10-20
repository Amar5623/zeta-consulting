import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — AI, Software & Growth Agency`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share image, generated at build time. Replace with a designed PNG if you prefer. */
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "white", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: "#010101" }}>Z</div>
            <div style={{ position: "absolute", top: 6, right: 6, width: 10, height: 10, borderRadius: 10, background: "#f55c1a" }} />
          </div>
          <div style={{ fontSize: 30, letterSpacing: -1 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -3, maxWidth: 980 }}>AI agents, products & growth — one senior team.</div>
          <div style={{ display: "flex", gap: 12, fontSize: 22, color: "#a1a3ab" }}>
            {["AI Agents", "Web", "Mobile", "Transformation", "SEO", "GEO & AEO"].map((t) => (
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
