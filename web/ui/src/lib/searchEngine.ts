import Campuses, { CampusNames } from './clustersMap';

/**
 * retrieve the cluster url for the given campus and identifier
 */
export const clusterURL = (
  campus: string | null | undefined,
  identifier: string | null | undefined,
): string | null => {
  const campusLower = campus?.toLowerCase();

  if (!campusLower || !Object.keys(Campuses).includes(campusLower)) {
    return null;
  }

  if (campusLower && identifier) {
    const { clusterWithLetter } =
      Campuses[campusLower as CampusNames].extractor(identifier);

    //! FIXME : this is a hack to fix the fact that the clusterWithLetter is not
    //! always the same as the cluster name due to paul cluster merging
    //! (paul-F3A and paul-F3B are now paul-F3) and the fact that the cluster
    //! name is used in the url to retrieve the cluster data from the API
    if (clusterWithLetter.startsWith('paul') && campusLower === 'paris') {
      const mergedIdentifier = clusterWithLetter.slice(0, -1);
      return `/clusters/${campusLower}/${mergedIdentifier}?identifier=${identifier}`;
    }

    if (clusterWithLetter) {
      return `/clusters/${campusLower}/${clusterWithLetter}?identifier=${identifier}`;
    }
  }
  return null;
};
