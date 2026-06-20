import { Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProviders } from '@/config';
import { navigationTheme } from '@/config/navigation-theme';
import { colors } from '@/shared/theme';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    void SystemUI.setBackgroundColorAsync(colors.surface);
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AppProviders>
          <ThemeProvider value={navigationTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="routes/create" />
              <Stack.Screen name="routes/[routeId]" />
              <Stack.Screen name="navigation/[routeId]" />
            </Stack>
            <StatusBar style="dark" />
          </ThemeProvider>
        </AppProviders>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface,
    flex: 1,
  },
});
