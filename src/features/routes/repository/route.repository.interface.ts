import type { CreateRouteInput, Route, UpdateRouteInput } from '../types';

export interface RouteRepository {
  getRoutes(): Promise<Route[]>;
  getRouteById(routeId: string): Promise<Route | null>;
  getRoutesByGroupId(groupId: string): Promise<Route[]>;
  createRoute(data: CreateRouteInput): Promise<Route>;
  updateRoute(routeId: string, data: UpdateRouteInput): Promise<Route>;
  deleteRoute(routeId: string): Promise<void>;
}
