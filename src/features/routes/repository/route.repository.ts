import type { CreateRouteInput, Route, UpdateRouteInput } from '../types';

export const routeRepository = {
  getRoutes: async (): Promise<Route[]> => {
    throw new Error('Not implemented');
  },
  getRouteById: async (_routeId: string): Promise<Route | null> => {
    throw new Error('Not implemented');
  },
  createRoute: async (_data: CreateRouteInput): Promise<Route> => {
    throw new Error('Not implemented');
  },
  updateRoute: async (_routeId: string, _data: UpdateRouteInput): Promise<Route> => {
    throw new Error('Not implemented');
  },
  deleteRoute: async (_routeId: string): Promise<void> => {
    throw new Error('Not implemented');
  },
};
