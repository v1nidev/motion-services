import { FONT_FAMILIES, FONT_WEIGHTS, FontWeight } from './types'

/**
 * Generate @font-face CSS declarations for web
 * @param fontFamily - The font family name
 * @param basePath - Base path to font files (default: relative to package)
 * @returns CSS string with @font-face declarations
 */
export function generateFontFaces(
  fontFamily: string = FONT_FAMILIES.GILROY,
  basePath: string = '/fonts/Gilroy',
): string {
  const fontFaces: string[] = []

  // Generate font faces for each weight and style combination
  const weights: Array<{ name: FontWeight; value: number }> = [
    { name: 'UltraLight', value: FONT_WEIGHTS.UltraLight },
    { name: 'Thin', value: FONT_WEIGHTS.Thin },
    { name: 'Light', value: FONT_WEIGHTS.Light },
    { name: 'Regular', value: FONT_WEIGHTS.Regular },
    { name: 'Medium', value: FONT_WEIGHTS.Medium },
    { name: 'SemiBold', value: FONT_WEIGHTS.SemiBold },
    { name: 'Bold', value: FONT_WEIGHTS.Bold },
    { name: 'ExtraBold', value: FONT_WEIGHTS.ExtraBold },
    { name: 'Heavy', value: FONT_WEIGHTS.Heavy },
  ]

  weights.forEach(({ name, value }) => {
    // Regular (normal) style
    fontFaces.push(`
@font-face {
  font-family: '${fontFamily}';
  src: url('${basePath}/Gilroy-${name}.ttf') format('truetype');
  font-weight: ${value};
  font-style: normal;
  font-display: swap;
}`)

    // Italic style
    fontFaces.push(`
@font-face {
  font-family: '${fontFamily}';
  src: url('${basePath}/Gilroy-${name}Italic.ttf') format('truetype');
  font-weight: ${value};
  font-style: italic;
  font-display: swap;
}`)
  })

  return fontFaces.join('\n')
}

/**
 * Get the CSS @font-face declarations for Gilroy font
 * @param basePath - Base path to font files (default: relative path)
 * @returns CSS string
 */
export function getGilroyFontFaces(basePath: string = '/fonts/Gilroy'): string {
  return generateFontFaces(FONT_FAMILIES.GILROY, basePath)
}

/**
 * Font family name constant for use in CSS
 */
export const GILROY_FONT_FAMILY = FONT_FAMILIES.GILROY

/**
 * Inject font faces into the document
 * Useful for frameworks that don't have a global CSS file
 * @param fontFaces - CSS string with @font-face declarations
 */
export function injectFontFaces(fontFaces: string): void {
  if (typeof document === 'undefined') {
    return
  }

  const styleId = 'monorepo-fonts'
  let styleElement = document.getElementById(styleId) as HTMLStyleElement

  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = styleId
    document.head.appendChild(styleElement)
  }

  styleElement.textContent = fontFaces
}
