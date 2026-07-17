# React DOM-inative NativeScript

A local running implementation of [React + Dominative](https://github.com/nicedoc/dominative) for NativeScript, enabling React's DOM API to drive native UI components.

Based on the [NativeScript StackBlitz template](https://stackblitz.com/edit/nativescript-stackblitz-templates-zeazui?file=package.json,src%2Fappi.tsx), adapted for local development.

## How It Works

- **`dominative`** provides a lightweight DOM implementation backed by NativeScript native views
- **React DOM** (`react-dom/client`) renders into a `FlexboxLayout` root element as if it were a browser DOM node
- NativeScript view tags (`<page>`, `<flexboxlayout>`, `<label>`, `<button>`, etc.) are mapped via DOM aliases

### Key Files

| File                      | Purpose                                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/react-dom-bridge.js` | Bridges React DOM to NativeScript via `dominative`, including browser globals, NativeScript event names, tag aliases, and SVG color handling |
| `src/main.ts`             | Entry point — bootstraps React into a NativeScript `FlexboxLayout` root                                                                      |
| `src/appi.tsx`            | App component — example counter using React hooks + NativeScript views                                                                       |

## Prerequisites

- [Node.js](https://nodejs.org/)
- [NativeScript CLI](https://docs.nativescript.org/setup/)
- Android SDK (for Android builds)

## Setup

```bash
npm install
# or
pnpm install
```

## Run

```bash
# Android
npm run dev

# Build
npm run build
```

## Reference

- **StackBlitz template**: https://stackblitz.com/edit/nativescript-stackblitz-templates-zeazui?file=package.json,src%2Fappi.tsx
- **Dominative**: https://github.com/nicedoc/dominative
- **NativeScript**: https://nativescript.org/
