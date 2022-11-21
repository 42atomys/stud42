import { CampusClusterMapData, CampusNames } from '@components/ClusterMap';

/**
 * retrieve the cluster url for the given campus and identifier
 */
export const clusterURL = (
  campus: string | null | undefined,
  identifier: string | null | undefined
): string | null => {
  const campusLower = campus?.toLowerCase();
  const identifierLower = identifier?.toLowerCase();

  if (
    !campusLower ||
    !Object.keys(CampusClusterMapData).includes(campusLower)
  ) {
    return null;
  }

  if (campusLower && identifierLower) {
    const [, cluster] =
      identifierLower.match(
        CampusClusterMapData[campusLower as CampusNames]._data
          .identifierValidator
      ) || [];

    if (cluster) {
      return `/clusters/${campusLower}/${cluster}?identifier=${identifierLower}`;
    }
  }
  return null;
};
