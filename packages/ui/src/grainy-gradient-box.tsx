import React from 'react'

import { DimensionValue, StyleSheet, View, ViewStyle } from 'react-native'

import { colors } from './core/colors'

// Generate SVG noise pattern as data URI
// Based on: https://css-tricks.com/grainy-gradients/
const generateNoiseSVG = () => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" opacity="1" />
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export interface GrainyGradientBoxProps {
  /**
   * Starting color of the gradient (HSL format)
   */
  colorStart: string
  /**
   * Ending color of the gradient (HSL format)
   */
  colorEnd: string
  /**
   * Gradient direction: 'horizontal', 'vertical', 'diagonal'
   */
  direction?: 'horizontal' | 'vertical' | 'diagonal'
  /**
   * Noise opacity (0-1)
   */
  noiseOpacity?: number
  /**
   * Width of the box
   */
  width?: DimensionValue
  /**
   * Height of the box
   */
  height?: DimensionValue
  /**
   * Border radius
   */
  borderRadius?: number
  /**
   * Additional styles
   */
  style?: ViewStyle
  /**
   * Children to render inside the box
   */
  children?: React.ReactNode
}

export function GrainyGradientBox({
  colorStart,
  colorEnd,
  direction = 'vertical',
  noiseOpacity = 0.15,
  width = 200,
  height = 200,
  borderRadius = 16,
  style,
  children,
}: GrainyGradientBoxProps) {
  const noiseSVG = generateNoiseSVG()

  // Create gradient background based on direction
  // Based on CSS Tricks article: layer noise on top of gradient
  const getGradientStyle = (): ViewStyle => {
    if (typeof window !== 'undefined' && 'document' in window) {
      // Web-specific gradient using CSS
      let gradientDirection = 'to bottom'
      if (direction === 'horizontal') gradientDirection = 'to right'
      if (direction === 'diagonal') gradientDirection = 'to bottom right'

      // Calculate grain intensity
      // Higher opacity = more stark grain
      const contrast = 100 + noiseOpacity * 120
      const brightness = 100 + noiseOpacity * 5

      return {
        // Layer order: noise first (top), gradient second (bottom)
        backgroundImage: `url("${noiseSVG}"), linear-gradient(${gradientDirection}, ${colorStart}, ${colorEnd})`,
        // Use overlay to blend noise into the colors
        backgroundBlendMode: 'overlay',
        // Ensure noise tiles seamlessly, but gradient covers exactly 100%
        backgroundRepeat: 'repeat, no-repeat',
        // Fix background size: noise is a fixed pattern, gradient is full container
        backgroundSize: '200px 200px, 100% 100%',
        // Boost contrast specifically for the noise effect
        filter: `contrast(${contrast}%) brightness(${brightness}%)`,
      } as ViewStyle
    }
    return {}
  }

  const isWeb = typeof window !== 'undefined' && 'document' in window

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: isWeb ? 'transparent' : colorStart,
        },
        getGradientStyle(),
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

// Preset variants using the color palette
export const GrainyGradientPresets = {
  coralSunset: {
    colorStart: colors.coral['500'],
    colorEnd: colors.papaya['500'],
    direction: 'diagonal' as const,
  },
  darkNight: {
    colorStart: colors.black['100'],
    colorEnd: colors.black['500'],
    direction: 'vertical' as const,
  },
  warmEarth: {
    colorStart: colors.beige['300'],
    colorEnd: colors.beige['600'],
    direction: 'horizontal' as const,
  },
  coralFade: {
    colorStart: colors.coral['300'],
    colorEnd: colors.coral['700'],
    direction: 'vertical' as const,
  },
  lightGlow: {
    colorStart: colors.papaya['400'],
    colorEnd: colors.floral['500'],
    direction: 'diagonal' as const,
  },
  midnight: {
    colorStart: colors.black['050'],
    colorEnd: colors.black['400'],
    direction: 'diagonal' as const,
  },
  coralBeige: {
    colorStart: colors.coral['400'],
    colorEnd: colors.beige['500'],
    direction: 'diagonal' as const,
  },
}
