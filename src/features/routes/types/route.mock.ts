import type { FirestoreTimestamp } from './common.types';
import type { RouteGroup } from './route-group.types';
import type { Route } from './route.types';
import type { BusStep, RouteStep, SubwayStep, WalkStep } from './route-step.types';

const mockTimestamp: FirestoreTimestamp = {
  seconds: 1_704_067_200,
  nanoseconds: 0,
};

export const mockWalkStepHomeToBusStop: WalkStep = {
  id: 'step_walk_001',
  type: 'WALK',
  from: {
    name: '집',
    lat: 37.497,
    lng: 127.028,
  },
  to: {
    name: '집앞정류장',
    lat: 37.498,
    lng: 127.029,
  },
  distanceMeter: 250,
  estimatedMinutes: 3,
};

export const mockBusStepToGangnam: BusStep = {
  id: 'step_bus_001',
  type: 'BUS',
  fromStation: {
    stationId: '100000001',
    stationName: '집앞정류장',
    lat: 37.497,
    lng: 127.028,
  },
  toStation: {
    stationId: '100000002',
    stationName: '강남역',
    lat: 37.498,
    lng: 127.031,
  },
  candidateRoutes: [
    { routeId: '341', routeName: '341' },
    { routeId: '360', routeName: '360' },
    { routeId: '146', routeName: '146' },
  ],
};

export const mockWalkStepTransfer: WalkStep = {
  id: 'step_walk_002',
  type: 'WALK',
  from: {
    name: '강남역',
    lat: 37.498,
    lng: 127.031,
  },
  to: {
    name: '강남역 2호선',
    lat: 37.498,
    lng: 127.032,
  },
  distanceMeter: 120,
  estimatedMinutes: 4,
};

export const mockSubwayStepGangnamToSeolleung: SubwayStep = {
  id: 'step_subway_001',
  type: 'SUBWAY',
  line: {
    lineId: '2',
    lineName: '2호선',
  },
  fromStation: {
    stationId: 'gangnam',
    stationName: '강남역',
  },
  toStation: {
    stationId: 'seolleung',
    stationName: '선릉역',
  },
};

export const mockWalkStepToOffice: WalkStep = {
  id: 'step_walk_003',
  type: 'WALK',
  from: {
    name: '선릉역',
    lat: 37.504,
    lng: 127.049,
  },
  to: {
    name: '회사',
    lat: 37.505,
    lng: 127.051,
  },
  distanceMeter: 400,
  estimatedMinutes: 5,
};

export const mockCommuteRouteSteps: RouteStep[] = [
  mockWalkStepHomeToBusStop,
  mockBusStepToGangnam,
  mockWalkStepTransfer,
  mockSubwayStepGangnamToSeolleung,
  mockWalkStepToOffice,
];

export const mockRouteGroups: RouteGroup[] = [
  {
    id: 'group_commute',
    name: '출퇴근',
    color: '#FFD84D',
    sortOrder: 1,
    createdAt: mockTimestamp,
    updatedAt: mockTimestamp,
  },
  {
    id: 'group_workout',
    name: '운동',
    color: '#2563EB',
    sortOrder: 2,
    createdAt: mockTimestamp,
    updatedAt: mockTimestamp,
  },
  {
    id: 'group_weekend',
    name: '주말',
    color: '#16A34A',
    sortOrder: 3,
    createdAt: mockTimestamp,
    updatedAt: mockTimestamp,
  },
];

export const mockCommuteRoute: Route = {
  id: 'route_001',
  groupId: 'group_commute',
  name: '출근 A',
  description: '버스 + 지하철',
  startName: '집',
  endName: '회사',
  isFavorite: true,
  steps: mockCommuteRouteSteps,
  createdAt: mockTimestamp,
  updatedAt: mockTimestamp,
};

export const mockEveningRoute: Route = {
  id: 'route_002',
  groupId: 'group_commute',
  name: '퇴근',
  description: '지하철 + 버스',
  startName: '회사',
  endName: '집',
  isFavorite: false,
  steps: [
    {
      id: 'step_walk_004',
      type: 'WALK',
      from: { name: '회사', lat: 37.505, lng: 127.051 },
      to: { name: '선릉역', lat: 37.504, lng: 127.049 },
      distanceMeter: 400,
      estimatedMinutes: 5,
    },
    {
      id: 'step_subway_002',
      type: 'SUBWAY',
      line: { lineId: '2', lineName: '2호선' },
      fromStation: { stationId: 'seolleung', stationName: '선릉역' },
      toStation: { stationId: 'gangnam', stationName: '강남역' },
    },
    {
      id: 'step_bus_002',
      type: 'BUS',
      fromStation: {
        stationId: '100000002',
        stationName: '강남역',
        lat: 37.498,
        lng: 127.031,
      },
      toStation: {
        stationId: '100000001',
        stationName: '집앞정류장',
        lat: 37.497,
        lng: 127.028,
      },
      candidateRoutes: [{ routeId: '360', routeName: '360' }],
    },
    {
      id: 'step_walk_005',
      type: 'WALK',
      from: { name: '집앞정류장', lat: 37.498, lng: 127.029 },
      to: { name: '집', lat: 37.497, lng: 127.028 },
      distanceMeter: 250,
      estimatedMinutes: 3,
    },
  ],
  createdAt: mockTimestamp,
  updatedAt: mockTimestamp,
};

export const mockRoutes: Route[] = [mockCommuteRoute, mockEveningRoute];

export const mockRouteDomain = {
  routeGroups: mockRouteGroups,
  routes: mockRoutes,
  commuteRoute: mockCommuteRoute,
  commuteRouteSteps: mockCommuteRouteSteps,
};
