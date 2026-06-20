import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { RouteTimelineMini, type TimelineMiniStep } from '@/shared/components/RouteTimelineMini';
import { StatusPill } from '@/shared/components/StatusPill';
import { colors, radius, spacing, typography } from '@/shared/theme';
import type { TransferStatus } from '@/shared/types';

export interface CurrentRouteCardProps {
  name: string;
  pathLabel: string;
  estimatedArrival: string;
  transferStatus: TransferStatus;
  transferMarginMinutes: number;
  timelineSteps: TimelineMiniStep[];
  onStartPress: () => void;
  onRouteSelectPress?: () => void;
}

export function CurrentRouteCard({
  name,
  pathLabel,
  estimatedArrival,
  transferStatus,
  transferMarginMinutes,
  timelineSteps,
  onStartPress,
  onRouteSelectPress,
}: CurrentRouteCardProps) {
  return (
    <Card style={styles.card} variant="subtle">
      <View style={styles.topRow}>
        <Text style={styles.sectionLabel}>현재 경로</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onRouteSelectPress}
          style={styles.routePill}
        >
          <Text style={styles.routePillLabel}>{name}</Text>
          <Ionicons color={colors.primary} name="chevron-down" size={13} />
        </Pressable>
      </View>

      <Text style={styles.pathTitle}>{pathLabel}</Text>

      <View style={styles.statsPanel}>
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>예상 도착</Text>
          <Text style={styles.arrival}>{estimatedArrival}</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={[styles.statBlock, styles.statBlockRight]}>
          <Text style={styles.statLabel}>환승 여유</Text>
          <View style={styles.transferRow}>
            <Text style={styles.transferMinutes}>{transferMarginMinutes}분</Text>
            <StatusPill label="안전" status={transferStatus} />
          </View>
        </View>
      </View>

      <View style={styles.timelinePanel}>
        <RouteTimelineMini showTrack steps={timelineSteps} />
      </View>

      <Button
        icon="navigate-outline"
        label="안내 시작"
        onPress={onStartPress}
        variant="fullWidth"
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  arrival: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.8,
    lineHeight: 34,
    marginTop: 2,
  },
  card: {
    gap: spacing.base,
    padding: spacing.base,
  },
  pathTitle: {
    ...typography.title,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  routePill: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  routePillLabel: {
    ...typography.caption,
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  statBlock: {
    flex: 1,
  },
  statBlockRight: {
    alignItems: 'flex-end',
  },
  statDivider: {
    alignSelf: 'stretch',
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
    width: StyleSheet.hairlineWidth,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  statsPanel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  timelinePanel: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transferMinutes: {
    ...typography.body,
    color: colors.safe,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  transferRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: 2,
  },
});
