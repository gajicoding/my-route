export const settingsService = {
  getDefaultSettings: () => ({
    walkingSpeed: 'NORMAL' as const,
    preferredTransport: 'BUS' as const,
    minimizeTransfers: true,
    notificationsEnabled: true,
    boardingAlarmEnabled: true,
    transferAlarmEnabled: true,
  }),
};
