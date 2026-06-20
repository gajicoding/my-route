import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { RouteStepType } from '@/features/routes/types';
import { colors, radius, spacing, typography } from '@/shared/theme';

export interface RouteCreateStepAddBarProps {
  onAdd: (type: RouteStepType) => void;
}

const addOptions = [
  { type: 'WALK' as const, label: '도보', icon: 'walk-outline' as const },
  { type: 'BUS' as const, label: '버스', icon: 'bus-outline' as const },
  { type: 'SUBWAY' as const, label: '지하철', icon: 'subway-outline' as const },
];

export function RouteCreateStepAddBar({ onAdd }: RouteCreateStepAddBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>유형을 탭하면 경로 단계에 추가됩니다</Text>
      <View style={styles.bar}>
        {addOptions.map((option, index) => (
          <View key={option.type} style={styles.itemWrap}>
            {index > 0 ? <View style={styles.separator} /> : null}
            <Pressable
              accessibilityLabel={`${option.label} 단계 추가`}
              accessibilityRole="button"
              onPress={() => onAdd(option.type)}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
            >
              <Ionicons color={colors.primary} name={option.icon} size={18} />
              <Text style={styles.label}>{option.label}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  container: {
    gap: spacing.sm,
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
    justifyContent: 'center',
    minHeight: 52,
    paddingVertical: spacing.sm,
  },
  itemPressed: {
    backgroundColor: colors.primaryLight,
  },
  itemWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  separator: {
    backgroundColor: colors.border,
    width: StyleSheet.hairlineWidth,
  },
});
