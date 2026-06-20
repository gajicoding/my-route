import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants';

import { routeRepository } from '../repository';
import type { CreateRouteInput, UpdateRouteInput } from '../types';

export function useRoutesQuery() {
  return useQuery({
    queryKey: queryKeys.routes.all,
    queryFn: () => routeRepository.getRoutes(),
  });
}

export function useRouteQuery(routeId: string | null) {
  return useQuery({
    queryKey: routeId ? queryKeys.routes.detail(routeId) : ['route', 'empty'],
    enabled: routeId !== null,
    queryFn: () => {
      if (routeId === null) {
        throw new Error('Route ID is required');
      }
      return routeRepository.getRouteById(routeId);
    },
  });
}

export function useRoutesByGroupQuery(groupId: string | null) {
  return useQuery({
    queryKey: groupId ? queryKeys.routes.byGroup(groupId) : ['routes', 'empty'],
    enabled: groupId !== null,
    queryFn: () => {
      if (groupId === null) {
        throw new Error('Route group ID is required');
      }
      return routeRepository.getRoutesByGroupId(groupId);
    },
  });
}

export function useCreateRouteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRouteInput) => routeRepository.createRoute(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.routes.all });
    },
  });
}

export function useUpdateRouteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ routeId, data }: { routeId: string; data: UpdateRouteInput }) =>
      routeRepository.updateRoute(routeId, data),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.routes.all });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.routes.detail(variables.routeId),
      });
    },
  });
}

export function useDeleteRouteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (routeId: string) => routeRepository.deleteRoute(routeId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.routes.all });
    },
  });
}
