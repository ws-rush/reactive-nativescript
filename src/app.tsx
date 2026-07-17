import React, { useCallback, useState } from "react";
import { Trans, useLingui } from "@lingui/react/macro";
import IconHome from "~icons/vuesax-linear/home";
import IconHomeBold from "~icons/vuesax-bold/home";
import IconHeart from "~icons/vuesax-linear/heart";
import IconHeartBold from "~icons/vuesax-bold/heart";
import IconSettings from "~icons/vuesax-linear/settings";

type CurrentPageProps = {
  count: number;
  incrementCount: () => void;
  switchLabel: string;
  toggleLanguage: () => void;
};

const CurrentPage = ({ count, incrementCount, switchLabel, toggleLanguage }: CurrentPageProps) => {
  const { t } = useLingui();

  return (
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
  );
};

const AboutPage = () => {
  const { t } = useLingui();

  return (
    <ns-flexbox-layout className="font-ibm-plex-arabic font-normal flex-col items-center justify-center p-12">
      <IconHeartBold width={56} height={56} className="mb-[20] text-red-500" />
      <ns-label
        text={t`About`}
        className="font-ibm-plex-arabic-bold font-bold text-[36px] mb-[12]"
      />
      <ns-label
        text={t`This is the about page.`}
        textWrap="true"
        className="text-center text-[18px] text-gray-700"
      />
    </ns-flexbox-layout>
  );
};

const App = () => {
  const [count, setCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { i18n, t } = useLingui();
  const locale = i18n.locale === "ar" ? "ar" : "en";

  const incrementCount = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const toggleLanguage = useCallback(() => {
    const nextLocale = locale === "en" ? "ar" : "en";
    i18n.activate(nextLocale);
  }, [locale, i18n]);

  const showCurrentPage = useCallback(() => {
    setSelectedIndex(0);
  }, []);

  const showAboutPage = useCallback(() => {
    setSelectedIndex(1);
  }, []);

  const switchLabel = locale === "en" ? t`Switch to Arabic` : t`Switch to English`;
  const pageTitle = selectedIndex === 0 ? t`Current` : t`About`;

  return (
    <>
      <ns-action-bar title={pageTitle} className="font-ibm-plex-arabic-semibold font-semibold" />
      <ns-dock-layout stretchLastChild="true" className="font-ibm-plex-arabic font-normal">
        <ns-grid-layout
          dock="bottom"
          columns="*, *"
          height="76"
          backgroundColor="#ffffff"
          borderTopColor="#e5e7eb"
          borderTopWidth="1"
        >
          <ns-stack-layout col="0" onTap={showCurrentPage} padding="10">
            <IconHomeBold
              width={24}
              height={24}
              className={selectedIndex === 0 ? "text-blue-500" : "text-gray-500"}
            />
            <ns-label
              text={t`Current`}
              textAlignment="center"
              className={`font-ibm-plex-arabic-semibold font-semibold text-[13px] ${
                selectedIndex === 0 ? "text-blue-500" : "text-gray-500"
              }`}
            />
          </ns-stack-layout>

          <ns-stack-layout col="1" onTap={showAboutPage} padding="10">
            <IconHeartBold
              width={24}
              height={24}
              className={selectedIndex === 1 ? "text-blue-500" : "text-gray-500"}
            />
            <ns-label
              text={t`About`}
              textAlignment="center"
              className={`font-ibm-plex-arabic-semibold font-semibold text-[13px] ${
                selectedIndex === 1 ? "text-blue-500" : "text-gray-500"
              }`}
            />
          </ns-stack-layout>
        </ns-grid-layout>

        <ns-content-view>
          {selectedIndex === 0 ? (
            <CurrentPage
              count={count}
              incrementCount={incrementCount}
              switchLabel={switchLabel}
              toggleLanguage={toggleLanguage}
            />
          ) : (
            <AboutPage />
          )}
        </ns-content-view>
      </ns-dock-layout>
    </>
  );
};

export default App;
