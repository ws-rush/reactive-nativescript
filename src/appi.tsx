import { Screen } from "@nativescript/core";
import React, { useEffect, useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      page: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      actionbar: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      flexboxlayout: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const App = () => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const callback = () => {
      setCount((count) => {
        return count + 1;
      });
    };
    ref.current?.addEventListener("onTap", callback);
    return () => {
      ref.current?.removeEventListener("onTap", callback);
    };
  }, [setCount]);

  return (
    <page
      style={{
        padding: 30,
      }}
    >
      <actionbar title="Hello" />
      <flexboxlayout
        style={{
          flexDirection: "column",
          padding: 12 * Screen.mainScreen.scale,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label
          style={{
            fontSize: 50,
            marginBottom: 25,
          }}
          text={`Count is ${count}`}
        />
        <button
          text="hello world"
          ref={ref}
          style={{
            height: 50 * Screen.mainScreen.scale,
            width: 250 * Screen.mainScreen.scale,
            backgroundColor: "red",
            color: "white",
            borderRadius: 100 * Screen.mainScreen.scale,
          }}
        />
      </flexboxlayout>
    </page>
  );
};

export default App;
