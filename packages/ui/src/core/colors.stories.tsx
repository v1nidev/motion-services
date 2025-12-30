import type { Story, StoryDefault } from '@ladle/react'

import { baseColorPalette, colors } from './colors'

export default {
  title: 'Design System / Core / Colors',
} satisfies StoryDefault

type ColorCardProps = {
  colorValue: string
  colorName: string
  colorCode: string
}

const ColorCard = ({ colorValue, colorName, colorCode }: ColorCardProps) => (
  <div
    style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}
  >
    <div
      style={{
        backgroundColor: colorValue,
        height: '100px',
        border: '1px solid rgba(0,0,0,0.1)',
      }}
    />
    <div
      style={{
        padding: '0.75rem',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '0.25rem',
          color: '#333',
        }}
      >
        {colorName}
      </div>
      <div
        style={{
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          color: '#666',
        }}
      >
        {colorCode}
      </div>
    </div>
  </div>
)

export const BaseColorPalette: Story = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Base Color Palette</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {baseColorPalette.map((color) => (
          <ColorCard key={color.name} colorValue={`#${color.hex}`} colorName={color.name} colorCode={`#${color.hex}`} />
        ))}
      </div>
    </div>
  )
}

export const FullColorPalette: Story = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Color Palette</h1>

      {Object.entries(colors).map(([colorName, shades]) => (
        <div key={colorName} style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              marginBottom: '1rem',
              fontSize: '1.5rem',
              textTransform: 'capitalize',
            }}
          >
            {colorName}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {Object.entries(shades).map(([shade, value]) => (
              <ColorCard key={shade} colorValue={value} colorName={`${colorName}-${shade}`} colorCode={value} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
