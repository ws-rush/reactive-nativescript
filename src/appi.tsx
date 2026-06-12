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
        className="flex-col items-center justify-center p-12"
      >
        <ns-label
          className="text-[50px] mb-[25px]"
        >
          <Trans>Count is {count}</Trans>
        </ns-label>
        {/* SVG icons from assets/icons */}
        <ns-flexbox-layout
          className="flex-row items-center justify-center mb-[16]"
        >
          <Icon name="home" width={32} height={32} className="mr-[12]" />
          <Icon name="home-bold" width={32} height={32} className="mr-[12]" />
          <Icon name="heart" width={32} height={32} className="mr-[12]" />
          <Icon name="heart-bold" width={32} height={32} className="mr-[12]" />
          <Icon name="settings" width={32} height={32} />
        </ns-flexbox-layout>
        <ns-button
          text={t`hello world`}
          onTap={incrementCount}
          className="h-[50] w-[250] bg-red-500 text-white rounded-full mb-[12]"
        />
        {/* Language switcher */}
        <ns-button
          text={switchLabel}
          onTap={toggleLanguage}
          className="h-[50] w-[250] bg-[#333] text-white rounded-full"
        />
      </ns-flexbox-layout>
    </>
  );
};

export default App;
