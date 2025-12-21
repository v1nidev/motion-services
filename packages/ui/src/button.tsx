import React from 'react'

import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native'

export interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  style?: ViewStyle
}

export function Button({ title, onPress, variant = 'primary', disabled = false, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, variant === 'primary' ? styles.textPrimary : styles.textSecondary]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#007AFF',
  },
})
