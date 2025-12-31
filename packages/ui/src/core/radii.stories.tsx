import { StyleSheet, Text, View } from 'react-native'

import type { Story, StoryDefault } from '@ladle/react'

import { radii } from './radii'

export default {
  title: 'Design System / Core / Radii',
} satisfies StoryDefault

export const RadiiShowcase: Story = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Border Radius Scale</Text>
      <View style={styles.grid}>
        {Object.entries(radii).map(([key, value]) => (
          <View key={key} style={styles.item}>
            <View
              style={[
                styles.box,
                {
                  borderRadius: value === 9999 ? 60 : value,
                },
              ]}
            />
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.value}>{value === 9999 ? 'full' : `${value}px`}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f5f5',
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 32,
    color: '#1a1a1a',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#2d5a3d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  value: {
    fontSize: 12,
    color: '#666',
  },
})
