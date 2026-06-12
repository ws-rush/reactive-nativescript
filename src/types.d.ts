import * as React from "react";

type NativeScriptEventHandler = (event: any) => void;

type NativeScriptEventAttributes = {
  [eventName: `on${string}`]: NativeScriptEventHandler | undefined;
};

type NativeScriptHostProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> &
    NativeScriptEventAttributes &
    Record<string, any>,
  HTMLElement
>;

type SVGViewProps = NativeScriptHostProps & {
  src?: string;
  width?: number | string;
  height?: number | string;
  stretch?: "none" | "fill" | "aspectFit" | "aspectFill";
  color?: string;
};

declare module "react" {
  interface HTMLAttributes<T> {
    text?: string;
  }

  namespace JSX {
    interface IntrinsicElements {
      "ns-absolute-layout": NativeScriptHostProps;
      "ns-action-bar": NativeScriptHostProps;
      "ns-action-item": NativeScriptHostProps;
      "ns-activity-indicator": NativeScriptHostProps;
      "ns-button": NativeScriptHostProps;
      "ns-content-view": NativeScriptHostProps;
      "ns-date-picker": NativeScriptHostProps;
      "ns-dock-layout": NativeScriptHostProps;
      "ns-flexbox-layout": NativeScriptHostProps;
      "ns-formatted-string": NativeScriptHostProps;
      "ns-grid-layout": NativeScriptHostProps;
      "ns-html-view": NativeScriptHostProps;
      "ns-image": NativeScriptHostProps;
      "ns-label": NativeScriptHostProps;
      "ns-list-picker": NativeScriptHostProps;
      "ns-list-view": NativeScriptHostProps;
      "ns-navigation-button": NativeScriptHostProps;
      "ns-page": NativeScriptHostProps;
      "ns-placeholder": NativeScriptHostProps;
      "ns-progress": NativeScriptHostProps;
      "ns-proxy-view-container": NativeScriptHostProps;
      "ns-root-layout": NativeScriptHostProps;
      "ns-scroll-view": NativeScriptHostProps;
      "ns-search-bar": NativeScriptHostProps;
      "ns-segmented-bar": NativeScriptHostProps;
      "ns-segmented-bar-item": NativeScriptHostProps;
      "ns-slider": NativeScriptHostProps;
      "ns-span": NativeScriptHostProps;
      "ns-stack-layout": NativeScriptHostProps;
      "ns-svg-view": SVGViewProps;
      "ns-switch": NativeScriptHostProps;
      "ns-tab-view": NativeScriptHostProps;
      "ns-tab-view-item": NativeScriptHostProps;
      "ns-text-field": NativeScriptHostProps;
      "ns-text-view": NativeScriptHostProps;
      "ns-time-picker": NativeScriptHostProps;
      "ns-web-view": NativeScriptHostProps;
      "ns-wrap-layout": NativeScriptHostProps;
    }
  }
}
