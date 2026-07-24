import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          backgroundImage:
            "radial-gradient(circle at 22% 28%, rgba(0,174,239,0.25), transparent 45%), radial-gradient(circle at 80% 75%, rgba(14,111,184,0.28), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 26,
            background: "linear-gradient(135deg, #0e6fb8 0%, #00aeef 55%, #eaf9ff 100%)",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 100,
              height: 100,
              borderRadius: 20,
              background: "#050505",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontWeight: 700,
              color: "#00aeef",
            }}
          >
            NT
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: 6,
            color: "#ffffff",
          }}
        >
          NARTATTOO
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 30,
            color: "#00aeef",
            letterSpacing: 2,
          }}
        >
          Tu piel. Tu historia. Una obra de arte.
        </div>
      </div>
    ),
    { ...size }
  );
}
