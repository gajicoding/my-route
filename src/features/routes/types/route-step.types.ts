import type { BusRoute } from '@/shared/types';

export type RouteStepType = 'WALK' | 'BUS' | 'SUBWAY';

export interface GeoPoint {
  name: string;
  lat: number;
  lng: number;
}

export interface WalkRouteStep {
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

export interface BusRouteStep {
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

export interface SubwayRouteStep {
  id: string;
  type: 'SUBWAY';
  line: SubwayLine;
  fromStation: SubwayStepStation;
  toStation: SubwayStepStation;
}

export type RouteStep = WalkRouteStep | BusRouteStep | SubwayRouteStep;

export function isWalkRouteStep(step: RouteStep): step is WalkRouteStep {
  return step.type === 'WALK';
}

export function isBusRouteStep(step: RouteStep): step is BusRouteStep {
  return step.type === 'BUS';
}

export function isSubwayRouteStep(step: RouteStep): step is SubwayRouteStep {
  return step.type === 'SUBWAY';
}
