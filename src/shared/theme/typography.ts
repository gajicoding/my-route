import type { TextStyle } from 'react-native';

export const fontFamily = {
  ios: 'System',
  android: 'Pretendard',
  default: 'System',
} as const;

export type FontFamilyPlatform = keyof typeof fontFamily;

export const fontWeight = {
  regular: '400',
  semibold: '600',
  bold: '700',
} as const satisfies Record<string, NonNullable<TextStyle['fontWeight']>>;

export type FontWeightToken = keyof typeof fontWeight;

type TypographyStyle = Pick<TextStyle, 'fontSize' | 'fontWeight'>;

export const typography = {
  display: {
    fontSize: 32,
    fontWeight: fontWeight.bold,
  },
  heading: {
    fontSize: 24,
    fontWeight: fontWeight.bold,
  },
  title: {
    fontSize: 18,
    fontWeight: fontWeight.semibold,
  },
  body: {
    fontSize: 16,
    fontWeight: fontWeight.regular,
  },
  caption: {
    fontSize: 13,
    fontWeight: fontWeight.regular,
  },
  label: {
    fontSize: 13,
    fontWeight: fontWeight.semibold,
  },
  busArrival: {
    fontSize: 26,
    fontWeight: fontWeight.bold,
  },
  busNumber: {
    fontSize: 20,
    fontWeight: fontWeight.bold,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: fontWeight.semibold,
  },
  meta: {
    fontSize: 12,
    fontWeight: fontWeight.regular,
  },
  arrivalTime: {
    fontSize: 22,
    fontWeight: fontWeight.bold,
  },
  button: {
    fontSize: 16,
    fontWeight: fontWeight.semibold,
  },
} as const satisfies Record<string, TypographyStyle>;

export type TypographyToken = keyof typeof typography;
