import { transformAsync } from "@babel/core";
import { defineNativescriptConfig } from "@gjsify/nativescript-vite";
import type { Plugin } from "vite";

export default defineNativescriptConfig({}, {
  plugins: [nativeScriptAppBabel()],
});

function nativeScriptAppBabel(): Plugin {
  return {
    name: "nativescript-app-babel",
    enforce: "pre",
    async transform(code, id) {
      const normalizedId = id.replace(/\\/g, "/");
      const cleanId = normalizedId.split("?")[0];

      if (isMessageFormatParserModule(cleanId)) {
        return transformUnicodePropertyRegex(code, id);
      }

      if (!shouldTransformSourceModule(normalizedId, code)) {
        return null;
      }

      const result = await transformAsync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        sourceMaps: true,
        presets: [
          [
            "@babel/preset-typescript",
            {
              allExtensions: true,
              isTSX: normalizedId.endsWith(".tsx") || normalizedId.endsWith(".jsx"),
            },
          ],
          ["@babel/preset-react", { runtime: "classic" }],
        ],
        plugins: code.includes("@lingui/react/macro") ? ["macros"] : [],
      });

      return result?.code
        ? { code: result.code, map: result.map ?? null }
        : null;
    },
  };
}

function isSourceModule(id: string) {
  return /\.(?:[cm]?[jt]sx?)$/.test(id) && !id.includes("/node_modules/");
}

function shouldTransformSourceModule(id: string, code: string) {
  return isSourceModule(id) && (/\.[cm]?[jt]sx$/.test(id) || code.includes("@lingui/react/macro"));
}

function isMessageFormatParserModule(id: string) {
  return id.endsWith(".js") && id.includes("/node_modules/") && id.includes("@messageformat/parser/");
}

async function transformUnicodePropertyRegex(code: string, filename: string) {
  const result = await transformAsync(code, {
    filename,
    babelrc: false,
    configFile: false,
    sourceMaps: true,
    plugins: ["@babel/plugin-transform-unicode-property-regex"],
  });

  return result?.code
    ? { code: result.code, map: result.map ?? null }
    : null;
}
