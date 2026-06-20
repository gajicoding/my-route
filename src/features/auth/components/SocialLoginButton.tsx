import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/shared/theme';

import type { SocialProvider } from '../types';

import { SocialProviderIcon } from './SocialProviderIcon';

export interface SocialLoginButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const providerConfig: Record<
  SocialProvider,
  { label: string; backgroundColor: string; textColor: string; borderColor?: string }
> = {
  kakao: {
    label: '카카오로 계속하기',
    backgroundColor: '#FEE500',
    textColor: '#191919',
  },
  naver: {
    label: '네이버로 계속하기',
    backgroundColor: '#03C75A',
    textColor: colors.background,
  },
  google: {
    label: 'Google로 계속하기',
    backgroundColor: colors.background,
    textColor: colors.textPrimary,
    borderColor: colors.border,
  },
};

export function SocialLoginButton({
  provider,
  onPress,
  loading = false,
  disabled = false,
}: SocialLoginButtonProps) {
  const config = providerConfig[provider];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor ?? 'transparent',
        },
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconSlot}>
          {loading ? (
            <ActivityIndicator color={config.textColor} size="small" />
          ) : (
            <SocialProviderIcon provider={provider} />
          )}
        </View>
        {!loading ? (
          <Text style={[styles.label, { color: config.textColor }]}>{config.label}</Text>
        ) : (
          <Text style={[styles.label, { color: config.textColor, opacity: 0 }]}>
            {config.label}
          </Text>
        )}
        <View style={styles.iconSlot} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    height: 48,
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
  },
  disabled: {
    opacity: 0.55,
  },
  iconSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
  },
  label: {
    ...typography.body,
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.88,
  },
});
