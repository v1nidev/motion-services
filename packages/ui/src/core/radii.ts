/**
 * Border radius values based on the design system mockups
 */
export const radii = {
  /** 4px - Very small radius for badges and tags */
  xs: 4,
  /** 8px - Extra small radius for small UI elements */
  sm: 8,
  /** 12px - Small radius for buttons and input fields */
  md: 12,
  /** 16px - Medium radius for cards and containers */
  lg: 16,
  /** 24px - Large radius for prominent cards */
  xl: 24,
  /** 32px - Extra large radius for main content areas */
  '2xl': 32,
  /** 40px - 2X extra large radius for screen containers */
  '3xl': 40,
  /** Full/circular radius (50%) - Use with StyleSheet for percentage-based */
  full: 9999,
} as const

/**
 * Semantic radius values mapped to specific UI components
 * Based on the design system mockups
 */
// export const semantic = {
//   /** Screen-level containers and main content wrappers */
//   container: radii['3xl'],
//   /** Cards like nutrition cards, meal cards, workout cards */
//   card: radii.xl,
//   /** Small cards and stat containers */
//   cardSm: radii.lg,
//   /** Medium-sized buttons (Start Workout, navigation buttons) */
//   buttonMd: radii.md,
//   /** Large prominent buttons */
//   buttonLg: radii.lg,
//   /** Circular buttons and icon buttons */
//   buttonCircle: radii.full,
//   /** Medium input fields */
//   inputMd: radii.md,
//   /** Large input fields */
//   inputLg: radii.lg,
//   /** Badges and tags */
//   badge: radii.sm,
//   /** Avatar/profile images */
//   avatar: radii.full,
//   /** Widget containers (Today's Goals, Activity Summary) */
//   widget: radii['2xl'],
//   /** Chart containers and data visualization cards */
//   chart: radii.lg,
//   /** List item containers */
//   listItem: radii.md,
// } as const
