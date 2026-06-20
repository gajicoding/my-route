import type { RouteStep, RouteStepType } from '../types';

function createStepId(type: RouteStepType): string {
  return `step_${type.toLowerCase()}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function createPlaceholderStep(type: RouteStepType, index: number): RouteStep {
  const stepNumber = index + 1;

  switch (type) {
    case 'WALK':
      return {
        id: createStepId(type),
        type: 'WALK',
        from: {
          name: `출발지 ${stepNumber}`,
          lat: 0,
          lng: 0,
        },
        to: {
          name: `도착지 ${stepNumber}`,
          lat: 0,
          lng: 0,
        },
        distanceMeter: 0,
        estimatedMinutes: 0,
      };
    case 'BUS':
      return {
        id: createStepId(type),
        type: 'BUS',
        fromStation: {
          stationId: `bus_from_${stepNumber}`,
          stationName: `승차 정류장 ${stepNumber}`,
          lat: 0,
          lng: 0,
        },
        toStation: {
          stationId: `bus_to_${stepNumber}`,
          stationName: `하차 정류장 ${stepNumber}`,
          lat: 0,
          lng: 0,
        },
        candidateRoutes: [],
      };
    case 'SUBWAY':
      return {
        id: createStepId(type),
        type: 'SUBWAY',
        line: {
          lineId: 'placeholder',
          lineName: '노선 선택',
        },
        fromStation: {
          stationId: `subway_from_${stepNumber}`,
          stationName: `승차역 ${stepNumber}`,
        },
        toStation: {
          stationId: `subway_to_${stepNumber}`,
          stationName: `하차역 ${stepNumber}`,
        },
      };
  }
}
