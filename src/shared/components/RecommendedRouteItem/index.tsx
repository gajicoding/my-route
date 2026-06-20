import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/shared/components/Card';
import { StatusPill } from '@/shared/components/StatusPill';
import { colors, spacing, typography } from '@/shared/theme';
import type { TransferStatus } from '@/shared/types';

export interface RecommendedRouteItemProps {
  name: string;
  description: string;
  durationLabel: string;
  transferCount?: number;
  transferStatus?: TransferStatus;
  transferStatusLabel?: string;
  onPress?: () => void;
  isLast?: boolean;
  variant?: 'card' | 'list';
}

export function RecommendedRouteItem({
  name,
  description,
  durationLabel,
  transferCount,
  transferStatus,
  transferStatusLabel,
  onPress,
  isLast = false,
  variant = 'card',
}: RecommendedRouteItemProps) {
  const meta = [
    durationLabel,
    transferCount !== undefined ? `환승 ${transferCount}회` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  const content = (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{meta}</Text>
          {transferStatus && transferStatusLabel ? (
            <StatusPill label={transferStatusLabel} status={transferStatus} />
          ) : null}
        </View>
      </View>
      <Ionicons color={colors.disabled} name="chevron-forward" size={16} />
    </View>
  );

  if (variant === 'list') {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.listRow,
          !isLast && styles.listRowBorder,
          pressed && styles.pressed,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, !isLast && styles.spacing]}
    >
      <Card style={styles.card} variant="subtle">
        {content}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  info: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  listRow: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  listRowBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  meta: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  name: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  pressed: {
    opacity: 0.88,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  spacing: {
    marginBottom: spacing.sm,
  },
});
