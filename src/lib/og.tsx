import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { ZETA_MARK_PATH, ZETA_MARK_VIEWBOX } from "@/components/ui/zeta-mark";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const mark = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ZETA_MARK_VIEWBOX}"><path fill="#ffffff" fill-rule="evenodd" d="${ZETA_MARK_PATH}"/></svg>`,
)}`;

/** Shared Open Graph card in the brand style: near-black canvas, outlined eyebrow pill, one headline. */
export function ogImage({ eyebrow, title, footer = site.url.replace(/^https?:\/\//, "") }: { eyebrow: string; title: string; footer?: string }) {
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
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse, not the browser */}
          <img src={mark} width={56} height={57} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>ZETA</div>
            <div style={{ fontSize: 17, letterSpacing: 3, color: "#d4d4d8" }}>Consulting</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex" }}>
            <div style={{ fontSize: 22, color: "#d4d4d8", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "8px 20px" }}>{eyebrow}</div>
          </div>
          <div style={{ fontSize: title.length > 60 ? 56 : 68, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 1040 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#a1a3ab" }}>
          <div>{footer}</div>
          <div>{site.email}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
