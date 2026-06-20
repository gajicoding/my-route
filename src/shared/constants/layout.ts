import { spacing } from '@/shared/theme/spacing';

export const layout = {
  screenPaddingHorizontal: spacing.lg,
  screenPaddingVertical: spacing.sm,
  cardPadding: spacing.lg,
  sectionGap: spacing.xl,
  bottomNavigationHeight: 64,
  fabSize: 56,
  routeCardHeight: 100,
  minTouchTarget: 44,
  listRowPaddingHorizontal: spacing.base,
  listRowPaddingVertical: 10,
  listRowMinHeight: 44,
} as const;

export type LayoutToken = keyof typeof layout;

export type LayoutValue = (typeof layout)[LayoutToken];
