export const formatKey = (key: string): string => {
  // This regular expression finds camelCase and PascalCase
  const formattedKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2');

  // This line replaces any non-alphanumeric and non-hyphen characters with hyphens
  // and converts to lowercase
  return formattedKey.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
};

export const LocalStorageKeys = {
  NewFeatureReadStatus: (feature: string) =>
    `s42.new-feature-read-status-${formatKey(feature)}`,
} as const;

export const SessionStorageKeys = {
  GithubStars: 's42.github.stars',
};
