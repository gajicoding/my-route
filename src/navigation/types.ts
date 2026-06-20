export type BottomTabParamList = {
  Home: undefined;
  Routes: undefined;
  Map: undefined;
  Settings: undefined;
};

export type RouteDetailParams = {
  routeId: string;
};

export type NavigationParams = {
  routeId: string;
};

export type BottomTabName = keyof BottomTabParamList;

export interface BottomTabConfig {
  name: BottomTabName;
  title: string;
}

export const bottomTabs: BottomTabConfig[] = [
  { name: 'Home', title: '홈' },
  { name: 'Routes', title: '경로' },
  { name: 'Map', title: '지도' },
  { name: 'Settings', title: '설정' },
];
