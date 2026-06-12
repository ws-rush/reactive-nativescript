import { document, aliasTagName, scope, registerElement } from "dominative";
import { SVGView } from "@nativescript-community/ui-svg";

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
