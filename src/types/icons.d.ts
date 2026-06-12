declare module "~icons/*" {
  import type { ComponentType } from "react";

  interface NsIconProps {
    width?: number | string;
    height?: number | string;
    stretch?: "none" | "fill" | "aspectFit" | "aspectFill";
    /** Tailwind text color class (e.g. "text-red-500") controls icon color */
    className?: string;
    style?: Record<string, unknown>;
  }

  const Icon: ComponentType<NsIconProps>;
  export default Icon;
}
