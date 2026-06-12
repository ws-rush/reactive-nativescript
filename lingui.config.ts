import type { LinguiConfig } from "@lingui/conf";
import { formatter } from "@lingui/format-po";

const config: LinguiConfig = {
  sourceLocale: "en",
  locales: ["en", "ar"],
  catalogs: [
    {
      path: "<rootDir>/src/i18n/locales/{locale}/messages",
      include: ["src/"],
    },
  ],
  format: formatter({ lineNumbers: false, explicitIdAsDefault: true }),
};

export default config;
