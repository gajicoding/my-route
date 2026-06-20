import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants';

import { transitService } from '../services';

export function useBusArrivalQuery(stationId: string | null) {
  return useQuery({
    queryKey: stationId
      ? queryKeys.busArrival.byStation(stationId)
      : ['busArrival', 'empty'],
    enabled: stationId !== null,
    queryFn: () => {
      if (stationId === null) {
        throw new Error('Station ID is required');
      }
      return transitService.getBusArrivals({ stationId });
    },
  });
}
