import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/shared/theme';

type LogoVariant = 'splash' | 'login';

const variantConfig: Record<LogoVariant, { dimension: number; iconSize: number; borderRadius: number }> =
  {
    splash: { dimension: 80, iconSize: 36, borderRadius: radius.xl },
    login: { dimension: 56, iconSize: 26, borderRadius: radius.lg },
  };

export function AppLogoMark({
  size = 'lg',
  variant = 'splash',
}: {
  size?: 'lg' | 'md';
  variant?: LogoVariant;
}) {
  const resolvedVariant = size === 'md' ? 'login' : variant;
  const config = variantConfig[resolvedVariant];

  return (
    <View
      style={[
        styles.mark,
        {
          borderRadius: config.borderRadius,
          height: config.dimension,
          width: config.dimension,
        },
        resolvedVariant === 'login' && styles.markLogin,
      ]}
    >
      <Ionicons color={colors.primary} name="git-branch" size={config.iconSize} />
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    alignItems: 'center',
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  markLogin: {
    backgroundColor: colors.primaryLight,
  },
});
