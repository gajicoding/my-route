export {
  colors,
  palette,
  type BrandColorToken,
  type ColorToken,
  type NeutralColorToken,
  type StatusColorToken,
} from './colors';
export { radius, type RadiusToken, type RadiusValue } from './radius';
export { shadows, type ShadowToken } from './shadows';
export { spacing, type SpacingToken, type SpacingValue } from './spacing';
export {
  fontFamily,
  fontWeight,
  typography,
  type FontFamilyPlatform,
  type FontWeightToken,
  type TypographyToken,
} from './typography';

import { colors, palette } from './colors';
import { radius } from './radius';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { fontFamily, fontWeight, typography } from './typography';

export const theme = {
  palette,
  colors,
  spacing,
  radius,
  typography,
  fontFamily,
  fontWeight,
  shadows,
} as const;

export type Theme = typeof theme;
