import { StyleSheet, View } from 'react-native';

import { colors } from '@/shared/theme';

export function ListDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
  },
});
