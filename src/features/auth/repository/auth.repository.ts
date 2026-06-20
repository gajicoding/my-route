import type { UserProfile } from '../types';

export const authRepository = {
  getProfile: async (_uid: string): Promise<UserProfile | null> => {
    throw new Error('Not implemented');
  },
};
