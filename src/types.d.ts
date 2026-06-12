import * as React from "react";

declare module "react" {
  interface HTMLAttributes<T> {
    text?: string;
  }

  namespace JSX {
    interface IntrinsicElements {
      page: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      actionbar: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { title?: string },
        HTMLElement
      >;
      flexboxlayout: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      svgview: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          width?: number | string;
          height?: number | string;
          stretch?: "none" | "fill" | "aspectFit" | "aspectFill";
          color?: string;
        },
        HTMLElement
      >;
    }
  }
}
