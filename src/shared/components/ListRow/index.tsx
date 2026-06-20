import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';

import { layout } from '@/shared/constants';
import { colors, spacing } from '@/shared/theme';

export interface ListRowProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  showDivider?: boolean;
}

export function ListRow({
  children,
  onPress,
  showDivider = false,
  style,
  ...rest
}: ListRowProps) {
  const content = (
    <View style={[styles.row, style]} {...rest}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        {content}
        {showDivider ? <View style={styles.divider} /> : null}
      </Pressable>
    );
  }

  return (
    <>
      {content}
      {showDivider ? <View style={styles.divider} /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: spacing.base,
  },
  pressed: {
    backgroundColor: colors.surfaceMuted,
  },
  row: {
    backgroundColor: colors.background,
    minHeight: layout.listRowMinHeight,
    paddingHorizontal: layout.listRowPaddingHorizontal,
    paddingVertical: layout.listRowPaddingVertical,
  },
});
