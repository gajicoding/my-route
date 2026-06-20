import type { Route } from '../types';

export const routeService = {
  calculateEstimatedArrival: (_route: Route): number => {
    throw new Error('Not implemented');
  },
  recommendBestRoute: (_routes: Route[]): Route | null => {
    throw new Error('Not implemented');
  },
};
