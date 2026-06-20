import type { FirestoreTimestamp } from '../types';
import type { CreateRouteInput, Route, UpdateRouteInput } from '../types';
import type { RouteRepository } from './route.repository.interface';

function createTimestamp(): FirestoreTimestamp {
  const now = Math.floor(Date.now() / 1000);
  return { seconds: now, nanoseconds: 0 };
}

function cloneRoutes(routes: Route[]): Route[] {
  return routes.map((route) => ({
    ...route,
    steps: route.steps.map((step) => ({ ...step })),
  }));
}

export function createMockRouteRepository(initialRoutes: Route[]): RouteRepository {
  let routes = cloneRoutes(initialRoutes);

  return {
    getRoutes: async () => cloneRoutes(routes),

    getRouteById: async (routeId) => {
      const route = routes.find((item) => item.id === routeId);
      return route ? cloneRoutes([route])[0] : null;
    },

    getRoutesByGroupId: async (groupId) => {
      return cloneRoutes(routes.filter((item) => item.groupId === groupId));
    },

    createRoute: async (data) => {
      const timestamp = createTimestamp();
      const route: Route = {
        id: `route_${Date.now()}`,
        groupId: data.groupId,
        name: data.name,
        description: data.description ?? '',
        startName: data.startName,
        endName: data.endName,
        isFavorite: false,
        steps: data.steps.map((step) => ({ ...step })),
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      routes = [...routes, route];
      return cloneRoutes([route])[0];
    },

    updateRoute: async (routeId, data) => {
      const index = routes.findIndex((item) => item.id === routeId);
      if (index === -1) {
        throw new Error(`Route not found: ${routeId}`);
      }

      const current = routes[index];
      const updated: Route = {
        ...current,
        ...data,
        steps: data.steps ? data.steps.map((step) => ({ ...step })) : current.steps,
        updatedAt: createTimestamp(),
      };

      routes = routes.map((item) => (item.id === routeId ? updated : item));
      return cloneRoutes([updated])[0];
    },

    deleteRoute: async (routeId) => {
      const exists = routes.some((item) => item.id === routeId);
      if (!exists) {
        throw new Error(`Route not found: ${routeId}`);
      }

      routes = routes.filter((item) => item.id !== routeId);
    },
  };
}
