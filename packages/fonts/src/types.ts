/**
 * Font family names available in the package
 */
export const FONT_FAMILIES = {
  GILROY: 'Gilroy',
} as const

export type FontFamily = (typeof FONT_FAMILIES)[keyof typeof FONT_FAMILIES]

/**
 * Font weight names mapped to numeric values
 */
export const FONT_WEIGHTS = {
  UltraLight: 100,
  Thin: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Heavy: 900,
} as const

export type FontWeight = keyof typeof FONT_WEIGHTS

/**
 * Font style variants
 */
export const FONT_STYLES = {
  normal: 'normal',
  italic: 'italic',
} as const

export type FontStyle = keyof typeof FONT_STYLES
