import React from 'react'

import { Image, ImageSourcePropType, Pressable, Text, View, ViewStyle } from 'react-native'

import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FastSquircleView from 'react-native-fast-squircle'
import { StyleSheet } from 'react-native-unistyles'

export interface WorkoutCardProps {
  title: string
  tags: string[]
  duration: string
  image: ImageSourcePropType
  onPress?: () => void
  onPlayPress?: () => void
  variant?: 'default' | 'compact'
  style?: ViewStyle
}

export function WorkoutCard({
  title,
  tags,
  duration,
  image,
  onPress,
  onPlayPress,
  variant = 'default',
  style,
}: WorkoutCardProps) {
  const isCompact = variant === 'compact'

  return (
    <Pressable onPress={onPress} style={style}>
      <FastSquircleView cornerSmoothing={0.9} style={styles.container}>
        {/* Character Image */}
        <Image
          source={image}
          style={isCompact ? styles.characterImageCompact : styles.characterImage}
          resizeMode="contain"
        />

        {/* Play Button */}
        <Pressable onPress={onPlayPress} style={styles.playButton}>
          <FontAwesome6 name="play" size={32} color="white" />
        </Pressable>

        {/* Tags - Top for compact variant */}
        {isCompact && (
          <View style={styles.tagsContainerTop}>
            {tags.map((tag, index) => (
              <View
                key={tag}
                style={[
                  styles.tag,
                  {
                    backgroundColor: index === 0 ? '#fbeed8' : '#fdf3e2',
                  },
                ]}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Text Container - Bottom for compact variant, Top for default */}
        <View style={isCompact ? styles.textContainerBottom : styles.textContainer}>
          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Tags - Below title for default variant */}
          {!isCompact && (
            <View style={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <View
                  key={tag}
                  style={[
                    styles.tag,
                    {
                      backgroundColor: index === 0 ? '#fbeed8' : '#fdf3e2',
                    },
                  ]}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Duration */}
          <View style={styles.durationContainer}>
            <AntDesign name="clock-circle" size={16} color="black" />
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        </View>
      </FastSquircleView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 390,
    height: 550,
    position: 'relative',
    backgroundColor: '#fffbf5',
    borderRadius: 40,
    overflow: 'hidden',
  },
  characterImage: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -240 }],
    width: 480,
    height: 519,
  },
  playButton: {
    position: 'absolute',
    bottom: 33,
    right: 33,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    left: 32,
    top: 32,
  },
  title: {
    fontWeight: '900',
    fontSize: 40,
    color: '#171717',
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  tagText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#005250',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  durationText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#454545',
  },
  // Compact variant styles
  characterImageCompact: {
    position: 'absolute',
    top: 84,
    left: '50%',
    transform: [{ translateX: -106 }],
    width: 213,
    height: 293,
  },
  tagsContainerTop: {
    position: 'absolute',
    top: 37,
    left: 31,
    flexDirection: 'row',
    gap: 8,
  },
  textContainerBottom: {
    position: 'absolute',
    left: 32,
    bottom: 32,
  },
})
