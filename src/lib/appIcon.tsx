import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

let cachedDataUri: string | null = null;

/** Reads the real diamond-mark artwork once and caches it as a data URI for embedding in ImageResponse. */
function getMarkDataUri() {
  if (!cachedDataUri) {
    const file = readFileSync(join(process.cwd(), "public", "logo", "nartattoo-mark-icon.png"));
    cachedDataUri = `data:image/png;base64,${file.toString("base64")}`;
  }
  return cachedDataUri;
}

/**
 * Renders the real NARTATTOO diamond monogram as a PWA/app icon.
 * `padding` (0-1) reserves safe-zone margin for maskable icons.
 */
export function renderAppIcon(size: number, padding = 0.1) {
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={getMarkDataUri()} width={inner} height={inner} alt="" />
      </div>
    ),
    { width: size, height: size }
  );
}
