import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/shared/theme';
import type { TransferStatus } from '@/shared/types';

export interface StatusPillProps {
  status: TransferStatus;
  label: string;
}

const pillStyle: Record<TransferStatus, { backgroundColor: string; color: string }> = {
  SAFE: { backgroundColor: '#DCFCE7', color: colors.safe },
  WARNING: { backgroundColor: '#FEF3C7', color: colors.warning },
  DANGER: { backgroundColor: '#FEE2E2', color: colors.danger },
};

export function StatusPill({ status, label }: StatusPillProps) {
  const palette = pillStyle[status];

  return (
    <View style={[styles.pill, { backgroundColor: palette.backgroundColor }]}>
      <Text style={[styles.label, { color: palette.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '500',
  },
  pill: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
});
