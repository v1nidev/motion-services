import type { Story, StoryDefault } from '@ladle/react'

import { Copyable } from '../copyable'
import { baseColorPalette, colors } from './colors'

export default {
  title: 'Design System / Core / Colors',
} satisfies StoryDefault

// Convert HSL to hex
const hslToHex = (hsl: string): string => {
  // Parse HSL string: "hsl(6, 100%, 97%)" or "hsl(54, 100%, 99.7%)"
  const match = hsl.match(/hsl\((\d+),\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%\)/)
  if (!match) return '#000000'

  const h = parseFloat(match[1]) / 360
  const s = parseFloat(match[2]) / 100
  const l = parseFloat(match[3]) / 100

  // Convert HSL to RGB
  let r, g, b
  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  // Convert RGB to hex
  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

type ColorCardProps = {
  colorValue: string
  colorName: string
  hslValue: string
  hexValue?: string
}

const ColorCard = ({ colorValue, colorName, hslValue, hexValue }: ColorCardProps) => (
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
      <Copyable
        style={{
          display: 'block',
          width: '100%',
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
      </Copyable>
      {hexValue && (
        <Copyable
          style={{
            display: 'block',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: '#666',
              marginBottom: '0.25rem',
            }}
          >
            {hexValue}
          </div>
        </Copyable>
      )}
      <Copyable
        style={{
          display: 'block',
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            color: '#666',
          }}
        >
          {hslValue}
        </div>
      </Copyable>
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
          <ColorCard
            key={color.name}
            colorValue={color.value}
            colorName={color.name}
            hslValue={color.value}
            hexValue={hslToHex(color.value)}
          />
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
            {Object.entries(shades)
              .sort(([shadeA], [shadeB]) => parseInt(shadeA) - parseInt(shadeB))
              .map(([shade, value]) => (
                <ColorCard
                  key={shade}
                  colorValue={value}
                  colorName={`${colorName}.${shade}`}
                  hslValue={value}
                  hexValue={hslToHex(value)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// export const FullColorPalette2: Story = () => {
//   return (
//     <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
//       <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Color Palette</h1>

//       {Object.entries(colors2).map(([colorName, shades]) => (
//         <div key={colorName} style={{ marginBottom: '3rem' }}>
//           <h2
//             style={{
//               marginBottom: '1rem',
//               fontSize: '1.5rem',
//               textTransform: 'capitalize',
//             }}
//           >
//             {colorName}
//           </h2>

//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//               gap: '1rem',
//             }}
//           >
//             {Object.entries(shades)
//               .sort(([shadeA], [shadeB]) => parseInt(shadeA) - parseInt(shadeB))
//               .map(([shade, value]) => (
//                 <ColorCard
//                   key={shade}
//                   colorValue={value}
//                   colorName={`${colorName}.${shade}`}
//                   hslValue={value}
//                   hexValue={hslToHex(value)}
//                 />
//               ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
