import { document, aliasTagName, scope, registerElement } from "dominative";
import { SVGView } from "@nativescript-community/ui-svg";

registerElement("svgview", SVGView);

aliasTagName((tag) => tag.toLowerCase());

if (!scope.HTMLIFrameElement) {
  scope.HTMLIFrameElement = function HTMLIFrameElement() {};
}

scope.document = document;
scope.location = scope.location || {
  protocol: "http:",
};

global.document = document;
global.navigator = {
  userAgent: "Chrome",
};

const windowShim = globalThis.window || {};

Object.assign(windowShim, {
  document: global.document,
  navigator: global.navigator,
  location: scope.location,
  Node: scope.Node,
  Element: scope.Element,
  HTMLElement: scope.HTMLElement,
  SVGElement: scope.SVGElement,
  Document: scope.Document,
  HTMLIFrameElement: scope.HTMLIFrameElement,
  addEventListener: windowShim.addEventListener || (() => {}),
  removeEventListener: windowShim.removeEventListener || (() => {}),
  dispatchEvent: windowShim.dispatchEvent || (() => true),
});

windowShim.self = windowShim;
windowShim.top = windowShim;

globalThis.window = windowShim;
