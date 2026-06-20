export const queryKeys = {
  routes: {
    all: ['routes'] as const,
    detail: (routeId: string) => ['route', routeId] as const,
    byGroup: (groupId: string) => ['routes', 'group', groupId] as const,
  },
  routeGroups: {
    all: ['routeGroups'] as const,
    detail: (groupId: string) => ['routeGroup', groupId] as const,
  },
  busArrival: {
    byStation: (stationId: string) => ['busArrival', stationId] as const,
  },
  routeRecommendation: {
    all: ['routeRecommendation'] as const,
  },
} as const;
