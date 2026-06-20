import { StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/shared/theme';
import type { TransferStatus } from '@/shared/types';

export interface TransferStatusCardProps {
  status: TransferStatus;
  marginMinutes?: number;
  variant?: 'default' | 'filled' | 'inline';
}

const statusColor: Record<TransferStatus, string> = {
  SAFE: colors.safe,
  WARNING: colors.warning,
  DANGER: colors.danger,
};

function buildLabel(status: TransferStatus, marginMinutes?: number): string {
  if (status === 'DANGER') {
    return '환승 실패 가능';
  }

  if (typeof marginMinutes === 'number') {
    return `환승 여유 ${marginMinutes}분`;
  }

  return '환승 여유';
}

export function TransferStatusCard({
  status,
  marginMinutes,
  variant = 'inline',
}: TransferStatusCardProps) {
  const label = buildLabel(status, marginMinutes);
  const color = statusColor[status];

  if (variant === 'inline') {
    return (
      <View style={styles.inlineRow}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={[styles.inlineLabel, { color }]}>{label}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.block, { borderLeftColor: color }]}>
      <Text style={[styles.blockLabel, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.background,
    borderLeftWidth: 3,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  blockLabel: {
    ...typography.meta,
    fontWeight: '600',
  },
  dot: {
    borderRadius: 3,
    height: 6,
    width: 6,
  },
  inlineLabel: {
    ...typography.meta,
    fontWeight: '600',
  },
  inlineRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
});
