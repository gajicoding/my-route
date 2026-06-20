import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { settingsRepository } from '../repository';
import type { UpdateUserSettingsInput } from '../types';

const settingsQueryKey = ['settings'] as const;

export function useSettingsQuery() {
  return useQuery({
    queryKey: settingsQueryKey,
    queryFn: () => settingsRepository.getSettings(),
  });
}

export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserSettingsInput) => settingsRepository.updateSettings(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: settingsQueryKey });
    },
  });
}
