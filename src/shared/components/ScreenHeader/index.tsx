import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';

export interface ScreenHeaderProps {
  title: string;
  onBackPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  showRight?: boolean;
}

export function ScreenHeader({
  title,
  onBackPress,
  onRightPress,
  rightIcon = 'notifications-outline',
  showRight = true,
}: ScreenHeaderProps) {
  const shouldShowRight = showRight && (onRightPress !== undefined || onBackPress === undefined);

  return (
    <View style={styles.container}>
      <View style={styles.leading}>
        {onBackPress ? (
          <Pressable
            accessibilityLabel="뒤로"
            accessibilityRole="button"
            hitSlop={8}
            onPress={onBackPress}
            style={styles.backButton}
          >
            <Ionicons color={colors.textPrimary} name="chevron-back" size={24} />
          </Pressable>
        ) : null}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>

      {shouldShowRight ? (
        <Pressable
          accessibilityLabel="추가 작업"
          accessibilityRole="button"
          hitSlop={8}
          onPress={onRightPress}
          style={styles.trailingButton}
        >
          <View style={styles.trailingIconWrap}>
            <Ionicons color={colors.textPrimary} name={rightIcon} size={20} />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    height: layout.minTouchTarget,
    justifyContent: 'center',
    marginLeft: -spacing.sm,
    width: layout.minTouchTarget,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: layout.minTouchTarget,
    paddingVertical: spacing.xs,
  },
  leading: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    minWidth: 0,
    paddingRight: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    flexShrink: 1,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.3,
    textAlign: 'left',
  },
  trailingButton: {
    alignItems: 'center',
    height: layout.minTouchTarget,
    justifyContent: 'center',
    marginRight: -spacing.xs,
    width: layout.minTouchTarget,
  },
  trailingIconWrap: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
});
