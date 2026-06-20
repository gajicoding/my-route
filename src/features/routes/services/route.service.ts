import type { Route, RouteStep } from '../types';
import { isBusStep, isSubwayStep, isWalkStep } from '../types';

export interface RouteStats {
  totalWalkMinutes: number;
  totalWalkDistanceMeter: number;
  transferCount: number;
  transportStepCount: number;
}

export interface RouteSummary {
  route: Route;
  stats: RouteStats;
  estimatedMinutes: number;
}

function countTransportSteps(steps: RouteStep[]): number {
  return steps.filter((step) => isBusStep(step) || isSubwayStep(step)).length;
}

export const routeService = {
  getWalkMinutes: (steps: RouteStep[]): number => {
    return steps.reduce((total, step) => {
      if (!isWalkStep(step)) {
        return total;
      }

      return total + step.estimatedMinutes;
    }, 0);
  },

  getWalkDistanceMeter: (steps: RouteStep[]): number => {
    return steps.reduce((total, step) => {
      if (!isWalkStep(step)) {
        return total;
      }

      return total + step.distanceMeter;
    }, 0);
  },

  countTransfers: (steps: RouteStep[]): number => {
    const transportStepCount = countTransportSteps(steps);
    return transportStepCount > 0 ? transportStepCount - 1 : 0;
  },

  calculateEstimatedArrival: (route: Route): number => {
    return routeService.getWalkMinutes(route.steps);
  },

  getRouteStats: (route: Route): RouteStats => {
    const transportStepCount = countTransportSteps(route.steps);

    return {
      totalWalkMinutes: routeService.getWalkMinutes(route.steps),
      totalWalkDistanceMeter: routeService.getWalkDistanceMeter(route.steps),
      transferCount: routeService.countTransfers(route.steps),
      transportStepCount,
    };
  },

  summarizeRoute: (route: Route): RouteSummary => {
    const stats = routeService.getRouteStats(route);

    return {
      route,
      stats,
      estimatedMinutes: stats.totalWalkMinutes,
    };
  },

  recommendBestRoute: (routes: Route[]): Route | null => {
    if (routes.length === 0) {
      return null;
    }

    return routes.reduce((best, current) => {
      const bestStats = routeService.getRouteStats(best);
      const currentStats = routeService.getRouteStats(current);

      if (currentStats.transferCount < bestStats.transferCount) {
        return current;
      }

      if (
        currentStats.transferCount === bestStats.transferCount &&
        currentStats.totalWalkMinutes < bestStats.totalWalkMinutes
      ) {
        return current;
      }

      return best;
    });
  },

  getBusCandidateRouteIds: (route: Route): string[] => {
    const routeIds = new Set<string>();

    for (const step of route.steps) {
      if (!isBusStep(step)) {
        continue;
      }

      for (const candidate of step.candidateRoutes) {
        routeIds.add(candidate.routeId);
      }
    }

    return [...routeIds];
  },

  getSubwayLines: (route: Route): string[] => {
    const lines = new Set<string>();

    for (const step of route.steps) {
      if (!isSubwayStep(step)) {
        continue;
      }

      lines.add(step.line.lineName);
    }

    return [...lines];
  },
};
