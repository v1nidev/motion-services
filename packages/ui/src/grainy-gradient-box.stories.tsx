import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

import type { Story } from '@ladle/react'

import { colors } from './core/colors'
import { GrainyGradientBox, GrainyGradientPresets } from './grainy-gradient-box'

export const AllPresets: Story = () => (
  <View style={styles.grid}>
    <View style={styles.column}>
      <Text style={styles.title}>Coral Sunset</Text>
      <GrainyGradientBox {...GrainyGradientPresets.coralSunset} width={300} height={200} />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>Dark Night</Text>
      <GrainyGradientBox {...GrainyGradientPresets.darkNight} width={300} height={200} />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>Warm Earth</Text>
      <GrainyGradientBox {...GrainyGradientPresets.warmEarth} width={300} height={200} />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>Coral Fade</Text>
      <GrainyGradientBox {...GrainyGradientPresets.coralFade} width={300} height={200} />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>Light Glow</Text>
      <GrainyGradientBox {...GrainyGradientPresets.lightGlow} width={300} height={200} />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>Midnight</Text>
      <GrainyGradientBox {...GrainyGradientPresets.midnight} width={300} height={200} />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>Coral Beige</Text>
      <GrainyGradientBox {...GrainyGradientPresets.coralBeige} width={300} height={200} />
    </View>
  </View>
)

export const Custom: Story = () => (
  <View style={styles.grid}>
    <View style={styles.column}>
      <Text style={styles.title}>Custom Colors</Text>
      <View
        style={{
          padding: 16,
          width: 500,
          height: 1000,
          borderWidth: 2,
          borderColor: colors.black['100'],
          borderStyle: 'solid',
          backgroundColor: colors.papaya['900'],
        }}
      >
        <GrainyGradientBox
          colorEnd={colors.papaya['300']}
          colorStart={colors.papaya['900']}
          width="100%"
          height={600}
          noiseOpacity={0.05}
          style={{ margin: 'auto', borderWidth: 1, borderColor: colors.black['100'], borderStyle: 'solid' }}
        />
      </View>
    </View>
  </View>
)

export const CustomGradients: Story = () => (
  <View style={styles.grid}>
    <View style={styles.column}>
      <Text style={styles.title}>Vertical Gradient</Text>
      <GrainyGradientBox
        colorStart={colors.coral['400']}
        colorEnd={colors.coral['900']}
        direction="vertical"
        width={300}
        height={200}
      />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>Horizontal Gradient</Text>
      <GrainyGradientBox
        colorStart={colors.beige['200']}
        colorEnd={colors.papaya['500']}
        direction="horizontal"
        width={300}
        height={200}
      />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>Diagonal Gradient</Text>
      <GrainyGradientBox
        colorStart={colors.black['050']}
        colorEnd={colors.coral['500']}
        direction="diagonal"
        width={300}
        height={200}
      />
    </View>
  </View>
)

export const NoiseIntensity: Story = () => (
  <View style={styles.grid}>
    <View style={styles.column}>
      <Text style={styles.title}>Low Noise (0.05)</Text>
      <GrainyGradientBox
        colorStart={colors.coral['400']}
        colorEnd={colors.coral['800']}
        noiseOpacity={0.05}
        width={300}
        height={200}
      />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>Medium Noise (0.15)</Text>
      <GrainyGradientBox
        colorStart={colors.coral['400']}
        colorEnd={colors.coral['800']}
        noiseOpacity={0.15}
        width={300}
        height={200}
      />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>High Noise (0.3)</Text>
      <GrainyGradientBox
        colorStart={colors.coral['400']}
        colorEnd={colors.coral['800']}
        noiseOpacity={0.3}
        width={300}
        height={200}
      />
    </View>

    <View style={styles.column}>
      <Text style={styles.title}>Very High Noise (0.5)</Text>
      <GrainyGradientBox
        colorStart={colors.coral['400']}
        colorEnd={colors.coral['800']}
        noiseOpacity={0.5}
        width={300}
        height={200}
      />
    </View>
  </View>
)

export const WithContent: Story = () => (
  <View style={styles.grid}>
    <GrainyGradientBox {...GrainyGradientPresets.coralSunset} width={400} height={300} borderRadius={24}>
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>Grainy Gradient</Text>
        <Text style={styles.contentSubtitle}>Beautiful texture effect</Text>
      </View>
    </GrainyGradientBox>

    <GrainyGradientBox {...GrainyGradientPresets.midnight} width={400} height={300} borderRadius={24}>
      <View style={styles.contentContainer}>
        <Text style={[styles.contentTitle, { color: colors.floral['500'] }]}>Dark Theme</Text>
        <Text style={[styles.contentSubtitle, { color: colors.beige['700'] }]}>With overlay text</Text>
      </View>
    </GrainyGradientBox>
  </View>
)

export const DifferentSizes: Story = () => (
  <View style={[styles.grid, { alignItems: 'center' }]}>
    <GrainyGradientBox {...GrainyGradientPresets.coralFade} width={100} height={100} borderRadius={8} />

    <GrainyGradientBox {...GrainyGradientPresets.warmEarth} width={200} height={150} borderRadius={16} />

    <GrainyGradientBox {...GrainyGradientPresets.lightGlow} width={300} height={200} borderRadius={24} />

    <GrainyGradientBox {...GrainyGradientPresets.coralBeige} width={400} height={250} borderRadius={32} />
  </View>
)

export const CardExamples: Story = () => (
  <View style={styles.grid}>
    <GrainyGradientBox
      colorStart={colors.coral['300']}
      colorEnd={colors.coral['600']}
      direction="diagonal"
      width={350}
      height={200}
      borderRadius={20}
      noiseOpacity={0.2}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Premium Card</Text>
        <Text style={styles.cardPrice}>$99/mo</Text>
        <Text style={styles.cardFeature}>• Unlimited access</Text>
        <Text style={styles.cardFeature}>• Priority support</Text>
      </View>
    </GrainyGradientBox>

    <GrainyGradientBox
      colorStart={colors.beige['400']}
      colorEnd={colors.papaya['300']}
      direction="vertical"
      width={350}
      height={200}
      borderRadius={20}
      noiseOpacity={0.12}
    >
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.black['100'] }]}>Standard Plan</Text>
        <Text style={[styles.cardPrice, { color: colors.black['200'] }]}>$49/mo</Text>
        <Text style={[styles.cardFeature, { color: colors.black['300'] }]}>• Core features</Text>
        <Text style={[styles.cardFeature, { color: colors.black['300'] }]}>• Email support</Text>
      </View>
    </GrainyGradientBox>

    <GrainyGradientBox
      colorStart={colors.black['100']}
      colorEnd={colors.black['300']}
      direction="diagonal"
      width={350}
      height={200}
      borderRadius={20}
      noiseOpacity={0.18}
    >
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.floral['500'] }]}>Enterprise</Text>
        <Text style={[styles.cardPrice, { color: colors.papaya['500'] }]}>Custom</Text>
        <Text style={[styles.cardFeature, { color: colors.beige['700'] }]}>• Everything included</Text>
        <Text style={[styles.cardFeature, { color: colors.beige['700'] }]}>• Dedicated support</Text>
      </View>
    </GrainyGradientBox>
  </View>
)

const styles = StyleSheet.create({
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    padding: 24,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contentContainer: {
    padding: 32,
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  contentSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  cardContent: {
    padding: 24,
    alignItems: 'flex-start',
    width: '100%',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
  },
  cardFeature: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 4,
  },
})
