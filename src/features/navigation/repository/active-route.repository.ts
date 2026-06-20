import type { ActiveRoute, StartNavigationInput } from '../types';

export const activeRouteRepository = {
  getActiveRoute: async (_activeRouteId: string): Promise<ActiveRoute | null> => {
    throw new Error('Not implemented');
  },
  startNavigation: async (_data: StartNavigationInput): Promise<ActiveRoute> => {
    throw new Error('Not implemented');
  },
  cancelNavigation: async (_activeRouteId: string): Promise<void> => {
    throw new Error('Not implemented');
  },
};
