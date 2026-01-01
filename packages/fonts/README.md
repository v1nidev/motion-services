# @monorepo/fonts

Shared font package for React Native and web applications in the monorepo.

## Fonts Available

- **Gilroy** - Complete font family with all weights (UltraLight through Heavy) and italic variants

## Installation

The package is already available in the monorepo. For external projects, install via:

```bash
pnpm add @monorepo/fonts
```

## Usage

### React Native (Expo) - Recommended: Config Plugin

The recommended approach uses the `expo-font` config plugin to embed fonts in your native app. This enables CSS-like syntax where `fontWeight` works directly with the font family.

#### 1. Add the config plugin to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": [
            "./packages/fonts/fonts/Gilroy/Gilroy-UltraLight.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-UltraLightItalic.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-Thin.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-ThinItalic.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-Light.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-LightItalic.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-Regular.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-RegularItalic.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-Medium.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-MediumItalic.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-SemiBold.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-SemiBoldItalic.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-Bold.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-BoldItalic.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-ExtraBold.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-ExtraBoldItalic.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-Heavy.ttf",
            "./packages/fonts/fonts/Gilroy/Gilroy-HeavyItalic.ttf"
          ],
          "android": {
            "fonts": [
              {
                "fontFamily": "Gilroy",
                "fontDefinitions": [
                  {
                    "path": "./packages/fonts/fonts/Gilroy/Gilroy-UltraLight.ttf",
                    "weight": 100,
                    "style": "normal"
                  },
                  {
                    "path": "./packages/fonts/fonts/Gilroy/Gilroy-UltraLightItalic.ttf",
                    "weight": 100,
                    "style": "italic"
                  }
                  // ... (see app.json for full configuration)
                ]
              }
            ]
          },
          "ios": {
            "fonts": [
              "./packages/fonts/fonts/Gilroy/Gilroy-UltraLight.ttf",
              "./packages/fonts/fonts/Gilroy/Gilroy-UltraLightItalic.ttf"
              // ... (all font files)
            ]
          }
        }
      ]
    ]
  }
}
```

#### 2. Create a new development build:

```bash
npx expo prebuild
# or
npx expo run:ios
npx expo run:android
```

#### 3. Use CSS-like syntax in your styles:

```tsx
import { GILROY_FONT_FAMILY } from '@monorepo/fonts'

const styles = StyleSheet.create({
  title: {
    fontFamily: GILROY_FONT_FAMILY,
    fontWeight: 'bold', // or 700, '700', etc.
    fontSize: 24,
  },
  subtitle: {
    fontFamily: GILROY_FONT_FAMILY,
    fontWeight: '200', // Thin
    fontSize: 18,
  },
  italic: {
    fontFamily: GILROY_FONT_FAMILY,
    fontWeight: '600',
    fontStyle: 'italic', // SemiBold Italic
  },
})
```

**Benefits:**

- ✅ CSS-like syntax - no helper functions needed
- ✅ Fonts available immediately (embedded in native code)
- ✅ Works with all React Native fontWeight values
- ✅ Supports `fontStyle: 'italic'`

### React Native (Expo) - Alternative: Runtime Loading

If you prefer runtime loading (works with Expo Go), use the `useFonts` hook:

```tsx
import { useAppFonts } from '@monorepo/fonts'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontError] = useAppFonts()

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    // Your app content
  )
}
```

**Note:** With runtime loading, you must use the specific font family names (e.g., `'Gilroy-Bold'`, `'Gilroy-Thin'`) directly in your styles. The `fontWeight` prop will not work without the config plugin. For example:

```tsx
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Gilroy-Bold', // Must use specific font name
    fontSize: 24,
  },
})
```

### Web Applications

#### Option 1: CSS File (Recommended for Next.js, Vite, etc.)

1. Generate the CSS and include it in your global CSS file:

```css
/* globals.css or fonts.css */
@import '@monorepo/fonts/web';

/* Or generate manually: */
@font-face {
  font-family: 'Gilroy';
  src: url('/fonts/Gilroy/Gilroy-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
/* ... more @font-face declarations */
```

2. Copy font files to your public directory:

```bash
# For Next.js
cp -r packages/fonts/fonts public/

# For Vite
cp -r packages/fonts/fonts public/
```

3. Use in your CSS:

```css
body {
  font-family: 'Gilroy', sans-serif;
}
```

#### Option 2: JavaScript/TypeScript (For dynamic loading)

```tsx
import { getGilroyFontFaces, injectFontFaces } from '@monorepo/fonts'
// Or with custom path
import { generateFontFaces } from '@monorepo/fonts'

// In your app initialization
useEffect(() => {
  const fontFaces = getGilroyFontFaces('/fonts/Gilroy')
  injectFontFaces(fontFaces)
}, [])

const fontFaces = generateFontFaces('Gilroy', '/custom/path/to/fonts')
injectFontFaces(fontFaces)
```

#### Option 3: Framework-specific

**Next.js with `app` directory:**

```tsx
// app/layout.tsx
import { getGilroyFontFaces } from '@monorepo/fonts'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: getGilroyFontFaces('/fonts/Gilroy') }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Vite/React:**

```tsx
// main.tsx or App.tsx
import { getGilroyFontFaces, injectFontFaces } from '@monorepo/fonts'

injectFontFaces(getGilroyFontFaces('/fonts/Gilroy'))
```

## Font Weights

The following font weights are available:

- `100` - UltraLight
- `200` - Thin
- `300` - Light
- `400` - Regular
- `500` - Medium
- `600` - SemiBold
- `700` - Bold
- `800` - ExtraBold
- `900` - Heavy

Each weight has both normal and italic variants.

## TypeScript

The package includes TypeScript definitions:

```tsx
import { FONT_FAMILIES, FontFamily, FontWeight } from '@monorepo/fonts'

const family: FontFamily = FONT_FAMILIES.GILROY
const weight: FontWeight = 'Bold'
```

## Package Structure

```
packages/fonts/
├── fonts/
│   └── Gilroy/
│       ├── Gilroy-Regular.ttf
│       ├── Gilroy-Bold.ttf
│       └── ... (all variants)
├── src/
│   ├── index.ts          # Main exports
│   ├── types.ts          # TypeScript definitions
│   ├── react-native.ts   # React Native utilities (useAppFonts hook)
│   └── web.ts            # Web utilities
└── package.json
```

## Exports

The package exports the following:

- `GILROY_FONT_FAMILY` - Font family name constant (`'Gilroy'`)
- `FONT_FAMILIES` - Font family constants
- `FONT_WEIGHTS` - Font weight constants
- `useAppFonts()` - Hook for runtime font loading (React Native)
- `FONTS` - Font file mappings for runtime loading
- `generateFontFaces()` - Generate CSS @font-face declarations (web)
- `getGilroyFontFaces()` - Get pre-configured font faces (web)
- `injectFontFaces()` - Inject font faces into document (web)

## Adding New Fonts

1. Add TTF files to `fonts/[FontFamilyName]/` directory
2. Update `src/types.ts` to include the new font family
3. Update `src/react-native.ts` to include font requires
4. Update `src/web.ts` if the font has a different structure
5. Update this README
