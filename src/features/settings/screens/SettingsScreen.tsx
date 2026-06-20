import { StyleSheet, Text, View } from 'react-native';

import { layout } from '@/shared/constants';
import { colors, typography } from '@/shared/theme';

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정</Text>
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
