import type { SVGProps } from "react";

export default function TikTokIcon({
  size = 18,
  strokeWidth = 1.75,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.6-2.82h-2.86v13.36a2.6 2.6 0 1 1-2.6-2.6c.24 0 .47.03.69.08V10.9a5.42 5.42 0 0 0-.69-.04A5.42 5.42 0 1 0 15 16.28V9.4a7.14 7.14 0 0 0 4 1.22V7.76a4.28 4.28 0 0 1-2.4-1.94Z" />
    </svg>
  );
}
