import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#18181b",
          color: "#fafafa",
          display: "flex",
          fontFamily: "system-ui, sans-serif",
          fontSize: 68,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        SD
      </div>
    ),
    size,
  );
}
