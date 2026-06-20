import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';
import { StyleSheet } from 'react-native';

import { bottomTabs } from '@/navigation/types';
import { layout } from '@/shared/constants';
import { colors, typography } from '@/shared/theme';

type TabRouteName = 'index' | 'routes' | 'map' | 'settings';

const tabIcons: Record<
  TabRouteName,
  { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }
> = {
  index: { active: 'home', inactive: 'home-outline' },
  routes: { active: 'git-branch', inactive: 'git-branch-outline' },
  map: { active: 'map', inactive: 'map-outline' },
  settings: { active: 'settings', inactive: 'settings-outline' },
};

const tabTitles: Record<TabRouteName, string> = {
  index: bottomTabs.find((tab) => tab.name === 'Home')?.title ?? '홈',
  routes: bottomTabs.find((tab) => tab.name === 'Routes')?.title ?? '경로',
  map: bottomTabs.find((tab) => tab.name === 'Map')?.title ?? '지도',
  settings: bottomTabs.find((tab) => tab.name === 'Settings')?.title ?? '설정',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const tabName = route.name as TabRouteName;
        const icon = tabIcons[tabName];

        return {
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          title: tabTitles[tabName],
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? icon.active : icon.inactive;

            return <Ionicons color={color} name={iconName} size={size} />;
          },
        };
      }}
    >
      <Tabs.Screen name="index" options={{ title: tabTitles.index }} />
      <Tabs.Screen name="routes" options={{ title: tabTitles.routes }} />
      <Tabs.Screen name="map" options={{ title: tabTitles.map }} />
      <Tabs.Screen name="settings" options={{ title: tabTitles.settings }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    height: layout.bottomNavigationHeight,
  },
  tabBarLabel: {
    ...typography.caption,
  },
});
