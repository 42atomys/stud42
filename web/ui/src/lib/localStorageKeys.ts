export const LocalStorageKeys = {
  MyCurrentCampusName: 's42.my-current-campus-name',
  NewFeatureReadStatus: (feature: string) =>
    `s42.new-feature-read-status-${feature}`,
  Settings: 's42.your-settings',
} as const;
