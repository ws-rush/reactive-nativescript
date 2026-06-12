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
    }
  }
}
