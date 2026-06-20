import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { authService } from '@/features/auth/services';
import { Card } from '@/shared/components/Card';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { ScreenLayout } from '@/shared/components/ScreenLayout';
import { SettingsListRow } from '@/shared/components/SettingsListRow';
import { layout } from '@/shared/constants';
import { colors, radius, spacing, typography } from '@/shared/theme';
import { useAuthStore } from '@/store';

import { settingsMock } from './settings.mock';

export function SettingsScreen() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { profile, notification, app } = settingsMock;

  const handleLogout = async () => {
    await authService.signOut();
    clearAuth();
    router.replace('/login');
  };

  return (
    <ScreenLayout>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader showRight={false} title="설정" />

        <Card style={styles.profileCard} variant="subtle">
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLabel}>{profile.name.slice(0, 1)}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileEmail}>{profile.email}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림</Text>
          <Card style={styles.groupCard} variant="subtle">
            <SettingsListRow
              icon="notifications-outline"
              label="도착 알림"
              showChevron={false}
              value={notification.arrivalAlert ? '켜짐' : '꺼짐'}
            />
            <SettingsListRow
              icon="swap-horizontal-outline"
              isLast
              label="환승 알림"
              showChevron={false}
              value={notification.transferAlert ? '켜짐' : '꺼짐'}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정</Text>
          <Card style={styles.groupCard} variant="subtle">
            <SettingsListRow
              icon="log-out-outline"
              isLast
              label="로그아웃"
              onPress={() => void handleLogout()}
              showChevron={false}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱</Text>
          <Card style={styles.groupCard} variant="subtle">
            <SettingsListRow icon="information-circle-outline" isLast label="버전" value={app.version} />
          </Card>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  avatarLabel: {
    ...typography.title,
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    gap: spacing.xl,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing.sm,
  },
  groupCard: {
    overflow: 'hidden',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  profileCard: {
    padding: spacing.base,
  },
  profileEmail: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  profileRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.title,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});
