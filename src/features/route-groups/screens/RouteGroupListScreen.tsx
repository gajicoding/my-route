import { StyleSheet, Text, View } from 'react-native';

import { layout } from '@/shared/constants';
import { colors, typography } from '@/shared/theme';

export function RouteGroupListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>경로 그룹</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingVertical: layout.screenPaddingVertical,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
});
