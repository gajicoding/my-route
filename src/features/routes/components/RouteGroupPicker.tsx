import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { RouteGroup } from '@/features/routes/types';
import { colors, radius, spacing, typography } from '@/shared/theme';

export interface RouteGroupPickerProps {
  groups: RouteGroup[];
  selectedGroupId: string | null;
  onSelect: (groupId: string) => void;
}

export function RouteGroupPicker({ groups, selectedGroupId, onSelect }: RouteGroupPickerProps) {
  return (
    <View style={styles.container}>
      {groups.map((group) => {
        const isSelected = group.id === selectedGroupId;

        return (
          <Pressable
            key={group.id}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(group.id)}
            style={[styles.chip, isSelected && styles.chipSelected]}
          >
            <View style={[styles.colorDot, { backgroundColor: group.color }]} />
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{group.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.xl,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: colors.primaryLight,
  },
  colorDot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  labelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
