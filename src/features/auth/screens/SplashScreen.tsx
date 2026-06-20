import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { AppLogoMark } from '@/features/auth/components';
import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';
import { useAuthStore } from '@/store';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

const SPLASH_DURATION_MS = 1600;

export function SplashScreenView() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isReady, setIsReady] = useState(false);

  const navigateNext = useCallback(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
      return;
    }

    router.replace('/login');
  }, [isAuthenticated, router]);

  useEffect(() => {
    let mounted = true;

    async function prepare() {
      await SplashScreen.hideAsync();
      await delay(SPLASH_DURATION_MS);

      if (mounted) {
        setIsReady(true);
      }
    }

    void prepare();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    navigateNext();
  }, [isReady, navigateNext]);

  return (
    <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(250)} style={styles.container}>
      <View style={styles.content}>
        <AppLogoMark size="lg" />
        <Text style={styles.title}>나만의 경로</Text>
        <Text style={styles.subtitle}>내 경로, 실시간으로</Text>
      </View>
    </Animated.View>
  );
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: layout.screenPaddingHorizontal,
  },
  content: {
    alignItems: 'center',
    gap: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.primaryLight,
    fontSize: 16,
  },
  title: {
    ...typography.heading,
    color: colors.background,
    fontSize: 28,
    marginTop: spacing.sm,
  },
});
