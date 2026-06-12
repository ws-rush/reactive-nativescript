import { Screen } from "@nativescript/core";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "./components/Icon";

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
    <>
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
        {/* SVG icons from assets/icons */}
        <flexboxlayout
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <Icon name="home" width={32} height={32} style={{ marginRight: 12 }} />
          <Icon name="home-bold" width={32} height={32} style={{ marginRight: 12 }} />
          <Icon name="heart" width={32} height={32} style={{ marginRight: 12 }} />
          <Icon name="heart-bold" width={32} height={32} style={{ marginRight: 12 }} />
          <Icon name="settings" width={32} height={32} />
        </flexboxlayout>
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
    </>
  );
};

export default App;
