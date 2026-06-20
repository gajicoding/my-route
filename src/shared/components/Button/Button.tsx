import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'listAction' | 'fullWidth';
  icon?: keyof typeof Ionicons.glyphMap;
}

export function Button({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
  icon,
}: ButtonProps) {
  const isListAction = variant === 'listAction';
  const isFullWidth = variant === 'fullWidth';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[
        isListAction ? styles.listAction : isFullWidth ? styles.fullWidth : styles.button,
        disabled ? styles.disabled : undefined,
      ]}
    >
      <View style={styles.content}>
        {icon ? <Ionicons color={colors.background} name={icon} size={18} /> : null}
        <Text
          style={[
            styles.label,
            (isListAction || isFullWidth) && styles.listActionLabel,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: layout.minTouchTarget,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  fullWidth: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 44,
    width: '100%',
  },
  label: {
    ...typography.button,
    color: colors.background,
    fontSize: 15,
    fontWeight: '600',
  },
  listAction: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    minHeight: 44,
    paddingVertical: spacing.sm,
  },
  listActionLabel: {
    fontWeight: '600',
  },
});
