export const palette = {
  brand: {
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    primaryLight: '#DBEAFE',
  },
  neutral: {
    background: '#FFFFFF',
    surface: '#F8FAFC',
    surfaceMuted: '#F1F5F9',
    border: '#E2E8F0',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    disabled: '#CBD5E1',
  },
  status: {
    safe: '#16A34A',
    warning: '#F59E0B',
    danger: '#DC2626',
    info: '#2563EB',
  },
  transit: {
    busNumber: '#2563EB',
  },
} as const;

export type BrandColorToken = keyof typeof palette.brand;
export type NeutralColorToken = keyof typeof palette.neutral;
export type StatusColorToken = keyof typeof palette.status;

/** Flat color tokens for StyleSheet usage */
export const colors = {
  primary: palette.brand.primary,
  primaryDark: palette.brand.primaryDark,
  primaryLight: palette.brand.primaryLight,
  background: palette.neutral.background,
  surface: palette.neutral.surface,
  surfaceMuted: palette.neutral.surfaceMuted,
  border: palette.neutral.border,
  textPrimary: palette.neutral.textPrimary,
  textSecondary: palette.neutral.textSecondary,
  disabled: palette.neutral.disabled,
  safe: palette.status.safe,
  warning: palette.status.warning,
  danger: palette.status.danger,
  info: palette.status.info,
  busNumber: palette.transit.busNumber,
} as const;

export type ColorToken = keyof typeof colors;
