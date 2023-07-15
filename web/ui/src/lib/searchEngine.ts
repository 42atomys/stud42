import Campuses, { CampusNames } from './clustersMap';

/**
 * retrieve the cluster url for the given campus and identifier
 */
export const clusterURL = (
  campus: string | null | undefined,
  identifier: string | null | undefined
): string | null => {
  const campusLower = campus?.toLowerCase();

  if (!campusLower || !Object.keys(Campuses).includes(campusLower)) {
    return null;
  }

  if (campusLower && identifier) {
    const { clusterWithLetter } =
      Campuses[campusLower as CampusNames].extractor(identifier);

    if (clusterWithLetter) {
      return `/clusters/${campusLower}/${clusterWithLetter}?identifier=${identifier}`;
    }
  }
  return null;
};
