import { useFonts } from 'expo-font'

import { FONT_FAMILIES } from './types'

/**
 * Font file paths for React Native (expo-font)
 * These paths are relative to the package root
 */
const GILROY_FONTS = {
  'Gilroy-UltraLight': require('../fonts/Gilroy/Gilroy-UltraLight.ttf'),
  'Gilroy-UltraLightItalic': require('../fonts/Gilroy/Gilroy-UltraLightItalic.ttf'),
  'Gilroy-Thin': require('../fonts/Gilroy/Gilroy-Thin.ttf'),
  'Gilroy-ThinItalic': require('../fonts/Gilroy/Gilroy-ThinItalic.ttf'),
  'Gilroy-Light': require('../fonts/Gilroy/Gilroy-Light.ttf'),
  'Gilroy-LightItalic': require('../fonts/Gilroy/Gilroy-LightItalic.ttf'),
  'Gilroy-Regular': require('../fonts/Gilroy/Gilroy-Regular.ttf'),
  'Gilroy-RegularItalic': require('../fonts/Gilroy/Gilroy-RegularItalic.ttf'),
  'Gilroy-Medium': require('../fonts/Gilroy/Gilroy-Medium.ttf'),
  'Gilroy-MediumItalic': require('../fonts/Gilroy/Gilroy-MediumItalic.ttf'),
  'Gilroy-SemiBold': require('../fonts/Gilroy/Gilroy-SemiBold.ttf'),
  'Gilroy-SemiBoldItalic': require('../fonts/Gilroy/Gilroy-SemiBoldItalic.ttf'),
  'Gilroy-Bold': require('../fonts/Gilroy/Gilroy-Bold.ttf'),
  'Gilroy-BoldItalic': require('../fonts/Gilroy/Gilroy-BoldItalic.ttf'),
  'Gilroy-ExtraBold': require('../fonts/Gilroy/Gilroy-ExtraBold.ttf'),
  'Gilroy-ExtraBoldItalic': require('../fonts/Gilroy/Gilroy-ExtraBoldItalic.ttf'),
  'Gilroy-Heavy': require('../fonts/Gilroy/Gilroy-Heavy.ttf'),
  'Gilroy-HeavyItalic': require('../fonts/Gilroy/Gilroy-HeavyItalic.ttf'),
} as const

/**
 * All fonts available for loading
 */
export const FONTS = {
  ...GILROY_FONTS,
} as const

/**
 * Hook to load all fonts in React Native
 * @returns [fontsLoaded, error] - fontsLoaded is true when fonts are ready
 * @example
 * ```tsx
 * const [fontsLoaded, fontError] = useAppFonts()
 * if (!fontsLoaded && !fontError) {
 *   return <LoadingScreen />
 * }
 * ```
 */
export function useAppFonts() {
  return useFonts(FONTS)
}

/**
 * Font family name constant for use in styles
 */
export const GILROY_FONT_FAMILY = FONT_FAMILIES.GILROY
