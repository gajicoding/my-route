import type { SocialProvider } from '../types';

const MOCK_UID_PREFIX = 'mock-user';

export const authService = {
  signInWithProvider: async (provider: SocialProvider): Promise<{ uid: string }> => {
    await delay(800);
    return { uid: `${MOCK_UID_PREFIX}-${provider}` };
  },
  signOut: async (): Promise<void> => {
    await delay(200);
  },
};

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
