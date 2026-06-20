import type { TimestampedDocument } from './common.types';
import type { RouteStep } from './route-step.types';

export interface Route extends TimestampedDocument {
  id: string;
  groupId: string;
  name: string;
  description: string;
  startName: string;
  endName: string;
  isFavorite: boolean;
  steps: RouteStep[];
}

export interface CreateRouteInput {
  groupId: string;
  name: string;
  description?: string;
  startName: string;
  endName: string;
  steps: RouteStep[];
}

export interface UpdateRouteInput {
  groupId?: string;
  name?: string;
  description?: string;
  startName?: string;
  endName?: string;
  isFavorite?: boolean;
  steps?: RouteStep[];
}
