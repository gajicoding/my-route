import { StyleSheet, Text, View } from 'react-native';

import { ListRow } from '@/shared/components/ListRow';
import { TransferStatusCard } from '@/shared/components/TransferStatusCard';
import { colors, spacing, typography } from '@/shared/theme';
import type { TransferStatus } from '@/shared/types';

export interface RouteSummaryRowProps {
  name: string;
  pathLabel: string;
  estimatedArrival: string;
  transferStatus: TransferStatus;
  transferMarginMinutes?: number;
  showDivider?: boolean;
}

export function RouteSummaryRow({
  name,
  pathLabel,
  estimatedArrival,
  transferStatus,
  transferMarginMinutes,
  showDivider = true,
}: RouteSummaryRowProps) {
  return (
    <ListRow showDivider={showDivider}>
      <View style={styles.topRow}>
        <View style={styles.routeInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.path}>{pathLabel}</Text>
        </View>
        <View style={styles.etaBlock}>
          <Text style={styles.etaLabel}>예상 도착</Text>
          <Text style={styles.eta}>{estimatedArrival}</Text>
        </View>
      </View>
      <TransferStatusCard
        marginMinutes={transferMarginMinutes}
        status={transferStatus}
        variant="inline"
      />
    </ListRow>
  );
}

const styles = StyleSheet.create({
  eta: {
    ...typography.arrivalTime,
    color: colors.textPrimary,
  },
  etaBlock: {
    alignItems: 'flex-end',
  },
  etaLabel: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  name: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  path: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 2,
  },
  routeInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  topRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
});
