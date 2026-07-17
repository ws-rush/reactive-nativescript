import React, { useCallback, useState } from "react";
import { Trans, useLingui } from "@lingui/react/macro";
import IconHome from "~icons/vuesax-linear/home";
import IconHomeBold from "~icons/vuesax-bold/home";
import IconHeart from "~icons/vuesax-linear/heart";
import IconHeartBold from "~icons/vuesax-bold/heart";
import IconSettings from "~icons/vuesax-linear/settings";

const App = () => {
  const [count, setCount] = useState(0);
  const { i18n, t } = useLingui();
  const locale = i18n.locale === "ar" ? "ar" : "en";

  const incrementCount = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const toggleLanguage = useCallback(() => {
    const nextLocale = locale === "en" ? "ar" : "en";
    i18n.activate(nextLocale);
  }, [locale, i18n]);

  const switchLabel = locale === "en" ? t`Switch to Arabic` : t`Switch to English`;

  return (
    <>
      <ns-action-bar title={t`Hello`} className="font-ibm-plex-arabic-semibold font-semibold" />
      <ns-flexbox-layout className="font-ibm-plex-arabic font-normal flex-col items-center justify-center p-12">
        <ns-label className="font-ibm-plex-arabic-bold font-bold text-[50px] mb-[25px]">
          <Trans>Count is {count}</Trans>
        </ns-label>
        {/* SVG icons loaded via unplugin-icons */}
        <ns-flexbox-layout className="flex-row items-center justify-center mb-[16]">
          <IconHome width={32} height={32} className="mr-[12] text-gray-800" />
          <IconHomeBold width={32} height={32} className="mr-[12] text-blue-500" />
          <IconHeart width={32} height={32} className="mr-[12] text-red-500" />
          <IconHeartBold width={32} height={32} className="mr-[12] text-red-500" />
          <IconSettings width={32} height={32} className="text-gray-800" />
        </ns-flexbox-layout>
        <ns-flexbox-layout className="flex-col items-center mb-[16]">
          <ns-label text={t`Light`} className="font-ibm-plex-arabic-light font-light text-[18px]" />
          <ns-label text={t`Regular`} className="font-ibm-plex-arabic font-normal text-[18px]" />
          <ns-label
            text={t`Medium`}
            className="font-ibm-plex-arabic-medium font-medium text-[18px]"
          />
          <ns-label
            text={t`SemiBold`}
            className="font-ibm-plex-arabic-semibold font-semibold text-[18px]"
          />
          <ns-label text={t`Bold`} className="font-ibm-plex-arabic-bold font-bold text-[18px]" />
        </ns-flexbox-layout>
        <ns-button
          text={t`hello world`}
          onTap={incrementCount}
          className="font-ibm-plex-arabic-medium font-medium normal-case h-[50] w-[250] bg-red-500 text-white rounded-full mb-[12]"
        />
        {/* Language switcher */}
        <ns-button
          text={switchLabel}
          onTap={toggleLanguage}
          className="font-ibm-plex-arabic-semibold font-semibold normal-case h-[50] w-[250] bg-[#333] text-white rounded-full"
        />
      </ns-flexbox-layout>
    </>
  );
};

export default App;
