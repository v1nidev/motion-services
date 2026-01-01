/**
 * @monorepo/fonts
 *
 * Shared font package for React Native and web applications
 */

// Types and constants
export * from './types'

// React Native utilities
export { useAppFonts, GILROY_FONT_FAMILY, FONTS } from './react-native'

// Web utilities
export { generateFontFaces, injectFontFaces, GILROY_FONT_FAMILY as GILROY_FONT_FAMILY_WEB } from './web'
