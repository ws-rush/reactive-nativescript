import { Application } from "@nativescript/core";
import "./dom.js";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./appi";

// function AppWithCallbackAfterRender() {
//   React.useEffect(() => {
//     console.log("rendered");
//   });
//   return <App />;
// }

Application.run({
  //@ts-ignore
  create: () => {
    Object.defineProperty(global, "__DEV__", { value: false });
    const root = document.body;
    //@ts-ignore
    document.activeElement = root;
    let container = ReactDOM.createRoot(root);
    container.render(React.createElement(App));
    return document;
  },
});
