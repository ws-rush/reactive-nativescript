import { Screen } from "@nativescript/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Trans, useLingui } from "@lingui/react/macro";
import { Icon } from "./components/Icon";

type Locale = "en" | "ar";

const App = () => {
  const [count, setCount] = useState(0);
  const countBtnRef = useRef<HTMLButtonElement>(null);
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const { i18n, t } = useLingui();
  console.log(i18n, 'i18n')
  const locale = i18n.locale === "ar" ? "ar" : "en"

  const toggleLanguage = useCallback(() => {
    const nextLocale = locale === "en" ? "ar" : "en";
    i18n.activate(nextLocale);
  }, [locale, i18n]);

  useEffect(() => {
    const onCountTap = () => {
      setCount((c) => c + 1);
    };
    const countBtn = countBtnRef.current;
    const langBtn = langBtnRef.current;

    if (countBtn) {
      countBtn.addEventListener("onTap", onCountTap);
    }
    if (langBtn) {
      langBtn.addEventListener("onTap", toggleLanguage);
    }

    return () => {
      if (countBtn) countBtn.removeEventListener("onTap", onCountTap);
      if (langBtn) langBtn.removeEventListener("onTap", toggleLanguage);
    };
  }, [toggleLanguage]);

  const switchLabel =
    locale === "en"
      ? t`Switch to Arabic`
      : t`Switch to English`;

  return (
    <>
      <actionbar title={t`Hello`} />
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
        >
          <Trans>Count is {count}</Trans>
        </label>
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
          text={t`hello world`}
          ref={countBtnRef}
          style={{
            height: 50 * Screen.mainScreen.scale,
            width: 250 * Screen.mainScreen.scale,
            backgroundColor: "red",
            color: "white",
            borderRadius: 100 * Screen.mainScreen.scale,
            marginBottom: 12,
          }}
        />
        {/* Language switcher */}
        <button
          text={switchLabel}
          ref={langBtnRef}
          style={{
            height: 50 * Screen.mainScreen.scale,
            width: 250 * Screen.mainScreen.scale,
            backgroundColor: "#333",
            color: "white",
            borderRadius: 100 * Screen.mainScreen.scale,
          }}
        />
      </flexboxlayout>
    </>
  );
};

export default App;
