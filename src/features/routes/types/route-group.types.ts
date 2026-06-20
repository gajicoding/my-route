import type { TimestampedDocument } from './common.types';

export interface RouteGroup extends TimestampedDocument {
  id: string;
  name: string;
  color: string;
  sortOrder: number;
}

export interface CreateRouteGroupInput {
  name: string;
  color: string;
  sortOrder: number;
}

export interface UpdateRouteGroupInput {
  name?: string;
  color?: string;
  sortOrder?: number;
}
