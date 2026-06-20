import type { BusRoute } from '@/shared/types';

export type RouteStepType = 'WALK' | 'BUS' | 'SUBWAY';

export interface GeoPoint {
  name: string;
  lat: number;
  lng: number;
}

export interface WalkStep {
  id: string;
  type: 'WALK';
  from: GeoPoint;
  to: GeoPoint;
  distanceMeter: number;
  estimatedMinutes: number;
}

export interface BusStepStation {
  stationId: string;
  stationName: string;
  lat: number;
  lng: number;
}

export interface BusStep {
  id: string;
  type: 'BUS';
  fromStation: BusStepStation;
  toStation: BusStepStation;
  candidateRoutes: BusRoute[];
}

export interface SubwayLine {
  lineId: string;
  lineName: string;
}

export interface SubwayStepStation {
  stationId: string;
  stationName: string;
}

export interface SubwayStep {
  id: string;
  type: 'SUBWAY';
  line: SubwayLine;
  fromStation: SubwayStepStation;
  toStation: SubwayStepStation;
}

export type RouteStep = WalkStep | BusStep | SubwayStep;

export function isWalkStep(step: RouteStep): step is WalkStep {
  return step.type === 'WALK';
}

export function isBusStep(step: RouteStep): step is BusStep {
  return step.type === 'BUS';
}

export function isSubwayStep(step: RouteStep): step is SubwayStep {
  return step.type === 'SUBWAY';
}
