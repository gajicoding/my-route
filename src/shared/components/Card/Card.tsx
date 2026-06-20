import { StyleSheet, View, type ViewProps } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { shadows } from '@/shared/theme/shadows';
import { layout } from '@/shared/constants';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'filled' | 'elevated' | 'subtle';
}

export function Card({ children, style, variant = 'default', ...rest }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'filled' && styles.filled,
        variant === 'elevated' && styles.elevated,
        variant === 'subtle' && styles.subtle,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: layout.cardPadding,
  },
  elevated: {
    borderWidth: 0,
    ...shadows.soft,
  },
  filled: {
    borderWidth: 0,
  },
  subtle: {
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    ...shadows.cardSubtle,
  },
});
