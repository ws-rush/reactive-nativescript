import { document, aliasTagName, scope, registerElement } from "dominative";
import { SVGView } from "@nativescript-community/ui-svg";

// --- Patch SVGView to apply CSS `color` to SVG `currentColor` ---
// SVGView renders SVG on a canvas, so CSS `color` has no effect on the SVG
// content. We monkey-patch handleSrc to replace `currentColor` with the
// resolved CSS color hex value, and listen for color property changes.

const _origHandleSrc = SVGView.prototype.handleSrc;

SVGView.prototype.handleSrc = function (value) {
  // Store the raw template (may be a string, Promise, function, etc.)
  this.__svgTemplate = value;

  if (typeof value === "string") {
    value = this.__applySvgColor(value);
  }

  return _origHandleSrc.call(this, value);
};

// Replace `currentColor` placeholders with the resolved CSS color
SVGView.prototype.__applySvgColor = function (svg) {
  if (typeof svg === "string" && svg.includes("currentColor") && this.color) {
    return svg.replace(/currentColor/g, this.color.hex);
  }
  return svg;
};

// Re-render SVG when CSS color changes
SVGView.prototype.__svgOnColorChanged = function () {
  const tpl = this.__svgTemplate;
  if (typeof tpl === "string" && tpl.includes("currentColor")) {
    const colored = this.__applySvgColor(tpl);
    _origHandleSrc.call(this, colored);
  }
};

// Hook into NativeScript view lifecycle
const _origOnLoaded = SVGView.prototype.onLoaded;
SVGView.prototype.onLoaded = function () {
  _origOnLoaded.call(this);
  // Apply any CSS color that resolved before loaded
  this.__svgOnColorChanged();
  // Listen for future color changes (dynamic className, etc.)
  this.on("propertyChange", this.__svgColorPropHandler);
};

const _origOnUnloaded = SVGView.prototype.onUnloaded;
SVGView.prototype.onUnloaded = function () {
  this.off("propertyChange", this.__svgColorPropHandler);
  _origOnUnloaded.call(this);
};

SVGView.prototype.__svgColorPropHandler = function (args) {
  if (args.propertyName === "color") {
    this.__svgOnColorChanged();
  }
};

registerElement("SVGView", SVGView);

// document.defaultView includes DOM primitives and Dominative virtual helpers,
// not only renderable NativeScript views. Do not patch those base classes.
const ignoredElementNames = new Set([
  "Event",
  "EventTarget",
  "Node",
  "CharacterData",
  "Text",
  "Comment",
  "ParentNode",
  "DocumentFragment",
  "Element",
  "HTMLElement",
  "SVGElement",
  "Document",
  "Prop",
  "KeyProp",
  "ArrayProp",
  "ItemTemplate",
]);

const toKebabCase = (name) =>
  name
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();

// React forwards unknown custom-element events without normalizing NativeScript
// casing. For example: onTextChange -> addEventListener("TextChange"), while
// NativeScript expects "textChange".
const normalizeNativeScriptEventName = (eventName) => {
  if (typeof eventName !== "string" || eventName.length === 0) {
    return eventName;
  }

  const normalizedEventName =
    eventName.startsWith("on") && eventName.length > 2
      ? eventName.slice(2)
      : eventName;

  return normalizedEventName[0].toLowerCase() + normalizedEventName.slice(1);
};

const isNativeScriptElement = (elementName, Element) =>
  /^[A-Z]/.test(elementName) &&
  !ignoredElementNames.has(elementName) &&
  typeof Element === "function" &&
  Element.prototype &&
  typeof Element.prototype.addEventListener === "function" &&
  typeof Element.prototype.removeEventListener === "function";

// Patch real NativeScript element classes once so every listener registered by
// React custom elements is directed to the NativeScript event on that instance.
const patchNativeScriptEvents = (Element) => {
  const prototype = Element.prototype;

  if (prototype.__reactNativeScriptEventsPatched) {
    return;
  }

  const addEventListener = prototype.addEventListener;
  const removeEventListener = prototype.removeEventListener;

  prototype.addEventListener = function (eventName, ...args) {
    return addEventListener.call(
      this,
      normalizeNativeScriptEventName(eventName),
      ...args
    );
  };

  prototype.removeEventListener = function (eventName, ...args) {
    return removeEventListener.call(
      this,
      normalizeNativeScriptEventName(eventName),
      ...args
    );
  };

  Object.defineProperty(prototype, "__reactNativeScriptEventsPatched", {
    value: true,
  });
};

for (const [elementName, Element] of Object.entries(document.defaultView)) {
  if (!isNativeScriptElement(elementName, Element)) {
    continue;
  }

  patchNativeScriptEvents(Element);
}

// Expose NativeScript classes as dashed custom-element tags:
// Button -> ns-button, FlexboxLayout -> ns-flexbox-layout.
// React forwards arbitrary on* props only for dashed custom-element tags.
aliasTagName((tag) => `ns-${toKebabCase(tag)}`);

if (!scope.HTMLIFrameElement) {
  scope.HTMLIFrameElement = function HTMLIFrameElement() { };
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
  addEventListener: windowShim.addEventListener || (() => { }),
  removeEventListener: windowShim.removeEventListener || (() => { }),
  dispatchEvent: windowShim.dispatchEvent || (() => true),
});

windowShim.self = windowShim;
windowShim.top = windowShim;

globalThis.window = windowShim;
