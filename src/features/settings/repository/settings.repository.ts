import type { UpdateUserSettingsInput, UserSettings } from '../types';

export const settingsRepository = {
  getSettings: async (): Promise<UserSettings | null> => {
    throw new Error('Not implemented');
  },
  updateSettings: async (_data: UpdateUserSettingsInput): Promise<UserSettings> => {
    throw new Error('Not implemented');
  },
};
