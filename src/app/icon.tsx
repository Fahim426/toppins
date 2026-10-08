import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Placeholder mark until the real logo icon is supplied (see ASSETS_NEEDED.md).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2B211D",
          color: "#F7F2EA",
          fontSize: 44,
          fontWeight: 800,
          borderRadius: 10,
        }}
      >
        T
      </div>
    ),
    size,
  );
}
