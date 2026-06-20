import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppLogoMark, SocialLoginButton } from '@/features/auth/components';
import { authService } from '@/features/auth/services';
import type { SocialProvider } from '@/features/auth/types';
import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';
import { useAuthStore } from '@/store';

const socialProviders: SocialProvider[] = ['kakao', 'naver', 'google'];

export function LoginScreen() {
  const router = useRouter();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(null);

  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      setLoadingProvider(provider);
      const { uid } = await authService.signInWithProvider(provider);
      setAuthenticated(uid);
      router.replace('/(tabs)');
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topZone}>
          <View style={styles.hero}>
            <AppLogoMark size="md" variant="login" />
            <Text style={styles.title}>나만의 경로</Text>
            <Text style={styles.description}>
              저장한 경로와 실시간 도착 정보를{'\n'}한곳에서 확인하세요
            </Text>
          </View>
        </View>

        <View style={styles.actionSection}>
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>간편 로그인</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.buttonList}>
            {socialProviders.map((provider) => (
              <SocialLoginButton
                key={provider}
                disabled={loadingProvider !== null && loadingProvider !== provider}
                loading={loadingProvider === provider}
                onPress={() => void handleSocialLogin(provider)}
                provider={provider}
              />
            ))}
          </View>
        </View>

        <View style={styles.bottomZone}>
          <Text style={styles.terms}>
            로그인 시{' '}
            <Text style={styles.termsLink}>이용약관</Text>
            {' · '}
            <Text style={styles.termsLink}>개인정보 처리방침</Text>
            에 동의합니다.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionSection: {
    gap: spacing.lg,
    paddingTop: spacing['2xl'],
  },
  bottomZone: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingBottom: spacing.lg,
  },
  buttonList: {
    gap: spacing.sm,
  },
  container: {
    flex: 1,
    paddingHorizontal: layout.screenPaddingHorizontal,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  dividerLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  dividerLine: {
    backgroundColor: colors.border,
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  hero: {
    alignItems: 'center',
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  terms: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  termsLink: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: spacing.base,
  },
  topZone: {
    alignItems: 'center',
    flex: 5,
    justifyContent: 'flex-end',
  },
});
