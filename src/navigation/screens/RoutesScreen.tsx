import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { RouteGroupCreateModal } from '@/features/route-groups/components/RouteGroupCreateModal';
import { routeCreateHref, routeDetailHref } from '@/navigation/paths';
import { ExpandableFab } from '@/shared/components/ExpandableFab';
import { RouteGroupAccordion } from '@/shared/components/RouteGroupAccordion';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { ScreenLayout } from '@/shared/components/ScreenLayout';
import { layout } from '@/shared/constants';
import { spacing } from '@/shared/theme';

import { routesMock } from './routes.mock';

const FAB_EXPANDED_EXTRA_HEIGHT = 120;

export function RoutesScreen() {
  const router = useRouter();
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);

  const fabActions = useMemo(
    () => [
      {
        id: 'create-group',
        label: '그룹 만들기',
        icon: 'folder-outline' as const,
        onPress: () => setIsGroupModalVisible(true),
      },
      {
        id: 'create-route',
        label: '경로 만들기',
        icon: 'map-outline' as const,
        onPress: () => router.push(routeCreateHref()),
      },
    ],
    [router],
  );

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

      <ExpandableFab actions={fabActions} hidden={isGroupModalVisible} />

      <RouteGroupCreateModal
        onClose={() => setIsGroupModalVisible(false)}
        visible={isGroupModalVisible}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    paddingBottom: spacing['2xl'] + layout.fabSize + FAB_EXPANDED_EXTRA_HEIGHT,
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing.sm,
  },
});
