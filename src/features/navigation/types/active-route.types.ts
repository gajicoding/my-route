import type { FirestoreTimestamp } from '@/features/auth/types';

export type ActiveRouteStatus = 'READY' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface ActiveRouteLocation {
  lat: number;
  lng: number;
}

export interface ActiveRoute {
  routeId: string;
  routeName: string;
  currentStepIndex: number;
  status: ActiveRouteStatus;
  startedAt: FirestoreTimestamp;
  lastLocation: ActiveRouteLocation;
}

export interface StartNavigationInput {
  routeId: string;
  routeName: string;
}
