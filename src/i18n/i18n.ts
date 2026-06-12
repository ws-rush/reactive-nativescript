import { i18n } from "@lingui/core";
import { messages as enMessages } from "./locales/en/messages";
import { messages as arMessages } from "./locales/ar/messages";

i18n.load("en", enMessages as any);
i18n.load("ar", arMessages as any);
i18n.activate("en");

export { i18n };
