// This file shows example usage - not meant to be imported
// Copy this pattern into your apps
import React from 'react'

import { View } from 'react-native'

import { Button, Card } from '@monorepo/ui'

export function ExampleScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Card style={{ marginBottom: 16 }}>
        <Button title="Primary Button" onPress={() => console.log('Primary pressed')} variant="primary" />
      </Card>

      <Card>
        <Button title="Secondary Button" onPress={() => console.log('Secondary pressed')} variant="secondary" />
      </Card>
    </View>
  )
}
