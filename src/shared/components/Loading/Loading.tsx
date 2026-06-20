import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/shared/theme';

export interface LoadingProps {
  height?: number;
}

export function Loading({ height = 16 }: LoadingProps) {
  return <View style={[styles.skeleton, { height }]} />;
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    width: '100%',
  },
});
