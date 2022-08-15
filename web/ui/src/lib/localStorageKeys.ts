export const LocalStorageKeys = {
  MyCurrentCampusName: 'my-current-campus-name',
  NewFeatureReadStatus: (feature: string) =>
    `new-feature-read-status-${feature}`,
} as const;
