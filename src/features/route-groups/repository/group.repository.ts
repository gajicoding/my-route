import type {
  CreateRouteGroupInput,
  RouteGroup,
  UpdateRouteGroupInput,
} from '../types';

export const groupRepository = {
  getRouteGroups: async (): Promise<RouteGroup[]> => {
    throw new Error('Not implemented');
  },
  getRouteGroupById: async (_groupId: string): Promise<RouteGroup | null> => {
    throw new Error('Not implemented');
  },
  createRouteGroup: async (_data: CreateRouteGroupInput): Promise<RouteGroup> => {
    throw new Error('Not implemented');
  },
  updateRouteGroup: async (
    _groupId: string,
    _data: UpdateRouteGroupInput,
  ): Promise<RouteGroup> => {
    throw new Error('Not implemented');
  },
  deleteRouteGroup: async (_groupId: string): Promise<void> => {
    throw new Error('Not implemented');
  },
};
