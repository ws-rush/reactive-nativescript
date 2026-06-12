import { transformAsync } from "@babel/core";
import { defineNativescriptConfig } from "@gjsify/nativescript-vite";
import type { Plugin } from "vite";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

/**
 * Custom unplugin-icons compiler for NativeScript SVGView.
 *
 * 1. Normalizes all fill/stroke colors to `currentColor`
 * 2. Generates a plain React component
 * 3. Color is handled by the SVGView patch in dom.js — it reads CSS `color`
 *    (set by Tailwind classes like `text-red-500`) and replaces `currentColor`
 *    in the SVG at the NativeScript level.
 */

/**
 * Replace hardcoded colors in SVG with `currentColor`.
 * Preserves `fill="none"` and `stroke="none"`.
 */
function normalizeColors(svg: string): string {
  return svg
    .replace(/fill="(?!none")[^"]*"/gi, 'fill="currentColor"')
    .replace(/stroke="(?!none")[^"]*"/gi, 'stroke="currentColor"');
}

/** Escape a string for safe embedding inside a JS template literal. */
function escapeTemplateLiteral(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

/**
 * @param {string} svg - Raw SVG markup
 * @param {string} _collection
 * @param {string} _icon
 * @param {object} _options
 * @returns {string} ESM module source
 */
const compile = (
  svg: string,
  _collection: string,
  _icon: string,
  _options: Record<string, any>
): string => {
  const normalized = normalizeColors(svg);
  const escaped = escapeTemplateLiteral(normalized);

  return `\
import React from "react";

const src = \`${escaped}\`;

export default function NsIcon({ width = 24, height = 24, stretch = "aspectFit", className, style, ...rest }) {
  return React.createElement("ns-svg-view", { src, width, height, stretch, className, style, ...rest });
}
`;
}

export default defineNativescriptConfig({}, {
  plugins: [
    Icons({
      compiler: {
        compiler: compile,
        extension: ".jsx",
      },
      customCollections: {
        "vuesax-linear": FileSystemIconLoader(
          "./src/assets/icons/vuesax/linear",
        ),
        "vuesax-bold": FileSystemIconLoader(
          "./src/assets/icons/vuesax/bold",
        ),
      },
    }),
    nativeScriptAppBabel(),
  ],
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
