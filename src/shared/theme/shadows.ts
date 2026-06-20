import { Platform } from 'react-native';
import type { ViewStyle } from 'react-native';

type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

const shadowColor = '#000000';

function platformShadow(ios: ShadowStyle, androidElevation: number): ShadowStyle {
  return Platform.select({
    android: { elevation: androidElevation },
    default: ios,
  }) as ShadowStyle;
}

export const shadows = {
  soft: platformShadow(
    {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    2,
  ),
  cardSubtle: platformShadow(
    {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.04,
      shadowRadius: 12,
      elevation: 1,
    },
    0,
  ),
  fabSub: platformShadow(
    {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    3,
  ),
  fabMain: platformShadow(
    {
      shadowColor: '#1D4ED8',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.28,
      shadowRadius: 10,
      elevation: 6,
    },
    4,
  ),
} as const satisfies Record<string, ShadowStyle>;

export type ShadowToken = keyof typeof shadows;
