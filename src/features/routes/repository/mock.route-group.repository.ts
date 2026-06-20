import type { FirestoreTimestamp } from '../types';
import type {
  CreateRouteGroupInput,
  RouteGroup,
  UpdateRouteGroupInput,
} from '../types';
import type { RouteGroupRepository } from './route-group.repository.interface';

function createTimestamp(): FirestoreTimestamp {
  const now = Math.floor(Date.now() / 1000);
  return { seconds: now, nanoseconds: 0 };
}

function cloneGroups(groups: RouteGroup[]): RouteGroup[] {
  return groups.map((group) => ({ ...group }));
}

export function createMockRouteGroupRepository(
  initialGroups: RouteGroup[],
): RouteGroupRepository {
  let groups = cloneGroups(initialGroups);

  return {
    getRouteGroups: async () => cloneGroups(groups),

    getRouteGroupById: async (groupId) => {
      const group = groups.find((item) => item.id === groupId);
      return group ? { ...group } : null;
    },

    createRouteGroup: async (data) => {
      const timestamp = createTimestamp();
      const group: RouteGroup = {
        id: `group_${Date.now()}`,
        name: data.name,
        color: data.color,
        sortOrder: data.sortOrder,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      groups = [...groups, group];
      return { ...group };
    },

    updateRouteGroup: async (groupId, data) => {
      const index = groups.findIndex((item) => item.id === groupId);
      if (index === -1) {
        throw new Error(`Route group not found: ${groupId}`);
      }

      const updated: RouteGroup = {
        ...groups[index],
        ...data,
        updatedAt: createTimestamp(),
      };

      groups = groups.map((item) => (item.id === groupId ? updated : item));
      return { ...updated };
    },

    deleteRouteGroup: async (groupId) => {
      const exists = groups.some((item) => item.id === groupId);
      if (!exists) {
        throw new Error(`Route group not found: ${groupId}`);
      }

      groups = groups.filter((item) => item.id !== groupId);
    },
  };
}
