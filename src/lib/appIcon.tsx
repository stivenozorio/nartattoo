import { ImageResponse } from "next/og";

/**
 * Renders the NARTATTOO diamond monogram as a PWA/app icon using next/og.
 * `padding` (0-1) reserves safe-zone margin for maskable icons.
 */
export function renderAppIcon(size: number, padding = 0.08) {
  const inner = Math.round(size * (1 - padding * 2));

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
        }}
      >
        <div
          style={{
            width: inner,
            height: inner,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: inner * 0.22,
            background: "linear-gradient(135deg, #0e6fb8 0%, #00aeef 55%, #eaf9ff 100%)",
          }}
        >
          <div
            style={{
              width: inner * 0.86,
              height: inner * 0.86,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: inner * 0.18,
              background: "#050505",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: inner * 0.42,
                fontWeight: 700,
                letterSpacing: -2,
                color: "#00aeef",
                fontFamily: "sans-serif",
              }}
            >
              NT
            </div>
          </div>
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
