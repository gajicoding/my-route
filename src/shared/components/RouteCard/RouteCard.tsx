import { StyleSheet, Text, View } from 'react-native';

import { ListRow } from '@/shared/components/ListRow';
import { colors, typography } from '@/shared/theme';

export interface RouteCardProps {
  name: string;
  pathLabel?: string;
  estimatedArrival?: string;
  transferCount?: number;
  variant?: 'default' | 'compact' | 'filled' | 'list';
}

export function RouteCard({
  name,
  pathLabel,
  estimatedArrival,
  transferCount,
  variant = 'default',
}: RouteCardProps) {
  if (variant === 'list') {
    const meta = [pathLabel, transferCount !== undefined ? `환승 ${transferCount}회` : undefined]
      .filter(Boolean)
      .join(' · ');

    return (
      <ListRow showDivider>
        <View style={styles.listRow}>
          <Text style={styles.listName}>{name}</Text>
          {meta ? <Text style={styles.listMeta}>{meta}</Text> : null}
          {estimatedArrival ? (
            <Text style={styles.listEta}>{estimatedArrival}</Text>
          ) : null}
        </View>
      </ListRow>
    );
  }

  if (variant === 'compact' || variant === 'filled') {
    return (
      <ListRow>
        <View style={styles.listRow}>
          <Text style={styles.listName}>{name}</Text>
          {estimatedArrival ? (
            <Text style={styles.listEta}>{estimatedArrival}</Text>
          ) : null}
        </View>
      </ListRow>
    );
  }

  return (
    <ListRow>
      <View style={styles.legacyBlock}>
        <Text style={styles.legacyName}>{name}</Text>
        {pathLabel ? <Text style={styles.legacyPath}>{pathLabel}</Text> : null}
        {estimatedArrival ? (
          <Text style={styles.legacyEta}>{estimatedArrival}</Text>
        ) : null}
        {typeof transferCount === 'number' ? (
          <Text style={styles.legacyTransfer}>환승 {transferCount}회</Text>
        ) : null}
      </View>
    </ListRow>
  );
}

const styles = StyleSheet.create({
  legacyBlock: {
    gap: 2,
  },
  legacyEta: {
    ...typography.arrivalTime,
    color: colors.textPrimary,
    marginTop: 4,
  },
  legacyName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  legacyPath: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  legacyTransfer: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  listEta: {
    ...typography.arrivalTime,
    color: colors.textPrimary,
    fontSize: 18,
    minWidth: 56,
    textAlign: 'right',
  },
  listMeta: {
    ...typography.meta,
    color: colors.textSecondary,
    flex: 1,
    paddingHorizontal: 8,
  },
  listName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    minWidth: 64,
  },
  listRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
