import type { BusArrival } from '@/shared/types';

export interface GetBusArrivalsParams {
  stationId: string;
}

export async function getBusArrivals(
  _params: GetBusArrivalsParams,
): Promise<BusArrival[]> {
  throw new Error('Not implemented');
}
