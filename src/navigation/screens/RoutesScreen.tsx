import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { routeDetailHref } from '@/navigation/paths';
import { RouteGroupAccordion } from '@/shared/components/RouteGroupAccordion';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { ScreenLayout } from '@/shared/components/ScreenLayout';
import { layout } from '@/shared/constants';
import { spacing } from '@/shared/theme';

import { routesMock } from './routes.mock';

export function RoutesScreen() {
  const router = useRouter();

  return (
    <ScreenLayout>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader showRight={false} title="내 경로" />

        {routesMock.groups.map((group) => (
          <RouteGroupAccordion
            key={group.id}
            defaultExpanded={group.defaultExpanded}
            groupName={group.name}
            onRoutePress={(routeId) => router.push(routeDetailHref(routeId))}
            routes={group.routes}
          />
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing.sm,
  },
});
