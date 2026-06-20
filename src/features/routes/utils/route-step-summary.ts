import type { RouteStep } from '../types';
import { isBusStep, isSubwayStep, isWalkStep } from '../types';

export interface RouteStepSummary {
  title: string;
  subtitle: string;
}

const stepTypeLabels = {
  WALK: '도보',
  BUS: '버스',
  SUBWAY: '지하철',
} as const;

export function getRouteStepTypeLabel(type: RouteStep['type']): string {
  return stepTypeLabels[type];
}

export function getRouteStepSummary(step: RouteStep): RouteStepSummary {
  if (isWalkStep(step)) {
    return {
      title: stepTypeLabels.WALK,
      subtitle:
        step.estimatedMinutes > 0
          ? `${step.from.name} → ${step.to.name} · ${step.estimatedMinutes}분`
          : `${step.from.name} → ${step.to.name}`,
    };
  }

  if (isBusStep(step)) {
    const routeNames = step.candidateRoutes.map((route) => route.routeName).join(', ');
    return {
      title: stepTypeLabels.BUS,
      subtitle: routeNames
        ? `${step.fromStation.stationName} → ${step.toStation.stationName} · ${routeNames}`
        : `${step.fromStation.stationName} → ${step.toStation.stationName}`,
    };
  }

  if (isSubwayStep(step)) {
    return {
      title: step.line.lineName,
      subtitle: `${step.fromStation.stationName} → ${step.toStation.stationName}`,
    };
  }

  return {
    title: '단계',
    subtitle: '',
  };
}
