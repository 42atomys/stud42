import { NodeFinderFunc, NodeIndexFinderFunc } from './types';

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
  identifier
) => {
  const { edges } = connection;

  if (!edges) return null;

  let index = findIndexForNode(connection, identifier);
  if (index === -1) return null;

  const location = edges[index] as NonNullable<(typeof edges)[number]>;
  connection.edges = connection.edges.slice(index, 1).concat([]);

  return location.node;
};
