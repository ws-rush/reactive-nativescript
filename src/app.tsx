import { Application } from "@nativescript/core";
import "./dom.js";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { I18nProvider } from "@lingui/react";
import { i18n } from "./i18n/i18n";
import App from "./appi";

Application.run({
  //@ts-ignore
  create: () => {
    Object.defineProperty(global, "__DEV__", { value: false });
    const root = document.body;
    //@ts-ignore
    document.activeElement = root;
    let container = ReactDOM.createRoot(root);
    container.render(
      React.createElement(
        I18nProvider,
        { i18n },
        React.createElement(App)
      )
    );
    return document;
  },
});
