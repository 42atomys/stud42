import { findCampusPerSafeLink } from '@lib/clustersMap';

/**
 * retrieve the cluster url for the given campus and identifier
 */
export const clusterURL = (
  campus: string | null | undefined,
  identifier: string | null | undefined,
): string | null => {
  const campusLink = campus?.toSafeLink();

  const campusData = findCampusPerSafeLink(campusLink);

  if (!campusData) {
    return null;
  }

  if (campusData && identifier) {
    const { clusterWithLetter } = campusData.extractor(identifier);

    //! FIXME : this is a hack to fix the fact that the clusterWithLetter is not
    //! always the same as the cluster name due to paul cluster merging
    //! (paul-F3A and paul-F3B are now paul-F3) and the fact that the cluster
    //! name is used in the url to retrieve the cluster data from the API
    if (clusterWithLetter.startsWith('paul') && campusLink === 'paris') {
      const mergedIdentifier = clusterWithLetter.slice(0, -1);
      return `/clusters/${campusLink}/${mergedIdentifier}?identifier=${identifier}`;
    }

    if (clusterWithLetter) {
      return `/clusters/${campusLink}/${clusterWithLetter}?identifier=${identifier}`;
    }
  }
  return null;
};
