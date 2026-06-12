import React from "react";
import type { IconName } from "../assets/icons/icon-registry";

export interface IconProps {
  /** Icon name from the registry, e.g. "home", "home-bold" */
  name: IconName;
  /** Width in device-independent pixels */
  width?: number | string;
  /** Height in device-independent pixels */
  height?: number | string;
  /** Stretch mode */
  stretch?: "none" | "fill" | "aspectFit" | "aspectFill";
  /** Additional style */
  style?: React.CSSProperties;
  /** Tailwind or CSS class name */
  className?: string;
}

/**
 * Resolves an icon name to its SVG file path.
 *
 * Naming convention:
 *   - "home"       → vuesax/linear/home.svg
 *   - "home-bold"  → vuesax/bold/home.svg
 */
function resolveIconPath(name: IconName): string {
  let folder: string;
  let fileName: string;

  if (name.endsWith("-bold")) {
    folder = "bold";
    fileName = name.slice(0, -5); // strip "-bold"
  } else {
    folder = "linear";
    fileName = name;
  }

  return `~/assets/icons/vuesax/${folder}/${fileName}.svg`;
}

export function Icon({
  name,
  width = 24,
  height = 24,
  stretch = "aspectFit",
  style,
  className,
}: IconProps) {
  const src = resolveIconPath(name);

  return (
    <ns-svg-view
      src={src}
      width={width}
      height={height}
      stretch={stretch}
      style={style}
      className={className}
    />
  );
}
