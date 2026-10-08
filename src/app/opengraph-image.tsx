import { ImageResponse } from "next/og";

export const alt = "Toppins Bake & Cafe. Bake the world a better place.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand card used until a real photo is supplied (see the og-image slot in src/data/images.ts).
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#2B211D",
          color: "#F7F2EA",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#E9C982",
            fontWeight: 700,
          }}
        >
          Bake • Cafe • Good times
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 148, fontWeight: 800, lineHeight: 1 }}>
            Toppins
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 8,
              fontSize: 30,
              letterSpacing: 8,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Bake &amp; Cafe
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(247,242,234,0.3)",
            paddingTop: 28,
            fontSize: 32,
          }}
        >
          <span>Bake the world a better place.</span>
          <span style={{ color: "#E9C982" }}>Perumbadappu, Kerala</span>
        </div>
      </div>
    ),
    size,
  );
}
