import { useMutation } from '@tanstack/react-query';

import { activeRouteRepository } from '../repository';
import type { StartNavigationInput } from '../types';

export function useStartNavigationMutation() {
  return useMutation({
    mutationFn: (data: StartNavigationInput) => activeRouteRepository.startNavigation(data),
  });
}
