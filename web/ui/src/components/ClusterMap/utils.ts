import { ICampus } from '@lib/clustersMap/types';
import { NodeFinderFunc, NodeIndexFinderFunc } from './types';
import Campuses from '@lib/clustersMap';

/**
 * findIndexForNode will extract the index of the node object from a graphql
 * query result object. (for example you can see the request locationsByCluster)
 * It will return the index of the node object or -1 if the node is not found.
 * @param connection - the edges array from the graphql query result
 * @param identifier - the identifier of the node to extract
 * @returns the index of the node in the edges array
 */
const findIndexForNode: NodeIndexFinderFunc = (connection, identifier) => {
  const { edges } = connection;

  if (!edges) return -1;

  return edges.findIndex((edge) => edge?.node?.identifier === identifier);
};

/**
 * extractNode will extract the node object from a graphql query result object
 * (for example you can see the request locationsByCluster). It will return
 * the node object or null if the node is not found.
 * @param connection - the edges array from the graphql query result
 * @param identifier - the identifier of the node to extract
 * @returns the node object or null if the node is not found
 */
export const extractNode: NodeFinderFunc = (connection, identifier) => {
  const { edges } = connection;

  if (!edges) return null;

  const location = edges[findIndexForNode(connection, identifier)];
  if (!location) return null;

  return location.node;
};

/**
 * extractNodes will extract the node objects from a graphql query result object
 * (for example you can see the request locationsByCluster). It will return
 * the node object and remove it from edges or null if the node is not found.
 * @param edges - the edges array from the graphql query result
 * @param identifier - the identifier of the node to extract
 * @returns the node object or null if the node is not found
 * @deprecated use extractNode instead. This function will be removed in the future
 */
export const extractandRemoveNode: NodeFinderFunc = (
  connection,
  identifier,
) => {
  const { edges } = connection;

  if (!edges) return null;

  let index = findIndexForNode(connection, identifier);
  if (index === -1) return null;

  const location = edges[index] as NonNullable<(typeof edges)[number]>;
  connection.edges = connection.edges.slice(index, 1).concat([]);

  return location.node;
};

/**
 * findCampusPerSafeLink will find a campus object from its link representation.
 * For example, if you want to find the campus object for the campus "Paris",
 * you can use the link "paris" to find it.
 * @param slug - the link of the campus in the safe url format (e.g. "paris")
 * @returns the campus object or undefined if not found
 */
export const findCampusPerSafeLink = (
  slug: string | undefined,
): ICampus | undefined => {
  if (!slug) return undefined;

  return Object.values(Campuses).find(
    (iCampusObject) =>
      iCampusObject.identifier().toSafeLink() === slug.toSafeLink(),
  );
};
