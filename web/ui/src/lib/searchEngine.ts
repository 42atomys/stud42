/**
 * clusterIdentifierValidator is a map of campus to regex that validates
 * the cluster identifier. The regex is used to extract the cluster from the
 * identifier.
 */
const clusterIdentifierValidator: { [key: string]: RegExp } = {
  paris: /(e(?:1|2|3)).{4,5}/i,
  helsinki: /(c(?:1|2|3)).{4,5}/i,
};

/**
 * retrieve the cluster url for the given campus and identifier
 */
export const clusterURL = (
  campus: string,
  identifier: string
): string | null => {
  const campusLower = campus.toLowerCase();
  const identifierLower = identifier.toLowerCase();

  if (campusLower && identifierLower) {
    const [, cluster] =
      identifierLower.match(clusterIdentifierValidator[campusLower]) || [];

    if (
      Object.keys(clusterIdentifierValidator).includes(campusLower) &&
      cluster
    ) {
      return `/clusters/${campusLower}/${cluster}?identifier=${identifierLower}`;
    }
  }
  return null;
};
