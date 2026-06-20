import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants';

import { routeGroupRepository } from '../repository';
import type { CreateRouteGroupInput, UpdateRouteGroupInput } from '../types';

export function useRouteGroupsQuery() {
  return useQuery({
    queryKey: queryKeys.routeGroups.all,
    queryFn: () => routeGroupRepository.getRouteGroups(),
  });
}

export function useRouteGroupQuery(groupId: string | null) {
  return useQuery({
    queryKey: groupId ? queryKeys.routeGroups.detail(groupId) : ['routeGroup', 'empty'],
    enabled: groupId !== null,
    queryFn: () => {
      if (groupId === null) {
        throw new Error('Route group ID is required');
      }
      return routeGroupRepository.getRouteGroupById(groupId);
    },
  });
}

export function useCreateRouteGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRouteGroupInput) => routeGroupRepository.createRouteGroup(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.routeGroups.all });
    },
  });
}

export function useUpdateRouteGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, data }: { groupId: string; data: UpdateRouteGroupInput }) =>
      routeGroupRepository.updateRouteGroup(groupId, data),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.routeGroups.all });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.routeGroups.detail(variables.groupId),
      });
    },
  });
}

export function useDeleteRouteGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: string) => routeGroupRepository.deleteRouteGroup(groupId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.routeGroups.all });
    },
  });
}
