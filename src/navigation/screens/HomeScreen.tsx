import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { navigationHref, routeDetailHref } from '@/navigation/paths';
import { Card } from '@/shared/components/Card';
import { CurrentRouteCard } from '@/shared/components/CurrentRouteCard';
import { RecommendedRouteItem } from '@/shared/components/RecommendedRouteItem';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { ScreenLayout } from '@/shared/components/ScreenLayout';
import { SegmentControl } from '@/shared/components/SegmentControl';
import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';

import { homeMock, type HomeRecommendTab } from './home.mock';

const CURRENT_ROUTE_ID = 'commute-a';

export function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<HomeRecommendTab>('today');

  const recommendedRoutes = homeMock.recommendedRoutes[activeTab];

  const openNavigation = (routeId: string) => {
    router.push(navigationHref(routeId));
  };

  const openRouteDetail = (routeId: string) => {
    router.push(routeDetailHref(routeId));
  };

  return (
    <ScreenLayout>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBlock}>
          <ScreenHeader
            onRightPress={() => undefined}
            rightIcon="notifications-outline"
            title="나만의 경로"
          />
          <Text style={styles.greeting}>{homeMock.greeting}</Text>
        </View>

        <CurrentRouteCard
          estimatedArrival={homeMock.currentRoute.estimatedArrival}
          name={homeMock.currentRoute.name}
          onRouteSelectPress={() => openRouteDetail(CURRENT_ROUTE_ID)}
          onStartPress={() => openNavigation(CURRENT_ROUTE_ID)}
          pathLabel={homeMock.currentRoute.pathLabel}
          timelineSteps={homeMock.currentRoute.timelineSteps}
          transferMarginMinutes={homeMock.currentRoute.transferMarginMinutes}
          transferStatus={homeMock.currentRoute.transferStatus}
        />

        <View style={styles.recommendSection}>
          <Text style={styles.sectionTitle}>추천 경로</Text>
          <SegmentControl
            onChange={setActiveTab}
            options={homeMock.recommendTabs}
            value={activeTab}
          />
          <Card style={styles.recommendCard} variant="subtle">
            {recommendedRoutes.map((route, index) => (
              <RecommendedRouteItem
                key={route.id}
                description={route.description}
                durationLabel={route.durationLabel}
                isLast={index === recommendedRoutes.length - 1}
                name={route.name}
                onPress={() => openRouteDetail(route.id)}
                transferCount={route.transferCount}
                transferStatus={'transferStatus' in route ? route.transferStatus : undefined}
                transferStatusLabel={
                  'transferStatusLabel' in route ? route.transferStatusLabel : undefined
                }
                variant="list"
              />
            ))}
          </Card>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing.sm,
  },
  greeting: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: -spacing.xs,
  },
  headerBlock: {
    gap: spacing.xs,
  },
  recommendCard: {
    overflow: 'hidden',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  recommendSection: {
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
