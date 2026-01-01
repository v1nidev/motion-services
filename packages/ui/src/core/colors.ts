export const colors = {
  white: {
    '050': 'hsl(0, 0%, 100%)',
  },
  coral: {
    '050': 'hsl(6, 100%, 97%)',
    '100': 'hsl(6, 100%, 93%)',
    '200': 'hsl(6, 100%, 88%)',
    '300': 'hsl(6, 100%, 82%)',
    '400': 'hsl(6, 100%, 75%)',
    '500': 'hsl(6, 100%, 67%)', // Base - Vibrant Coral
    '600': 'hsl(6, 100%, 57%)',
    '700': 'hsl(6, 100%, 47%)',
    '800': 'hsl(6, 100%, 33%)',
    '900': 'hsl(6, 100%, 20%)',
    '950': 'hsl(6, 100%, 13%)',
  },
  black: {
    '050': 'hsl(0, 0%, 92%)',
    '100': 'hsl(0, 0%, 85%)',
    '200': 'hsl(0, 0%, 75%)',
    '300': 'hsl(0, 0%, 65%)',
    '400': 'hsl(0, 0%, 55%)',
    '500': 'hsl(0, 0%, 45%)',
    '600': 'hsl(0, 0%, 36%)',
    '700': 'hsl(0, 0%, 27%)',
    '800': 'hsl(0, 0%, 18%)',
    '900': 'hsl(0, 0%, 9%)', // Base - Carbon Black
    '950': 'hsl(0, 0%, 3%)',
  },
  teal: {
    '050': 'hsl(179, 100%, 97%)',
    '100': 'hsl(179, 95%, 93%)',
    '200': 'hsl(179, 90%, 88%)',
    '300': 'hsl(179, 85%, 82%)',
    '400': 'hsl(179, 80%, 75%)',
    '500': 'hsl(179, 75%, 67%)', // Vibrant Teal
    '600': 'hsl(179, 65%, 55%)',
    '700': 'hsl(179, 55%, 43%)',
    '800': 'hsl(179, 45%, 31%)',
    '900': 'hsl(179, 35%, 16%)', // Base
    '950': 'hsl(179, 25%, 10%)',
  },
  beige: {
    '050': 'hsl(50, 15%, 96%)',
    '100': 'hsl(50, 15%, 91%)',
    '200': 'hsl(50, 15%, 85%)',
    '300': 'hsl(50, 15%, 78%)',
    '400': 'hsl(50, 15%, 70%)',
    '500': 'hsl(50, 15%, 60%)', // Khaki Beige
    '600': 'hsl(50, 15%, 54%)',
    '700': 'hsl(50, 15%, 48%)',
    '800': 'hsl(50, 15%, 36%)',
    '900': 'hsl(50, 15%, 24%)',
    '950': 'hsl(50, 15%, 12%)',
  },
  papaya: {
    '050': 'hsl(38, 100%, 98%)',
    // '100': 'hsl(38, 95%, 97%)',
    '100': 'hsl(38, 90%, 96%)',
    // '300': 'hsl(38, 85%, 95%)',
    '200': 'hsl(38, 80%, 93%)',
    '300': 'hsl(38, 75%, 91%)', // Papaya Whip
    '400': 'hsl(38, 70%, 85%)',
    '500': 'hsl(38, 65%, 80%)',
    '600': 'hsl(38, 60%, 75%)',
    '700': 'hsl(38, 45%, 65%)',
    '800': 'hsl(38, 40%, 52%)',
    '900': 'hsl(38, 35%, 45%)',
    '950': 'hsl(38, 25%, 30%)',
  },
  floral: {
    '050': 'hsl(54, 100%, 99.7%)',
    '100': 'hsl(54, 100%, 99%)',
    '200': 'hsl(54, 100%, 98.5%)',
    '300': 'hsl(54, 100%, 97%)', // Floral White
    '400': 'hsl(54, 100%, 95%)',
    '500': 'hsl(54, 100%, 90%)',
    '600': 'hsl(54, 100%, 85%)',
    '700': 'hsl(54, 100%, 75%)',
    '800': 'hsl(54, 100%, 65%)',
    '900': 'hsl(54, 100%, 50%)',
    '950': 'hsl(54, 100%, 35%)',
  },
  ivory: {
    '050': 'hsl(52, 44%, 98%)',
    '100': 'hsl(52, 44%, 96%)',
    '200': 'hsl(52, 44%, 94%)',
    '300': 'hsl(52, 44%, 93%)', // Base - Ivory
    '400': 'hsl(52, 44%, 88%)',
    '500': 'hsl(52, 44%, 82%)',
    '600': 'hsl(52, 40%, 75%)',
    '700': 'hsl(52, 35%, 65%)',
    '800': 'hsl(52, 30%, 50%)',
    '900': 'hsl(52, 25%, 35%)',
    '950': 'hsl(52, 20%, 25%)',
  },
}

export const baseColorPalette = [
  {
    name: 'coral',
    value: colors.coral['500'],
  },
  {
    name: 'black',
    value: colors.black['900'],
  },
  {
    name: 'teal',
    value: colors.teal['900'],
  },
  {
    name: 'papaya',
    value: colors.papaya['300'],
  },
  {
    name: 'floral',
    value: colors.floral['300'],
  },
]

export const semantic = {
  layerBackground: `linear-gradient(165deg, ${colors.papaya['500']} 17.06%, ${colors.papaya['300']} 76.43%)`,
  layerPrimarySurface: colors.papaya['050'],

  // objects
  objectAccent: 'coral.500',

  objectPositive: 'teal.500',
  objectPositiveHover: 'teal.700',
  objectPositivePressed: 'teal.300',
  objectPositiveDisabled: 'teal.100',

  objectNegative: 'coral.700',
  objectNegativeHover: 'coral.900',
  objectNegativePressed: 'coral.300',
  objectNegativeDisabled: 'coral.100',

  objectWarn: 'floral.700',
  objectWarnHover: 'floral.800',
  objectWarnPressed: 'floral.500',
  objectWarnDisabled: 'floral.200',

  // // text
  // textPrimary: 'black.900',
  // textPrimaryInverted: 'floral.050',
  // textSecondary: 'black.700',
  // textTertiary: 'black.500',
  // textDisabled: 'black.300',
}

// https://coolors.co/ff6858-181818-a7a289-f5f3e5-fffef5
// https://coolors.co/ff6858-181818-a7a289-ffefd3-fffef5
// https://coolors.co/ff6858-181818-ffefd3-f5f3e5-fffef5
