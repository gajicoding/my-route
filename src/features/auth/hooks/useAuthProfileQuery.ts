import { useQuery } from '@tanstack/react-query';

import { authRepository } from '../repository';

export function useAuthProfileQuery(uid: string | null) {
  return useQuery({
    queryKey: ['auth', 'profile', uid],
    enabled: uid !== null,
    queryFn: () => {
      if (uid === null) {
        throw new Error('UID is required');
      }
      return authRepository.getProfile(uid);
    },
  });
}
