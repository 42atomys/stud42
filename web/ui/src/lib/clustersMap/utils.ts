import type { ICampus } from './types';
import { Campuses } from './campuses.generated';
import '@lib/prototypes/string';

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
