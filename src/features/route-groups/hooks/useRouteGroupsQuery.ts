import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants';

import { groupRepository } from '../repository';

export function useRouteGroupsQuery() {
  return useQuery({
    queryKey: queryKeys.routeGroups.all,
    queryFn: () => groupRepository.getRouteGroups(),
  });
}
