export type WalkingSpeed = 'SLOW' | 'NORMAL' | 'FAST';

export type PreferredTransport = 'BUS';

export interface UserSettings {
  walkingSpeed: WalkingSpeed;
  preferredTransport: PreferredTransport;
  minimizeTransfers: boolean;
  notificationsEnabled: boolean;
  boardingAlarmEnabled: boolean;
  transferAlarmEnabled: boolean;
}

export interface UpdateUserSettingsInput {
  walkingSpeed?: WalkingSpeed;
  preferredTransport?: PreferredTransport;
  minimizeTransfers?: boolean;
  notificationsEnabled?: boolean;
  boardingAlarmEnabled?: boolean;
  transferAlarmEnabled?: boolean;
}
