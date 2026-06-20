import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';

export interface SettingsListRowProps {
  label: string;
  value?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  showChevron?: boolean;
  onPress?: () => void;
  isLast?: boolean;
}

export function SettingsListRow({
  label,
  value,
  icon,
  showChevron = true,
  onPress,
  isLast = false,
}: SettingsListRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowBorder,
        pressed && onPress ? styles.pressed : undefined,
      ]}
    >
      {icon ? (
        <Ionicons color={colors.textSecondary} name={icon} size={18} style={styles.icon} />
      ) : null}
      <Text style={styles.label}>{label}</Text>
      <View style={styles.trailing}>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        {showChevron ? (
          <Ionicons color={colors.disabled} name="chevron-forward" size={16} />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: spacing.sm,
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.88,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: layout.minTouchTarget,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  trailing: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  value: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
});
