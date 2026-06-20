import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/shared/theme';

export interface ListSectionProps {
  title: string;
  actionLabel?: string;
}

export function ListSection({ title, actionLabel }: ListSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel ? <Text style={styles.action}>{actionLabel}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  title: {
    ...typography.sectionHeader,
    color: colors.textSecondary,
  },
});
