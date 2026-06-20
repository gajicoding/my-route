import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { RouteStep } from '@/features/routes/types';
import {
  getRouteStepSummary,
  getRouteStepTypeLabel,
} from '@/features/routes/utils/route-step-summary';
import { Card } from '@/shared/components/Card';
import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';

export interface RouteCreateStepItemProps {
  step: RouteStep;
  index: number;
  totalCount: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}

const stepIcons: Record<RouteStep['type'], keyof typeof Ionicons.glyphMap> = {
  WALK: 'walk-outline',
  BUS: 'bus-outline',
  SUBWAY: 'subway-outline',
};

export function RouteCreateStepItem({
  step,
  index,
  totalCount,
  onMoveUp,
  onMoveDown,
  onRemove,
}: RouteCreateStepItemProps) {
  const summary = getRouteStepSummary(step);
  const canMoveUp = index > 0;
  const canMoveDown = index < totalCount - 1;

  return (
    <Card style={styles.card} variant="subtle">
      <View style={styles.header}>
        <View style={styles.typeBadge}>
          <Ionicons color={colors.primary} name={stepIcons[step.type]} size={16} />
          <Text style={styles.typeLabel}>{getRouteStepTypeLabel(step.type)}</Text>
        </View>
        <Text style={styles.stepIndex}>{index + 1}</Text>
      </View>

      <Text style={styles.title}>{summary.title}</Text>
      {summary.subtitle ? <Text style={styles.subtitle}>{summary.subtitle}</Text> : null}

      <View style={styles.actions}>
        <Pressable
          accessibilityLabel="위로 이동"
          accessibilityRole="button"
          disabled={!canMoveUp}
          hitSlop={8}
          onPress={onMoveUp}
          style={[styles.actionButton, !canMoveUp && styles.actionButtonDisabled]}
        >
          <Ionicons
            color={canMoveUp ? colors.textPrimary : colors.disabled}
            name="chevron-up"
            size={18}
          />
        </Pressable>
        <Pressable
          accessibilityLabel="아래로 이동"
          accessibilityRole="button"
          disabled={!canMoveDown}
          hitSlop={8}
          onPress={onMoveDown}
          style={[styles.actionButton, !canMoveDown && styles.actionButtonDisabled]}
        >
          <Ionicons
            color={canMoveDown ? colors.textPrimary : colors.disabled}
            name="chevron-down"
            size={18}
          />
        </Pressable>
        <Pressable
          accessibilityLabel="단계 삭제"
          accessibilityRole="button"
          hitSlop={8}
          onPress={onRemove}
          style={styles.actionButton}
        >
          <Ionicons color={colors.danger} name="trash-outline" size={18} />
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    height: layout.minTouchTarget,
    justifyContent: 'center',
    width: layout.minTouchTarget,
  },
  actionButtonDisabled: {
    opacity: 0.4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
  },
  card: {
    gap: spacing.xs,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepIndex: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  title: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  typeBadge: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  typeLabel: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
});
