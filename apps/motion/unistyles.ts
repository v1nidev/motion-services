import { StyleSheet } from 'react-native-unistyles'

// Define themes based on existing Colors from constants/theme.ts
const lightTheme = {
  colors: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
  },
}

const appThemes = {
  light: lightTheme,
  // dark: darkTheme,
}

// Optional: Define breakpoints for responsive design
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

// TypeScript types for autocomplete and type safety
type AppThemes = typeof appThemes
type AppBreakpoints = typeof breakpoints

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

// Configure Unistyles
StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings: {
    initialTheme: 'light', // Will be overridden by system preference if available
  },
})
