import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const file = readFileSync(join(process.cwd(), "public", "logo", "nartattoo-lockup-og.png"));
  const dataUri = `data:image/png;base64,${file.toString("base64")}`;

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
            "radial-gradient(circle at 22% 28%, rgba(0,174,239,0.22), transparent 45%), radial-gradient(circle at 80% 75%, rgba(14,111,184,0.25), transparent 50%)",
        }}
      >
        <img src={dataUri} width={680} height={481} style={{ objectFit: "contain" }} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 8,
            fontSize: 28,
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
