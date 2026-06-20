import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text } from 'react-native';

import { colors } from '@/shared/theme';

import type { SocialProvider } from '../types';

export function SocialProviderIcon({ provider }: { provider: SocialProvider }) {
  if (provider === 'kakao') {
    return <Ionicons color="#191919" name="chatbubble" size={17} />;
  }

  if (provider === 'naver') {
    return <Text style={styles.naverLabel}>N</Text>;
  }

  return <Ionicons color="#4285F4" name="logo-google" size={18} />;
}

const styles = StyleSheet.create({
  naverLabel: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 18,
  },
});
