import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { navigationHref } from '@/navigation/paths';
import { Button } from '@/shared/components/Button';
import { RouteTimeline } from '@/shared/components/RouteTimeline';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { ScreenLayout } from '@/shared/components/ScreenLayout';
import { StatusPill } from '@/shared/components/StatusPill';
import type { RouteDetailParams } from '@/navigation/types';
import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';

import { routeDetailMock } from './route-detail.mock';

export function RouteDetailScreen() {
  const router = useRouter();
  const { routeId } = useLocalSearchParams<RouteDetailParams>();

  const handleStartNavigation = () => {
    if (!routeId) {
      return;
    }

    router.push(navigationHref(routeId));
  };

  return (
    <ScreenLayout
      footer={<Button label="안내 시작" onPress={handleStartNavigation} variant="fullWidth" />}
      style={styles.layout}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          onBackPress={() => router.back()}
          onRightPress={() => undefined}
          rightIcon="create-outline"
          title={routeDetailMock.name}
        />

        <View style={styles.summary}>
          <Text style={styles.arrival}>{routeDetailMock.estimatedArrival}</Text>
          <StatusPill
            label={routeDetailMock.transferStatusLabel}
            status={routeDetailMock.transferStatus}
          />
          <Text style={styles.stats}>
            {routeDetailMock.stats.totalMinutes}분 · 환승 {routeDetailMock.stats.transferCount}회
            · 도보 {routeDetailMock.stats.walkMinutes}분
          </Text>
        </View>

        <RouteTimeline steps={routeDetailMock.steps} />
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  arrival: {
    ...typography.display,
    color: colors.textPrimary,
    fontSize: 36,
    letterSpacing: -0.5,
  },
  content: {
    gap: layout.sectionGap,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing.sm,
  },
  layout: {
    backgroundColor: colors.background,
  },
  stats: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  summary: {
    gap: spacing.sm,
  },
});
