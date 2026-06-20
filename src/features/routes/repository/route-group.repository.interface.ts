import type {
  CreateRouteGroupInput,
  RouteGroup,
  UpdateRouteGroupInput,
} from '../types';

export interface RouteGroupRepository {
  getRouteGroups(): Promise<RouteGroup[]>;
  getRouteGroupById(groupId: string): Promise<RouteGroup | null>;
  createRouteGroup(data: CreateRouteGroupInput): Promise<RouteGroup>;
  updateRouteGroup(groupId: string, data: UpdateRouteGroupInput): Promise<RouteGroup>;
  deleteRouteGroup(groupId: string): Promise<void>;
}
