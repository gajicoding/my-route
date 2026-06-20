import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';
import { shadows } from '@/shared/theme/shadows';

export interface ExpandableFabAction {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export interface ExpandableFabProps {
  actions: ExpandableFabAction[];
  hidden?: boolean;
}

const SUB_ACTION_SIZE = 48;
const BUTTON_SLOT_SIZE = layout.fabSize;
const LABEL_MIN_WIDTH = 104;

const EXIT_DURATION_MS = 120;

export function ExpandableFab({ actions, hidden = false }: ExpandableFabProps) {
  const [expanded, setExpanded] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const actionsOpacity = useSharedValue(0);

  const mainIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(expanded ? '45deg' : '0deg', { duration: 200 }) }],
  }));

  const hideActions = useCallback(() => {
    setActionsVisible(false);
  }, []);

  const actionsStyle = useAnimatedStyle(() => ({
    opacity: actionsOpacity.value,
  }));

  useEffect(() => {
    if (expanded) {
      setActionsVisible(true);

      if (Platform.OS === 'android') {
        actionsOpacity.value = 1;
        return;
      }

      actionsOpacity.value = withTiming(1, { duration: 180 });
      return;
    }

    if (Platform.OS === 'android') {
      actionsOpacity.value = 0;
      hideActions();
      return;
    }

    actionsOpacity.value = withTiming(0, { duration: EXIT_DURATION_MS }, (finished) => {
      if (finished) {
        runOnJS(hideActions)();
      }
    });
  }, [actionsOpacity, expanded, hideActions]);

  const handleToggle = useCallback(() => {
    setExpanded((current) => !current);
  }, []);

  const handleActionPress = useCallback((action: ExpandableFabAction) => {
    setExpanded(false);
    action.onPress();
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={styles.container}>
      {actionsVisible ? (
        <Animated.View
          pointerEvents={expanded ? 'auto' : 'none'}
          style={[styles.actions, Platform.OS !== 'android' && actionsStyle]}
        >
          {actions.map((action, index) => (
            <Animated.View
              entering={FadeInDown.delay(index * 40).duration(180)}
              key={action.id}
              style={styles.actionRow}
            >
              <Text numberOfLines={1} style={styles.actionLabel}>
                {action.label}
              </Text>
              <View style={styles.buttonSlot}>
                <View style={styles.actionButtonShadow}>
                  <Pressable
                    accessibilityLabel={action.label}
                    accessibilityRole="button"
                    onPress={() => handleActionPress(action)}
                    style={styles.actionButton}
                  >
                    <Ionicons color={colors.primary} name={action.icon} size={22} />
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          ))}
        </Animated.View>
      ) : null}

      <View style={styles.mainButtonSlot}>
        <View style={styles.mainButtonShadow}>
          <Pressable
            accessibilityLabel={expanded ? '메뉴 닫기' : '만들기 메뉴 열기'}
            accessibilityRole="button"
            accessibilityState={{ expanded }}
            onPress={handleToggle}
            style={({ pressed }) => [styles.mainButton, pressed && styles.mainButtonPressed]}
          >
            <Animated.View style={mainIconStyle}>
              <Ionicons color={colors.background} name="add" size={28} />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: SUB_ACTION_SIZE / 2,
    borderWidth: StyleSheet.hairlineWidth,
    height: SUB_ACTION_SIZE,
    justifyContent: 'center',
    width: SUB_ACTION_SIZE,
  },
  actionButtonShadow: {
    backgroundColor: colors.background,
    borderRadius: SUB_ACTION_SIZE / 2,
    ...shadows.fabSub,
  },
  actionLabel: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    minWidth: LABEL_MIN_WIDTH,
    textAlign: 'right',
  },
  actionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    overflow: 'visible',
  },
  actions: {
    alignItems: 'flex-end',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    overflow: 'visible',
  },
  buttonSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    width: BUTTON_SLOT_SIZE,
  },
  container: {
    alignItems: 'flex-end',
    bottom: spacing.lg,
    overflow: 'visible',
    position: 'absolute',
    right: layout.screenPaddingHorizontal,
  },
  mainButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: BUTTON_SLOT_SIZE / 2,
    height: BUTTON_SLOT_SIZE,
    justifyContent: 'center',
    width: BUTTON_SLOT_SIZE,
  },
  mainButtonShadow: {
    borderRadius: BUTTON_SLOT_SIZE / 2,
    ...shadows.fabMain,
  },
  mainButtonSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: BUTTON_SLOT_SIZE,
  },
  mainButtonPressed: {
    backgroundColor: colors.primaryDark,
  },
});
