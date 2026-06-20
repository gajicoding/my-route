import { StyleSheet, View, type ViewProps } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { layout } from '@/shared/constants';
import { colors, spacing } from '@/shared/theme';

export interface ScreenLayoutProps extends ViewProps {
  children: React.ReactNode;
  edges?: Edge[];
  footer?: React.ReactNode;
  scroll?: boolean;
}

export function ScreenLayout({
  children,
  edges = ['top'],
  footer,
  style,
  ...rest
}: ScreenLayoutProps) {
  return (
    <SafeAreaView edges={edges} style={styles.safeArea}>
      <View style={[styles.body, style]} {...rest}>
        {children}
      </View>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  footer: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: spacing.base,
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing.sm,
  },
  safeArea: {
    backgroundColor: colors.surface,
    flex: 1,
  },
});
