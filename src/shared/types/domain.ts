export interface BusArrival {
  routeId: string;
  routeName: string;
  arrivalMessage: string;
  arrivalSeconds: number;
  stationId: string;
  isLastBus: boolean;
}

export interface BusRoute {
  routeId: string;
  routeName: string;
}

export interface Station {
  stationId: string;
  stationName: string;
  lat: number;
  lng: number;
}

export type TransferStatus = 'SAFE' | 'WARNING' | 'DANGER';

export interface TransferResult {
  canTransfer: boolean;
  marginMinutes: number;
  status: TransferStatus;
}
