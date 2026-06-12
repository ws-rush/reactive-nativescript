import { Screen } from "@nativescript/core";
import React, { useCallback, useState } from "react";
import { Trans, useLingui } from "@lingui/react/macro";
import { Icon } from "./components/Icon";

type Locale = "en" | "ar";

const App = () => {
  const [count, setCount] = useState(0);
  const { i18n, t } = useLingui();
  const locale = i18n.locale === "ar" ? "ar" : "en"

  const incrementCount = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const toggleLanguage = useCallback(() => {
    const nextLocale = locale === "en" ? "ar" : "en";
    i18n.activate(nextLocale);
  }, [locale, i18n]);

  const switchLabel =
    locale === "en"
      ? t`Switch to Arabic`
      : t`Switch to English`;

  return (
    <>
      <ns-action-bar title={t`Hello`} />
      <ns-flexbox-layout
        style={{
          flexDirection: "column",
          padding: 12 * Screen.mainScreen.scale,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ns-label
          style={{
            fontSize: 50,
            marginBottom: 25,
          }}
        >
          <Trans>Count is {count}</Trans>
        </ns-label>
        {/* SVG icons from assets/icons */}
        <ns-flexbox-layout
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
        </ns-flexbox-layout>
        <ns-button
          text={t`hello world`}
          onTap={incrementCount}
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
        <ns-button
          text={switchLabel}
          onTap={toggleLanguage}
          style={{
            height: 50 * Screen.mainScreen.scale,
            width: 250 * Screen.mainScreen.scale,
            backgroundColor: "#333",
            color: "white",
            borderRadius: 100 * Screen.mainScreen.scale,
          }}
        />
      </ns-flexbox-layout>
    </>
  );
};

export default App;
