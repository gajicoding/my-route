import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/shared/theme';
import type { TransferStatus } from '@/shared/types';

export interface TransferBadgeProps {
  status: TransferStatus;
  label: string;
}

const statusColors: Record<TransferStatus, string> = {
  SAFE: colors.safe,
  WARNING: colors.warning,
  DANGER: colors.danger,
};

export function TransferBadge({ status, label }: TransferBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: statusColors[status] }]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  label: {
    ...typography.label,
    color: colors.background,
  },
});
